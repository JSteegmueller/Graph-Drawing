import { DefaultGraph, EdgeBundlingStage } from 'yfiles'

export function applyEdgeBundling(graph: DefaultGraph) {
  const bundler = new EdgeBundlingStage()
  bundler.edgeBundling.bundlingQuality = 1
  bundler.edgeBundling.bundlingStrength = 1
  graph.applyLayout(bundler)
}