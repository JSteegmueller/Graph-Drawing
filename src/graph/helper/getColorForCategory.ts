import { Fill } from 'yfiles'

const categories = new Map<number, Fill>([
  [1022, Fill.ORANGE], // Adventure
  [1020, Fill.GREEN], // Exploration
  [1010, Fill.AQUA], // Fantasy
  [1046, Fill.AZURE], // Fighting
  [1047, Fill.BLUE_VIOLET], // Miniatures
  [1015, Fill.BURLY_WOOD], //Civilization
  [1021, Fill.THISTLE], // Economic
  [1026, Fill.CORAL], // Negotiation
  [1001, Fill.DARK_BLUE], // Political
  [1016, Fill.DEEP_SKY_BLUE], // Si-Fi
  [1113, Fill.CHOCOLATE], // Space Exploration
  [1019, Fill.DARK_CYAN], // War Game
  [1088, Fill.SLATE_GRAY], // Industry / Manufacturing
  [2710, Fill.DARK_SALMON], // Post Napoleonic
  [1011, Fill.GOLD], // Transportation
  [1084, Fill.INDIGO], // Environmental
  [2145, Fill.GAINSBORO], // Medical
  [1089, Fill.GRAY], // Animals
  [1086, Fill.FIREBRICK], // Territory Building
  [1102, Fill.GAINSBORO], // Civil War
  [1064, Fill.BISQUE], // Movie / TV / Radio Theme
  [1093, Fill.CADET_BLUE], // Novel Based
  [1082, Fill.CORNFLOWER_BLUE], // Mythology
  [1002, Fill.HOT_PINK], // Card Game
  [1069, Fill.FUCHSIA], // Modern Warfare
  [1055, Fill.DEEP_PINK], // American West
  [1017, Fill.DODGER_BLUE], // Dice
  [1035, Fill.IVORY], // Medieval
  [1024, Fill.LAVENDER_BLUSH], // Horror
  [1050, Fill.LIME], // Ancient
  [1029, Fill.YELLOW_GREEN], // City Building
  [1008, Fill.ALICE_BLUE], // Nautical
  [1013, Fill.LAWN_GREEN], // Farming
  [1028, Fill.FOREST_GREEN], // Puzzle
  [1094, Fill.GOLDENROD], // Educational
  [1044, Fill.MAROON], // Collectible Components
  [1020, Fill.BROWN], // Exploration
  [1097, Fill.STEEL_BLUE], // Travel
  [1115, Fill.TAN], // Religious
  [1116, Fill.SKY_BLUE], // Comic Books / Strip
  [1081, Fill.CHARTREUSE], // Spy / Secret Agent
  [1040, Fill.MAROON], // Murder / Mystery
  [1090, Fill.TOMATO], // Pirates
  [1032, Fill.SPRING_GREEN], // Action / Dexterity
  [1118, Fill.SNOW], // Mature / Adult
  [1101, Fill.TEAL], // Video Game Theme
  [1023, Fill.RED], // Bluffing
  [1009, Fill.DODGER_BLUE], // Abstract Strategy
  [1070, Fill.PAPAYA_WHIP], // Renaissance
  [1052, Fill.OLIVE], // Arabian
  [1036, Fill.WHITE_SMOKE], // Prehistoric
  [1039, Fill.MISTY_ROSE] // Deduction
])

export default function getColorForCategory(categoryId: number): Fill {
  const color = categories.get(categoryId)
  return color ?? Fill.BLACK
}