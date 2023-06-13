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
  const maxEdgeThickness: number = 10;
  for (const [, node] of nodes) {
    const game = node.tag as Game
    for (const liked_id of game.recommendations.fans_liked)
    {
      const likedNode = nodes.get(liked_id)
      // Map.get can return undefined->check for undefined to secure type.
      if(likedNode === undefined)
        throw new Error("likedNode is undefined");
      // calculateEdgeThickness
      // TODO: replace with CustomEdgeClass.calculateEdgeThickness
      var similarity : number = calculateSimilarity(node, likedNode)
      var thickness: number = Math.ceil((1/similarity) * maxEdgeThickness)

      if (!likedNode) continue
      graph.createEdge(node, likedNode, new PolylineEdgeStyle(
      {
        stroke: thickness.toString() + 'px solid blue',
        targetArrow: new Arrow({ fill: 'green', scale: 2, type: 'default' })
      }))
    }
  }
}

// TODO: integrate function into CustomEdgeStyle class and call it from there.
export function calculateSimilarity(sourceNode: INode, targetNode: INode)
{
  const sourceGame = sourceNode.tag as Game
  const targetGame = targetNode.tag as Game
  var similarity_counter: number = 1
  for (const sourceCategory of sourceGame.types.categories)
  {
    for (const targetCategory of targetGame.types.categories)
    {
      if(sourceCategory === targetCategory)
      {
        similarity_counter++
      }
    }
  }
  return similarity_counter
}


// CustomEdgeStyle class, might need if we want to do more with edges.
class CustomEdgeStyle extends EdgeStyleBase {
  protected createVisual(context: IRenderContext, edge: IEdge): Visual | null
  {
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