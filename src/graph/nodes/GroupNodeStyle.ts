import { Game } from '../../types/Game'
import {IListEnumerable, INode, StringTemplateNodeStyle } from 'yfiles'

export function getGroupNodeStyle(groupGame: Game, containedGames:  IListEnumerable<INode>) {
  let groupNodeStyleSVG = new StringTemplateNodeStyle('')

  return groupNodeStyleSVG
}