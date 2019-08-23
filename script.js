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
const correctColor = $('.current-color');
const got_it = $('.got-it');
const score = $('.score');
const lives = $('.lives');
const header = $('header');
const mode = $$('.mode');

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
const difficulty = {
  easy: 3,
  hard: 6
}
const handle_difficulty = (mode) => difficulty[mode];
let how_difficult = 'easy';

mode.forEach(item => item.addEventListener('click', () => {
  if (!(Array.from(item.classList).includes('active'))) {
    mode.forEach(item => item.classList.remove('active'));
    item.classList.add('active');
  }
}));

const init = () => {
  square.forEach(item => item.style.backgroundColor = 'none');
  
  if (how_difficult === 'easy') {
    let arr = generate_colors(handle_difficulty(how_difficult));
    for (let i = 0; i < handle_difficulty('easy'); i++){
      square[i].style.backgroundColor = arr[i];
    }
  }
  square.forEach(item => {
    if(item.style.backgroundColor === 'none'){
      item.style.display = 'none'
    }
    else {
      item.style.display = 'block'
    }
  });
  if (how_difficult === 'hard') {
    let arr = generate_colors(handle_difficulty(how_difficult));
    for (let i = 0; i < handle_difficulty('hard'); i++){
      square[i].style.backgroundColor = arr[i];
    }
  }
}
init();
mode.forEach(item => aev(item, 'click', e => {
  Array.from(e.target.classList).includes('easy')?how_difficult = 'easy':how_difficult = 'hard';
  init();
}));
// init()


//log(Math.floor(Math.random()*6));

/*

easy.onclick = () => {
  dom_colors.classList.remove('colors');
  dom_colors.classList.add('colors_easy');
  hard.classList.remove('active-difficulty');
  easy.classList.add('active-difficulty');
}
hard.onclick = () => {
  dom_colors.classList.remove('colors_easy');
  dom_colors.classList.add('colors');
  hard.classList.add('active-difficulty');
  easy.classList.remove('active-difficulty');
}



const do_the_coloring = (num) => {
  const colorList = generate_colors(num);
  const random_number = Math.floor(Math.random() * num);
  colorList.forEach((item, index) => {
    display_color[index].style.backgroundColor = item;
  });
  got_it.textContent = '';
  const correct_color_value = colorList[random_number];
  correctColor.textContent = correct_color_value;
}

do_the_coloring(6);

const correct_ans = node => {
  header.style.backgroundColor = node.style.backgroundColor;
  display_color.forEach(item => item.style.backgroundColor = node.style.backgroundColor);
  got_it.textContent = 'Correct!';

  display_color.forEach(item => item.removeEventListener('click', log('still not working')));
  score.textContent = Number(score.textContent) + 1;
  setTimeout(do_the_coloring, 1500);
}

const remove_event = () => {
  return got_it.textContent = 'Wrong!';
}


*/