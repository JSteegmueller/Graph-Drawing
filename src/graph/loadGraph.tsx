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

import { DefaultGraph, DefaultLabelStyle, EdgeRouter, INode, Rect, ShapeNodeShape, ShapeNodeStyle, Stroke, FreeNodeLabelModel, Font, FontWeight, VerticalTextAlignment, HorizontalTextAlignment, TextWrapping, LabelShape, BorderLine, FontStyle, InteriorStretchLabelModel, InteriorStretchLabelModelPosition, EdgeDefaults, IEdgeDefaults, IEdgeStyle, EdgeStyleBase, IEdge, IRenderContext, Visual, SvgVisual, PolylineEdgeStyle, Arrow} from 'yfiles'
import uTop40 from './data/top40.json'
import uTop100 from './data/top100.json'
import { Game } from '../types/Game'
import getColorForCategory from './helper/getColorForCategory'
import getOrganicLayout from './layouts/organic'

const top40: Game[] = uTop40
const top100: Game[] = uTop100


export default async function loadGraph() {
  const graph = new DefaultGraph()
  const nodes = createNodesWithShapeAndStyle(graph, top40)
  createLikedEdges(graph, nodes)

  const edgeRouter = new EdgeRouter()
  edgeRouter.coreLayout = getOrganicLayout()
  graph.applyLayout(edgeRouter)

  return graph
}

function createNodeLabelParameter(layoutRatio: any, layoutOffset: any) {
  return FreeNodeLabelModel.INSTANCE.createParameter({
    layoutRatio, // [0,0] is upper left corner of node, [1, 1] lower right, [0.5, 0.5] middle
    layoutOffset, // offset after the ratios been determined
    labelRatio: [0.5, 0.5] // [0,0] is upper left corner of label, [1, 1] lower right, [0.5, 0.5] middle
  })
}

function createNodesWithShapeAndStyle(graph: DefaultGraph, games: Game[]): Map<number, INode> {
  const gameShape = new Rect(0, 0, 100, 100)
  const catShape = new Rect(0, 0, 100, 100)
  const nodeMap = new Map<number, INode>()
  // VERSION FROM JANIK
  /*for (const game of games) {
    const gameNodeStyle = new ShapeNodeStyle({
      shape: ShapeNodeShape.RECTANGLE,
      stroke: Stroke.BLACK,
      fill: `rgb(0,255,22, ${(games.length + 1 - game.rank) / games.length})`
    })
    const gameNode = graph.createGroupNode(null, gameShape, gameNodeStyle, game)
    graph.addLabel(gameNode, game.title)
    for (const category of game.types.categories) {
      const categoryNodeStyle = new ShapeNodeStyle({
        shape: ShapeNodeShape.PILL,
        stroke: Stroke.BLACK,
        fill: getColorForCategory(category.id)
      })
      const catNode = graph.createNode(gameNode, catShape, categoryNodeStyle, game)
      graph.addLabel(catNode, category.name)
    }
    nodeMap.set(game.id, gameNode)
  } */
  for (const game of games) {
    // 
    const gameNodeStyle = new ShapeNodeStyle({
      shape: ShapeNodeShape.ROUND_RECTANGLE, // SHAPE OF NODES
      stroke: Stroke.BEIGE, // COLOR OF STROKE
      fill: `rgb(19,15,135, ${(games.length + 1 - game.rank) / games.length})` // FILL COLOR WITH DESENDING RANK
    })

    const gameNode = graph.createGroupNode(null, gameShape, gameNodeStyle, game)
     // use a label model that stretches the label over the full node layout, with small insets
    const centerLabelModel = new InteriorStretchLabelModel({ insets: 10 }) // STRETCHES LABEL INTO SPACE WITH *insets* PADDING
    const centerParameter = centerLabelModel.createParameter(InteriorStretchLabelModelPosition.CENTER)

    const nodeLabelStyle = new DefaultLabelStyle({ // NODELABELSTYLE
      wrapping: TextWrapping.WORD, // TEXT-WRAPPING PER WORD
      font: new Font('Tahoma', 14, FontStyle.INHERIT, FontWeight.BOLD), // FONT-STYLING
      textFill: 'rgb(0, 0, 0)', // TEXT-COLOR
      verticalTextAlignment: VerticalTextAlignment.CENTER, // VERTICAL TEXT ALIGNMENT
      horizontalTextAlignment: HorizontalTextAlignment.CENTER, // HORIZONTAL TEXT ALIGNMENT
      clipText: false // CLIPS TEXT IF IT DOESN'T FIT
    })
    graph.addLabel(gameNode, game.title, centerParameter, nodeLabelStyle) // ADDS LABEL
    nodeMap.set(game.id, gameNode)
  }
  return nodeMap
}

function createLikedEdges(graph: DefaultGraph, nodes: Map<number, INode>)
{
  for (const [, node] of nodes)
  {
    const game = node.tag as Game
    for (const liked_id of game.recommendations.fans_liked)
    {
      const likedNode = nodes.get(liked_id)
      if (!likedNode) continue
      graph.createEdge(node, likedNode, new PolylineEdgeStyle(
      {
        stroke: '3px solid blue',
        targetArrow: new Arrow({ fill: 'green', scale: 2, type: 'default' })
      }))
    }
  }
}

// CustomEdgeStyle class, might need if we want to do more with edges.
/*class CustomEdgeStyle extends EdgeStyleBase
{
  private createPathData(edge: IEdge): string
  {
    const points = IEdge.getPathPoints(edge).toArray()
    return 'M ' + points.map(point => `${point.x} ${point.y}`).join(' L ')
  }

  protected createVisual(context: IRenderContext, edge: IEdge): Visual | null
  {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', this.createPathData(edge))
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke', 'black')
    path.setAttribute('stroke-width', '1')
    return new SvgVisual(path)
  }  
} */