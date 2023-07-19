import { ILayoutAlgorithm, OrganicLayout } from 'yfiles'

export default function getOrganicLayout(): ILayoutAlgorithm {
  const layout = new OrganicLayout()
  layout.considerNodeSizes = true
  layout.minimumNodeDistance = 0
  layout.deterministic = true
  layout.preferredMinimumNodeToEdgeDistance = 200
  layout.nodeEdgeOverlapAvoided = true
  layout.preferredEdgeLength = 500
  layout.compactnessFactor = 0.7
  return layout
}