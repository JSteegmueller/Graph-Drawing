import { DefaultGraph, IListEnumerable, INode, StringTemplateNodeStyle } from 'yfiles'
import { Designer, Game } from '../../types/Game'

export function findUsedCategories(graph: DefaultGraph)
{
    const rank_limit = 40
    let categories: string[] = []
    for (const node of graph.nodes)
    {
        if(graph.isGroupNode(node))
        {
            continue;
        }
        const game = node.tag as Game
        if(game.title != "Terraforming Mars")
        {
            continue;
        }
        for (const game_category of game.types.categories)
        {
            let is_in_list = false
            for (const category of categories)
            {
                
                if(category == game_category.name)
                {
                    is_in_list = true
                }
            }
            if(is_in_list == false)
            {
                categories.push(game_category.name)
            }
        }
    }
    for (const category of categories)
    {
        console.log(category)
    }
    console.log(categories.length)
}