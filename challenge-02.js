// ?· Sólo usa letras minúsculas y dígitos.
// ?· Nunca usa dígitos después de una letra (Una vez aparecen letras, la contraseña debe continuar solo con letras)
// ?· Si usa dígitos, siempre los usa de forma igual o creciente (si sale un 3, ya no usará después un número menor)
// ?· Si usa letras, siempre las usa en orden alfabético igual o creciente (si sale una "b" ya no podrá usar una "a", por ejemplo)
// Algunos ejemplos para que lo entiendas perfectamente:
// 1234     -> true
// abc      -> true
// aabbcc   -> true (repite pero siempre ascendente)
// 112233   -> true (repite pero siempre ascendente)
// a123     -> false (un número después de una letra)
// 123abc   -> true
// dbce     -> false (una "d" y después una "b")
const fs = require('fs');
const data = fs.readFileSync('log.txt', 'utf8');
const cleanedData = data.replace(/\\n/g, ''); 
const cleanedDataWithoutNewlines = cleanedData.replace(/\r?\n|\r/g, '');  
const linesArray = cleanedData.split('\n'); 
console.log(cleanedDataWithoutNewlines); 
console.log(linesArray); 

function truePassword(linesArray) {
  let validPasswords = 0;
  let invalidPasswords = 0;
  for (let i = 0; i < linesArray.length; i++) {
    const password = linesArray[i];
    if (!/^[a-z0-9]+$/.test(password)) {
      invalidPasswords++;
      continue;
    }
    let hasLetter = false;
    let lastLetter = '';
    let lastDigit = -1;
    let isValid = true;

    for (let j = 0; j < password.length; j++) {
      const char = password[j];
      if (char >= 'a' && char <= 'z') {
        if (hasLetter && char < lastLetter) {
          isValid = false;
          break;
        }
        lastLetter = char;
        hasLetter = true;
      }
      else if (char >= '0' && char <= '9') {
        if (hasLetter) {
          isValid = false;
          break;
        }
        if (char < lastDigit) {
          isValid = false;
          break;
        }
        lastDigit = char;
      }
    }

    if (isValid) {
      validPasswords++;
    } else {
      invalidPasswords++;
    }
  }

  return `submit ${validPasswords}true${invalidPasswords}false`;
}

const result = truePassword(linesArray);
console.log(result);