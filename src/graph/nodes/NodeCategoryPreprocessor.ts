import { DefaultGraph, IListEnumerable, INode, StringTemplateNodeStyle } from 'yfiles'
import { Designer, Game } from '../../types/Game'

export function preprocessNodeCategories(games: Game[], rank_limit: number)
{
    for (const game of games)
    {
        if(game.rank > rank_limit)
        {
            continue;
        }
        for (const game_category of game.types.categories)
        {
            // update Categories here
            switch (game_category)
            {
                //case value:
                //    break;
            
                default:
                    break;
            }
        }
    }
}