import { Arrow, CliqueSubstructures, DefaultGraph, IEdge, INode, PolylineEdgeStyle } from 'yfiles'
import { Game } from '../../types/Game'

export function findCliques(graph: DefaultGraph) {
  const algorithm = new CliqueSubstructures()
  const result = algorithm.run(graph)
  const cliqueNodeMap: Map<Number, INode> = new Map<Number, INode>()

  let cliqueID = 0
  for (const clique of result.cliques) {
    cliqueID++
    const cliqueNode = graph.createGroupNode()
    cliqueNodeMap.set(cliqueID, cliqueNode)
    for (const node of clique.nodes) {
      graph.setParent(node, cliqueNode)
      const game = (node.tag as Game)
      game.clique = cliqueID
      node.tag = game
    }
  }
  removeCliqueEdges(graph)
  rerouteEdges(graph, cliqueNodeMap)
}

function removeCliqueEdges(graph: DefaultGraph) {
  graph.edges.toList().forEach(edge => {
    if ((edge.sourceNode?.tag as Game).clique ===
      (edge.targetNode?.tag as Game).clique)
      graph.remove(edge)
  })
}

function rerouteEdges(graph: DefaultGraph, cliqueNodeMap: Map<Number, INode>) {
  graph.edges.toList().forEach(edge => {
    const targetClique = (edge.targetNode?.tag as Game).clique
    if (targetClique) {
      replaceEdge(edge, edge.sourceNode, cliqueNodeMap.get(targetClique), graph)
    }
  })

  graph.edges.toList().forEach(edge => {
    const sourceClique = (edge.sourceNode?.tag as Game).clique
    if (sourceClique) {
      replaceEdge(edge, cliqueNodeMap.get(sourceClique), edge.targetNode, graph)
    }
  })
}

function replaceEdge(edge: IEdge, sourceNode: INode | undefined | null, targetNode: INode | undefined | null, graph: DefaultGraph) {
  if (!sourceNode || !targetNode) return
  graph.remove(edge)
  graph.createEdge(sourceNode, targetNode, new PolylineEdgeStyle(
    {
      stroke: '3px solid blue',
      targetArrow: new Arrow({ fill: 'green', scale: 2, type: 'default' })
    }))
}