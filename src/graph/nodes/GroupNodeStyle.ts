import { DefaultGraph, DefaultLabelStyle, ImageNodeStyle, Rect, StringTemplateNodeStyle } from 'yfiles'
import { Game } from '../../types/Game'
import { getNodeStyle } from './NodeStyle'

export function applyGroupNodeStyle(graph: DefaultGraph, showCliqueId: boolean = false) {
  for (const node of graph.nodes.toList()) {
    if (graph.isGroupNode(node)) {
      const id = ((node.tag as Game).clique!) - 1
      let style = new ImageNodeStyle({
        image: `${process.env.PUBLIC_URL}/island-${id + 1}.svg`
      })
      graph.setStyle(node, style)
      if (id === 6 && false) {
        graph.setNodeLayout(node, new Rect(node.layout.x, node.layout.y,
          node.layout.width, node.layout.height + 150))
      }
      if (id === 9 && false) {
        graph.setNodeLayout(node, new Rect(node.layout.x, node.layout.y,
          node.layout.width + 80, node.layout.height + 150))
      }
      if (showCliqueId) {
        graph.addLabel(node, id.toString(), null, new DefaultLabelStyle({
          backgroundStroke: 'darkslategray',
          backgroundFill: 'lightgray',
          shape: 'rectangle',
          insets: [0, 2],
          textSize: 100
        }))
      }
    } else if (graph.getParent(node) == null) {
      const game = node.tag as Game
      let currNodeStyle = getNodeStyle(game, 40, 40)

      // width="459.000000pt" height="412.000000pt"
      let updatedNodeStyle = `<svg xmlns='http://www.w3.org/2000/svg'>
      <g transform='translate(55, 55)'>
      `
        + island_single + currNodeStyle.gameNodeStyleSVG + currNodeStyle.nodeLabelStyle
        + `</g></svg>`

      graph.setStyle(node, new StringTemplateNodeStyle(updatedNodeStyle))
    }
  }
}

const island_single = `<g transform='translate(-2915 -1342)'>
<path d='M2957.34 1345.22C2914.15 1354.77 2876.65 1390.89 2866.14 1422.95 2855.64 1455.01 2854.88 1515.61 
2894.31 1537.58 2933.75 1559.56 3050.17 1570.06 3102.75 1554.78 3155.33 1539.49 3206.03 1477.4 3209.79 
1445.88 3213.54 1414.35 3167.36 1382.41 3125.28 1365.63 3083.21 1348.86 3000.53 1335.66 2957.34 1345.22Z' 
fill='#C9E5ED' fill-rule='evenodd' />
<path d='M2960.38 1353.94C2920.28 1362.67 2885.46 1395.67 2875.7 1424.96 2865.95 1454.25 2865.24 1509.62 
2901.86 1529.69 2938.48 1549.77 3046.59 1559.37 3095.41 1545.4 3144.23 1531.44 3191.31 1474.71 3194.8 
1445.91 3198.29 1417.1 3155.4 1387.92 3116.33 1372.59 3077.26 1357.27 3000.49 1345.21 2960.38 1353.94Z' 
fill='#548C2F' fill-rule='evenodd' />
</g>`

const island1 = '<svg width="626" height="927" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden"><defs><clipPath id="clip0"><rect x="3811" y="248" width="626" height="927"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-3811 -248)"><path d="M4053.23 268.326C3966.9 216.397 3909.92 273.319 3871.94 334.235 3833.95 395.151 3826.18 501.006 3825.32 633.823 3824.45 766.64 3774.38 1054.24 3866.76 1131.14 3959.13 1208.03 4292.36 1176.08 4379.56 1095.19 4466.75 1014.3 4441.71 782.617 4389.91 645.806 4338.12 508.995 4139.56 320.255 4053.23 268.326Z" fill="#C9E5ED" fill-rule="evenodd"/><path d="M4052.85 312.506C3970.93 265.227 3916.86 317.052 3880.82 372.514 3844.78 427.976 3837.4 524.353 3836.58 645.278 3835.77 766.203 3788.25 1028.06 3875.91 1098.06 3963.56 1168.07 4279.76 1138.98 4362.49 1065.33 4445.23 991.687 4421.47 780.75 4372.32 656.188 4323.17 531.626 4134.76 359.785 4052.85 312.506Z" fill="#6F7762" fill-rule="evenodd"/></g></svg>'

const island2 = '<svg width="942" height="605" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden"><defs><clipPath id="clip0"><rect x="2766" y="-48" width="942" height="605"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-2766 48)"><path d="M2930.26-15.4027C2843.28 30.7479 2841.35 165.272 2814.29 237.935 2787.23 310.597 2758.24 377.368 2767.9 420.573 2777.56 463.778 2811.39 475.561 2872.28 497.163 2933.16 518.766 3060.73 576.699 3133.21 550.187 3205.7 523.675 3214.39 373.441 3307.17 338.091 3399.95 302.742 3638.66 381.296 3689.88 338.091 3741.1 294.886 3673.45 141.705 3614.5 78.862 3555.54 16.0187 3450.2-23.2582 3336.16-38.9691 3222.12-54.68 2991.15-51.7339 2930.26-15.4027Z" fill="#C9E5ED" fill-rule="evenodd"/><path d="M2937.28-11.0426C2856.11 31.3701 2854.31 154.999 2829.06 221.776 2803.81 288.554 2776.76 349.917 2785.77 389.622 2794.79 429.328 2826.35 440.157 2883.17 460.01 2939.98 479.862 3059.02 533.104 3126.65 508.739 3194.29 484.374 3202.41 346.307 3288.98 313.821 3375.55 281.335 3598.3 353.527 3646.09 313.821 3693.89 274.115 3630.76 133.341 3575.75 75.5875 3520.74 17.834 3422.44-18.2619 3316.03-32.7003 3209.62-47.1388 2994.09-44.4313 2937.28-11.0426Z" fill="#175639" fill-rule="evenodd"/></g></svg>'

const island3 = '<svg width="735" height="668" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden"><defs><clipPath id="clip0"><rect x="2107" y="437" width="735" height="668"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-2107 -437)"><path d="M2513.26 752.187C2437.23 749.405 2413.15 749.405 2377.26 780.005 2341.38 810.605 2325.32 882.932 2297.94 935.787 2270.55 988.642 2244.1 1079.52 2212.94 1097.13 2181.77 1114.75 2121.81 1105.48 2110.95 1041.5 2100.08 977.515 2111.42 806.432 2147.78 713.241 2184.14 620.05 2234.19 523.613 2329.1 482.349 2424.01 441.085 2633.19 413.267 2717.25 465.658 2801.3 518.049 2865.99 749.868 2833.41 796.696 2800.82 843.523 2589.28 754.968 2513.26 752.187Z" fill="#C9E5ED" fill-rule="evenodd"/><path d="M2510.83 739.461C2439.57 736.941 2416.99 736.941 2383.35 764.656 2349.71 792.37 2334.66 857.876 2308.99 905.746 2283.31 953.616 2258.52 1035.92 2229.31 1051.88 2200.09 1067.83 2143.88 1059.43 2133.7 1001.49 2123.52 943.538 2134.14 788.591 2168.22 704.188 2202.31 619.786 2249.23 532.445 2338.2 495.072 2427.17 457.7 2623.26 432.506 2702.05 479.956 2780.84 527.406 2841.49 737.361 2810.94 779.772 2780.4 822.184 2582.1 741.98 2510.83 739.461Z" fill="#68B764" fill-rule="evenodd"/></g></svg>'

const island4 = '<svg width="580" height="780" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden"><defs><clipPath id="clip0"><rect x="2100" y="1494" width="580" height="780"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-2100 -1494)"><path d="M2287.21 1720.05C2276.99 1638.53 2271.42 1557.01 2248.18 1525.59 2224.95 1494.16 2171.98 1471.57 2147.82 1531.48 2123.66 1591.39 2089.28 1781.93 2103.22 1885.05 2117.16 1988.18 2145.97 2085.41 2231.46 2150.24 2316.95 2215.06 2546.48 2274.97 2616.17 2273.99 2685.87 2273.01 2700.73 2187.56 2649.62 2144.34 2598.52 2101.13 2369.92 2085.41 2309.52 2014.7 2249.11 1943.98 2297.43 1801.57 2287.21 1720.05Z" fill="#C9E5ED" fill-rule="evenodd"/><path d="M2299.4 1736.5C2289.5 1661.67 2284.1 1586.84 2261.59 1557.99 2239.07 1529.14 2187.75 1508.41 2164.34 1563.4 2140.93 1618.4 2107.61 1793.3 2121.12 1887.97 2134.63 1982.63 2162.54 2071.89 2245.38 2131.39 2328.22 2190.9 2550.62 2245.89 2618.15 2244.99 2685.68 2244.09 2700.09 2165.65 2650.57 2125.98 2601.04 2086.31 2379.54 2071.89 2321.01 2006.98 2262.49 1942.06 2309.31 1811.33 2299.4 1736.5Z" fill="#6F7762" fill-rule="evenodd"/></g></svg>'

const island5 = '<svg width="425" height="794" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden"><defs><clipPath id="clip0"><rect x="3620" y="1282" width="425" height="794"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-3620 -1282)"><path d="M3662.38 1285.81C3609.65 1287.52 3610.54 1326.93 3640.93 1383.47 3671.32 1440.01 3842.03 1538.53 3844.71 1625.06 3847.4 1711.59 3675.79 1829.81 3657.02 1902.63 3638.25 1975.45 3669.53 2047.41 3732.1 2061.97 3794.66 2076.54 3994.87 2104.81 4032.41 1990.01 4069.95 1875.22 4017.22 1488.85 3957.33 1373.19 3897.45 1257.54 3715.11 1284.1 3662.38 1285.81Z" fill="#C9E5ED" fill-rule="evenodd"/><path d="M3684.89 1294.69C3635.25 1296.36 3636.1 1334.57 3664.7 1389.41 3693.3 1444.24 3853.97 1539.78 3856.5 1623.69 3859.02 1707.6 3697.5 1822.25 3679.84 1892.87 3662.17 1963.49 3691.62 2033.28 3750.5 2047.4 3809.39 2061.52 3997.82 2088.94 4033.15 1977.61 4068.48 1866.28 4018.85 1491.59 3962.49 1379.44 3906.13 1267.28 3734.52 1293.03 3684.89 1294.69Z" fill="#05A869" fill-rule="evenodd"/></g></svg>'

const island6 = '<svg width="414" height="392" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden"><defs><clipPath id="clip0"><rect x="3374" y="826" width="414" height="392"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-3374 -826)"><path d="M3580.37 895.767C3528.01 872.253 3464.25 804.952 3430.1 832.521 3395.95 860.09 3367.11 1001.18 3375.45 1061.18 3383.8 1121.18 3414.92 1169.84 3480.19 1192.54 3545.46 1215.24 3723.06 1233.89 3767.08 1197.4 3811.1 1160.92 3776.95 1025.5 3744.31 973.609 3711.67 921.714 3632.74 919.282 3580.37 895.767Z" fill="#C9E5ED" fill-rule="evenodd"/><path d="M3579.91 910.182C3530.71 888.887 3470.8 827.938 3438.71 852.905 3406.62 877.872 3379.52 1005.64 3387.37 1059.98 3395.21 1114.32 3424.45 1158.38 3485.78 1178.94 3547.11 1199.5 3713.98 1216.39 3755.34 1183.35 3796.7 1150.3 3764.61 1027.67 3733.95 980.677 3703.28 933.68 3629.12 931.477 3579.91 910.182Z" fill="#548C2F" fill-rule="evenodd"/></g></svg>'

const island7 = '<svg width="517" height="145" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden"><defs><clipPath id="clip0"><rect x="2857" y="617" width="517" height="145"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-2857 -617)"><path d="M3278.86 630.893C3205.99 615.095 2972.64 609.829 2910.41 630.893 2848.18 651.956 2832.62 741.476 2905.49 757.274 2978.37 773.072 3285.41 745.865 3347.64 725.679 3409.87 705.493 3351.73 646.69 3278.86 630.893Z" fill="#C9E5ED" fill-rule="evenodd"/><path d="M3268.12 637.072C3200.04 623.344 2982.03 618.768 2923.89 637.072 2865.76 655.376 2851.23 733.166 2919.31 746.893 2987.38 760.621 3274.24 736.979 3332.37 719.438 3390.51 701.897 3336.2 650.8 3268.12 637.072Z" fill="#4C4B16" fill-rule="evenodd"/></g></svg>'

const island8 = '<svg width="530" height="246" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden"><defs><clipPath id="clip0"><rect x="3097" y="2199" width="530" height="246"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-3097 -2199)"><path d="M3505.07 2201.37C3435.2 2186.97 3260.05 2241.87 3192.05 2266.18 3124.04 2290.48 3096.09 2318.38 3097.02 2347.18 3097.95 2375.98 3111.93 2438.09 3197.64 2438.99 3283.34 2439.89 3559.1 2389.48 3611.27 2352.58 3663.44 2315.68 3574.94 2215.77 3505.07 2201.37Z" fill="#C9E5ED" fill-rule="evenodd"/><path d="M3505.98 2207.37C3438.35 2192.97 3268.82 2247.87 3203 2272.18 3137.17 2296.48 3110.12 2324.38 3111.02 2353.18 3111.92 2381.98 3125.45 2444.09 3208.41 2444.99 3291.37 2445.89 3558.28 2395.49 3608.77 2358.58 3659.27 2321.68 3573.61 2221.77 3505.98 2207.37Z" fill="#2D4336" fill-rule="evenodd"/></g></svg>'

const island9 = '<svg width="364" height="547" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden"><defs><clipPath id="clip0"><rect x="4045" y="1219" width="364" height="547"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-4045 -1219)"><path d="M4250.75 1287.67C4206.25 1213.36 4174.94 1228.23 4141.98 1223.27 4109.02 1218.32 4064.53 1208.41 4052.99 1257.95 4041.45 1307.49 4038.16 1437.12 4072.77 1520.51 4107.37 1603.9 4204.6 1733.53 4260.64 1758.3 4316.67 1783.06 4411.42 1746.74 4408.95 1669.12 4406.48 1591.51 4295.24 1361.98 4250.75 1287.67Z" fill="#C9E5ED" fill-rule="evenodd"/><path d="M4262.49 1301.53C4221.29 1232.79 4192.3 1246.54 4161.79 1241.95 4131.27 1237.37 4090.08 1228.2 4079.4 1274.03 4068.72 1319.86 4065.67 1439.77 4097.71 1516.91 4129.75 1594.05 4219.77 1713.96 4271.64 1736.87 4323.52 1759.79 4411.25 1726.18 4408.96 1654.39 4406.67 1582.59 4303.68 1370.27 4262.49 1301.53Z" fill="#6F7762" fill-rule="evenodd"/></g></svg>'

const island10 = '<svg width="247" height="323" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" overflow="hidden"><defs><clipPath id="clip0"><rect x="2732" y="2066" width="247" height="323"/></clipPath></defs><g clip-path="url(#clip0)" transform="translate(-2732 -2066)"><path d="M2863.54 2122.97C2828.22 2076.56 2787.77 2053.97 2765.93 2072.45 2744.1 2090.93 2728.9 2182.94 2732.54 2233.88 2736.18 2284.81 2746.88 2358.54 2787.77 2378.06 2828.65 2397.57 2965.43 2392.43 2977.85 2350.95 2990.27 2309.46 2898.86 2169.39 2863.54 2122.97Z" fill="#C9E5ED" fill-rule="evenodd"/><path d="M2858.7 2128.92C2827.09 2085.81 2790.9 2064.82 2771.36 2081.99 2751.82 2099.16 2738.23 2184.62 2741.48 2231.92 2744.74 2279.23 2754.31 2347.71 2790.9 2365.83 2827.48 2383.96 2949.86 2379.19 2960.97 2340.65 2972.08 2302.12 2890.3 2172.03 2858.7 2128.92Z" fill="#99CC00" fill-rule="evenodd"/></g></svg>'

const islands = [island1, island2, island3, island4, island5, island6, island7, island8, island9, island10]
