
type Rating = {
    rating: number;
    num_of_reviews: number;
}

type Recommendations = {
    fans_liked: number[];
}

type Identify = {
    id: number;
    name: string;
}

type Types = {
    categories: Identify[];
    mechanics: Identify[];
}

type Credit = {
    designer: Identify[];
}

type Game = {
    id: number;
    title: string;
    year: number;
    rank: number;
    minplayers: number;
    maxplayers: number;
    minplaytime: number;
    maxplaytime: number;
    minage: number;
    rating: Rating;
    recommendations: Recommendations;
    types: Types;
    credit: Credit;
};

type Node = {
    id: number;
    label: string;
    size: number;
    x: number;
    y: number;
}

type Edge = {
    id: string;
    source: number;
    target: number;
}

type Group = {
    id: string;
}

type easyGraph = {
    nodes: Node[];
    edges: Edge[];
    groups: Group[];
}

function loadTop40(): Promise<Game[]> {
    return fetch('./resources/top40.json')
      .then(response => {
        if (!response.ok) {
          console.log('Failed to fetch top40.json');
          return [];
        }
        return response.json();
      })
      .then(top40JSON => top40JSON as Game[])
      .catch(error => {
        console.error(error);
        return [];
      });
  }

function loadTop100(): Promise<Game[]> {
    return fetch('./resources/top100.json')
      .then(response => {
        if (!response.ok) {
          console.log('Failed to fetch top100.json');
          return [];
        }
        return response.json();
      })
      .then(top100JSON => top100JSON as Game[])
      .catch(error => {
        console.error(error);
        return [];
      });
}

async function getLikedGraph(useTop100: boolean): Promise<easyGraph> {
    const games = await (useTop100 ? loadTop100() : loadTop40());
    const likedGraph: easyGraph = {
        nodes: [],
        edges: [],
        groups: []
    };
    games.forEach(game => {
        const node = {
            id: game.id,
            label: game.title,
            size: game.recommendations.fans_liked.length,
            x: Math.random(),
            y: Math.random()
        };
        likedGraph.nodes.push(node);
        game.recommendations.fans_liked.forEach(liked => {
            const edge = {
                id: `${game.id}-${liked}`,
                source: game.id,
                target: liked
            };
            likedGraph.edges.push(edge);
        });
    });
    return likedGraph;
}

export { loadTop40, loadTop100, getLikedGraph, easyGraph, Game};
