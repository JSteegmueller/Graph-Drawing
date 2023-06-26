import { Arrow, DefaultGraph, INode, PolylineEdgeStyle } from 'yfiles'
import { Game } from '../../types/Game'
import { BIDIRECTIONAL } from './Bidirectional'

const maxEdgeThickness: number = 6

export function applyEdgeStyle(graph: DefaultGraph) {
  for (const edge of graph.edges.toList()) {
    const node = edge.sourceNode
    const likedNode = edge.targetNode
    if (!node || !likedNode) continue
    if (edge.tag === BIDIRECTIONAL) {
      const similarity: number = calculateSimilarity(node, likedNode)
      //TODO calc differently
      const thickness: number = Math.ceil((1 / similarity) * maxEdgeThickness)
      graph.createEdge(node, likedNode, new PolylineEdgeStyle(
        {
          stroke: thickness.toString() + 'px solid blue',
          sourceArrow: new Arrow({ fill: 'blue', scale: 2, type: 'default' }),
          targetArrow: new Arrow({ fill: 'blue', scale: 2, type: 'default' })
        }))
      graph.remove(edge)
    } else {
      const similarity: number = calculateSimilarity(node, likedNode)
      const thickness: number = Math.ceil((1 / similarity) * maxEdgeThickness)
      graph.createEdge(node, likedNode, new PolylineEdgeStyle(
        {
          stroke: thickness.toString() + 'px solid green',
          targetArrow: new Arrow({ fill: 'green', scale: 2, type: 'default' })
        }))
      graph.remove(edge)
    }
  }
}

function calculateSimilarity(sourceNode: INode, targetNode: INode) {
  const sourceGame = sourceNode.tag as Game
  const targetGame = targetNode.tag as Game
  if (!sourceGame || !targetGame) return 0
  let similarity_counter: number = 1
  for (const sourceCategory of sourceGame.types.categories) {
    for (const targetCategory of targetGame.types.categories) {
      if (sourceCategory.id === targetCategory.id) {
        similarity_counter++
      }
    }
  }
  return similarity_counter
}
