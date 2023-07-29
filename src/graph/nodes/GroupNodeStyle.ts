import { DefaultGraph, StringTemplateNodeStyle } from 'yfiles'
import { Game } from '../../types/Game'
import { getNodeStyle } from './NodeStyle'
import createGeneralPathFromSvgPathData from '../../PathToPath'

export function applyGroupNodeStyle(graph: DefaultGraph) {
  let i = 0
  for (const node of graph.nodes) {
    if (graph.isGroupNode(node)) {
      let groupNodeStyleSVG = new StringTemplateNodeStyle(islands[i])
      i += 1
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(islands[i], 'text/xml')

      const pathElement = xmlDoc.querySelector('path')
      const svgPathData = pathElement!.getAttribute('d')

      groupNodeStyleSVG.normalizedOutline = createGeneralPathFromSvgPathData(svgPathData!)
      graph.setStyle(node, groupNodeStyleSVG)
    } else if (graph.getParent(node) == null) {
      const game = node.tag as Game
      let currNodeStyle = getNodeStyle(game, 40)

      // width="459.000000pt" height="412.000000pt"
      let updatedNodeStyle = `<svg xmlns='http://www.w3.org/2000/svg'>`
        + island_single + currNodeStyle.gameNodeStyleSVG + currNodeStyle.nodeLabelStyle
        + `</svg>`

      graph.setStyle(node, new StringTemplateNodeStyle(updatedNodeStyle))
    }
  }
}

let island_single = `<svg xmlns='http://www.w3.org/2000/svg'>
<circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='green' />
</svg>`


// oben rechts
let island0 = '<svg width="609" height="412" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden"><defs><clipPath id="clip0"><rect x="1713" y="318" width="609" height="412"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-1713 -318)"><path d="M1913.02 355.751C1858.68 349.095 1817.23 302.5 1785.91 327.224 1754.59 351.948 1731.57 444.186 1725.12 504.094 1718.67 564.001 1691.96 650.534 1747.23 686.669 1802.49 722.803 1992.23 742.773 2056.71 720.902 2121.18 699.031 2093.55 596.332 2134.08 555.443 2174.61 514.554 2272.24 514.554 2299.87 475.566 2327.51 436.579 2331.19 339.586 2299.87 321.519 2268.56 303.451 2179.21 360.506 2111.97 367.162 2044.73 373.818 1967.36 362.408 1913.02 355.751Z" fill="#C9E5ED" fill-rule="evenodd"/><path d="M1917.51 361.636C1866.02 355.529 1826.75 312.779 1797.08 335.463 1767.41 358.146 1745.59 442.773 1739.48 497.736 1733.37 552.7 1708.07 632.092 1760.43 665.244 1812.79 698.397 1992.56 716.718 2053.65 696.652 2114.74 676.586 2088.56 582.363 2126.95 544.848 2165.35 507.333 2257.85 507.333 2284.04 471.563 2310.22 435.793 2313.71 346.805 2284.04 330.228 2254.36 313.652 2169.71 365.998 2106.01 372.105 2042.3 378.212 1969 367.743 1917.51 361.636Z" fill="#548C2F" fill-rule="evenodd"/></g></svg>'

// unten rechts
let island1 = '<svg xmlns="http://www.w3.org/2000/svg"\n' +
  ' width="459.000000pt" height="412.000000pt" viewBox="0 0 459.000000 412.000000"\n' +
  ' preserveAspectRatio="xMidYMid meet">\n' +
  '\n' +
  '<g transform="translate(0.000000,412.000000) scale(0.100000,-0.100000)"\n' +
  'fill="#c72020" stroke="none">\n' +
  '<path d="M2240 3629 c-287 -30 -427 -59 -665 -137 -235 -77 -533 -210 -701\n' +
  '-313 -86 -52 -177 -111 -184 -119 -3 -3 -23 -19 -45 -35 -63 -47 -154 -135\n' +
  '-199 -195 -89 -117 -119 -207 -119 -350 -1 -147 12 -222 61 -375 149 -459 453\n' +
  '-879 770 -1064 152 -89 415 -187 696 -261 208 -54 481 -111 611 -125 33 -4 62\n' +
  '-9 65 -10 3 -2 41 -6 85 -10 44 -4 91 -9 105 -11 58 -8 322 -4 358 6 84 22\n' +
  '115 67 135 192 16 104 13 257 -8 513 -2 17 -6 102 -10 190 -19 421 45 532 404\n' +
  '702 243 115 280 135 326 175 64 57 85 104 85 199 0 91 -31 275 -59 344 -75\n' +
  '187 -123 273 -200 365 -139 165 -261 232 -521 285 -190 38 -292 48 -565 50\n' +
  '-192 1 -303 -3 -425 -16z"/>\n' +
  '</g>\n' +
  '</svg>'

// unten links
let island2 = '<svg xmlns="http://www.w3.org/2000/svg"\n' +
  ' width="459.000000pt" height="412.000000pt" viewBox="0 0 459.000000 412.000000"\n' +
  ' preserveAspectRatio="xMidYMid meet">\n' +
  '\n' +
  '<g transform="translate(0.000000,412.000000) scale(0.100000,-0.100000)"\n' +
  'fill="#c72020" stroke="none">\n' +
  '<path d="M2240 3629 c-287 -30 -427 -59 -665 -137 -235 -77 -533 -210 -701\n' +
  '-313 -86 -52 -177 -111 -184 -119 -3 -3 -23 -19 -45 -35 -63 -47 -154 -135\n' +
  '-199 -195 -89 -117 -119 -207 -119 -350 -1 -147 12 -222 61 -375 149 -459 453\n' +
  '-879 770 -1064 152 -89 415 -187 696 -261 208 -54 481 -111 611 -125 33 -4 62\n' +
  '-9 65 -10 3 -2 41 -6 85 -10 44 -4 91 -9 105 -11 58 -8 322 -4 358 6 84 22\n' +
  '115 67 135 192 16 104 13 257 -8 513 -2 17 -6 102 -10 190 -19 421 45 532 404\n' +
  '702 243 115 280 135 326 175 64 57 85 104 85 199 0 91 -31 275 -59 344 -75\n' +
  '187 -123 273 -200 365 -139 165 -261 232 -521 285 -190 38 -292 48 -565 50\n' +
  '-192 1 -303 -3 -425 -16z"/>\n' +
  '</g>\n' +
  '</svg>'

// oben links 
let island3 = '<svg xmlns="http://www.w3.org/2000/svg"\n' +
  ' width="459.000000pt" height="412.000000pt" viewBox="0 0 459.000000 412.000000"\n' +
  ' preserveAspectRatio="xMidYMid meet">\n' +
  '\n' +
  '<g transform="translate(0.000000,412.000000) scale(0.100000,-0.100000)"\n' +
  'fill="#c72020" stroke="none">\n' +
  '<path d="M2240 3629 c-287 -30 -427 -59 -665 -137 -235 -77 -533 -210 -701\n' +
  '-313 -86 -52 -177 -111 -184 -119 -3 -3 -23 -19 -45 -35 -63 -47 -154 -135\n' +
  '-199 -195 -89 -117 -119 -207 -119 -350 -1 -147 12 -222 61 -375 149 -459 453\n' +
  '-879 770 -1064 152 -89 415 -187 696 -261 208 -54 481 -111 611 -125 33 -4 62\n' +
  '-9 65 -10 3 -2 41 -6 85 -10 44 -4 91 -9 105 -11 58 -8 322 -4 358 6 84 22\n' +
  '115 67 135 192 16 104 13 257 -8 513 -2 17 -6 102 -10 190 -19 421 45 532 404\n' +
  '702 243 115 280 135 326 175 64 57 85 104 85 199 0 91 -31 275 -59 344 -75\n' +
  '187 -123 273 -200 365 -139 165 -261 232 -521 285 -190 38 -292 48 -565 50\n' +
  '-192 1 -303 -3 -425 -16z"/>\n' +
  '</g>\n' +
  '</svg>'

// oben mitte
let island4 = '<svg xmlns="http://www.w3.org/2000/svg"\n' +
  ' width="459.000000pt" height="412.000000pt" viewBox="0 0 459.000000 412.000000"\n' +
  ' preserveAspectRatio="xMidYMid meet">\n' +
  '\n' +
  '<g transform="translate(0.000000,412.000000) scale(0.100000,-0.100000)"\n' +
  'fill="#000000" stroke="none">\n' +
  '<path d="M2240 3629 c-287 -30 -427 -59 -665 -137 -235 -77 -533 -210 -701\n' +
  '-313 -86 -52 -177 -111 -184 -119 -3 -3 -23 -19 -45 -35 -63 -47 -154 -135\n' +
  '-199 -195 -89 -117 -119 -207 -119 -350 -1 -147 12 -222 61 -375 149 -459 453\n' +
  '-879 770 -1064 152 -89 415 -187 696 -261 208 -54 481 -111 611 -125 33 -4 62\n' +
  '-9 65 -10 3 -2 41 -6 85 -10 44 -4 91 -9 105 -11 58 -8 322 -4 358 6 84 22\n' +
  '115 67 135 192 16 104 13 257 -8 513 -2 17 -6 102 -10 190 -19 421 45 532 404\n' +
  '702 243 115 280 135 326 175 64 57 85 104 85 199 0 91 -31 275 -59 344 -75\n' +
  '187 -123 273 -200 365 -139 165 -261 232 -521 285 -190 38 -292 48 -565 50\n' +
  '-192 1 -303 -3 -425 -16z"/>\n' +
  '</g>\n' +
  '</svg>'

let islands = [island0, island1, island2, island3, island4, island0, island1, island2, island3, island4, island0, island1, island2, island3, island4, island0, island1, island2, island3, island4]