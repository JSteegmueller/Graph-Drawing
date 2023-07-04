import { DefaultGraph, IListEnumerable, INode, StringTemplateNodeStyle } from 'yfiles'

export function getGroupNodeStyle(graph: DefaultGraph, containedGames: IListEnumerable<INode>) {
  //const layoutGraph = LayoutGraphUtilities.asLayoutGraph(graph);

  //const layout = layoutGraph.getLayout(node);
  let groupNodeStyleSVG = new StringTemplateNodeStyle('<svg xmlns="http://www.w3.org/2000/svg"\n' +
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
    '</svg>')

  return groupNodeStyleSVG
}

export function applyGroupNodeStyle(graph: DefaultGraph) {
  for (const node of graph.nodes) {
    console.log(node.tag.title)
    console.log(node.tag.clique)
    console.log(node.layout.center.x)
    console.log(node.layout.center.y)
    if (graph.isGroupNode(node)) {
      let groupNodeStyleSVG = getGroupNodeStyle(graph, graph.getChildren(node))
      graph.setStyle(node, groupNodeStyleSVG)
    }
  }
}