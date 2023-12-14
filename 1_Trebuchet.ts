/* docuemnt input
ex:
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet

On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

What is the sum of all of the calibration values?
*/

import { input } from "./input";

const dataInput: string = input || "";

let len = dataInput.length;
let instructions = dataInput.split("\n");

function calculateValue(intruction: string): string {
  let first: number | undefined,
    last: number | undefined,
    len = intruction.length;
  for (let i = 0; i < len; i++) { // use two pointers,
    if (!isNaN(parseInt(intruction[i])) && first === undefined) {
      first = parseInt(intruction[i]);
    }
    if (
      !isNaN(parseInt(intruction[len - i - 1])) &&
      last === undefined
    ) {
      last = parseInt(intruction[len - i - 1]);
    }
    if (first !== undefined && last !== undefined) break;
  }
  first = first ?? 0;
  last = last ?? 0;
  return `` + first + last;
}

let value: number = 0;
value = instructions.reduce((prev, current) => prev + parseInt(calculateValue(current)), 0);

console.log('value: ' + value);