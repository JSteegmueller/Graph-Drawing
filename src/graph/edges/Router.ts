import { DefaultGraph, EdgeRouter, EdgeRouterData, IEdge, PortConstraint, PortSide } from 'yfiles'
import { BIDIRECTIONAL } from './Bidirectional'

export function applyEdgeRouting(graph: DefaultGraph) {
  const router = new EdgeRouter()
  router.rerouting = true
  router.polylineRouting = true
  for (const edge of graph.edges) console.log(edge.tag)
  const layoutData = new EdgeRouterData({
    sourcePortConstraints: edge => edge.tag === BIDIRECTIONAL ? PortConstraint.create(PortSide.WEST) : PortConstraint.create(PortSide.EAST),
    targetPortConstraints: edge => edge.tag === BIDIRECTIONAL ? PortConstraint.create(PortSide.EAST) : PortConstraint.create(PortSide.EAST),
    sourceGroupIds: (edge: IEdge) => `${edge.sourceNode}${edge.tag === BIDIRECTIONAL ? 'a' : 'b'}`,
    targetGroupIds: (edge: IEdge) => `${edge.targetNode}${edge.tag === BIDIRECTIONAL ? 'b' : 'c'}`
  })
  router.minimumNodeToEdgeDistance = 200

  graph.applyLayout(router, layoutData)
}
