const fs = require('fs')
const data = fs.readFileSync('network.txt', 'utf8')
const nodos = JSON.parse(data)
export const nodosAlive = (nodos) => {
  const map = new Map();
  for (let i = 0; i < nodos.length; i++) {
    const [nodo1, nodo2] = nodos[i];

    if (!map.has(nodo1)) map.set(nodo1, []);
    if (!map.has(nodo2)) map.set(nodo2, []);

    map.get(nodo1).push(nodo2);
    map.get(nodo2).push(nodo1);
  }

  const visited = new Set();
  const groups = [];

  const exploreGroup = (start) => {
    const stack = [start];
    const group = [];

    while (stack.length > 0) {
      const current = stack.pop();
      if (!visited.has(current)) {
        visited.add(current);
        group.push(current);

        for (const neighbor of map.get(current)) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }

    return group;
  };

  for (const nodo of map.keys()) {
    if (!visited.has(nodo)) {
      const group = exploreGroup(nodo);
      groups.push(group);
    }
  }
  const safeNodes = groups
    .filter(group => group.length < 3) 
    .flat(); 

  safeNodes.sort((a, b) => a - b);
  return safeNodes.join(',');
};


console.log(nodosAlive(nodos));
