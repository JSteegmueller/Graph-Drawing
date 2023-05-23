import { DefaultGraph, OrganicLayout, OrganicLayoutClusteringPolicy } from 'yfiles'

export default function applyOrganicLayout(graph: DefaultGraph) {
  const layout = new OrganicLayout()
  layout.considerNodeSizes = true
  layout.minimumNodeDistance = 50
  layout.clusteringPolicy = OrganicLayoutClusteringPolicy.EDGE_BETWEENNESS
  graph.applyLayout(layout)
}