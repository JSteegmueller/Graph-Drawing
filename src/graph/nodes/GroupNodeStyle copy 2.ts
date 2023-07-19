import { DefaultGraph, IListEnumerable, INode, StringTemplateNodeStyle } from 'yfiles'

export function getGroupNodeStyle(graph: DefaultGraph, containedGames: IListEnumerable<INode>) {
  //const layoutGraph = LayoutGraphUtilities.asLayoutGraph(graph);

  //const layout = layoutGraph.getLayout(node);
    
  let island1 = '<svg xmlns="http://www.w3.org/2000/svg"\n' +
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

  let groupNodeStyleSVG = new StringTemplateNodeStyle(island1)

  return groupNodeStyleSVG
}

function sortNodesClockwise(nodes: INode[]): INode[] {
  const center = getCenterPoint(nodes);
  const sortedNodes = nodes.sort((a, b) => {
    const angleA = Math.atan2(a.layout.center.y - center.y, a.layout.center.x - center.x);
    const angleB = Math.atan2(b.layout.center.y - center.y, b.layout.center.x - center.x);
    return angleA - angleB;
  });
  return sortedNodes;
}

function getCenterPoint(nodes: INode[]): { x: number; y: number } {
  const totalNodes = nodes.length;
  let totalX = 0;
  let totalY = 0;

  for (const node of nodes) {
    totalX += node.layout.center.x;
    totalY += node.layout.center.y;
  }

  const centerX = totalX / totalNodes;
  const centerY = totalY / totalNodes;

  return { x: centerX, y: centerY };
}


export function applyGroupNodeStyle(graph: DefaultGraph) {

  let island1 = '<svg xmlns="http://www.w3.org/2000/svg"\n' +
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

      // creates edgy islands
      // let sortedNodes = sortNodesClockwise(individualNodes);
      // let polygonPoints = individualNodes.map(n => `${n.layout.center.x},${n.layout.center.y}`).join(" ");

      // didn't work yet.. 
      // let centerX = calculateCenterX(individualNodes);
      // let centerY = calculateCenterY(individualNodes);
      // let svgPath = `<polygon fill="green" points="${polygonPoints}" />`;
      // let svgPath = `<polygon points="${polygonPoints}" transform="translate(${centerX},${centerY})" />`;

      // creates rectangles over all nodes
      let rect = calculateBoundingBox(individualNodes);
      let rectX = rect.x - 10; // Add some padding to the rectangle
      let rectY = rect.y - 10; // Add some padding to the rectangle
      let rectWidth = rect.width + 20; // Add some padding to the rectangle
      let rectHeight = rect.height + 20; // Add some padding to the rectangle
      let svgPath = `<rect x="${rectX}" y="${rectY}" width="${rectWidth}" height="${rectHeight}" />`;

      // Parse the SVG string
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(island1, 'image/svg+xml');

      // Get the group element
      const groupElement = svgDoc.querySelector('g');

      if (groupElement) {
        // Translate to position from rect
        // groupElement.setAttribute('transform', `translate(${rectX}, ${rectY})`);
        
        let viewBox = groupElement.getAttribute('viewBox');
        if (viewBox) {
          // Create a temporary SVG element to parse the viewBox
          const tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          tempSvg.setAttribute('viewBox', viewBox);
          const pathElement = tempSvg.querySelector('path');
          if (pathElement) {
            // Remove fill and stroke styles from the path element
            pathElement.removeAttribute('fill');
            pathElement.removeAttribute('stroke');
          }
      
          // Update the viewBox attribute with the modified path element
          viewBox = tempSvg.getAttribute('viewBox');
          console.log(viewBox)
          if (viewBox) {
            const viewBoxValues = viewBox.split(' ');
            if (viewBoxValues.length >= 4) {
              const viewBoxX = parseFloat(viewBoxValues[0]);
              const viewBoxY = parseFloat(viewBoxValues[1]);
              const viewBoxWidth = parseFloat(viewBoxValues[2]);
              const viewBoxHeight = parseFloat(viewBoxValues[3]);
              // Calculate the new viewBox values based on the rect size
              const newViewBoxWidth = rectWidth * (viewBoxWidth / viewBoxWidth);
              const newViewBoxHeight = rectHeight * (viewBoxHeight / viewBoxHeight);
              // Update the viewBox attribute with the new values
              viewBox = `${viewBoxX} ${viewBoxY} ${newViewBoxWidth} ${newViewBoxHeight}`;
              groupElement.setAttribute('viewBox', viewBox);

              const updatedSvgString = new XMLSerializer().serializeToString(groupElement);

              // let groupNodeStyleSVG = new StringTemplateNodeStyle(svgPath);
              let groupNodeStyleSVG = new StringTemplateNodeStyle(updatedSvgString);

              graph.setStyle(node, groupNodeStyleSVG);
            }
          }
        }
    }
      
    }
  }
}


function calculateBoundingBox(nodes: INode[]): { x: number; y: number; width: number; height: number } {
  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let maxY = Number.MIN_VALUE;

  for (const node of nodes) {
    const nodeX = node.layout.x;
    const nodeY = node.layout.y;
    const nodeWidth = node.layout.width;
    const nodeHeight = node.layout.height;

    minX = Math.min(minX, nodeX);
    minY = Math.min(minY, nodeY);
    maxX = Math.max(maxX, nodeX + nodeWidth);
    maxY = Math.max(maxY, nodeY + nodeHeight);
  }

  let rectX = minX;
  let rectY = minY;
  let rectWidth = maxX - minX;
  let rectHeight = maxY - minY;

  return { x: rectX, y: rectY, width: rectWidth, height: rectHeight };
}

function calculateCenterX(nodes: INode[]): number {
  let totalX = 0;

  for (const node of nodes) {
    totalX += node.layout.center.x;
  }

  return totalX / nodes.length;
}

function calculateCenterY(nodes: INode[]): number {
  let totalY = 0;

  for (const node of nodes) {
    totalY += node.layout.center.y;
  }

  return totalY / nodes.length;
}