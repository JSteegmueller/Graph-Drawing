import { DefaultGraph, FreeNodePortLocationModel, INode, PolylineEdgeStyle } from 'yfiles'
import { Game } from '../../types/Game'

export function createEdges(graph: DefaultGraph, nodes: Map<number, INode>) {
  for (const [, node] of nodes) {
    const game = node.tag as Game
    for (const liked_id of game.recommendations.fans_liked) {
      const likedNode = nodes.get(liked_id)
      // Map.get can return undefined->check for undefined to secure type.
      if (!likedNode) continue
      graph.createEdge(node, likedNode)
    }
  }
}

export function createPortEdge(graph: DefaultGraph, source: INode, target: INode, style: PolylineEdgeStyle) {
  // Not working, but goes in the right direction
  const sPort = graph.addPort({
    owner: source,
    locationParameter:  FreeNodePortLocationModel.NODE_BOTTOM_LEFT_ANCHORED //new FreeNodePortLocationModel().createParameterForRatios(Point.from([0, 0]), Point.from([0, 0]))
  })
  const tPort = graph.addPort({
    owner: target,
    locationParameter:  FreeNodePortLocationModel.NODE_BOTTOM_LEFT_ANCHORED //new FreeNodePortLocationModel().createParameterForRatios(Point.from([0, 0]), Point.from([0, 0]))
  })
  graph.createEdge(sPort, tPort, style)
  //graph.createEdge(source, target, style)
}
