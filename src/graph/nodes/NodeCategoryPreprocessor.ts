import { ArrowEdgeStyle, DefaultGraph, IListEnumerable, INode, StringTemplateNodeStyle } from 'yfiles'
import { Designer, Types, Game } from '../../types/Game'

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
            const new_category_name_adventure = "Adventure", new_category_id_adventure = 4
            const new_category_name_science_fiction = "Science Fiction", new_category_id_science_fiction = 5
            const new_category_name_fantasy = "Fantasy", new_category_id_fantasy = 6
            const new_category_name_miniature_figures = "Miniature Figures", new_category_id_miniature_figures = 7
            const new_category_name_pop_culture = "Pop Culture", new_category_id_pop_culture = 8
            // update Categories here
            switch (game_category.id)
            {
                // ################### CATEGORY RENAMES ################### 
                // ################### War ################### 
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

                // ################### Building ###################
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

                // ################### Economic ###################
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

                // ################### Adventure ###################
                // Adventure
                case 1022:
                    game_category.id = new_category_id_adventure
                    game_category.name = new_category_name_adventure
                    break;
                    
                // Exploration
                case 1020:
                    game_category.id = new_category_id_adventure
                    game_category.name = new_category_name_adventure
                    break;

                // ################### Science Fiction ###################
                // Space Exploration
                case 1113:
                    game_category.id = new_category_id_science_fiction
                    game_category.name = new_category_name_science_fiction
                    break;
                    
                // Science Fiction
                case 1016:
                    game_category.id = new_category_id_science_fiction
                    game_category.name = new_category_name_science_fiction
                    break;

                // ################### Fantasy ###################
                // Fantasy
                case 1010:
                    game_category.id = new_category_id_fantasy
                    game_category.name = new_category_name_fantasy
                    break;
                    
                // Mythology
                case 1082:
                    game_category.id = new_category_id_fantasy
                    game_category.name = new_category_name_fantasy
                    break;

                // ################### Miniature Figures ###################
                // Miniatures
                case 1047:
                    game_category.id = new_category_id_miniature_figures
                    game_category.name = new_category_name_miniature_figures
                    break;
                    
                // ################### Pop Culture ###################
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
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1040)
                    break;

                // Pirates
                case 1090:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1090)
                    break;
                
                // Post Napoleonic
                case 2710:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 2710)
                    break;

                // Arabian
                case 1052:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1052)
                    break;

                // Renaissance
                case 1070:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1070)
                    break;

                // Prehistoric
                case 1036:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1036)
                    break;
            
                // Negotiation
                case 1026:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1026)
                    break;

                // Political
                case 1001:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1001)
                    break;

                // Abstract Strategy
                case 1009:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1009)
                    break;
                
                // Travel
                case 1097:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1097)
                    break;

                // Nautrical
                case 1008:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1008)
                    break;
                
                // Action / Dexterity
                case 1032:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1032)
                    break;
                
                // Collectible Components
                case 1044:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1044)
                    break;
                
                // Puzzle
                case 1028:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1028)
                    break;

                // Bluffing
                case 1023:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1023)
                    break;
                
                // Deduction
                case 1039:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1039)
                    break;

                // Reilgious
                case 1115:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1115)
                    break;

                // Spies / Secret Agent
                case 1081:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1081)
                    break;

                // Mature / Adult
                case 1118:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1118)
                    break;
                
                // Video Game Theme
                case 1101:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1101)
                    break;

                // Miniatures
                case 1047:
                    game.types.categories = game.types.categories.filter(cat => cat.id !== 1047)
                    break;

                // default case, shouldnt be reached.
                default:
                    console.log("default case reached")
                    break;
            }
        }
    }
    for (const game of games)
    {
        if(game.rank > rank_limit)
        {
            continue;
        }
        for (const game_category of game.types.categories)
        {
            // search array up to self, drop self if found duplicate (this way first element is always kept
            // -> dont need to update array after each iteration)
            game.types.categories = game.types.categories.filter(function(item, pos, array)
            {
                let exists = false
                let i = 0
                while(i<=pos)
                {
                    const entry = array[i]
                    if(item.id == entry.id)
                    {
                        if (exists == false)
                        {
                            exists = true
                        }
                        else
                        {
                            return false;
                        }
                    }
                    i++
                }
                return true;
            })
        }
    }
}