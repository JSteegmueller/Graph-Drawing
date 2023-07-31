import {
  Color,
  DefaultLabelStyle,
  Font,
  FontStyle,
  FontWeight,
  HorizontalTextAlignment,
  StringTemplateNodeStyle,
  TextWrapping,
  VerticalTextAlignment
} from 'yfiles'
import { Game } from '../../types/Game'
import getColorForCategory from '../helper/getColorForCategory'
import getIconForCategory from '../helper/getIconForCategory'


export function getNodeStyle(game: Game, amountOfGames: number, rank_limit: number) {

  const house_color_bright = '#FEFAE0'
  const house_color_dark = '#E1CDAC'
  const roof_color = '#BF0603'
  const dark_color = '#001427'
  const semi_dark_color = '#B19E7B'
 
  const amountOfCategories = game.types.categories.length
 
  const categorieWindows = [
    `<g transform='translate(145,85) scale(0.3 0.4)'>
      <polygon points='100,125, 50,150 50,50 100,25 ' `,
    `<g transform='translate(166,71) scale(0.3 0.4)'>
      <polygon points='100,125, 50,150 50,50 100,25 '`,
    `<g transform='translate(187,57) scale(0.3 0.4)'>
      <polygon points='100,125, 50,150 50,50 100,25 '`,
    `<g transform='translate(145,130) scale(0.3 0.4)'>
      <polygon points='100,125, 50,150 50,50 100,25 '`,
    `<g transform='translate(166,116) scale(0.3 0.4)'>
      <polygon points='100,125, 50,150 50,50 100,25 '`,
    `<g transform='translate(187,102) scale(0.3 0.4)'>
      <polygon points='100,125, 50,150 50,50 100,25 '`,
    `<g transform='translate(145,175) scale(0.3 0.4)'>
      <polygon points='100,125, 50,150 50,50 100,25 '`,
    `<g transform='translate(166,161) scale(0.3 0.4)'>
      <polygon points='100,125, 50,150 50,50 100,25 '`,
    `<g transform='translate(187,147) scale(0.3 0.4)'>
      <polygon points='100,125, 50,150 50,50 100,25 '`
  ]

  const icon_scale1 = 0.3
  const icon_scale2 = 0.3

  const categorieIcons = [ 
    `<g transform='translate(160,110) scale(`+icon_scale1+` `+icon_scale2+`)'>`,
    `<g transform='translate(190,87) scale(`+icon_scale1+` `+icon_scale2+`)'>`,
    `<g transform='translate(160,150) scale(`+icon_scale1+` `+icon_scale2+`)'>`,
    `<g transform='translate(190,132) scale(`+icon_scale1+` `+icon_scale2+`)'>`,
    `<g transform='translate(160,190) scale(`+icon_scale1+` `+icon_scale2+`)'>`,
    `<g transform='translate(190,170) scale(`+icon_scale1+` `+icon_scale2+`)'>`
  ]


  let windows = ``
  for (let c = 0; c < amountOfCategories; c++) {
    let colorOfCategory = colorToString(getColorForCategory(game.types.categories[c].id))
    windows = windows + categorieWindows[c] + ` fill= ${colorOfCategory}/>
      <polygon points='100,125, 50,150 50,50 100,25 ' stroke='#000000' stroke-width='4' fill='none'/>
      <polygon points='75,136, 75,37 ' stroke='#000000' stroke-width='4' fill='none'/>
      <polygon points='100,80, 50,105 ' stroke='#000000' stroke-width='4' fill='none'/>
      </g>`
  }

  let icons = ``
  for (let c = 0; c < amountOfCategories; c++) {
    let icon = getIconForCategory(game.types.categories[c].id)
    icons = icons + categorieIcons[c] + icon+`</g>`
  }

  const amountPeople = [
    `<g transform='translate(-7 211) scale(0.4 0.4)'>`,
    `<g transform='translate(14 211) scale(0.4 0.4)'>`,
    `<g transform='translate(35 211) scale(0.4 0.4)'>`,
    `<g transform='translate(56 211) scale(0.4 0.4)'>`,
    `<g transform='translate(77 211) scale(0.4 0.4)'>`,
    `<g transform='translate(98 211) scale(0.4 0.4)'>`,
    `<g transform='translate(119 211) scale(0.4 0.4)'>`
  ]

  let people = ``
  for (let p = 0; p < game.minplayers; p++) {

    people = people + amountPeople[p]
      + `<g transform='translate(-1166 -158) scale(1 1)'>
      <path fill='` + dark_color + `' d='M1222 169C1222 173.418 1218.42 177 1214 177 1209.58 177 1206 173.418 1206 169 1206 164.582 1209.58 161 1214 161 1218.42 161 1222 164.582 1222 169Z'/>
      <path fill='` + dark_color + `' d='M1235.8 210.2 1230.2 186.4C1230 185.6 1229.6 184.8 1229 184.2 1226.6 182.2 1223.8 180.8 1220.6 179.8 1218.4 179.4 1216.2 179 1214 179 1211.8 179 1209.6 179.4 1207.4 180 1204.2 180.8 1201.4 182.4 1199 184.4 1198.4 185 1198 185.8 1197.8 186.6L1192.2 210.4C1192.2 210.6 1192 211 1192 211.4 1192 213.6 1193.8 215.4 1196 215.4 1197.8 215.4 1199.4 214 1199.8 212.4L1204 195 1204 251 1212 251 1212 215 1216 215 1216 251 1224 251 1224 194.8 1228.2 212.2C1228.6 213.8 1230.2 215.2 1232 215.2 1234.2 215.2 1236 213.4 1236 211.2 1236 210.8 1235.8 210.4 1235.8 210.2Z'/>
      </g></g>`
  }
  for (let p = game.minplayers; p < game.maxplayers; p++) {

    people = people + amountPeople[p]
      + `<g transform='translate(-1166 -158) scale(1 1)'>
      <path fill='` + semi_dark_color + `' d='M1222 169C1222 173.418 1218.42 177 1214 177 1209.58 177 1206 173.418 1206 169 1206 164.582 1209.58 161 1214 161 1218.42 161 1222 164.582 1222 169Z'/>
      <path fill='` + semi_dark_color + `' d='M1235.8 210.2 1230.2 186.4C1230 185.6 1229.6 184.8 1229 184.2 1226.6 182.2 1223.8 180.8 1220.6 179.8 1218.4 179.4 1216.2 179 1214 179 1211.8 179 1209.6 179.4 1207.4 180 1204.2 180.8 1201.4 182.4 1199 184.4 1198.4 185 1198 185.8 1197.8 186.6L1192.2 210.4C1192.2 210.6 1192 211 1192 211.4 1192 213.6 1193.8 215.4 1196 215.4 1197.8 215.4 1199.4 214 1199.8 212.4L1204 195 1204 251 1212 251 1212 215 1216 215 1216 251 1224 251 1224 194.8 1228.2 212.2C1228.6 213.8 1230.2 215.2 1232 215.2 1234.2 215.2 1236 213.4 1236 211.2 1236 210.8 1235.8 210.4 1235.8 210.2Z'/>
      </g></g>`
  }

  let clock_txt
  let clock_y = 0

  const t_first = 115
  const t_sec = 140
  const t_third = 165

  const c_first = t_first + 35
  const c_sec = t_sec + 20
  const c_third = t_third + 12

  let tc = ''
  const titlestuff = `style='font-size:17;' fill='`+dark_color+`' font-family="Bahnschrift" text-anchor='middle' font-weight="bold">`

  if (game.title === 'Twilight Imperium: Fourth Edition'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Twilight Imperium: </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Fourth Edition </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Gloomhaven') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Gloomhaven </text>`
    clock_y = c_first
  }
  else if (game.title === 'Brass: Birmingham') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Brass: Birmingham </text>`
    clock_y = c_first
  }
  else if (game.title === 'Pandemic Legacy: Season 1'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Pandemic Legacy: </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Season 1 </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Ark Nova') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Ark Nova </text>`
    clock_y = c_first
  }
  else if (game.title === 'Terraforming Mars'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Terraforming </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Mars </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Gloomhaven: Jaws of the Lion'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Gloomhaven: </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Jaws of the Lion </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Star Wars: Rebellion'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Star Wars: </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Rebellion </text>`
    clock_y = c_sec
  }
  else if (game.title === 'War of the Ring: Second Edition'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` War of the Ring: </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Second Edition </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Spirit Island') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Spirit Island </text>`
    clock_y = c_first
  }
  else if (game.title === 'Gaia Project') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Gaia Project </text>`
    clock_y = c_first
  }
  else if (game.title === 'Dune: Imperium') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Dune: Imperium </text>`
    clock_y = c_first
  }
  else if (game.title === 'Through the Ages: A New Story of Civilization'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Through the Ages:  </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` A New Story </text>
    <text x='74' y='` + t_third + `' `+ titlestuff +` of Civilization </text>`
    clock_y = c_third
  }
  else if (game.title === 'Twilight Struggle') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Twilight Struggle </text>`
    clock_y = c_first
  }
  else if (game.title === 'Great Western Trail'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Great Western </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Trail </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Scythe') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Scythe </text>`
    clock_y = c_first
  }
  else if (game.title === 'The Castles of Burgundy'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` The Castles of </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Burgundy </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Nemesis') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Nemesis </text>`
    clock_y = c_first
  }
  else if (game.title === '7 Wonders Duel') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` 7 Wonders Duel </text>`
    clock_y = c_first
  }
  else if (game.title === 'Brass: Lancashire') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Brass: Lancashire </text>`
    clock_y = c_first
  }
  else if (game.title === 'Concordia') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Concordia </text>`
    clock_y = c_first
  }
  else if (game.title === 'A Feast for Odin') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` A Feast for Odin </text>`
    clock_y = c_first
  }
  else if (game.title === 'Eclipse: Second Dawn for the Galaxy'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Eclipse: </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Second Dawn </text>
    <text x='74' y='` + t_third + `' `+ titlestuff +` for the Galaxy </text>`
    clock_y = c_third
  }
  else if (game.title === 'Terra Mystica') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Terra Mystica </text>`
    clock_y = c_first
  }
  else if (game.title === 'Wingspan') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Wingspan </text>`
    clock_y = c_first
  }
  else if (game.title === 'Clank!: Legacy \u2013 Acquisitions Incorporated'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Clank!: Legacy \u2013 </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Acquisitions </text>
    <text x='74' y='` + t_third + `' `+ titlestuff +` Incorporated </text>`
    clock_y = c_third
  }
  else if (game.title === 'Arkham Horror: The Card Game'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Arkham Horror: </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` The Card Game </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Root') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Root </text>`
    clock_y = c_first
  }
  else if (game.title === 'Lost Ruins of Arnak') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Lost Ruins </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` of Arnak </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Orl\u00e9ans') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Orl\u00e9ans </text>`
    clock_y = c_first
  }
  else if (game.title === 'Everdell') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Everdell </text>`
    clock_y = c_first
  }
  else if (game.title === 'Viticulture Essential Edition'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Viticulture </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Essential Edition </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Mage Knight Board Game'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Mage Knight </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Board Game </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Barrage') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Barrage </text>`
    clock_y = c_first
  }
  else if (game.title === 'Food Chain Magnate') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Food Chain </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Magnate </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Marvel Champions: The Card Game'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Marvel Champions: </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` The Card Game </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Too Many Bones') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Too Many Bones </text>`
    clock_y = c_first
  }
  else if (game.title === 'The Crew: Mission Deep Sea'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` The Crew: </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` Mission Deep Sea </text>`
    clock_y = c_sec
  }
  else if (game.title === 'Puerto Rico') {
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Puerto Rico </text>`
    clock_y = c_first
  }
  else if (game.title === 'Caverna: The Cave Farmers'){
    tc = `<text x='74' y='` + t_first + `' `+ titlestuff +` Caverna: </text>
    <text x='74' y='` + t_sec + `' `+ titlestuff +` The Cave Farmers </text>`
    clock_y = c_sec
  }
  
  clock_txt = clock_y + 30
  let housing = `
    <g transform='translate(17, -35) scale(0.8 0.8)'>
      <polygon points='78,41 0,100, 0,250  150,250 150,100 ' stroke='` + house_color_bright + `' fill='` + house_color_bright + `'/>
      <polygon points='150,250 150,100 225,55, 225,200 ' stroke='` + house_color_dark + `' fill='` + house_color_dark + `'/>
      <polygon points='231,55, 155,105 75,40 150,-5' fill='` + roof_color + `'/>
      <polygon points='231,55, 155,10 ' fill='` + roof_color + `'/>
      <polygon points='77,40, -3,101 ' stroke='` + roof_color + `' stroke-width='3' fill='none'/>

      <rect x = '-30' y='185' width='40' height='25' rx='3' fill='` + dark_color + `'/>
      <rect x = '-12' y='185' width='4' height='70' fill='` + dark_color + `'/>
      <text x='-10' y='202' font-size='15' text-anchor='middle' stroke='white'  fill='white' stroke-width='0.75px' stroke-linejoin='round' data-content='{Binding rank}'></text> 
      
      <g transform='translate(68,` + clock_y + `) scale(0.8 0.87)'>
        <path fill='`+dark_color+`' d='M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z'/> 
        <path fill='`+dark_color+`' d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z'/> 
      </g>` 
      + tc

  if (game.minplaytime === game.maxplaytime){
    housing = housing + `<text x='74' y='` + clock_txt + `' style='font-size:13' fill='`+dark_color+`' font-family="Bahnschrift" text-anchor='middle' font-weight="lighter" data-content='{Binding maxplaytime}'></text>`
  }
  else {
    housing = housing +
    `<text x='69' y='` + clock_txt + `' style='font-size:13' fill='`+dark_color+`' font-family="Bahnschrift" text-anchor='end' font-weight="lighter" data-content='{Binding minplaytime}'></text>
    <text x='74' y='` + clock_txt + `' style='font-size:13' fill='`+dark_color+`' font-family="Bahnschrift" text-anchor='middle' font-weight="lighter">-</text>
    <text x='79' y='` + clock_txt + `' style='font-size:13' fill='`+dark_color+`' font-family="Bahnschrift" text-anchor='start' font-weight="lighter" data-content='{Binding maxplaytime}'></text>`
  }

  const hut = `
    <g transform='translate(17, 0) scale(0.5 0.5)'>
      <polygon points='75,40 0,100, 0,175  150,175 150,100 ' stroke='` + house_color_bright + `' fill='` + house_color_bright + `'/>
      <polygon points='150,175 150,100 225,50, 225,125 ' stroke='` + house_color_dark + `' fill='` + house_color_dark + `'/>
      <polygon points='231,55, 155,105 75,40 150,-5' fill='` + roof_color + `'/>
      <polygon points='231,55, 155,10 ' fill='` + roof_color + `'/>
      <polygon points='77,40, -3,101 ' stroke='` + roof_color + `' stroke-width='3' fill='none'/>
      
      <rect x = '-30' y='110' width='40' height='25' rx='3' fill='` + dark_color + `'/>
      <rect x = '-12' y='110' width='4' height='70' fill='` + dark_color + `'/>
      <text x='-10' y='127' font-size='15' text-anchor='middle' stroke='white'  fill='white' stroke-width='0.75px' stroke-linejoin='round' data-content='{Binding rank}'></text> 
      `

  let gameNodeStyleSVG
  let nodeLabelStyle
  if (game.rank <= rank_limit) {
    gameNodeStyleSVG = (housing + people + icons + `</g>`)

    nodeLabelStyle = new DefaultLabelStyle({ // NODELABELSTYLE
      wrapping: TextWrapping.WORD, // TEXT-WRAPPING PER WORD
      // font: new Font('Tahoma', 8, FontStyle.INHERIT, FontWeight.BOLD), // FONT-STYLING
      font: new Font('Tahoma', 12, FontStyle.INHERIT, FontWeight.BOLD), // FONT-STYLING
      textFill: 'rgb(0, 0, 0)', // TEXT-COLOR
      verticalTextAlignment: VerticalTextAlignment.CENTER, // VERTICAL TEXT ALIGNMENT
      // verticalTextAlignment: VerticalTextAlignment.CENTER, // VERTICAL TEXT ALIGNMENT
      horizontalTextAlignment: HorizontalTextAlignment.CENTER, // HORIZONTAL TEXT ALIGNMENT
      clipText: false, // CLIPS TEXT IF IT DOESN'T FIT
      // maximumSize: funktioniert nicht? 
      
      // textWrappingShape: 'ellipse',
      // textWrappingPadding: 1,
      // insets: [0, 0, 0, 10]
      // insets stehen als left, top, right, bot in der doku, ist aber glaub eigentlich TOP, RIGHT, BOT, LEFT
      // VerticalTextAlignment.TOP
      // insets: [10, 0, 0, 10]
      // insets: [16, 6, 0, 16] // BEST
      // insets: [16, 8, 0, 17] // OLD BEST
      // insets: [42, -10, 0, 25] // NEW 
      // VerticalTextAlignment.CENTER
      insets: [30, 0, 0, 20]
    })
  } else {
    gameNodeStyleSVG = (hut + `</g>`)

    nodeLabelStyle = new DefaultLabelStyle({ // NODELABELSTYLE
      wrapping: TextWrapping.WORD, // TEXT-WRAPPING PER WORD
      font: new Font('Tahoma', 6, FontStyle.INHERIT, FontWeight.BOLD), // FONT-STYLING
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
      // insets: [48, 8, 0, 17] // OLD BEST
      insets: [60, 20, 0, 30] // OLD BEST
      // VerticalTextAlignment.CENTER
      // insets: [10, 0, 80, 10]
    })
  }
  let gameNodeStyleSVGStringTemplate = new StringTemplateNodeStyle(gameNodeStyleSVG)
  return { gameNodeStyleSVGStringTemplate, nodeLabelStyle, gameNodeStyleSVG }
}

function colorToString(color: Color) {
  return `"rgb(` + color.r + `, ` + color.g + `, ` + color.b + `)"`
}