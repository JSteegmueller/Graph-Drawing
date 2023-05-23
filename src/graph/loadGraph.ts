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

import { DefaultGraph, Fill, INode, Rect, ShapeNodeShape, ShapeNodeStyle, Stroke } from 'yfiles'
import uTop40 from './data/top40.json'
import uTop100 from './data/top100.json'
import { Game } from '../types/Game'
import applyHierarchicLayout from './layouts/hierachic'

const top40: Game[] = uTop40
const top100: Game[] = uTop100

export default async function loadGraph() {
  const graph = new DefaultGraph()
  const shape = new Rect(100, 100, 75, 50)
  const style = new ShapeNodeStyle({
    shape: ShapeNodeShape.RECTANGLE,
    stroke: Stroke.BLACK,
    fill: Fill.ORANGE
  })

  const nodes = createNodesWithShapeAndStyle(graph, top40, shape, style)
  createLikedEdges(graph, nodes)
  applyHierarchicLayout(graph)//applyOrganicLayout(graph)

  return graph
}

function createNodesWithShapeAndStyle(graph: DefaultGraph, games: Game[], shape: Rect, style?: ShapeNodeStyle): Map<number, INode> {
  const nodeMap = new Map<number, INode>()
  for (const game of games) {
    const node = graph.createNode(shape, style, game)
    nodeMap.set(game.id, node)
  }
  return nodeMap
}

function createLikedEdges(graph: DefaultGraph, nodes: Map<number, INode>) {
  for (const [, node] of nodes) {
    const game = node.tag as Game
    graph.addLabel(node, game.title)
    for (const liked_id of game.recommendations.fans_liked) {
      const likedNode = nodes.get(liked_id)
      if (!likedNode) continue
      graph.createEdge(node, likedNode)
    }
  }
}


