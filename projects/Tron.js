var p1;
var p2;
var p1_score = 0;
var p2_score = 0;
var gameRunning = 1;

function setup() {
  createCanvas(601,601);
  background(0);
  stroke(255,255,0);
  for (var i=0;i<=600;i+=50) {
    line(i,0,i,600);
  }
  for (var i=0;i<=600;i+=50) {
    line(0,i,600,i);
  }
  p1 = new Player_1();
  p2 = new Player_2();
}

function draw() {
  background(0);
  stroke(255,255,0);
  for (var i=0;i<=600;i+=50) {
    line(i,0,i,600);
  }
  for (var i=0;i<=600;i+=50) {
    line(0,i,600,i);
  }
  angle = Math.atan2(mouseX - 300,mouseY - 300);
  if (p1.dead ==1 && p2.dead == 1) {
    gameRunning = 0;
    background(0,0,255);
  }
  else if (p1.dead == 1) {
    gameRunning = 0;
    background(255,0,0);
  }
  else if (p2.dead == 1) {
    gameRunning = 0;
    background(0,255,0);
  }
  if (gameRunning == 1) {
    p1.run();
    p2.run();
  }
  stroke(0,0,255);
  fill(0,0,255);
  text("Player 1 score = " + p1_score,15,25);
  text("Player 2 score = " + p2_score,15,50);
}

Player_1 = function() {
  this.position = createVector(1,1);
  this.angle = 1.5;
  this.trail  = [1,1];
  this.dead = 0;
}

Player_1.prototype.move = function() {
  this.position.x += 3*Math.cos(this.angle);
  this.position.y += 3*Math.sin(this.angle);
  this.trail.push(this.position.x);
  this.trail.push(this.position.y);
}

Player_1.prototype.draw = function() {
  fill(0,255,0);
  stroke(0,255,0);
  ellipse(this.position.x,this.position.y,10);
  for (var i = 0; i<this.trail.length-4;i+=2) {
    line(this.trail[i],this.trail[i+1],this.trail[i+2],this.trail[i+3]);
  }
}

Player_1.prototype.turn = function() {
  if (keyIsDown(65)) {
    this.angle -= .2;
    if (this.angle<-3.12) {
      this.angle = 3.12;
    }
  }
  if (keyIsDown(68)) {
    this.angle += .2;
    if (this.angle>3.12) {
      this.angle = -3.12;
    }
  }
}

Player_1.prototype.collision = function() {
  for (var i = 0; i<this.trail.length-8;i+=2) {
    if (collideLineCircle(this.trail[i],this.trail[i+1],this.trail[i+2],this.trail[i+3],this.position.x,this.position.y,10)) {
      this.dead = 1;
    }
  }
  for (var i = 0; i<p2.trail.length-8;i+=2) {
    if (collideLineCircle(p2.trail[i],p2.trail[i+1],p2.trail[i+2],p2.trail[i+3],this.position.x,this.position.y,10)) {
      this.dead = 1;
    }
  }
  if (this.position.x < 0 || this.position.x > 600 || this.position.y < 0 || this.position.y > 600) {
    this.dead = 1;
  }
}

Player_1.prototype.run = function() {
  this.move();
  this.turn();
  this.collision();
  this.draw();
}

Player_2 = function() {
  this.position = createVector(599,599);
  this.angle = -1.7;
  this.trail  = [599,599];
  this.dead = 0;
}

Player_2.prototype.move = function() {
  this.position.x += 3*Math.cos(this.angle);
  this.position.y += 3*Math.sin(this.angle);
  this.trail.push(this.position.x);
  this.trail.push(this.position.y);
}

Player_2.prototype.draw = function() {
  fill(255,0,0);
  stroke(255,0,0);
  ellipse(this.position.x,this.position.y,10);
  for (var i = 0; i<this.trail.length-4;i+=2) {
    line(this.trail[i],this.trail[i+1],this.trail[i+2],this.trail[i+3]);
  }
}

Player_2.prototype.turn = function() {
  if (keyIsDown(LEFT_ARROW)) {
    this.angle -= .2;
    if (this.angle<-3.12) {
      this.angle = 3.12;
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    this.angle += .2;
    if (this.angle>3.12) {
      this.angle = -3.12;
    }
  }
}

Player_2.prototype.collision = function() {
  for (var i = 0; i<this.trail.length-8;i+=2) {
    if (collideLineCircle(this.trail[i],this.trail[i+1],this.trail[i+2],this.trail[i+3],this.position.x,this.position.y,10)) {
      this.dead = 1;
    }
  }
  for (var i = 0; i<p1.trail.length-8;i+=2) {
    if (collideLineCircle(p1.trail[i],p1.trail[i+1],p1.trail[i+2],p1.trail[i+3],this.position.x,this.position.y,10)) {
      this.dead = 1;
    }
  }
  if (this.position.x < 0 || this.position.x > 600 || this.position.y < 0 || this.position.y > 600) {
    this.dead = 1;
  }
}

Player_2.prototype.run = function() {
  this.move();
  this.turn();
  this.collision();
  this.draw();
}

function keyTyped() {
  if (key==='r') {
    if (p1.dead == 1) {
      p2_score += 1;
    }
    else if (p2.dead == 1) {
      p1_score += 1;
    }
    gameRunning = 1;
    p1 = new Player_1();
    p2 = new Player_2();
  }
}
