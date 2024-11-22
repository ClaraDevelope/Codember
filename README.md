# Ejercicios de [Codember]

Aquí están los ejercicios que he completado para el challenge [Codember].

## Ejercicio 1: [¡Consigue acceso a la terminal!]

![Imagen del Challenge](https://user-images.githubusercontent.com/92958760/202008443-71b08dcb-bf48-4da9-96c3-9fc7478042e2.png)

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

```text
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
