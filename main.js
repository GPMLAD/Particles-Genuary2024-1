const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resizeScreen = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("resize", resizeScreen);
let particles = [];

const colors = ["#37DC94", "#162C9B", "#FF5126"];

const mousePosition = { x: canvas.width / 2, y: canvas.height / 2 };

canvas.addEventListener("mousemove", (e) => {
  mousePosition.x = e.offsetX;
  mousePosition.y = e.offsetY;
});

class Particle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.radians = Math.random() * 2 * Math.PI;
    this.omega = 0.02;
    this.amp = Math.random() * 170 + 50;
    this.previousMouse = { x: mousePosition.x, y: mousePosition.y };
  }

  update() {
    this.radians += this.omega;

    const previousPosition = { x: this.x, y: this.y };

    this.previousMouse.x += (mousePosition.x - this.previousMouse.x) * 0.05;
    this.previousMouse.y += (mousePosition.y - this.previousMouse.y) * 0.05;

    this.x = this.previousMouse.x + Math.cos(this.radians) * this.amp;
    this.y = this.previousMouse.y + Math.sin(this.radians) * this.amp;

    this.draw(previousPosition);
  }

  draw(previousPosition) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.beginPath();
    ctx.moveTo(previousPosition.x, previousPosition.y);
    ctx.lineTo(this.x, this.y);
    ctx.closePath();
    ctx.stroke();
    //ctx.fillStyle = this.color;
    //ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

const clearScreen = () => {
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const init = (arr, num) => {
  for (let i = 0; i < num; i++) {
    arr.push(
      new Particle(
        mousePosition.x,
        mousePosition.y,
        Math.random() * 10 + 5,
        colors[Math.floor(Math.random() * colors.length)]
      )
    );
  }
};

init(particles, 200);

const animate = () => {
  clearScreen();
  particles.forEach((particle) => {
    particle.update();
  });
  requestAnimationFrame(animate);
};
resizeScreen();
animate();
