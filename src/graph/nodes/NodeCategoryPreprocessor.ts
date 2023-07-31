import { ArrowEdgeStyle, DefaultGraph, IListEnumerable, INode, StringTemplateNodeStyle } from 'yfiles'
import { Designer, Types, Game } from '../../types/Game'


function filterInPlace(arr : Designer[], id_to_filter : number)
{
    let i = 0, j = 0;
    while (i < arr.length)
    {
      const val = arr[i];
      if (val.id !== id_to_filter) arr[j++] = val;
      i++;
    }
  
    arr.length = j;
    return arr;
}

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
            const new_category_name_war = "War", new_category_id_war = 1
            const new_category_name_building = "Building", new_category_id_building = 2
            const new_category_name_economic = "Economic", new_category_id_economic = 3
            const new_category_name_pop_culture = "Pop-Culture", new_category_id_pop_culture = 4
            // update Categories here
            switch (game_category.id)
            {
                // ################### CATEGORY RENAMES ################### 
                // Wargame
                case 1019:
                    
                    game_category.id = new_category_id_war
                    game_category.name = new_category_name_war
                    break;
                
                // Civil War
                case 1102:
                    game_category.id = new_category_id_war
                    game_category.name = new_category_name_war
                    break;

                // Modern Warfare
                case 1069:
                    game_category.id = new_category_id_war
                    game_category.name = new_category_name_war
                    break;

                // Territory Building
                case 1086:
                    game_category.id = new_category_id_building
                    game_category.name = new_category_name_building
                    break;

                // City Building
                case 1029:
                    game_category.id = new_category_id_building
                    game_category.name = new_category_name_building
                    break;

                // Economic
                case 1021:
                    game_category.id = new_category_id_economic
                    game_category.name = new_category_name_economic
                    break;

                // Industry / Manufacturing
                case 1088:
                    game_category.id = new_category_id_economic
                    game_category.name = new_category_name_economic
                    break;

                // Transportation
                case 1011:
                    game_category.id = new_category_id_economic
                    game_category.name = new_category_name_economic
                    break;

                // Comic Book / Strip
                case 1116:
                    game_category.id = new_category_id_pop_culture
                    game_category.name = new_category_name_pop_culture
                    break;

                // Movie / TV / Radio Theme
                case 1064:
                    game_category.id = new_category_id_pop_culture
                    game_category.name = new_category_name_pop_culture
                    break;

                // Novel Based
                case 1093:
                    game_category.id = new_category_id_pop_culture
                    game_category.name = new_category_name_pop_culture
                    break;
                // ################### CATEGORY DELETIONS ################### 
                
                // Murder / Mystery
                case 1040:
                    filterInPlace(game.types.categories ,1040)
                    break;

                // Pirates
                case 1090:
                    filterInPlace(game.types.categories ,1090)
                    break;
                
                // Post Napoleonic
                case 2710:
                    filterInPlace(game.types.categories ,2710)
                    break;

                // Arabian
                case 1052:
                    filterInPlace(game.types.categories ,1052)
                    break;

                // Renaissance
                case 1070:
                    filterInPlace(game.types.categories ,1070)
                    break;

                // Prehistoric
                case 1036:
                    filterInPlace(game.types.categories ,1036)
                    break;
            
                // Negotiation
                case 1026:
                    filterInPlace(game.types.categories ,1026)
                    break;

                // Political
                case 1001:
                    filterInPlace(game.types.categories ,1001)
                    break;

                // Abstract Strategy
                case 1009:
                    filterInPlace(game.types.categories ,1009)
                    break;
                
                // Travel
                case 1097:
                    filterInPlace(game.types.categories ,1097)
                    break;

                // Nautrical
                case 1008:
                    filterInPlace(game.types.categories ,1008)
                    break;
                
                // Action / Dexterity
                case 1032:
                    filterInPlace(game.types.categories ,1032)
                    break;
                
                // Collectible Components
                case 1044:
                    filterInPlace(game.types.categories ,1044)
                    break;
                
                // Puzzle
                case 1028:
                    filterInPlace(game.types.categories ,1028)
                    break;

                // Bluffing
                case 1023:
                    filterInPlace(game.types.categories ,1023)
                    break;
                
                // Deduction
                case 1039:
                    filterInPlace(game.types.categories ,1039)
                    break;

                // Reilgious
                case 1115:
                    filterInPlace(game.types.categories ,1115)
                    break;

                // Spies / Secret Agent
                case 1081:
                    filterInPlace(game.types.categories ,1081)
                    break;

                // Mature / Adult
                case 1118:
                    filterInPlace(game.types.categories ,1118)
                    break;
                
                // Video Game Theme
                case 1101:
                    filterInPlace(game.types.categories ,1101)
                    break;

                // Miniatures
                case 1047:
                    filterInPlace(game.types.categories ,1047)
                    break;

                // default case, shouldnt be reached.
                default:
                    console.log("default case reached")
                    break;
            }
        }
    }
}