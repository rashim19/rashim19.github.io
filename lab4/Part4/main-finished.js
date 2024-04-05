// set up canvas
const para1 = document.querySelector(".player1");
const para2 = document.querySelector(".player2");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function Shape(x, y, velX, velY, exist) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exist = exist;
}
function Ball(x, y, velX, velY, color, size, exist) {
  Shape.call(this, x, y, velX, velY, exist);
  this.color = color;
  this.size = size;
}
Ball.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};
Ball.prototype.update = function () {
  this.x += this.velX;
  this.y += this.velY;
  if (this.size + this.x >= width) {
    this.velX = -this.velX;
  } else if (this.x - this.size <= 0) {
    this.velX = -this.velX;
  } else if (this.size + this.y >= height) {
    this.velY = -this.velY;
  } else if (this.y - this.size <= 0) {
    this.velY = -this.velY;
  }
  Ball.prototype.collision = function () {
    for (let k = 0; k < balls.length; k++) {
      if (!(this === balls[k])) {
        const dx = this.x - balls[k].x;
        const dy = this.y - balls[k].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[k].size) {
          balls[k].color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(
            0,
            255
          )})`;
        }
      }
    }
  };
  function Blackhole(x, y, velX, velY, color, size, exist) {
    Shape.call(this, x, y, 20, 20, exist);
    this.color = "white";
    this.size = 15;
  }
  Blackhole.prototype.draw = function () {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  };

  Blackhole.prototype.setBound = function () {
    if (this.x + this.size >= width) {
      this.x -= this.size;
    } else if (this.x - this.size <= 0) {
      this.x += this.size;
    } else if (this.y + this.size >= height) {
      this.y -= this.size;
    } else if (this.y - this.size <= 0) {
      this.y += this.size;
    }
  };
  Blackhole.prototype.control = function () {
    let presskey = this;
    window.onkeypress = function (e) {
      if (e.key === "a") {
        presskey.x -= presskey.velX;
      }
      if (e.key === "d") {
        presskey.x += presskey.velX;
      }
      if (e.key === "w") {
        presskey.y -= presskey.velY;
      }
      if (e.key === "s") {
        presskey.y += presskey.velY;
      }
    };
  };

  function Redhole(x, y, velX, velY, color, size, exist) {
    Shape.call(this, x, y, 20, 20, exist);
    this.color = "red";
    this.size = 15;
  }
  Redhole.prototype.draw = function () {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  };
  

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
