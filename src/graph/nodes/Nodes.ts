import {
  DefaultGraph,
  DefaultLabelStyle,
  Font,
  FontStyle,
  FontWeight,
  HorizontalTextAlignment,
  INode,
  InteriorStretchLabelModel,
  InteriorStretchLabelModelPosition,
  Rect,
  ShapeNodeShape,
  ShapeNodeStyle,
  Stroke,
  TextWrapping,
  VerticalTextAlignment,
  StringTemplateNodeStyle
} from 'yfiles'
import { Game } from '../../types/Game'
import { ReactComponent as nodeStyle } from './node-style.svg';

export function createNodes(graph: DefaultGraph, games: Game[]): Map<number, INode> {
  const gameShape = new Rect(0, 0, 100, 100)
  const nodeMap = new Map<number, INode>()

  for (const game of games) {
    const gameNodeStyle = new ShapeNodeStyle({
      shape: ShapeNodeShape.ROUND_RECTANGLE, // SHAPE OF NODES
      stroke: Stroke.BEIGE, // COLOR OF STROKE
      fill: `rgb(19,15,135, ${(games.length + 1 - game.rank) / games.length})` // FILL COLOR WITH DESENDING RANK
    })

    const amountOfCategories = game.types.categories.length

    const nodeStyle = `<g>
    <circle cx="50" cy="50" r="50" fill="#e9e9ca" />
    <text x="50" y="58" font-size="16" stroke="#000">${game.title}</text></g>`
    const gameNodeStyleSVG = new StringTemplateNodeStyle(nodeStyle)

    const gameNode = graph.createGroupNode(null, gameShape, gameNodeStyleSVG, game)
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
    //graph.addLabel(gameNode, game.title, centerParameter, nodeLabelStyle) // ADDS LABEL
    nodeMap.set(game.id, gameNode)
  }
  return nodeMap
}