import { DefaultGraph, INode, PolylineEdgeStyle } from 'yfiles'
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
  //graph.createEdge(source.ports.get(0), target.ports.get(0), style)
  graph.createEdge(source, target, style)
}
