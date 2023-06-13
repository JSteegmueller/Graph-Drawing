import {
  Color,
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
  StringTemplateNodeStyle,
  TextWrapping,
  VerticalTextAlignment
} from 'yfiles'
import { Game } from '../../types/Game'
import getColorForCategory from '../helper/getColorForCategory'

function colorToString(color: Color) {
  return `"rgb(` + color.r + `, ` + color.g + `, ` + color.b + `)"`
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
      `<circle cx="101" cy="30" r="10"`,
      `<circle cx="108" cy="50" r="10"`
    ]

    let circles = ``
    for (let c = 0; c < amountOfCategories; c++) {
      let colorOfCategory = colorToString(getColorForCategory(game.types.categories[c].id))
      circles = circles + categorieCircles[c] + ` fill= ${colorOfCategory}/>`
    }

    // titles wrap after 17 characters
    const first_line_char_limit = 17
    let title_extraLines = Math.ceil(game.title.length / first_line_char_limit) - 1
    let start_infos = 40 + title_extraLines * 10

    if (game.title === 'Twilight Imperium: Fourth Edition') { // Wortlängen sind blöd, deshalb hardcoded...
      start_infos = 60
    } else if (game.title.length - first_line_char_limit <= 0) {
      start_infos = 40
    } else if (game.title.length - first_line_char_limit < 17) {
      start_infos = 50
    } else {
      start_infos = 60
    }

    const buffer_small_title = 10
    const buffer_infos = 11

    const first_info_txt = start_infos + buffer_small_title
    const sec_info_title = first_info_txt + buffer_infos
    const sec_info_txt = sec_info_title + buffer_small_title

    let nodeStyle = `
    <circle cx='55' cy='50' r='50' fill='#e9e9ca' />
    <text x='55' y='25' style='font-size:10' text-anchor='middle'>
    <!-- <tspan data-content='{Binding title}'></tspan> -->
    <!-- <tspan x="55" y="35" ></tspan> -->
    </text>
    
    <text x='55' y='` + start_infos + `' style='font-size:8' text-anchor='middle'>Players:</text>    
    <text x='45' y='` + first_info_txt + `' style='font-size:8' text-anchor='end' data-content='{Binding minplayers}'></text>
    <text x='55' y='` + first_info_txt + `' style='font-size:8' text-anchor='middle'>to</text>
    <text x='65' y='` + first_info_txt + `' style='font-size:8' text-anchor='start' data-content='{Binding maxplayers}'></text>

    <text x='55' y='` + sec_info_title + `' style='font-size:8' text-anchor='middle'>Playtime (in mins):</text>    
    <text x='45' y='` + sec_info_txt + `' style='font-size:8' text-anchor='end' data-content='{Binding minplaytime}'></text>
    <text x='55' y='` + sec_info_txt + `' style='font-size:8' text-anchor='middle'>to</text>
    <text x='65' y='` + sec_info_txt + `' style='font-size:8' text-anchor='start' data-content='{Binding maxplaytime}'></text>
    `

    const gameNodeStyleSVG = new StringTemplateNodeStyle(circles + nodeStyle)

    const gameNode = graph.createNode(null, gameShape, gameNodeStyleSVG, game)

    const nodeLabelStyle = new DefaultLabelStyle({ // NODELABELSTYLE
      wrapping: TextWrapping.WORD, // TEXT-WRAPPING PER WORD
      font: new Font('Tahoma', 8, FontStyle.INHERIT, FontWeight.BOLD), // FONT-STYLING
      textFill: 'rgb(0, 0, 0)', // TEXT-COLOR
      verticalTextAlignment: VerticalTextAlignment.TOP, // VERTICAL TEXT ALIGNMENT
      // verticalTextAlignment: VerticalTextAlignment.CENTER, // VERTICAL TEXT ALIGNMENT
      horizontalTextAlignment: HorizontalTextAlignment.CENTER, // HORIZONTAL TEXT ALIGNMENT
      clipText: false, // CLIPS TEXT IF IT DOESN'T FIT

      // textWrappingShape: 'ellipse',
      // textWrappingPadding: 1,
      // insets: [0, 0, 0, 10] 
      // insets stehen als left, top, right, bot in der doku, ist aber glaub eigentlich TOP, RIGHT, BOT, LEFT
      // VerticalTextAlignment.TOP 
      // insets: [10, 0, 0, 10] 
      insets: [16, 6, 0, 16] // BEST
      // VerticalTextAlignment.CENTER
      // insets: [10, 0, 80, 10]
    })


    const labelModel = new InteriorStretchLabelModel({ insets: 50 }) // STRETCHES LABEL INTO SPACE WITH *insets* PADDING
    const labelParameter = labelModel.createParameter(InteriorStretchLabelModelPosition.CENTER)


    // graph.addLabel({ owner: node, text: 'A Label', preferredSize: new Size(100, 15) })

    // graph.addLabel(gameNode, game.title, centerParameter, nodeLabelStyle) // ADDS LABEL
    graph.addLabel(gameNode, game.title, InteriorStretchLabelModel.CENTER, nodeLabelStyle)
    nodeMap.set(game.id, gameNode)
  }
  return nodeMap
}