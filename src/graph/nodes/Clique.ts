import { CliqueSubstructures, DefaultGraph, IEdge, INode } from 'yfiles'
import { Game, newGame } from '../../types/Game'
import { BIDIRECTIONAL } from '../edges/Bidirectional'

export function findCliques(graph: DefaultGraph) {
  const algorithm = new CliqueSubstructures({
    subgraphEdges: {
      excludes: (edge: IEdge) => edge.tag !== BIDIRECTIONAL
    }
  })
  const result = algorithm.run(graph)
  const cliqueNodeMap: Map<Number, INode> = new Map<Number, INode>()

  let cliqueID = 0
  for (const clique of result.cliques) {
    const catCounter = new Map<string, number>()
    const mechCounter = new Map<string, number>()
    console.log('-----------------------------------')
    console.log(`CliqueId: ${cliqueID}, ${clique.nodes.size}`)
    cliqueID++
    const cliqueNode = graph.createGroupNode()
    cliqueNodeMap.set(cliqueID, cliqueNode)
    for (const node of clique.nodes) {
      graph.setParent(node, cliqueNode)
      const game = (node.tag as Game)
      game.types.categories.map(cat => catCounter.set(cat.name, (catCounter.get(cat.name) ?? 0) + 1))
      game.types.mechanics.map(mech => mechCounter.set(mech.name, (mechCounter.get(mech.name) ?? 0) + 1))
      game.clique = cliqueID
    }
    catCounter.forEach((value, key) => {
      if (value < clique.nodes.size / 2) catCounter.delete(key)
    })
    mechCounter.forEach((value, key) => {
      if (value < clique.nodes.size / 2) mechCounter.delete(key)
    })
    console.log(catCounter)
    console.log(mechCounter)
    console.log('-----------------------------------')
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
  const edgeRemoveList = new Set<IEdge>()
  graph.edges.toList().forEach(edge => {
    const sourceClique = (edge.sourceNode?.tag as Game).clique
    if (sourceClique) {
      if (sourceClique === (edge.targetNode?.tag as Game).clique)
        edgeRemoveList.add(edge)
    }
  })
  edgeRemoveList.forEach(edge => {
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