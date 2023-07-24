import {
  CurveConnectionStyle,
  DefaultGraph,
  EdgeRouter,
  EdgeRouterData,
  EdgeRouterEdgeRoutingStyle,
  IEdge,
  PortConstraint,
  PortSide,
  RoutingPolicy
} from 'yfiles'
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

  router.minimumNodeToEdgeDistance = 100
  router.defaultEdgeLayoutDescriptor.minimumEdgeToEdgeDistance = 20
  router.defaultEdgeLayoutDescriptor.routingPolicy = RoutingPolicy.ALWAYS
  router.defaultEdgeLayoutDescriptor.routingStyle = EdgeRouterEdgeRoutingStyle.CURVED
  router.defaultEdgeLayoutDescriptor.curveShortcuts = true
  //relative curvature of 180° curves (0..1)
  router.defaultEdgeLayoutDescriptor.curveUTurnSymmetry = 0

  router.defaultEdgeLayoutDescriptor.sourceCurveConnectionStyle = CurveConnectionStyle.ORGANIC
  router.defaultEdgeLayoutDescriptor.targetCurveConnectionStyle = CurveConnectionStyle.ORGANIC

  graph.applyLayout(router, layoutData)
}
