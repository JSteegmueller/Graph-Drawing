import { DefaultGraph, HierarchicLayout } from 'yfiles'

export default function applyHierarchicLayout(graph: DefaultGraph) {
  const layout = new HierarchicLayout()
  graph.applyLayout(layout)
}