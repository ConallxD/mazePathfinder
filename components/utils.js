export class utils {
  static diceRoll(maxNum) {
    let rand = Math.round(Math.random() * maxNum);
    return rand;
  }
}
