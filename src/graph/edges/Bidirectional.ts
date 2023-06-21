import { DefaultGraph, IEdge, INode } from 'yfiles'

export function mergeBidirectional(graph: DefaultGraph) {
  const edgeRemoveList = new Set<IEdge>()
  const edgeAddList = new Set<[INode, INode]>()
  const edges = graph.edges.toList()
  for (let i = 0; i < edges.size - 1; i++) {
    const edge1 = edges.get(i)
    for (let j = i + 1; j < edges.size; j++) {
      const edge2 = edges.get(j)
      if (edge1.targetNode === edge2.sourceNode &&
        edge2.targetNode === edge1.sourceNode) {
        if (edge1.targetNode && edge1.sourceNode) {
          edgeRemoveList.add(edge1)
          edgeRemoveList.add(edge2)
          edgeAddList.add([edge1.sourceNode, edge1.targetNode])
        }
      }
    }
  }

  for (const edge of edgeRemoveList) {
    graph.remove(edge)
  }
  for (const [source, target] of edgeAddList) {
    graph.createEdge(source, target)
  }

}