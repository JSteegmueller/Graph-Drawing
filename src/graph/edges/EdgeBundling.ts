import { DefaultGraph, EdgeBundlingStage } from 'yfiles'

/**
 * <b>Note:</b> This stage ignores the edge bends and handles them all as straight-lines.
 * Furthermore, it doesn't prevent overlaps between nodes and edges.
 */
export function applyEdgeBundling(graph: DefaultGraph) {
  const bundler = new EdgeBundlingStage()
  bundler.edgeBundling.bundlingQuality = 1
  bundler.edgeBundling.bundlingStrength = 1
  graph.applyLayout(bundler)
}