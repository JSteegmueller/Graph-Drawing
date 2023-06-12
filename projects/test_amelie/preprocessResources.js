function loadTop40() {
    return fetch('./resources/top40.json')
        .then(response => {
        if (!response.ok) {
            console.log('Failed to fetch top40.json');
            return [];
        }
        return response.json();
    })
        .then(top40JSON => top40JSON)
        .catch(error => {
        console.error(error);
        return [];
    });
}
function loadTop100() {
    return fetch('./resources/top100.json')
        .then(response => {
        if (!response.ok) {
            console.log('Failed to fetch top100.json');
            return [];
        }
        return response.json();
    })
        .then(top100JSON => top100JSON)
        .catch(error => {
        console.error(error);
        return [];
    });
}
async function getLikedGraph(useTop100) {
    const games = await (useTop100 ? loadTop100() : loadTop40());
    const likedGraph = {
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
export { loadTop40, loadTop100, getLikedGraph };
