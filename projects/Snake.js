var p1;
var p2;
var collect;
var gameSpeed = 5;
var timer = 0;
var gameRunning = 1;

function setup() {
  createCanvas(601,601);
  background(0);
  stroke(0,255,0);
  for (var i=0;i<=600;i+=10) {
    line(i,0,i,600);
  }
  for (var i=0;i<=600;i+=10) {
    line(0,i,600,i);
  }
  p1 = new Player_1();
  p2 = new Player_2();
  collect = new Item(createVector(floor(random(1,60))*10-5,floor(random(1,60))*10-5));
}

function draw() {
  background(0);
  stroke(0,255,0);
  for (var i=0;i<=600;i+=10) {
    line(i,0,i,600);
  }
  for (var i=0;i<=600;i+=10) {
    line(0,i,600,i);
  }
  if (p1.dead ==1 && p2.dead == 1) {
    gameRunning = 0;
    background(0,255,0);
  }
  else if (p1.dead == 1) {
    gameRunning = 0;
    background(0,0,255);
  }
  else if (p2.dead == 1) {
    gameRunning = 0;
    background(255,0,0);
  }
  if (timer % gameSpeed==0 && gameRunning == 1) {
    p1.move();
    //p2.move();
  }
  p1.run();
  //p2.run();
  collect.draw();
  timer += 1;
}

Player_1 = function() {
  this.position = createVector(5,5);
  this.length = 1;
  this.direction = 0;
  this.trail = [5,5];
  this.addLength = 0;
  this.dead = 0;
}

Player_1.prototype.draw = function() {
  fill(255,0,0);
  for (var i=1;i<this.trail.length; i+=2) {
    rect(this.trail[i-1]-5,this.trail[i]-5,10,10);
  }
}

Player_1.prototype.move = function() {
  if (this.direction == 0) {
    this.position.add(createVector(0,10));
    if (this.addLength == 0) {
      this.trail.splice(0, 2);
    }
    else {
      this.addLength-=1
    }
    this.trail.push(this.position.x);
    this.trail.push(this.position.y);
  }
  else if (this.direction == 1) {
    this.position.add(createVector(-10,0));
    if (this.addLength == 0) {
      this.trail.splice(0, 2);
    }
    else {
      this.addLength-=1
    }
    this.trail.push(this.position.x);
    this.trail.push(this.position.y);
  }
  else if (this.direction == 2) {
    this.position.add(createVector(0,-10));
    if (this.addLength == 0) {
      this.trail.splice(0, 2);
    }
    else {
      this.addLength-=1
    }
    this.trail.push(this.position.x);
    this.trail.push(this.position.y);
  }
  else if (this.direction == 3) {
    this.position.add(createVector(10,0));
    if (this.addLength == 0) {
      this.trail.splice(0, 2);
    }
    else {
      this.addLength-=1
    }
    this.trail.push(this.position.x);
    this.trail.push(this.position.y);
  }
}

Player_1.prototype.collision =  function() {
  for (var i=1;i < p2.trail.length;i+=2) {
    if (this.position.x == p2.trail[i-1] && this.position.y == p2.trail[i]) {
      this.dead = 1;
    }
  }
  for (var i=1;i < this.trail.length-2;i+=2) {
    if (this.position.x == this.trail[i-1] && this.position.y == this.trail[i]) {
      this.dead = 1;
    }
  }
  if (this.position.x < 0 || this.position.x > 600 || this.position.y < 0 || this.position.y > 600) {
    this.dead = 1;
  }
  if (this.position.x == collect.position.x && this.position.y == collect.position.y) {
    this.addLength += 7;
    collect.position = createVector(floor(random(1,60))*10-5,floor(random(1,60))*10-5);
  }
}

Player_1.prototype.run = function() {
  this.collision();
  this.draw();
}

Player_2 = function() {
  this.position = createVector(595,595);
  this.length = 1;
  this.direction = 2;
  this.trail = [595,595];
  this.addLength = 10;
  this.dead = 0;
}

Player_2.prototype.draw = function() {
  fill(0,0,255);
  for (var i=1;i<this.trail.length; i+=2) {
    rect(this.trail[i-1]-5,this.trail[i]-5,10,10);
  }
}

Player_2.prototype.move = function() {
  if (this.direction == 0) {
    this.position.add(createVector(0,10));
    if (this.addLength == 0) {
      this.trail.splice(0, 2);
    }
    else {
      this.addLength-=1
    }
    this.trail.push(this.position.x);
    this.trail.push(this.position.y);
  }
  else if (this.direction == 1) {
    this.position.add(createVector(-10,0));
    if (this.addLength == 0) {
      this.trail.splice(0, 2);
    }
    else {
      this.addLength-=1
    }
    this.trail.push(this.position.x);
    this.trail.push(this.position.y);
  }
  else if (this.direction == 2) {
    this.position.add(createVector(0,-10));
    if (this.addLength == 0) {
      this.trail.splice(0, 2);
    }
    else {
      this.addLength-=1
    }
    this.trail.push(this.position.x);
    this.trail.push(this.position.y);
  }
  else if (this.direction == 3) {
    this.position.add(createVector(10,0));
    if (this.addLength == 0) {
      this.trail.splice(0, 2);
    }
    else {
      this.addLength-=1
    }
    this.trail.push(this.position.x);
    this.trail.push(this.position.y);
  }
}

Player_2.prototype.collision =  function() {
  for (var i=1;i < p1.trail.length;i+=2) {
    if (this.position.x == p1.trail[i-1] && this.position.y == p1.trail[i]) {
      this.dead = 1;
    }
  }
  for (var i=1;i < this.trail.length-2;i+=2) {
    if (this.position.x == this.trail[i-1] && this.position.y == this.trail[i]) {
      this.dead = 1;
    }
  }
  if (this.position.x < 0 || this.position.x > 600 || this.position.y < 0 || this.position.y > 600) {
    this.dead = 1;
  }
  if (this.position.x == collect.position.x && this.position.y == collect.position.y) {
    this.addLength += 7;
    collect.position = createVector(floor(random(1,60))*10-5,floor(random(1,60))*10-5);
  }
}

Player_2.prototype.run = function() {
  this.collision();
  this.draw();
}

Item = function(startPos) {
  this.position = startPos.copy();
}

Item.prototype.draw = function() {
  fill(255);
  rect(this.position.x-5,this.position.y-5,10,10);
}

function keyPressed() {
  if (keyCode == 65) {
    p1.direction -= 1;
    if (p1.direction==-1) {
      p1.direction=3;
    }
  }
  if (keyCode == 68) {
    p1.direction += 1;
    if (p1.direction==4) {
      p1.direction=0;
    }
  }
  if (keyCode == LEFT_ARROW) {
    p2.direction -= 1;
    if (p2.direction==-1) {
      p2.direction=3;
    }
  }
  if (keyCode == RIGHT_ARROW) {
    p2.direction += 1;
    if (p2.direction==4) {
      p2.direction=0;
    }
  }
}

function keyTyped() {
  if (key==='r') {
    gameRunning = 1;
    p1 = new Player_1();
    p2 = new Player_2();
    collect = new Item(createVector(floor(random(1,60))*10-5,floor(random(1,60))*10-5));
  }
}
