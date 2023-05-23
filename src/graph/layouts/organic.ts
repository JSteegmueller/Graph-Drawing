import { ILayoutAlgorithm, OrganicLayout, OrganicLayoutClusteringPolicy } from 'yfiles'

export default function getOrganicLayout(): ILayoutAlgorithm {
  const layout = new OrganicLayout()
  layout.considerNodeSizes = true
  layout.minimumNodeDistance = 100
  layout.deterministic = true
  layout.clusteringPolicy = OrganicLayoutClusteringPolicy.EDGE_BETWEENNESS
  return layout
}