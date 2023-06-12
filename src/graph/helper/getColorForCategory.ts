import { Color } from 'yfiles'

const categories = new Map<number, Color>([
  [1022, Color.ORANGE], // Adventure
  [1020, Color.GREEN], // Exploration
  [1010, Color.AQUA], // Fantasy
  [1046, Color.AZURE], // Fighting
  [1047, Color.BLUE_VIOLET], // Miniatures
  [1015, Color.BURLY_WOOD], //Civilization
  [1021, Color.THISTLE], // Economic
  [1026, Color.CORAL], // Negotiation
  [1001, Color.DARK_BLUE], // Political
  [1016, Color.DEEP_SKY_BLUE], // Si-Fi
  [1113, Color.CHOCOLATE], // Space Exploration
  [1019, Color.DARK_CYAN], // War Game
  [1088, Color.SLATE_GRAY], // Industry / Manufacturing
  [2710, Color.DARK_SALMON], // Post Napoleonic
  [1011, Color.GOLD], // Transportation
  [1084, Color.INDIGO], // Environmental
  [2145, Color.GAINSBORO], // Medical
  [1089, Color.GRAY], // Animals
  [1086, Color.FIREBRICK], // Territory Building
  [1102, Color.GAINSBORO], // Civil War
  [1064, Color.BISQUE], // Movie / TV / Radio Theme
  [1093, Color.CADET_BLUE], // Novel Based
  [1082, Color.CORNFLOWER_BLUE], // Mythology
  [1002, Color.HOT_PINK], // Card Game
  [1069, Color.FUCHSIA], // Modern Warfare
  [1055, Color.DEEP_PINK], // American West
  [1017, Color.DODGER_BLUE], // Dice
  [1035, Color.IVORY], // Medieval
  [1024, Color.LAVENDER_BLUSH], // Horror
  [1050, Color.LIME], // Ancient
  [1029, Color.YELLOW_GREEN], // City Building
  [1008, Color.ALICE_BLUE], // Nautical
  [1013, Color.LAWN_GREEN], // Farming
  [1028, Color.FOREST_GREEN], // Puzzle
  [1094, Color.GOLDENROD], // Educational
  [1044, Color.MAROON], // Collectible Components
  [1020, Color.BROWN], // Exploration
  [1097, Color.STEEL_BLUE], // Travel
  [1115, Color.TAN], // Religious
  [1116, Color.SKY_BLUE], // Comic Books / Strip
  [1081, Color.CHARTREUSE], // Spy / Secret Agent
  [1040, Color.MAROON], // Murder / Mystery
  [1090, Color.TOMATO], // Pirates
  [1032, Color.SPRING_GREEN], // Action / Dexterity
  [1118, Color.SNOW], // Mature / Adult
  [1101, Color.TEAL], // Video Game Theme
  [1023, Color.RED], // Bluffing
  [1009, Color.DODGER_BLUE], // Abstract Strategy
  [1070, Color.PAPAYA_WHIP], // Renaissance
  [1052, Color.OLIVE], // Arabian
  [1036, Color.WHITE_SMOKE], // Prehistoric
  [1039, Color.MISTY_ROSE] // Deduction
])

export default function getColorForCategory(categoryId: number): Color {
  const color = categories.get(categoryId)
  return color ?? Color.BLACK
}