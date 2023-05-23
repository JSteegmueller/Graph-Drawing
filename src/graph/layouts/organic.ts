import { DefaultGraph, OrganicLayout, OrganicLayoutClusteringPolicy } from 'yfiles'

export default function applyOrganicLayout(graph: DefaultGraph) {
  const layout = new OrganicLayout()
  layout.considerNodeSizes = true
  layout.minimumNodeDistance = 200
  layout.clusteringPolicy = OrganicLayoutClusteringPolicy.EDGE_BETWEENNESS
  layout.deterministic = true
  layout.smartComponentLayout = true
  graph.applyLayout(layout)
}