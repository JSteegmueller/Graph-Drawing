import { ILayoutAlgorithm, OrganicLayout } from 'yfiles'

export default function getOrganicLayout(): ILayoutAlgorithm {
  const layout = new OrganicLayout()
  layout.considerNodeSizes = true
  layout.minimumNodeDistance = 0
  layout.deterministic = true
  layout.preferredMinimumNodeToEdgeDistance = 170
  layout.nodeEdgeOverlapAvoided = true
  layout.preferredEdgeLength = 450
  layout.compactnessFactor = 0.9
  return layout
}