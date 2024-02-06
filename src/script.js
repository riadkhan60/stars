const canva = document.querySelector('#canva1');

canva.width = window.innerWidth;
canva.height = window.innerHeight;
const ctx = canva.getContext('2d');

ctx.fillStyle = '#FFFFFF';
ctx.strokeStyle = '#FFFFFF';

const mousePosition = {
  x: undefined,
  y: undefined,
};

class Effect {
  constructor() {
    this.numberOfParticles = 5;
    this.particles = [];
    // this.init();
  }

  init() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle());
    }
  }

  removeOldParticles() {
    if (this.particles.length > 10000) {
      for (let i = this.particles.length; i > 10000; i--) {
        this.particles.shift();
      }
    }
  }
}

const effect = new Effect();

document.addEventListener('touchmove', (e) => {
  effect.removeOldParticles();
  mousePosition.x = e.changedTouches[0].clientX;
  mousePosition.y = e.changedTouches[0].clientY;
  effect.init();
});
document.addEventListener('mousemove', (e) => {
  effect.removeOldParticles();

  mousePosition.x = e.x;
  mousePosition.y = e.y;
  effect.init();
});

class Particle {
  constructor() {
    this.x = mousePosition.x;
    this.y = mousePosition.y;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.radius = Math.random() * 5;
  }

  draw(conetext) {
    conetext.beginPath();
    conetext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    conetext.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.radius > 1) {
      this.radius--;
    }
  }
}

function handleParticles() {
  effect.particles.forEach((particle) => {
    particle.update(ctx);
    particle.draw(ctx);
  });
}

function animate() {
  ctx.clearRect(0, 0, canva.width, canva.height);
  // ctx.fillStyle = 'rgba(0,0,0,0.6)';
  // ctx.fillRect(0, 0, canva.width, canva.height);
  handleParticles();
  requestAnimationFrame(animate);
}

animate();
