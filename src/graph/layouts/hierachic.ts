import { ComponentArrangementPolicy, HierarchicLayout, ILayoutAlgorithm } from 'yfiles'

export default function getHierarchicLayout(): ILayoutAlgorithm {
  const layout = new HierarchicLayout()
  layout.componentArrangementPolicy = ComponentArrangementPolicy.COMPACT
  return layout
}