import {
  BiconnectedComponentClustering,
  DefaultGraph,
  EdgeBetweennessClustering,
  HierarchicalClustering,
  KMeansClustering,
  LabelPropagationClustering,
  LouvainModularityClustering
} from 'yfiles'


export enum ClusteringAlgo {
  EdgeBetweenness,
  BiconnectedComponent,
  KMeans,
  LouvainModularity,
  LabelPropagation,
  Hierarchical,
  None

}

export function applyClustering(graph: DefaultGraph, algo: ClusteringAlgo) {
  let clustering
  switch (algo) {
    case ClusteringAlgo.EdgeBetweenness:
      clustering = new EdgeBetweennessClustering()
      break
    case ClusteringAlgo.BiconnectedComponent:
      clustering = new BiconnectedComponentClustering()
      break
    case ClusteringAlgo.KMeans:
      clustering = new KMeansClustering()
      break
    case ClusteringAlgo.LouvainModularity:
      clustering = new LouvainModularityClustering()
      break
    case ClusteringAlgo.LabelPropagation:
      clustering = new LabelPropagationClustering()
      break
    case ClusteringAlgo.Hierarchical:
      clustering = new HierarchicalClustering()
      break
    case ClusteringAlgo.None:
      return
  }
  let clusteringResult = clustering.run(graph)
  for (const cluster of clusteringResult.clusters) {
    const clusterGroup = graph.createGroupNode()
    for (const node of cluster.nodes) {
      graph.setParent(node, clusterGroup)
    }
  }
}
