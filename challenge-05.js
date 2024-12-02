// Necesitamos encontrar los números que cumplen las siguientes condiciones:
//? El número es primo.
//? La suma de sus dígitos también es un número primo.
//? Tu tarea es escribir un programa que encuentre cuántos números de la lista cumplen con estas condiciones y determinar cuál es el tercer número que cumple con ellas al recorrer la lista en orden ascendente.
// Si tuviéramos la lista: 11,12,13,14
// 11: Es primo. 1 + 1 = 2, que es primo. → Cumple.
// 12: No es primo. → No cumple.
// 13: Es primo. 1 + 3 = 4, que no es primo. → No cumple.
// 14: No es primo. → No cumple.
const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

const findTraitor = (nodos) => {
  const suspiciousNumbers = [];

  for (let i = 0; i < nodos.length; i++) {
    const num = nodos[i];

    if (isPrime(num)) {
      const numString = num.toString();
      let sum = 0;
      for (let j = 0; j < numString.length; j++) {
        sum += parseInt(numString[j]);
      }

      if (isPrime(sum)) {
        suspiciousNumbers.push(num);
      }
    }
  }

  if (suspiciousNumbers.length >= 3) {;
    return `submit ${suspiciousNumbers.length}-${ suspiciousNumbers[2]} ` 
  } else {
    console.log("No hay tercer número.");
  }
};


const nodos = [13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,155,156,157,158,175,176,177,178,179,180,181,182,183,184,195,196]
console.log(findTraitor(nodos));
