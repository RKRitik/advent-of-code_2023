/* document input
ex:
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

On each line, elf shows some cubes, each line is one game
for each game, elf show cubes multiple times, separated by semicolon
if total cubes are 12 red cubes, 13 green cubes, and 14 blue cubes
find the sum of ids of valid games
ID = game number
*/

import { input } from "./input";

const dataInput: string = input || "";

type ColorType = "blue" | "red" | "green";
let maxData: Record<ColorType, number> = {
  red: 12,
  blue: 14,
  green: 13,
};

let games = dataInput.split("\n");

function isValidGame(game: string): { valid: boolean; id: string } {
  let [gameId, gameTurns] = game.split(":");
  let [_, id] = gameId.split(" ");
  let turns = gameTurns.split(";");
  return {
    id,
    valid: !turns.some((turn) => {
      // convert forEach() to some() function
      let marbles = turn.split(",");
      marbles = marbles.map((m) => m.trim()); // remove spaces //["12 red", "13 green", "14 blue"]
      let valid = !marbles.some((m) => {
        let [count, type] = m.split(" "); // ["12","red"] etc
        let maxForCurrent = maxData[type as ColorType];
        return parseInt(count) > maxForCurrent;
      });
      return !valid;
    }),
  };
}

let result = 0;

games.forEach(game => {
  let { id, valid } = isValidGame(game);
  console.log("game :", game, "valid : ", valid , " id ",id);
  if (valid) {
    result += parseInt(id);
  }
 });

console.log(result);
