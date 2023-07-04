import {
  Color,
  DefaultLabelStyle,
  Font,
  FontStyle,
  FontWeight, HorizontalTextAlignment,
  StringTemplateNodeStyle,
  TextWrapping, VerticalTextAlignment
} from 'yfiles'
import { Game } from '../../types/Game'
import getColorForCategory from '../helper/getColorForCategory'


export function getNodeStyle(game: Game, amountOfGames: number)
{
  const rank_limit = 10

  const house_color_bright = "#FEFAE0"
  const house_color_dark = "#E1CDAC"
  const roof_color = "#BF0603"
  const dark_color = "#001427"
  const semi_dark_color = "#B19E7B"

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

  const categorieWindows = [
    `<g transform="translate(145,85) scale(0.3 0.4)">
      <polygon points="100,125, 50,150 50,50 100,25 " `,
    `<g transform="translate(166,71) scale(0.3 0.4)">
      <polygon points="100,125, 50,150 50,50 100,25 "`,
    `<g transform="translate(187,57) scale(0.3 0.4)">
      <polygon points="100,125, 50,150 50,50 100,25 "`,
    `<g transform="translate(145,130) scale(0.3 0.4)">
      <polygon points="100,125, 50,150 50,50 100,25 "`,
    `<g transform="translate(166,116) scale(0.3 0.4)">
      <polygon points="100,125, 50,150 50,50 100,25 "`,
    `<g transform="translate(187,102) scale(0.3 0.4)">
      <polygon points="100,125, 50,150 50,50 100,25 "`,
    `<g transform="translate(145,175) scale(0.3 0.4)">
      <polygon points="100,125, 50,150 50,50 100,25 "`,
    `<g transform="translate(166,161) scale(0.3 0.4)">
      <polygon points="100,125, 50,150 50,50 100,25 "`,
    `<g transform="translate(187,147) scale(0.3 0.4)">
      <polygon points="100,125, 50,150 50,50 100,25 "`
  ]

  let windows = ``
  for (let c = 0; c < amountOfCategories; c++){
    let colorOfCategory = colorToString(getColorForCategory(game.types.categories[c].id))
    windows = windows + categorieWindows[c] + ` fill= ${colorOfCategory}/>
      <polygon points="100,125, 50,150 50,50 100,25 " stroke="#000000" stroke-width="4" fill="none"/>
      <polygon points="75,136, 75,37 " stroke="#000000" stroke-width="4" fill="none"/>
      <polygon points="100,80, 50,105 " stroke="#000000" stroke-width="4" fill="none"/>
      </g>`
  }

  // const amountPeople = [
  //   `<g transform="translate(-10,210) scale(0.3 0.3)">`,
  //   `<g transform="translate(11,210) scale(0.3 0.3)">`,
  //   `<g transform="translate(32,210) scale(0.3 0.3)">`,
  //   `<g transform="translate(53,210) scale(0.3 0.3)">`,
  //   `<g transform="translate(74,210) scale(0.3 0.3)">`,
  //   `<g transform="translate(95,210) scale(0.3 0.3)">`,
  //   `<g transform="translate(116,210) scale(0.3 0.3)">`
  // ]

  // const amountPeople = [
  //   `<g transform="translate(-10,220) scale(0.3 0.3)">`,
  //   `<g transform="translate(11,220) scale(0.3 0.3)">`,
  //   `<g transform="translate(32,220) scale(0.3 0.3)">`,
  //   `<g transform="translate(53,220) scale(0.3 0.3)">`,
  //   `<g transform="translate(74,220) scale(0.3 0.3)">`,
  //   `<g transform="translate(95,220) scale(0.3 0.3)">`,
  //   `<g transform="translate(116,220) scale(0.3 0.3)">`
  // ]

  // power point guy:
  const amountPeople = [
    `<g transform="translate(-7 211) scale(0.4 0.4)">`,
    `<g transform="translate(14 211) scale(0.4 0.4)">`,
    `<g transform="translate(35 211) scale(0.4 0.4)">`,
    `<g transform="translate(56 211) scale(0.4 0.4)">`,
    `<g transform="translate(77 211) scale(0.4 0.4)">`,
    `<g transform="translate(98 211) scale(0.4 0.4)">`,
    `<g transform="translate(119 211) scale(0.4 0.4)">`
  ]

  let people = ``
  for (let p = 0; p < game.minplayers; p++){
    // people = people + amountPeople[p]
    // + `<path fill="`+dark_color+`" d="M52.65,125.2h19.9c3.3,0,6-2.7,6-6V86.301h3.399c3.301,0,6-2.701,6-6V43.2c0-3.3-2.699-6-6-6H43.25c-3.3,0-6,2.7-6,6
    // v37.101c0,3.299,2.7,6,6,6h3.4V119.2C46.65,122.5,49.25,125.2,52.65,125.2z"/>
    // <circle fill="`+dark_color+`" cx="62.55" cy="15.7" r="15.7"/>
    // </g>`

    people = people + amountPeople[p]
      + `<g transform="translate(-1166 -158) scale(1 1)">
      <path fill="`+dark_color+`" d="M1222 169C1222 173.418 1218.42 177 1214 177 1209.58 177 1206 173.418 1206 169 1206 164.582 1209.58 161 1214 161 1218.42 161 1222 164.582 1222 169Z"/>
      <path fill="`+dark_color+`" d="M1235.8 210.2 1230.2 186.4C1230 185.6 1229.6 184.8 1229 184.2 1226.6 182.2 1223.8 180.8 1220.6 179.8 1218.4 179.4 1216.2 179 1214 179 1211.8 179 1209.6 179.4 1207.4 180 1204.2 180.8 1201.4 182.4 1199 184.4 1198.4 185 1198 185.8 1197.8 186.6L1192.2 210.4C1192.2 210.6 1192 211 1192 211.4 1192 213.6 1193.8 215.4 1196 215.4 1197.8 215.4 1199.4 214 1199.8 212.4L1204 195 1204 251 1212 251 1212 215 1216 215 1216 251 1224 251 1224 194.8 1228.2 212.2C1228.6 213.8 1230.2 215.2 1232 215.2 1234.2 215.2 1236 213.4 1236 211.2 1236 210.8 1235.8 210.4 1235.8 210.2Z"/>
      </g></g>`
  }
  for (let p = game.minplayers; p < game.maxplayers; p++){
    // people = people + amountPeople[p]
    // + `<path fill="`+semi_dark_color+`" d="M52.65,125.2h19.9c3.3,0,6-2.7,6-6V86.301h3.399c3.301,0,6-2.701,6-6V43.2c0-3.3-2.699-6-6-6H43.25c-3.3,0-6,2.7-6,6
    // v37.101c0,3.299,2.7,6,6,6h3.4V119.2C46.65,122.5,49.25,125.2,52.65,125.2z"/>
    // <circle fill="`+semi_dark_color+`" cx="62.55" cy="15.7" r="15.7"/>
    // </g>`
    people = people + amountPeople[p]
      + `<g transform="translate(-1166 -158) scale(1 1)">
      <path fill="`+semi_dark_color+`" d="M1222 169C1222 173.418 1218.42 177 1214 177 1209.58 177 1206 173.418 1206 169 1206 164.582 1209.58 161 1214 161 1218.42 161 1222 164.582 1222 169Z"/>
      <path fill="`+semi_dark_color+`" d="M1235.8 210.2 1230.2 186.4C1230 185.6 1229.6 184.8 1229 184.2 1226.6 182.2 1223.8 180.8 1220.6 179.8 1218.4 179.4 1216.2 179 1214 179 1211.8 179 1209.6 179.4 1207.4 180 1204.2 180.8 1201.4 182.4 1199 184.4 1198.4 185 1198 185.8 1197.8 186.6L1192.2 210.4C1192.2 210.6 1192 211 1192 211.4 1192 213.6 1193.8 215.4 1196 215.4 1197.8 215.4 1199.4 214 1199.8 212.4L1204 195 1204 251 1212 251 1212 215 1216 215 1216 251 1224 251 1224 194.8 1228.2 212.2C1228.6 213.8 1230.2 215.2 1232 215.2 1234.2 215.2 1236 213.4 1236 211.2 1236 210.8 1235.8 210.4 1235.8 210.2Z"/>
      </g></g>`
  }


  // loopup title length for every game
  for (let g = 0; g < amountOfGames; g++){
    let titleLength = game.title.length
  }

  // simple title-only version:
  // let nodeStyle = `<circle cx="55" cy="50" r="50" fill="#e9e9ca" />
  // <text x="55" y="58" font-size="16" text-anchor="middle" stroke="#000" data-content='{Binding title}'></text>`
  // let circles = ``

  // titles wrap after 18 characters
  // const first_line_char_limit = 17
  const first_line_char_limit = 15
  var title_extraLines = Math.ceil(game.title.length / first_line_char_limit) - 1
  let start_infos = 40 + title_extraLines * 10

  if(game.title == "Twilight Imperium: Fourth Edition"){ // Wortlängen sind blöd, deshalb hardcoded...
    start_infos = 60
    start_infos = 70
  }
  else if (game.title.length - first_line_char_limit <= 0){
    start_infos = 40
    start_infos = 30
  }
  else if (game.title.length - first_line_char_limit < 17){
    start_infos = 50
  }
  else {
    start_infos = 60
    start_infos = 70
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
  // const gameNodeStyleSVG = new StringTemplateNodeStyle(circles + nodeStyle)
  let txt_y
  let clock_y
  if (game.rank <= rank_limit){
    txt_y = first_info_txt + 115
    clock_y = txt_y -20
  }
  else {
    txt_y = 40 + 115 + 15
    clock_y = txt_y -20
  }
  const housing = `
    <g transform="translate(17, -35) scale(0.5 0.5)">
      <polygon points="75,40 0,100, 0,250  150,250 150,100 " stroke="`+ house_color_bright +`" fill="`+house_color_bright+`"/>
      <polygon points="150,250 150,100 225,50, 225,200 " stroke="`+ house_color_dark +`" fill="`+ house_color_dark +`"/>
      <polygon points="231,55, 155,105 75,40 150,-5" fill="`+ roof_color +`"/>
      <polygon points="231,55, 155,10 " fill="`+ roof_color +`"/>
      <polygon points="77,40, -3,101 " stroke="`+ roof_color +`" stroke-width="3" fill="none"/>


      <rect x = "-30" y="185" width="40" height="25" rx="3" fill="`+dark_color+`"/>
      <rect x = "-12" y="185" width="4" height="70" fill="`+dark_color+`"/>
      <text x="-10" y="202" font-size="15" text-anchor="middle" stroke="white"  fill="white" stroke-width="0.75px" stroke-linejoin="round" data-content='{Binding rank}'></text> 

      <g transform="translate(72,` +clock_y+`) scale(0.7 0.7)">
        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/> <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/> 
      </g>
      
      <text x="72" y="`+ txt_y +`" style="font-size:8" text-anchor="end" data-content='{Binding minplaytime}'></text>
      <text x="77" y="`+ txt_y +`" style="font-size:8" text-anchor="middle">-</text>
      <text x="83" y="`+ txt_y +`" style="font-size:8" text-anchor="start" data-content='{Binding maxplaytime}'></text>
      `

  const hut = `
    <g transform="translate(17, 0) scale(0.5 0.5)">
      <polygon points="75,40 0,100, 0,175  150,175 150,100 " stroke="`+ house_color_bright +`" fill="`+ house_color_bright +`"/>
      <polygon points="150,175 150,100 225,50, 225,125 " stroke="`+ house_color_dark +`" fill="`+ house_color_dark +`"/>
      <polygon points="231,55, 155,105 75,40 150,-5" fill="`+ roof_color +`"/>
      <polygon points="231,55, 155,10 " fill="`+ roof_color +`"/>
      <polygon points="77,40, -3,101 " stroke="`+ roof_color +`" stroke-width="3" fill="none"/>
      
      <rect x = "-30" y="110" width="40" height="25" rx="3" fill="`+dark_color+`"/>
      <rect x = "-12" y="110" width="4" height="70" fill="`+dark_color+`"/>
      <text x="-10" y="127" font-size="15" text-anchor="middle" stroke="white"  fill="white" stroke-width="0.75px" stroke-linejoin="round" data-content='{Binding rank}'></text> 

      <g transform="translate(72,` +clock_y+`) scale(0.7 0.7)">
        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/> <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/> 
      </g>
      
      <text x="72" y="`+ txt_y +`" style="font-size:8" text-anchor="end" data-content='{Binding minplaytime}'></text>
      <text x="77" y="`+ txt_y +`" style="font-size:8" text-anchor="middle">-</text>
      <text x="83" y="`+ txt_y +`" style="font-size:8" text-anchor="start" data-content='{Binding maxplaytime}'></text>
      `

  let gameNodeStyleSVG
  let nodeLabelStyle
  if (game.rank <= rank_limit) {
    gameNodeStyleSVG = new StringTemplateNodeStyle(housing + people + windows + `</g>`)

    nodeLabelStyle = new DefaultLabelStyle({ // NODELABELSTYLE
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
      // insets: [16, 6, 0, 16] // BEST
      insets: [16, 8, 0, 17] // BEST
      // VerticalTextAlignment.CENTER
      // insets: [10, 0, 80, 10]
    })
  } else {
    gameNodeStyleSVG = new StringTemplateNodeStyle(hut + `</g>`)

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
      insets: [48, 8, 0, 17] // BEST
      // VerticalTextAlignment.CENTER
      // insets: [10, 0, 80, 10]
    })
  }
  return { gameNodeStyleSVG, nodeLabelStyle }
}

function colorToString(color: Color) {
  return `"rgb(` + color.r + `, ` + color.g + `, ` + color.b + `)"`
}