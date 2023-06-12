import {
  Class,
  DefaultLabelStyle,
  EdgePathLabelModel,
  EdgeSides,
  GraphBuilder,
  GraphComponent,
  HierarchicLayout,
  HierarchicLayoutData,
  HierarchicLayoutNodeLayoutDescriptor,
  ICommand,
  INode,
  LayoutExecutor,
  License,
  MinimumNodeSizeStage,
  PolylineEdgeStyle,
  ShapeNodeStyle,
  Size
} from 'yfiles'

import { bindAction, bindCommand, reportDemoError, showApp } from '../resources/demo-app'
import {getLikedGraph, easyGraph} from './preprocessResources'
import { fetchLicense } from '../resources/fetch-license'

// @ts-ignore
let graphComponent: GraphComponent = null

let graphData: easyGraph = await getLikedGraph(false)

  
  async function run(): Promise<void> {
    License.value = await fetchLicense()
  
    // Initialize the GraphComponent and place it in the div with CSS selector #graphComponent
    graphComponent = new GraphComponent('#graphComponent')
  
    // Configures default label model parameters for newly created graph elements
    setDefaultLabelLayoutParameters()
  
    // Configures default styles for newly created graph elements
    setDefaultStyles()
  
    // Read a sample graph from an embedded resource file
    createGraph()
  
    // bind the demo buttons to their commands
    registerCommands()
  
    // Initialize the demo application's CSS and Javascript for the description
    showApp(graphComponent)
  
    await runLayout()
  }

  /**
   * Applies a hierarchic layout and uses the data of the layout from the tags of the nodes.
   */
  async function runLayout(): Promise<void> {
    // We need to load the 'view-layout-bridge' module explicitly to prevent tree-shaking
    // tools it from removing this dependency which is needed for 'morphLayout'.
    Class.ensure(LayoutExecutor)
  
    const layoutButton = document.getElementById('layout-btn') as HTMLButtonElement
    layoutButton.disabled = true
  
    // /////////////// New in this Sample /////////////////
    const hierarchicLayout = new HierarchicLayout()
  
    // Configures the layout data from the data that exits in the tags of the nodes
    const hierarchicLayoutData = new HierarchicLayoutData({
      nodeLayoutDescriptors: (node: INode): HierarchicLayoutNodeLayoutDescriptor =>
        new HierarchicLayoutNodeLayoutDescriptor({
          // Sets the alignment of the node based on the tag
          layerAlignment: node.tag && node.tag.alignment ? getAlignment(node) : 0
        })
    })
    // ////////////////////////////////////////////////////
  
    // Uses the morphLayout method to perform the layout, animate it, manage undo and adjust the content rectangle in
    // one call. Here, the actual layout is wrapped into a MinimumNodeSizeStage to avoid errors with nodes of size '0'.
    // morphLayout runs asynchronously and returns immediately yielding a Promise that we can await or use to catch
    // errors.
    try {
      await graphComponent.morphLayout({
        layout: new MinimumNodeSizeStage(hierarchicLayout),
        layoutData: hierarchicLayoutData,
        morphDuration: '1s',
        easedAnimation: true
      })
    } catch (error) {
      reportDemoError(error)
    } finally {
      layoutButton.disabled = false
    }
  }
  
  /**
   * Returns the alignment value based on the data stored in the given node's tag.
   * @param node The given node
   */
  function getAlignment(node: INode): number {
    // The layer alignment can take values within interval [0,1], where 0 corresponds to top alignment, 0.5 to
    // center alignment and 1.0 to bottom alignment. In this dataset, we have stored the alignment in the tag as
    // 'Top', 'Center' or 'Bottom' and thus, we have to convert it to actual numerical values.
    switch (node.tag.alignment) {
      default:
      case 'Center':
        return 0.5
      case 'Top':
        return 0.0
      case 'Bottom':
        return 1.0
    }
  }
  
  /**
   * Creates the sample graph and runs the layout.
   */
  function createGraph(): void {
    const builder = new GraphBuilder(graphComponent.graph)
    builder.createNodesSource({
      data: graphData.nodes,
      id: 'id',
      parentId: 'parent',
      layout: 'layout',
      labels: ['alignment']
    })
    builder.createGroupNodesSource({
      data: graphData.groups,
      id: 'id',
      layout: 'layout',
      labels: ['label']
    })
    builder.createEdgesSource(graphData.edges, 'source', 'target', 'id')
  
    builder.buildGraph()
  }
  
  /**
   * Sets up default label model parameters for graph elements.
   * Label model parameters control the actual label placement as well as the available
   * placement candidates when moving the label interactively.
   */
  function setDefaultLabelLayoutParameters(): void {
    // For edge labels, the default is a label that is rotated to match the associated edge segment
    // We'll start by creating a model that is similar to the default:
    const edgeLabelModel = new EdgePathLabelModel({
      autoRotation: true,
      distance: 10,
      sideOfEdge: EdgeSides.LEFT_OF_EDGE | EdgeSides.RIGHT_OF_EDGE
    })
    // Finally, we can set this label model as the default for edge labels
    graphComponent.graph.edgeDefaults.labels.layoutParameter = edgeLabelModel.createDefaultParameter()
  }
  
  /**
   * Assigns default styles for graph elements.
   * Default styles apply only to elements created after the default style has been set,
   * so typically, you'd set these as early as possible in your application.
   */
  function setDefaultStyles(): void {
    const graph = graphComponent.graph
  
    // Creates a nice ShapeNodeStyle instance, using an orange Fill.
    // Sets this style as the default for all nodes that don't have another
    // style assigned explicitly
    graph.nodeDefaults.style = new ShapeNodeStyle({
      shape: 'round-rectangle',
      fill: '#ff6c00',
      stroke: '1.5px #662b00'
    })
  
    // Sets the default size for nodes explicitly to 40x40
    graph.nodeDefaults.size = new Size(40, 40)
  
    // Creates a PolylineEdgeStyle which will be used as default for all edges
    // that don't have another style assigned explicitly
    graph.edgeDefaults.style = new PolylineEdgeStyle({
      stroke: '1.5px #662b00',
      targetArrow: '#662b00 small triangle'
    })
  
    // Creates a label style with the label font set to Tahoma and a black text color
    const defaultLabelStyle = new DefaultLabelStyle({
      font: '12px Tahoma',
      textFill: 'black'
    })
  
    // Sets the defined style as the default for both edge and node labels
    graph.edgeDefaults.labels.style = defaultLabelStyle
    graph.nodeDefaults.labels.style = defaultLabelStyle
  }
  
  /**
   * Helper method that binds the various commands available in yFiles for HTML to the buttons
   * in the demo's toolbar.
   */
  function registerCommands(): void {
    bindCommand("button[data-command='Open']", ICommand.OPEN, graphComponent)
    bindCommand("button[data-command='Save']", ICommand.SAVE, graphComponent)
  
    bindCommand("button[data-command='Cut']", ICommand.CUT, graphComponent)
    bindCommand("button[data-command='Copy']", ICommand.COPY, graphComponent)
    bindCommand("button[data-command='Paste']", ICommand.PASTE, graphComponent)
  
    bindCommand("button[data-command='ZoomIn']", ICommand.INCREASE_ZOOM, graphComponent)
    bindCommand("button[data-command='ZoomOut']", ICommand.DECREASE_ZOOM, graphComponent)
    bindCommand("button[data-command='FitContent']", ICommand.FIT_GRAPH_BOUNDS, graphComponent)
    bindCommand("button[data-command='ZoomOriginal']", ICommand.ZOOM, graphComponent, 1.0)
  
    bindAction("button[data-command='Layout']", async (): Promise<void> => runLayout())
  }
  
  // noinspection JSIgnoredPromiseFromCall
  run()
  