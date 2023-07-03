import { DefaultGraph, EdgeRouter } from 'yfiles'

export function applyEdgeRouting(graph: DefaultGraph) {
  const router = new EdgeRouter()
  router.polylineRouting = true
  graph.applyLayout(router)
}