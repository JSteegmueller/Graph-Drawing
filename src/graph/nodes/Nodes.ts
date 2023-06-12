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
  VerticalTextAlignment
} from 'yfiles'
import { Game } from '../../types/Game'

export function createNodes(graph: DefaultGraph, games: Game[]): Map<number, INode> {
  const gameShape = new Rect(0, 0, 100, 100)
  const nodeMap = new Map<number, INode>()

  for (const game of games) {
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