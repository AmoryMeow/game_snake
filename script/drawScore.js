const scoreSelector = ".score";
const digitSelector = ".digit";
const blockSelector = ".digit__block";
const activeSelector = "digit__block_active";

const digits = {};

const set = {
  1: ['block3', 'block6'],
  2: ['block1', 'block3', 'block4', 'block5', 'block7'],
  3: ['block1', 'block3', 'block4', 'block6', 'block7'],
  4: ['block2', 'block3', 'block4', 'block6'],
  5: ['block1', 'block2', 'block4', 'block6', 'block7'],
  6: ['block1', 'block2', 'block4', 'block5', 'block6', 'block7'],
  7: ['block1', 'block3', 'block6'],
  8: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7'],
  9: ['block1', 'block2', 'block3', 'block4', 'block6', 'block7'],
  0: ['block1', 'block2', 'block3', 'block5', 'block6', 'block7'],
}

const score = document.querySelector(scoreSelector);
const digitList = Array.from(score.querySelectorAll(digitSelector));
const maxNumber = 10 ** digitList.length -1;

digitList.forEach((item, i) => {
  const num = digitList.length - i - 1;
  digits[10 ** num] = item;
})

function clearScore() {
  Object.values(digits).forEach((item) => {
    const blocks = Array.from(item.querySelectorAll(blockSelector));
    blocks.forEach((block) => {
      block.classList.remove(activeSelector);
    })
  })
}

function drawNumber(digit, num) {

  set[num].forEach((blockId) => {
    const block = digit.querySelector(`#${blockId}`);
    block.classList.add(activeSelector);
  })

  const blocks = Array.from(digit.querySelectorAll(blockSelector));

}

export function drawScore(number) {
  if (number > maxNumber) {
    number = maxNumber
  }

  clearScore();
  let num = number
  let count = 1;

  while (num > 0) {

    let rem = num % 10;
    num = (num - rem) / 10;

    drawNumber(digits[count], rem);

    count *= 10;
  }


}

