# Ejercicios de [Codember 2024]

![Imagen del Challenge](https://user-images.githubusercontent.com/92958760/202008443-71b08dcb-bf48-4da9-96c3-9fc7478042e2.png)

# Codember 2024

Aquí están los ejercicios que he completado para el challenge [Codember](https://codember.dev/) creado por [@midudev](https://github.com/midudev) para la comunidad.

## Ejercicio 1: [¡Consigue acceso a la terminal!]

**Estamos en problemas. La IA ΩMEGA está descontrolada.** Por suerte, he conseguido añadir una contraseña para evitar que acceda a esta terminal. El sistema no es difícil, pero nos debería dar el tiempo suficiente.

Te voy a dar una lista de números y, al lado, los movimientos que debes hacer en estos números. Imagina los candados numéricos esos que van con combinaciones. El número de la izquierda es la combinación inicial y las cadenas de texto de la derecha son los movimientos que debes hacer. Siempre empezamos del primer número de la izquierda. Los movimientos son:

- **R (Right)**: movernos al siguiente dígito
- **L (Left)**: desplazarnos al dígito anterior
- **U (Up)**: incrementar ese dígito
- **D (Down)**: decrementar el dígito actual

Si llegamos a la derecha del todo y recibimos un **R**, volvemos al primer dígito. Si recibimos **L** y estamos en el primero, vamos al último. En el caso de que el dígito actual sea **9** y recibamos una **U**, pasará a **0**. Y si es **D** y ese dígito es **0**, pasará a ser **9**.

¿Lo entiendes? ¡Es muy importante que lo entiendas! Mira, te dejo unos ejemplos:

- `000 URURD -> 119`
- `1111 UUURUUU -> 4411`
- `9999 LULULULD -> 8000`

¿Lo captas? Vale, pues para desbloquear la terminal debes enviar el número al ejecutar esta combinación:

`528934712834 URDURUDRUDLLLLUUDDUDUDUDLLRRRR`

¡Date prisa! ¡No tenemos mucho tiempo!

```javascript
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


```
## Desafío 2: Detectando acceso no deseado

Creo que **ΩMEGA** está intentando entrar en el sistema. Por ahora, es un bebé y está siguiendo patrones muy sencillos que podemos detectar, pero está intentando crear contraseñas de administrador para acceder a la terminal.

¿Cómo podemos detectar estos intentos de acceso? Está siguiendo estos patrones:

- Sólo usa letras minúsculas y dígitos.
- Nunca usa dígitos después de una letra (una vez aparecen letras, la contraseña debe continuar solo con letras).
- Si usa dígitos, siempre los usa de forma igual o creciente (si sale un 3, ya no usará después un número menor).
- Si usa letras, siempre las usa en orden alfabético igual o creciente (si sale una "b", ya no podrá usar una "a", por ejemplo).

Algunos ejemplos para que lo entiendas perfectamente:

- `1234 -> true`
- `abc -> true`
- `aabbcc -> true` (repite pero siempre ascendente)
- `112233 -> true` (repite pero siempre ascendente)
- `a123 -> false` (un número después de una letra)
- `123abc -> true`
- `dbce -> false` (una "d" y después una "b")

Accede a este archivo `log.txt` con una lista de intentos y usa un programa para contar cuántos han sido inválidos y cuántos válidos. Envía la respuesta usando el comando `submit`.
Por ejemplo, si hay 10 intentos válidos y 5 inválidos envía el comando submit 10true5false

### Código para resolver el desafío:

```javascript
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
```
## Desafío 3: ¡Siguiendo la pista de la IA ΩMEGA!

La IA maligna ΩMEGA está causando problemas en el sistema de control de la empresa. Estamos siguiendo su rastro y necesitamos averiguar cuántos pasos ha tomado para llegar a la salida (ya sea por la izquierda o por la derecha).

ΩMEGA cuenta con una lista de instrucciones de salto. Cada instrucción indica el número de posiciones que debe moverse en esa misma lista.

- Número positivo: ΩMEGA avanza ese número de posiciones.
- Número negativo: Retrocede ese número de posiciones.
- Cero: Se queda en la misma posición (pero cuenta como movimiento).

Importante: Cada vez que ΩMEGA lee una instrucción, incrementa el valor de esa instrucción en 1 después de usarla.

- Si encuentra un 2, avanza 2 posiciones y luego esa instrucción se convierte en 3.
- Si encuentra un 0, se queda en su posición y luego esa instrucción se convierte en 1.
- Si encuentra un -3, retrocede 3 posiciones y luego esa instrucción se convierte en -2.

Voy a darte un ejemplo. Entre paréntesis te indicaré la instrucción actual en la que se encuentra ΩMEGA.

Lista de instrucciones: 1 2 4 1 -2

Inicio: (1) 2 4 1 -2 // → ΩMEGA empieza en la posición 0  
Paso 1: 2 (2) 4 1 -2 // → Avanza una posición y la instrucción se convierte en 2  
Paso 2: 2 3 4 (1) -2 // → Avanza 2 posiciones y la instrucción se convierte en 3  
Paso 3: 2 3 4 2 (-2) // → Avanza una posición y la instrucción se convierte en 2  
Paso 4: 2 3 (4) 2 -1 // → Retrocede dos posiciones y pasa a -1  
Paso 5: 2 3 4 2 -1 // → Avanza 4 posiciones y escapa  
Resultado: 5

Otro ejemplo con lista de instrucciones: 0 1 2 3 -1

Inicio: (0) 1 2 3 -1 // → ΩMEGA empieza en la posición 0  
Paso 1: (1) 1 2 3 -1 // → No avanza pero incrementa la instrucción en 1  
Paso 2: 2 (1) 2 3 -1 // → Avanza una posición y la instrucción se convierte en 2  
Paso 3: 2 2 (2) 3 -1 // → Avanza una posición y la instrucción se convierte en 2  
Paso 4: 2 2 3 3 (-1) // → Avanza dos posiciones y la instrucción se convierte en 3  
Paso 5: 2 2 3 (3) 0 // → Retrocede una posición y la instrucción se convierte en 0  
Paso 6: 2 2 3 4 0 // → Avanza tres posiciones y escapa  
Resultado: 6

Otro ejemplo saliendo por la izquierda: 1 -2 5

Inicio: (1) -2 5 // → ΩMEGA empieza en la posición 0  
Paso 1: 2 (-2) 5 // → Avanza una posición y la instrucción se convierte en 1  
Paso 2: 2 -1 5 // → Retrocede dos posiciones y sale por la izquierda  
Resultado: 2

¡Ten en cuenta que, si la lista empieza por un número negativo, entonces ΩMEGA saldrá por la izquierda en un sólo paso!

Accede a este `trace.txt`. Tiene una lista de los movimientos que realizó ΩMEGA separados por salto de línea. Necesito que calcules los pasos que necesita ΩMEGA para salir de cada instrucción por línea, que sumes todos los resultados y me digas el resultado final de pasos que necesita ΩMEGA en total y el resultado de la última línea, separado por guión.

Por ejemplo, si necesitó 99 pasos en total sumando los pasos de cada línea y para la instrucción de la última línea necesitó 13 pasos entonces la solución a enviar sería:


### Código para resolver el desafío:

```javascript
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
```

Este código procesa el archivo `trace.txt` y calcula los pasos necesarios para que ΩMEGA escape de cada línea. Al final, muestra el total de pasos y el resultado de la última línea.


Desafío 4: Evitando el caos en la red
¡La IA maligna ΩMEGA está atacando la red de nodos de la empresa! Cada nodo tiene un identificador único que es un número entero y está conectado a otros nodos, formando una compleja estructura.
ΩMEGA está destruyendo todas las redes que consten de 3 nodos o más conectados entre sí. ¡Hay que descubrir qué nodos están a salvo de sus ataques!

¿Cómo funciona la red?

La red se representa como una lista de pares de conexiones entre nodos. Por ejemplo:

Entrada: [[1, 2], [2, 3], [4, 5]]
Esto significa:

El nodo 1 está conectado al nodo 2.
El nodo 2 está conectado al nodo 3.
El nodo 4 está conectado al nodo 5.
En este caso:

Los nodos 1, 2 y 3 forman un grupo conectado.
Los nodos 4 y 5 forman otro grupo conectado.
Ejemplo 1

Entrada: [[1, 2], [2, 3], [4, 5]]
Redes: [1, 2, 3] y [4, 5]
ΩMEGA destruye la red [1, 2, 3]
Nodos a salvo: 4 y 5
Salida: [4, 5]
Ejemplo 2

Entrada: [[1, 2], [2, 3], [3, 4]]
Redes: [1, 2, 3, 4]
ΩMEGA destruye la red [1, 2, 3, 4]
Nodos a salvo: ninguno
Salida: []
Ejemplo 3

Entrada: [[4, 6], [7, 9], [10, 12], [12, 16]]
Redes: [4, 6], [7, 9], [10, 12, 16]
ΩMEGA destruye la red [10, 12, 16]
Nodos a salvo: 4, 6, 7 y 9
Salida: [4, 6, 7, 9]
¿Qué debes hacer?

Accede al archivo network.txt, que contiene una lista de conexiones entre nodos. Envía la lista de nodos ordenados de forma ascendente, separado por comas y sin espacios, que se han salvado del ataque. Por ejemplo, del Ejemplo 1 enviarías a la terminal submit 4,5.

Pista: Hay 70 nodos a salvo... ¡ahora sólo falta saber cuáles son!

```javascript
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
```

Desafío 5: ¡Encuentra a ΩMEGA!
La IA maligna ΩMEGA está acorralada. Tras revisar todos los nodos sanos de la red en el reto anterior... ¡hemos detectado que ΩMEGA se ha escondido en uno!

No sabemos exactamente cuál es... pero sabemos las reglas que ha seguido ΩMEGA para esconderse.

Necesitamos encontrar los números que cumplen las siguientes condiciones:

El número es primo.
La suma de sus dígitos también es un número primo.
Tu tarea es escribir un programa que encuentre cuántos números de la lista cumplen con estas condiciones y determinar cuál es el tercer número que cumple con ellas al recorrer la lista en orden ascendente.

Ejemplo:

Si tuviéramos la lista: 11,12,13,14

11: Es primo. 1 + 1 = 2, que es primo. → Cumple.
12: No es primo. → No cumple.
13: Es primo. 1 + 3 = 4, que no es primo. → No cumple.
14: No es primo. → No cumple.
En este caso, solo un número cumple las condiciones, y ese número sería el primero (11).

¿Qué debes hacer?

Analiza la lista de nodos del resultado del reto anterior y encuentra todos los números que cumplen las condiciones.
Determina cuántos números cumplen las condiciones.
Identifica el tercer número que cumple las condiciones al recorrer la lista en orden ascendente.
Respuesta:

Envía el número total de números que cumplen las condiciones y el tercer número encontrado, separados por un guión. Por ejemplo, si hay 4 números que cumplen y el tercer número es 11, enviarías: submit 4-11
```javascript
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
```

