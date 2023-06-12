import { DefaultGraph, EdgeBundlingStage } from 'yfiles'

export function applyEdgeBundling(graph: DefaultGraph) {
  const bundler = new EdgeBundlingStage()
  bundler.edgeBundling.bundlingQuality = 1
  bundler.edgeBundling.bundlingStrength = 0.8
  graph.applyLayout(bundler)
}