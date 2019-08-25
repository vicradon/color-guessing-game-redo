console.log("this is the aaa branch");
/* helpers */
const $ = node => document.querySelector(node);
const $$ = node => document.querySelectorAll(node);
const log = node => console.log(node);
const aev = (node, event, func) => node.addEventListener(event, func);


/* VARAIBLES */
// const easy = $('.easy');
// const hard = $('.hard');
const squares = $('.squares');
const square = $$('.square');
const correctColorNode = $('.current-color');
const got_it = $('.got-it');
const score = $('.score');
const lives = $('.lives');
const header = $('header');
const mode = $$('.mode');
const body = $('body');

/* COLOR ARRAY */
const generate_colors = num => {
  const colors = [];
  for (let i = 0; i < num; i++) {
    let rand_red = Math.floor(Math.random() * 256);
    let rand_green = Math.floor(Math.random() * 256);
    let rand_blue = Math.floor(Math.random() * 256);
    colors.push(`rgb(${rand_red}, ${rand_green}, ${rand_blue})`)
  }
  return colors;
}

const handle_difficulty = (mode) => {
  const difficulty = {
    easy: 3,
    hard: 6
  }
  return difficulty[mode]
}

let how_difficult = 'easy';

const toggle_active = () => {
  mode.forEach(item => item.addEventListener('click', () => {
    if (!(Array.from(item.classList).includes('active'))) {
      mode.forEach(item => item.classList.remove('active'));
      item.classList.add('active');
    }
  }));
}
toggle_active()

// const win = () => {
//   log(this)
//   clickedColor = this.style.backgroundColor;
//   if (clickedColor === correctColor) {
//     got_it.textContent = 'Correct!';
//     score.textContent = +score.textContent++;
//   }
//   else {
//     got_it.textContent = 'Wrong!'
//   }
// }

const gameOver = () => {
  remove_event();
  body.classList.add('game-over');
  body.textContent = "Game Over!";
  const code = `<button class = 'play-again' onclick = 'playAgain()'>Play Again?</button>`
  body.appendChild(code);
}

const uniform_colors = (correct_color) => {
  square.forEach(item => item.style.backgroundColor = correct_color);
  header.style.backgroundColor = correct_color;
}

function win() {
  clickedColor = this.style.backgroundColor;
  if (clickedColor === correctColor) {
    got_it.textContent = 'Correct!';
    score.textContent++;
    lives.textContent++;
    uniform_colors(clickedColor);
    remove_event();
  }
  else {
    got_it.textContent = 'Wrong!'
    lives.textContent--;
    if (lives.textContent < 1) {
      gameOver();
    }
  }
}


const remove_event = () => {
  square.forEach(item => item.removeEventListener('click', win));
}
const add_event = () => {
  square.forEach(item => aev(item, 'click', win))
}


const init = (value) => {
  if (value === 'easy') {
    let arr = generate_colors(handle_difficulty(how_difficult));
    correctColor = arr[Math.floor(Math.random() * arr.length)];
    correctColorNode.textContent = correctColor;
    for (let i = 0; i < handle_difficulty('easy'); i++) {
      square[i].style.backgroundColor = arr[i];
    }
    for (let i = 3; i < 6; i++) {
      square[i].style.display = 'none';
    }
  }
  if (value === 'hard') {
    let arr = generate_colors(handle_difficulty(how_difficult));
    for (let i = 0; i < handle_difficulty('hard'); i++) {
      square[i].style.backgroundColor = arr[i];
    }
    for (let i = 3; i < 6; i++) {
      square[i].style.display = 'block';
    }
  }
  add_event();
}
init(how_difficult)


mode.forEach(item => aev(item, 'click', e => {
  let a = Array.from(e.target.classList).includes('easy') ? how_difficult = 'easy' : how_difficult = 'hard';
  init(a);
}));
const playAgain = () => {
  init()
}

//log(Math.floor(Math.random()*6));

/*




const correct_ans = node => {
  header.style.backgroundColor = node.style.backgroundColor;
  display_color.forEach(item => item.style.backgroundColor = node.style.backgroundColor);
  got_it.textContent = 'Correct!';

  display_color.forEach(item => item.removeEventListener('click', log('still not working')));
  score.textContent = Number(score.textContent) + 1;

}

const remove_event = () => {
  return got_it.textContent = 'Wrong!';
}


*/