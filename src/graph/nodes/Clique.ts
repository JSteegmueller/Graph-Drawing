import { CliqueSubstructures, DefaultGraph, IEdge, INode } from 'yfiles'
import { Game, newGame } from '../../types/Game'

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
  for (const [, cliqueNode] of cliqueNodeMap) {
    const metaGame: Game = newGame()
    for (const node of graph.getChildren(cliqueNode)) {
      const game = node.tag as Game
      if (!game) continue
      metaGame.types.categories.push(...game.types.categories)
    }
    cliqueNode.tag = metaGame
  }
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
  removeDuplicateEdges(graph)
}

function replaceEdge(edge: IEdge, sourceNode: INode | undefined | null, targetNode: INode | undefined | null, graph: DefaultGraph) {
  if (!sourceNode || !targetNode) return
  graph.remove(edge)
  graph.createEdge(sourceNode, targetNode)
}

function removeDuplicateEdges(graph: DefaultGraph) {
  const edgeRemoveList = new Set<IEdge>()
  const edges = graph.edges.toList()
  for (let i = 0; i < edges.size - 1; i++) {
    const edge1 = edges.get(i)
    for (let j = i + 1; j < edges.size; j++) {
      const edge2 = edges.get(j)
      if (edge1.sourceNode === edge2.sourceNode &&
        edge1.targetNode === edge2.targetNode) {
        if (edge1.targetNode && edge1.sourceNode) {
          edgeRemoveList.add(edge2)
        }
      }
    }
  }

  for (const edge of edgeRemoveList) {
    graph.remove(edge)
  }
}