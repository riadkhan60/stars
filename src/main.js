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

let hue = 1;

class Effect {
  constructor() {
    this.numberOfParticles = 40;
    this.particles = [];
    // this.init();
  }

  init() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle());
    }
  }
}

const effect = new Effect();

window.addEventListener('mousemove', (e) => {
  mousePosition.x = e.x;
  mousePosition.y = e.y;
  effect.init();
  hue+= 5;
});

class Particle {
  constructor() {
    this.x = mousePosition.x;
    this.y = mousePosition.y;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.radius = Math.random() * 15;
    // this.colors = ['#336fde', '#1723ff', '#aa17ff'];
    // this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  draw(conetext) {
    ctx.fillStyle = this.color;
    conetext.beginPath();
    conetext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    conetext.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.radius > 0.1) {
      this.radius -= 0.1;
    }
  }
}

function handleParticles() {
  for (let i = 0; i < effect.particles.length; i++) {
    effect.particles[i].update(ctx);
    effect.particles[i].draw(ctx);

    // for (let j = i; j < effect.particles.length; j++) {
    //   const xPosition = effect.particles[i].x - effect.particles[j].x;
    //   const yPosition = effect.particles[i].y - effect.particles[j].y;
    //   const distance = Math.sqrt(xPosition * xPosition + yPosition * yPosition);
    //   if (distance < 100) {
    //     ctx.strokeStyle = effect.particles[i].color;
    //     ctx.lineWidth = 0.2;
    //     ctx.beginPath();
    //     ctx.moveTo(effect.particles[i].x, effect.particles[i].y);
    //     ctx.lineTo(effect.particles[j].x, effect.particles[j].y);
    //     ctx.closePath();
    //     ctx.stroke();
    //   }
    // }
    if (effect.particles[i].radius < 0.3) {
      effect.particles.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  // ctx.clearRect(0, 0, canva.width, canva.height);
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, 0, canva.width, canva.height);
  handleParticles();
  requestAnimationFrame(animate);
}

animate();
