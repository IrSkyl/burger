const prev = document.getElementById('btn__prev'),
      next = document.getElementById('btn__next'),
      slides = document.querySelectorAll('.slide'),
      dots = document.querySelectorAll('.dot');

let index = 0;
let sl = true;

const activeSlide = n => {
  for(slide of slides) {
      slide.classList.remove('active');
  }   
  slides[n].classList.add('active');  
}
  
const activeDot = n => {
  for(dot of dots) {
    dot.classList.remove('active');
  }
  dots[n].classList.add('active');
}

const prepareCurrentSlide = ind => {
  activeDot(ind);
  activeSlide(ind);
}

const nextSlide = () => {
  if(index == slides.length - 1) {
    index = 0;
    prepareCurrentSlide(index);
  } else {
    index++;
    prepareCurrentSlide(index);
  }
}

const prevSlide = () => {
  if(index == 0) {
    index = slides.length - 1;
    prepareCurrentSlide(index);
  } else {
    index--;
    prepareCurrentSlide(index);
  }
}

dots.forEach((item,indexDot) => {
    item.addEventListener('click', () => {
      index = indexDot;
      prepareCurrentSlide(index);
      clearInterval(interval);
    })
});


next.addEventListener('click', nextSlide2);
prev.addEventListener('click', prevSlide);

const interval = setInterval(nextSlide, 2000);

 