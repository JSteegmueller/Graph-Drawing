import { DefaultGraph, INode, InteriorStretchLabelModel, Rect } from 'yfiles'
import { Game } from '../../types/Game'
import { getNodeStyle } from './NodeStyle'
import { preprocessNodeCategories } from './NodeCategoryPreprocessor'


export function createNodes(graph: DefaultGraph, games: Game[]): Map<number, INode> {

  const rank_limit = 40
  let preprocessed_games = preprocessNodeCategories(games, rank_limit)

  const gameShape = new Rect(0, 0, 100, 100)
  const nodeMap = new Map<number, INode>()
  const amountOfGames = games.length

  for (const game of games) {
    let { gameNodeStyleSVGStringTemplate, nodeLabelStyle, gameNodeStyleSVG } = getNodeStyle(game, amountOfGames, rank_limit)

    const gameNode = graph.createNode(null, gameShape, gameNodeStyleSVGStringTemplate, game)

    const labelModel = new InteriorStretchLabelModel({ insets: 50 }) // STRETCHES LABEL INTO SPACE WITH *insets* PADDING
    //const labelParameter = labelModel.createParameter(InteriorStretchLabelModelPosition.CENTER)

    // graph.addLabel({ owner: node, text: 'A Label', preferredSize: new Size(100, 15) })

    // graph.addLabel(gameNode, game.title, centerParameter, nodeLabelStyle) // ADDS LABEL
    graph.addLabel(gameNode, game.title, InteriorStretchLabelModel.CENTER, nodeLabelStyle)
    nodeMap.set(game.id, gameNode)
  }
  return nodeMap
}