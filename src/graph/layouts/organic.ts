import { ILayoutAlgorithm, OrganicLayout } from 'yfiles'

export default function getOrganicLayout(): ILayoutAlgorithm {
  const layout = new OrganicLayout()
  layout.considerNodeSizes = true
  layout.minimumNodeDistance = 150
  layout.deterministic = true
  layout.preferredMinimumNodeToEdgeDistance = 150
  layout.nodeEdgeOverlapAvoided = true
  return layout
}