# Ejercicios de [Codember]

![Imagen del Challenge](https://user-images.githubusercontent.com/92958760/202008443-71b08dcb-bf48-4da9-96c3-9fc7478042e2.png)

Aquí están los ejercicios que he completado para el challenge [Codember].

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






