var ps;

function setup() {
  createCanvas(600,600);
  ps = new System(createVector(300,300));
  Particle(createVector(300,300));
  background(0);
}

function draw() {
  //background(0);
  ps.run();
}

var Particle = function(startPos) {
  this.speed = createVector(0,1);
  this.acceleration = createVector();
  this.position = startPos.copy();
  this.age = 0;
  this.r = random(0,255);
  this.g = random(0,255);
  this.b = random(0,255);
  this.startLine = startPos.copy();
}

Particle.prototype.tracking = function() {
  //The math - https://love2d.org/wiki/Tutorial:Fire_Toward_Mouse
  angle = Math.atan2(mouseX - this.position.x,mouseY - this.position.y);
  this.acceleration.y = .1*Math.cos(angle);
  this.acceleration.x = .1*Math.sin(angle);
}

Particle.prototype.movement = function() {
  this.speed.add(this.acceleration);
  this.position.add(this.speed);
}

Particle.prototype.draw = function() {
  stroke(this.r,this.g,this.b);
  //stroke(255);
  line(this.startLine.x,this.startLine.y,this.position.x,this.position.y);
  this.startLine = this.position.copy();
  //ellipse(this.position.x,this.position.y,1,1);
}

Particle.prototype.run = function() {
  this.tracking();
  this.movement();
  this.draw();
}

var System = function(position) {
  this.start = position.copy();
  this.allParticles = [];
  this.timer  = 0;
  // for (var i=0;i<400;i++) {
  //   this.allParticles.push(new Particle(createVector(random(1,600),random(0,600))));
  // }
};

System.prototype.run = function() {
  this.timer += 1;
  if (this.timer<100) {
    this.allParticles.push(new Particle(this.start));
  }
  console.log();
  for (var i = this.allParticles.length-1; i >= 0; i--) {
    var particles = this.allParticles[i];
    particles.run();
  }
};
