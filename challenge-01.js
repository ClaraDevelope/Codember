const password = 'URDURUDRUDLLLLUUDDUDUDUDLLRRRR';
const clave = '528934712834'.split('').map(Number);
console.log(clave);

let pointer = 0;

for (const symbol of password) {
  if (symbol === 'R') {
    pointer = (pointer + 1) % clave.length;
  } else if (symbol === 'L') {
    pointer = (pointer - 1 + clave.length) % clave.length;
  } else if (symbol === 'U') {
    clave[pointer] = (clave[pointer] + 1) % 10;
  } else if (symbol === 'D') {
    clave[pointer] = (clave[pointer] + 9) % 10;
  }
}

console.log(clave.join(''));

