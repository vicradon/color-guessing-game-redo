/* helpers */
const $ = node => document.querySelector(node);
const $$ = node => document.querySelectorAll(node);
const log = node => console.log(node);
const aev = (node, event, func) => node.addEventListener(event, func);

/* COLOR ARRAY */
const rand_strings = () => ['rgb(23, 67, 23)'];
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
//log(Math.floor(Math.random()*6));

const easy = $('.easy');
const hard = $('.hard');
const dom_colors = $('.colors');
const display_color = $$('.displayed-color');
const correctColor = $('.current-color');
const got_it = $('.got-it');
const score = $('.score');
const lives = $('.lives');
const header = $('header');

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



const do_the_coloring = () => {
  const colorList = generate_colors(6);
  const rand_color = Math.floor(Math.random() * 6);
  colorList.forEach((item, index) => {
    display_color[index].style.backgroundColor = item;
  });
  got_it.textContent = '';
  const correct_color_value = colorList[rand_color];
  correctColor.textContent = correct_color_value;
}

do_the_coloring();

const correct_ans = node => {
  header.style.backgroundColor = node.style.backgroundColor;
  display_color.forEach(item => item.style.backgroundColor = node.style.backgroundColor);
  got_it.textContent = 'Correct!';

  display_color.forEach(item => item.removeEventListener('click', log('still not working')));
  score.textContent = Number(score.textContent) + 1;
  setTimeout(do_the_coloring, 1500);
}

const wrong_ans = node => {
  return got_it.textContent = 'Wrong!';
}


