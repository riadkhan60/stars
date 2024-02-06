const nav = document.querySelector('nav');

const Observer = new IntersectionObserver((x) => {
  let [entry] = x;
  if (entry.isIntersecting) {
    nav.classList.add('fixed');
  } else {
    nav.classList.remove('fixed');
  }
}, {
  threshold: 0.4
});

console.log(Observer);

Observer.observe(document.querySelector('.hero-section-2'));


const section = document.querySelector('.hero-section-2');


