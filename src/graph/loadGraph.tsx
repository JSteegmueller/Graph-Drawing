/**
 * @license
 * This app exhibits yFiles for HTML functionalities.
 * Copyright (c) 2023 by yWorks GmbH, Vor dem Kreuzberg 28,
 * 72070 Tuebingen, Germany. All rights reserved.
 *
 * yFiles demo files exhibit yFiles for HTML functionalities.
 * Any redistribution of demo files in source code or binary form, with
 * or without modification, is not permitted.
 *
 * Owners of a valid software license for a yFiles for HTML
 * version are allowed to use the app source code as basis for their
 * own yFiles for HTML powered applications. Use of such programs is
 * governed by the rights and conditions as set out in the yFiles for HTML
 * license agreement. If in doubt, please mail to contact@yworks.com.
 *
 * THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN
 * NO EVENT SHALL yWorks BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { DefaultGraph, NodeStylePortStyleAdapter, ShapeNodeStyle } from 'yfiles'
import uTop40 from './data/top40.json'
import uTop100 from './data/top100.json'
import { Game } from '../types/Game'
import { applyLayout, Layout } from './layouts/Layout'
import { createNodes } from './nodes/Nodes'
import { createEdges } from './edges/Edges'
import { applyClustering, ClusteringAlgo } from './nodes/Clustering'
import { findCliques } from './nodes/Clique'
import { mergeBidirectional } from './edges/Bidirectional'
import { applyEdgeStyle } from './edges/EdgeStyle'
import { applyGroupNodeStyle } from './nodes/GroupNodeStyle'
import { applyEdgeRouting } from './edges/Router'
import { findUsedCategories } from './nodes/FindUsedCategories'
import GreenEdgePortCandidateProvider from './PortCandidatProvider'

const top40: Game[] = uTop40
const top100: Game[] = uTop100


export default async function loadGraph() {
  const graph = new DefaultGraph()
  const edgeDecorator = graph.decorator.edgeDecorator
  edgeDecorator.edgeReconnectionPortCandidateProviderDecorator.setFactory(edge =>
    new GreenEdgePortCandidateProvider())
  graph.nodeDefaults.ports.style = new NodeStylePortStyleAdapter(
    new ShapeNodeStyle({
      fill: 'darkblue',
      stroke: 'cornflowerblue',
      shape: 'ellipse'
    })
  )

  const rank_limit = 40

  const nodes = createNodes(graph, top40, rank_limit)
  console.log('Graph: Nodes loaded')

  createEdges(graph, nodes)
  console.log('Graph: Edges created')

  mergeBidirectional(graph)
  console.log('Graph: Bidirectional merged')

  findCliques(graph)
  console.log('Graph: Cliques found')

  mergeBidirectional(graph)
  console.log('Graph: Bidirectional merged')

  applyClustering(graph, ClusteringAlgo.None)
  console.log('Graph: Clustered')

  applyLayout(graph, Layout.OrganicLayout)
  console.log('Graph: Layout applied')

  applyGroupNodeStyle(graph, rank_limit)
  console.log('Graph: Group nodes styled')

  applyEdgeStyle(graph)
  console.log('Graph: Edges styled')

  applyEdgeRouting(graph)
  //applyEdgeBundling(graph)
  console.log('Graph: Edges routed')

  findUsedCategories(graph)
  console.log('Graph: CategoriesPrinted')

  console.log('Graph: completed')

  return graph
}
