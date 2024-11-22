const fs = require('fs');
function countSteps(instructions) {
  let steps = 0;
  let position = 0;
  let instructionsCopy = [...instructions]; 

  while (position >= 0 && position < instructionsCopy.length) {
    let move = instructionsCopy[position];
    instructionsCopy[position]++; 
    position += move;
    steps++;
  }

  return steps;
}
function processAllInstructions(filePath) {
  const logContent = fs.readFileSync(filePath, 'utf8');
  const lines = logContent.split('\n'); 

  let totalSteps = 0;
  let lastLineSteps = 0;

  lines.forEach((line, index) => {
    const instructions = line.split(' ').map(Number); 
    const steps = countSteps(instructions); 
    totalSteps += steps; 

    if (index === lines.length - 1) {
      lastLineSteps = steps;
    }
  });
  return `submit ${totalSteps}-${lastLineSteps}`;
}

const result = processAllInstructions('trace.txt');
console.log(result);
