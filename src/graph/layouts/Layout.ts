import { DefaultGraph } from 'yfiles'
import getOrganicLayout from './organic'
import getHierarchicLayout from './hierachic'

export enum Layout {
  HierarchicLayout,
  OrganicLayout
}

export function applyLayout(graph: DefaultGraph, layout: Layout) {
  let chosenLayout
  switch (layout) {
    case Layout.HierarchicLayout:
      chosenLayout = getHierarchicLayout()
      break
    case Layout.OrganicLayout:
      chosenLayout = getOrganicLayout()
      break
  }
  graph.applyLayout(chosenLayout)
}