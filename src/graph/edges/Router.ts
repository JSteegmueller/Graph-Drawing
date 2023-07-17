import { DefaultGraph, EdgeRouter, EdgeRouterData, PortConstraint, PortSide } from 'yfiles'

export function applyEdgeRouting(graph: DefaultGraph) {
  const router = new EdgeRouter()
  router.polylineRouting = true
  const layoutData = new EdgeRouterData({
    sourcePortConstraints: edge => PortConstraint.create(PortSide.EAST),
    targetPortConstraints: edge => PortConstraint.create(PortSide.EAST)
  })
  graph.applyLayout(router, layoutData)
}