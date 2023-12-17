/*
The engine schematic (your puzzle input) consists of a visual representation of the engine. 
There are lots of numbers and symbols you don't really understand, 
but apparently any number adjacent to a symbol, 
even diagonally, is a "part number" and should be included in your sum. 
(Periods (.) do not count as a symbol.) 
*/

import { input } from "./input";

const dataInput: string = input || "";
// const dataInput: string = `467..114..
// ...*......
// ..35..6335
// ......#222`;

let dataRows = dataInput.split("\n"),
  rowLength = dataRows[0].length;
let result = 0;

// console.log(dataInput);


function checkAdjacentCharacters(dataRows: string[], rowIndex: number, columnIndex: number) {
  const numRows = dataRows.length;
  const numCols = dataRows[0].length;
  let flag = false;

  const directions = [
    [-1, 0],
    [1, 0], // Up, Down
    [0, -1],
    [0, 1], // Left, Right
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1], // Diagonals
  ];

  for (const [dx, dy] of directions) {
    const newRow = rowIndex + dx;
    const newCol = columnIndex + dy;

    if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
      let num = Number(dataRows[newRow][newCol]);
      if (dataRows[newRow][newCol] !== "." && Number.isNaN(num) ) {
        flag = true;
        break;
      }
    }
  }
  return flag;
}

let numbersFound: string[] = [];
let startIndex = -1,
  isAdjacentNumber = false ;
dataRows.forEach((row, rowIndex) => {
  startIndex = -1, isAdjacentNumber = false;
  for (let i = 0; i < rowLength; i++) {
    if (!isNaN(parseInt(row[i]))) { //
      if (startIndex === -1) startIndex = i;
      isAdjacentNumber = isAdjacentNumber ? isAdjacentNumber : checkAdjacentCharacters(
        dataRows,
        rowIndex,
        i
      );
      //if this is last column 
        if (i === rowLength-1 && startIndex !== -1 && isAdjacentNumber) {
          // found a number till end of column
          result += parseInt(row.slice(startIndex, i +1));
          numbersFound.push(row.slice(startIndex, i +1));
        }
    }
    else {
      if (startIndex === -1) continue;
      if (isAdjacentNumber) {
        result += parseInt(row.slice(startIndex, i));
        numbersFound.push(row.slice(startIndex, i));
      }
      startIndex = -1;
      isAdjacentNumber = false;
    }
  }
});

console.log(numbersFound);
console.log("result", result);
