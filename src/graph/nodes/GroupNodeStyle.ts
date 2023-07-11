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

function makeLeftTurn(p: { x: number; y: number }, q: { x: number; y: number }, r: { x: number; y: number }): boolean {
  const p1 = p;
  const p2 = q;
  const p3 = r;
  return (
    (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y) > 0
  );
}

function extractCoordinates(nodes: INode[]): { x: number; y: number }[] {
  return nodes.map(node => ({
    x: node.layout.center.x,
    y: node.layout.center.y
  }));
}

function convexHull(nodes: INode[]): INode[] {
  const coordinates = extractCoordinates(nodes);

  // Sort nodes based on polar angle
  coordinates.sort((a, b) => {
    if (a.y === b.y) {
      return a.x - b.x;
    }
    return a.y - b.y;
  });

  const stack: { x: number; y: number }[] = [];
  stack.push(coordinates[0]);
  stack.push(coordinates[1]);

  for (let i = 2; i < coordinates.length; i++) {
    while (
      stack.length >= 2 &&
      !makeLeftTurn(stack[stack.length - 2], stack[stack.length - 1], coordinates[i])
    ) {
      stack.pop();
    }
    stack.push(coordinates[i]);
  }

  const convexHullNodes: INode[] = stack.map(coord => {
    const nodeIndex = coordinates.findIndex(c => c.x === coord.x && c.y === coord.y);
    return nodes[nodeIndex];
  });

  return convexHullNodes;
}

function generatePathFromPolygon(nodes: INode[]): string {
  let path = "";

  if (nodes.length > 0) {
    const numNodes = nodes.length;

    const firstNode = nodes[0];
    const firstNodeX = firstNode.layout.center.x;
    const firstNodeY = firstNode.layout.center.y;

    path += `M${firstNodeX},${firstNodeY} `;

    if (nodes.length === 1) {
      // Only one node, return a circle
      path += `A1,1 0 1 1 ${firstNodeX + 1},${firstNodeY}`;
    } else {
      for (let i = 1; i < numNodes; i++) {
        const previousNode = nodes[i - 1];
        const previousNodeX = previousNode.layout.center.x;
        const previousNodeY = previousNode.layout.center.y;

        const currentNode = nodes[i];
        const currentNodeX = currentNode.layout.center.x;
        const currentNodeY = currentNode.layout.center.y;

        const nextNode = nodes[(i + 1) % numNodes];
        const nextNodeX = nextNode.layout.center.x;
        const nextNodeY = nextNode.layout.center.y;

        const curvature = 0.4 + Math.random() * 0.2; // Adjust curvature randomness
        const controlPointX = currentNodeX + (nextNodeX - previousNodeX) * curvature;
        const controlPointY = currentNodeY + (nextNodeY - previousNodeY) * curvature;

        path += `Q${controlPointX},${controlPointY} ${currentNodeX},${currentNodeY} `;
      }

      // Add rounded endcaps
      const lastNode = nodes[numNodes - 1];
      const lastNodeX = lastNode.layout.center.x;
      const lastNodeY = lastNode.layout.center.y;
      const firstNodeX = firstNode.layout.center.x;
      const firstNodeY = firstNode.layout.center.y;
      path += `A2,2 0 0 1 ${lastNodeX},${lastNodeY} `;
      path += `A2,2 0 0 1 ${firstNodeX},${firstNodeY} `;
    }
  }

  return path;
}

function createSvgPath(nodes: INode[]): string {
  let path = "";

  if (nodes.length > 0) {
    const convexHullNodes = convexHull(nodes);
    path = generatePathFromPolygon(convexHullNodes);
  }

  const fill = "green";
  const strokeWidth = 2; // Adjust the desired stroke width
  const strokeLinejoin = "round"; // Set the strokeLinejoin attribute to round
  const svgPath = `<path d="${path}" fill="${fill}" stroke-width="${strokeWidth}" stroke-linejoin="${strokeLinejoin}" />`;

  return svgPath;
}

export function applyGroupNodeStyle(graph: DefaultGraph) {
  for (const node of graph.nodes) {
    // console.log(node.tag.title)
    // console.log(node.tag.clique)
    // console.log(node.layout.center.x)
    // console.log(node.layout.center.y)
    // if (graph.isGroupNode(node)) {
    //   let groupNodeStyleSVG = getGroupNodeStyle(graph, graph.getChildren(node))
    //   graph.setStyle(node, groupNodeStyleSVG)
    // }

    if (graph.isGroupNode(node)) {
      let nodes = Array.from(graph.getChildren(node));
      let individualNodes = nodes.filter(n => !graph.isGroupNode(n));
      let convexHullNodes = convexHull(individualNodes);

      let padding = 5
      let svgPath = createSvgPath(convexHullNodes);

      let newpath = `<g transform="translate(-500 -1400)">`+ svgPath + `</g>`

      let groupNodeStyleSVG = new StringTemplateNodeStyle(newpath);

      graph.setStyle(node, groupNodeStyleSVG)
    }
  }
}