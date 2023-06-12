import { ILayoutAlgorithm, OrganicLayout } from 'yfiles'

export default function getOrganicLayout(): ILayoutAlgorithm {
  const layout = new OrganicLayout()
  layout.considerNodeSizes = true
  layout.minimumNodeDistance = 100
  layout.deterministic = true
  return layout
}