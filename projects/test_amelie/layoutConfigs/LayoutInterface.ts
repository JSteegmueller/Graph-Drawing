import {
  Class,
  DefaultGraph,
  GraphComponent,
  GraphCopier,
  GraphEditorInputMode,
  GraphInputMode,
  GraphMLSupport,
  GraphOverviewComponent,
  GraphSnapContext,
  GridSnapTypes,
  IArrow,
  ICommand,
  IEdge,
  IEnumerable,
  IGraph,
  IInputMode,
  ILabel,
  ILabelOwner,
  ImageNodeStyle,
  IModelItem,
  INode,
  LabelSnapContext,
  License,
  List,
  OrthogonalEdgeEditingContext,
  Point,
  PolylineEdgeStyle,
  PopulateItemContextMenuEventArgs,
  Rect,
  RenderModes,
  SmartEdgeLabelModel,
  StorageLocation,
  Stroke,
  TableNodeStyle
} from 'yfiles'

import HierarchicLayoutConfig from './HierarchicLayoutConfig'
import OrganicLayoutConfig from './OrganicLayoutConfig'
import OrthogonalLayoutConfig from './OrthogonalLayoutConfig'
import CircularLayoutConfig from './CircularLayoutConfig'
import TreeLayoutConfig from './TreeLayoutConfig'
import ClassicTreeLayoutConfig from './ClassicTreeLayoutConfig'
import BalloonLayoutConfig from './BalloonLayoutConfig'
import RadialLayoutConfig from './RadialLayoutConfig'
import SeriesParallelLayoutConfig from './SeriesParallelLayoutConfig'
import PolylineEdgeRouterConfig from './PolylineEdgeRouterConfig'
import ChannelEdgeRouterConfig from './ChannelEdgeRouterConfig'
import BusEdgeRouterConfig from './BusEdgeRouterConfig'
import OrganicEdgeRouterConfig from './OrganicEdgeRouterConfig'
import ParallelEdgeRouterConfig from './ParallelEdgeRouterConfig'
import LabelingConfig from './LabelingConfig'
import ComponentLayoutConfig from './ComponentLayoutConfig'
import TabularLayoutConfig from './TabularLayoutConfig'
import PartialLayoutConfig from './PartialLayoutConfig'
import GraphTransformerConfig from './GraphTransformerConfig'
import CompactDiskLayoutConfig from './CompactDiskLayoutConfig'

import type { LayoutConfigurationType } from './LayoutConfiguration'


/**
 * Creates a new instance of the configuration for the layout algorithm with the given name.
 * @param normalizedName The name of the layout algorithm for which a configuration is created.
 */
function createLayoutConfig(normalizedName: string): LayoutConfigurationType {
  switch (normalizedName) {
    case 'balloon':
      return new BalloonLayoutConfig()
    case 'bus-router':
      return new BusEdgeRouterConfig()
    case 'channel-router':
      return new ChannelEdgeRouterConfig()
    case 'circular':
      return new CircularLayoutConfig()
    case 'components':
      return new ComponentLayoutConfig()
    case 'edge-router':
      return new PolylineEdgeRouterConfig()
    case 'graph-transform':
      return new GraphTransformerConfig()
    case 'hierarchic':
      return new HierarchicLayoutConfig()
    case 'labeling':
      return new LabelingConfig()
    case 'organic':
      return new OrganicLayoutConfig()
    case 'organic-router':
      return new OrganicEdgeRouterConfig()
    case 'orthogonal':
      return new OrthogonalLayoutConfig()
    case 'series-parallel':
      return new SeriesParallelLayoutConfig()
    case 'partial':
      return new PartialLayoutConfig()
    case 'radial':
      return new RadialLayoutConfig()
    case 'compact-disk':
      return new CompactDiskLayoutConfig()
    case 'parallel-router':
      return new ParallelEdgeRouterConfig()
    case 'tabular':
      return new TabularLayoutConfig()
    case 'tree':
      return new TreeLayoutConfig()
    case 'classic-tree':
      return new ClassicTreeLayoutConfig()
    default:
      return new HierarchicLayoutConfig()
  }
}

export default createLayoutConfig