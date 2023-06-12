import {
  Arrow,
  DefaultGraph,
  EdgeStyleBase,
  IEdge,
  INode,
  IRenderContext,
  PolylineEdgeStyle,
  SvgVisual,
  Visual
} from 'yfiles'
import { Game } from '../../types/Game'

export function createEdges(graph: DefaultGraph, nodes: Map<number, INode>) {
  for (const [, node] of nodes) {
    const game = node.tag as Game
    for (const liked_id of game.recommendations.fans_liked) {
      const likedNode = nodes.get(liked_id)
      if (!likedNode) continue
      graph.createEdge(node, likedNode, new PolylineEdgeStyle(
        {
          stroke: '3px solid blue',
          targetArrow: new Arrow({ fill: 'green', scale: 2, type: 'default' })
        }))
    }
  }
}

// CustomEdgeStyle class, might need if we want to do more with edges.
class CustomEdgeStyle extends EdgeStyleBase {
  protected createVisual(context: IRenderContext, edge: IEdge): Visual | null {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', this.createPathData(edge))
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke', 'black')
    path.setAttribute('stroke-width', '1')
    return new SvgVisual(path)
  }

  private createPathData(edge: IEdge): string {
    const points = IEdge.getPathPoints(edge).toArray()
    return 'M ' + points.map(point => `${point.x} ${point.y}`).join(' L ')
  }
}