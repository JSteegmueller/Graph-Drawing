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
  StringTemplateNodeStyle,
  Fill,
  Color
} from 'yfiles'
import { Game } from '../../types/Game'
import { ReactComponent as nodeStyle } from './node-style.svg';
import getColorForCategory from '../helper/getColorForCategory';

function colorToString(color: Color) {
  let colorString = `"rgb(` + color.r + `, ` + color.g + `, ` + color.b + `)"`
  return colorString
}

export function createNodes(graph: DefaultGraph, games: Game[]): Map<number, INode> {
  const gameShape = new Rect(0, 0, 100, 100)
  const nodeMap = new Map<number, INode>()

  for (const game of games) {

    const amountOfCategories = game.types.categories.length
    const categorieCircles = [
      `<circle cx="0" cy="50" r="10"`,
      `<circle cx="5" cy="28" r="10"`,
      `<circle cx="20" cy="10" r="10"`,
      `<circle cx="40" cy="0" r="10"`,
      `<circle cx="65" cy="0" r="10"`,
      `<circle cx="87" cy="10" r="10"`,
      `<circle cx="101" cy="30" r="10"`
    ]

    let nodeStyle = `<circle cx="55" cy="50" r="50" fill="#e9e9ca" />
    <text x="55" y="58" font-size="16" text-anchor="middle" stroke="#000" data-content='{Binding title}'></text>`
    let circles = ``

    for (let c = 0; c < amountOfCategories; c++){
      let colorOfCategory = colorToString(getColorForCategory(game.types.categories[c].id))
      circles = circles + categorieCircles[c] + ` fill= ${colorOfCategory}/>`
    }
    
    const gameNodeStyleSVG = new StringTemplateNodeStyle(circles + nodeStyle)

    const gameNode = graph.createGroupNode(null, gameShape, gameNodeStyleSVG, game)

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