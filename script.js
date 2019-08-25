/* THINGS TO FIX 
  * ANIMATING THE WRONG TO MOVE ALONG THE HORIZONTAL
*/


/* HELPERS */
const $ = node => document.querySelector(node);
const $$ = node => document.querySelectorAll(node);
const log = node => console.log(node);
const aev = (node, event, func) => node.addEventListener(event, func);


/* VARAIBLES */
const squares = $('.squares');
const square = $$('.square');
const correctColorNode = $('.current-color');
const got_it = $('.got-it');
const score = $('.score');
const lives = $('.lives');
const header = $('header');
const mode = $$('.mode');
const body = $('body');
const modal = $('.modal');
const highScore = $('.high-score');

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
/* DIFFICULTY HANDLER */
const handle_difficulty = (mode) => {
  const difficulty = {
    easy: 3,
    hard: 6
  }
  return difficulty[mode]
}

let how_difficult = 'easy';

/*MAKE COLORS UNIFORM IN HEADER AND SQUARES*/
const uniform_colors = (correct_color) => {
  square.forEach(item => item.style.backgroundColor = correct_color);
  header.style.backgroundColor = correct_color;
}

/* WIN HANDLER */
function win() {
  clickedColor = this.style.backgroundColor;
  if (clickedColor === correctColor) {
    got_it.textContent = 'Correct!';
    score.textContent++;
    lives.textContent++;
    highScore.textContent++;
    uniform_colors(clickedColor);
    remove_event();
    setTimeout(init, 1000, how_difficult);
  }
  else {
    got_it.textContent = 'Wrong!'
    lives.textContent--;
    if (lives.textContent < 1) {
      gameOver();
    }
  }
}

/* REMOVE THE CLICK EVENT HANDLER */
const remove_event = () => {
  square.forEach(item => item.removeEventListener('click', win));
}
const add_event = () => {
  square.forEach(item => aev(item, 'click', win))
}

/* INITIALIE GAME */
const init = (value) => {
  got_it.textContent = '';
  header.style.backgroundColor = '#4682b4';
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
    correctColor = arr[Math.floor(Math.random() * arr.length)];
    correctColorNode.textContent = correctColor;
    for (let i = 0; i < handle_difficulty('hard'); i++) {
      square[i].style.backgroundColor = arr[i];
    }
    for (let i = 3; i < 6; i++) {
      square[i].style.display = 'block';
    }
  }
  add_event();
}
init(how_difficult);
const start = () => {
  got_it.textContent = '';
  lives.textContent = 4;
  score.textContent = 0;
  highScore.textContent = 0;
}
start();
/* MODE ACTIVENESS HANDLER */
const toggle_active = () => {
  mode.forEach(item => item.addEventListener('click', () => {
    if (!(Array.from(item.classList).includes('active'))) {
      mode.forEach(item => item.classList.remove('active'));
      item.classList.add('active');
    }
  }));
}
toggle_active();

/* ADD CLICK EVENT TO EACH MODE BUTTON */
mode.forEach(item => aev(item, 'click', e => {
  let a = Array.from(e.target.classList).includes('easy') ? how_difficult = 'easy' : how_difficult = 'hard';
  // init(how_difficult);
  init(a);
  start();
}));

/* GAME OVER FUNCTION */
const gameOver = () => {
  remove_event();
  modal.style.display = 'block';
}

const playAgain = () => {
  modal.style.display = 'none';
  score.textContent = 0;
  init(how_difficult);
}