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

import { DefaultGraph } from 'yfiles'
import uTop40 from './data/top40.json'
import uTop100 from './data/top100.json'
import { Game } from '../types/Game'
import { applyLayout, Layout } from './layouts/Layout'
import { createNodes } from './nodes/Nodes'
import { createEdges } from './edges/Edges'
import { applyClustering, ClusteringAlgo } from './nodes/Clustering'
import { findCliques } from './nodes/Clique'
import { mergeBidirectional } from './edges/Bidirectional'
import { applyEdgeRouting } from './edges/Router'
import { applyEdgeStyle } from './edges/EdgeStyle'

const top40: Game[] = uTop40
const top100: Game[] = uTop100


export default async function loadGraph() {
  const graph = new DefaultGraph()

  const nodes = createNodes(graph, top40)
  createEdges(graph, nodes)
  console.log('Base graph loaded')

  findCliques(graph)
  mergeBidirectional(graph)
  applyClustering(graph, ClusteringAlgo.None)

  applyLayout(graph, Layout.OrganicLayout)
  applyEdgeStyle(graph)
  applyEdgeRouting(graph)
  console.log('Graph building complete')
  return graph
}
