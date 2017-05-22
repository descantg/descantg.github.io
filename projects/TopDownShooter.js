var p1;
var p2;
var npcs = [];

function setup() {
  createCanvas(600,600);
  background(50);
  angleMode(DEGREES);
  p1 = new Player(random(0,590),random(0,590),87,83,65,68,81,1);
  p2 = new Player(random(0,590),random(0,590),38,40,37,39,16,2);
  for (var i = 0; i < 61; i++) {
    npcs.push(new NPC());
  }
}

function draw() {
  background(50);
  if (p1.dead == 0 && p2.dead == 0) {
    p1.move();
    p2.move();
    for (var i = 0; i<npcs.length;i++) {
      npcs[i].move();
    }
    p1.shoot();
    p2.shoot();
    p1.dying();
    p2.dying();
    for (var i = 0; i<npcs.length;i++) {
      npcs[i].dying();
    }
  }
  else if (p1.dead == 1 && p2.dead == 1) {
    fill(255);
    textSize(80);
    text("Tie", 230, 250);
  }
  else if (p1.dead == 1) {
    fill(p2.color.x,p2.color.y,p2.color.z);
    textSize(50);
    text("Player 2 wins!", 150, 250);
  }
  else if (p2.dead == 1) {
    fill(p1.color.x,p1.color.y,p1.color.z);
    textSize(50);
    text("Player 1 wins!", 150, 250);
  }
  for (var i=50;i<=200;i+=50) {
    line(i,50,i,200);
  }
  for (var i=50;i<=200;i+=50) {
    line(50,i,200,i);
  }
  for (var i=400;i<=550;i+=50) {
    line(i,50,i,200);
  }
  for (var i=50;i<=200;i+=50) {
    line(400,i,550,i);
  }
  p1.draw();
  p2.draw();
  for (var i = 0; i<npcs.length;i++) {
    npcs[i].draw();
  }
}

Player = function(x,y,up,down,left,right,shoot,number) {
  this.up = up;
  this.down = down;
  this.left = left;
  this.right = right;
  this.shootKey = shoot;
  this.pos = createVector(x,y);
  this.color = createVector(random(0,255),random(0,255),random(0,255));
  this.dir = 180;
  this.coolDown = 0;
  this.reloadTime = 0;
  this.reloading = 0;
  this.bulletsLeft = 12;
  this.isShooting = 0;
  this.trails = [];
  this.number = number;
  this.dead = 0;
}

Player.prototype.draw = function() {
  stroke(0);
  fill(this.color.x,this.color.y,this.color.z);
  ellipse(this.pos.x,this.pos.y,20);
  //line(this.pos.x,this.pos.y,this.pos.x + 700*sin(this.dir),this.pos.y +700*cos(this.dir));
  if (this.isShooting == 1) {
    stroke(255,0,0);
    line(this.pos.x,this.pos.y,this.pos.x + 700*sin(this.bulletDir),this.pos.y +700*cos(this.bulletDir));
    stroke(0);
  }
  for (var i=0;i<this.trails.length;i+=5) {
    stroke(this.trails[i+3]);
    if (this.trails[i+4] > 0) {
      stroke(255,0,0);
    }
    line(this.trails[i],this.trails[i+1],this.trails[i] + 700*sin(this.trails[i+2]),this.trails[i+1] +700*cos(this.trails[i+2]));
    stroke(0);
  }
}

Player.prototype.move = function() {
  if (keyIsDown(this.up) && keyIsDown(this.right)) {
    this.pos.add(createVector(2.12,-2.12));
    this.dir = 135;
    if (this.pos.x > 590) {
      this.pos.x = 590;
    }
    else if (this.pos.y < 10) {
      this.pos.y = 10;
    }
    if (this.number == 1) {
      fill(0,0,255);
      rect(150,50,50,50);
    }
    else if (this.number == 2) {
      fill(0,0,255);
      rect(500,50,50,50);
    }
  }
  else if (keyIsDown(this.right) && keyIsDown(this.down)) {
    this.pos.add(createVector(2.12,2.12));
    this.dir = 45;
    if (this.pos.x > 590) {
      this.pos.x = 590;
    }
    else if (this.pos.y > 590) {
      this.pos.y = 590;
    }
    if (this.number == 1) {
      fill(0,0,255);
      rect(150,150,50,50);
    }
    else if (this.number == 2) {
      fill(0,0,255);
      rect(500,150,50,50);
    }
  }
  else if (keyIsDown(this.down) && keyIsDown(this.left)) {
    this.pos.add(createVector(-2.12,2.12));
    this.dir = 315;
    if (this.pos.x < 10) {
      this.pos.x = 10;
    }
    else if (this.pos.y > 590) {
      this.pos.y = 590;
    }
    if (this.number == 1) {
      fill(0,0,255);
      rect(50,150,50,50);
    }
    else if (this.number == 2) {
      fill(0,0,255);
      rect(400,150,50,50);
    }
  }
  else if (keyIsDown(this.left) && keyIsDown(this.up)) {
    this.pos.add(createVector(-2.12,-2.12));
    this.dir = 225;
    if (this.pos.x < 10) {
      this.pos.x = 10;
    }
    else if (this.pos.y < 10) {
      this.pos.y = 10;
    }
    if (this.number == 1) {
      fill(0,0,255);
      rect(50,50,50,50);
    }
    else if (this.number == 2) {
      fill(0,0,255);
      rect(400,50,50,50);
    }
  }
  else if (keyIsDown(this.up)) {
    this.pos.add(createVector(0,-3));
    this.dir = 180;
    if (this.pos.y < 10) {
      this.pos.y = 10;
    }
    if (this.number == 1) {
      fill(0,0,255);
      rect(100,50,50,50);
    }
    else if (this.number == 2) {
      fill(0,0,255);
      rect(450,50,50,50);
    }
  }
  else if (keyIsDown(this.down)) {
    this.pos.add(createVector(0,3));
    this.dir = 0;
    if (this.pos.y > 590) {
      this.pos.y = 590;
    }
    if (this.number == 1) {
      fill(0,0,255);
      rect(100,150,50,50);
    }
    else if (this.number == 2) {
      fill(0,0,255);
      rect(450,150,50,50);
    }
  }
  else if (keyIsDown(this.left)) {
    this.pos.add(createVector(-3,0));
    this.dir = 270;
    if (this.pos.x < 10) {
      this.pos.x = 10;
    }
    if (this.number == 1) {
      fill(0,0,255);
      rect(50,100,50,50);
    }
    else if (this.number == 2) {
      fill(0,0,255);
      rect(400,100,50,50);
    }
  }
  else if (keyIsDown(this.right)) {
    this.pos.add(createVector(3,0));
    this.dir = 90;
    if (this.pos.x > 590) {
      this.pos.x = 590;
    }
    if (this.number == 1) {
      fill(0,0,255);
      rect(150,100,50,50);
    }
    else if (this.number == 2) {
      fill(0,0,255);
      rect(500,100,50,50);
    }
  }
  else if (this.number == 1) {
    fill(0,0,255);
    rect(100,100,50,50);
  }
  else if (this.number == 2) {
    fill(0,0,255);
    rect(450,100,50,50);
  }
}

Player.prototype.shoot = function() {
  this.isShooting = 0;
  //console.log("g");
  if (keyIsDown(this.shootKey) && this.coolDown == 0 && this.reloadTime == 0 && this.bulletsLeft >= 0) {
    this.isShooting = 1;
    this.bulletDir = this.dir + random(-5,5);
    this.trails.push(this.pos.x,this.pos.y,this.bulletDir,150,5);
    this.coolDown = 7;
    this.bulletsLeft += -1;
  }
  if (this.bulletsLeft == 0 && this.reloading == 0) {
    this.reloading = 1;
    this.reloadTime = 150;
  }
  if (this.reloading == 1) {
    this.reloadTime += -1;
    if (this.reloadTime == 0) {
      this.bulletsLeft = 12;
      this.reloading = 0;
    }
  }
  if (this.coolDown > 0) {
    this.coolDown += -1;
  }
  for (var i = 0; i < this.trails.length; i+=5) {
    this.trails[i+3] += -1;
    this.trails[i+4] += -1;
    if (this.trails[i+3] <= 50) {
      this.trails.splice(0,5)
    }
  }
}

Player.prototype.dying = function() {
  if (this.number == 1) {
    if (p2.isShooting == 1 && collideLineCircle(p2.pos.x,p2.pos.y,p2.pos.x + 700*sin(p2.bulletDir),p2.pos.y +700*cos(p2.bulletDir), this.pos.x,this.pos.y,20)) {
      this.dead = 1;
      this.color = createVector(255,0,0);
    }
  }
  if (this.number == 2) {
    if (p1.isShooting == 1 && collideLineCircle(p1.pos.x,p1.pos.y,p1.pos.x + 700*sin(p1.bulletDir),p1.pos.y +700*cos(p1.bulletDir), this.pos.x,this.pos.y,20)) {
      this.dead = 1;
      this.color = createVector(255,0,0);
    }
  }
}

NPC = function() {
  this.pos = createVector(random(0,600),random(0,600));
  this.action = Math.floor(random(-1,9));
  this.color = createVector(random(0,255),random(0,255),random(0,255));
  this.dead = 0;
}

NPC.prototype.move = function() {
  if (this.dead == 0) {
    if (Math.floor(random(0,50)) == 1) {
      this.action = Math.floor(random(-1,9));
    }
    if (this.action == 1) {
      this.pos.add(createVector(0,-3));

    }
    else if (this.action == 2) {
      this.pos.add(createVector(2.12,-2.12));
    }
    else if (this.action == 3) {
      this.pos.add(createVector(3,0));
    }
    else if (this.action == 4) {
      this.pos.add(createVector(2.12,2.12));
    }
    else if (this.action == 5) {
      this.pos.add(createVector(0,3));
    }
    else if (this.action == 6) {
      this.pos.add(createVector(-2.12,2.12));
    }
    else if (this.action == 7) {
      this.pos.add(createVector(-3,0));
    }
    else if (this.action == 8) {
      this.pos.add(createVector(-2.12,-2.12));
    }
    if (this.pos.y < 10) {
      this.pos.y = 10;
      this.action = Math.floor(random(0,9));
    }
    else if (this.pos.x > 590) {
      this.pos.x = 590;
      this.action = Math.floor(random(0,9));
    }
    else if (this.pos.y > 590) {
      this.pos.y = 590;
      this.action = Math.floor(random(0,9));
    }
    else if (this.pos.x < 10) {
      this.pos.x = 10;
      this.action = Math.floor(random(0,9));
    }
  }
}

NPC.prototype.draw = function() {
  fill(this.color.x,this.color.y,this.color.z);
  ellipse(this.pos.x,this.pos.y,20);
}

NPC.prototype.dying = function() {
  if (p2.isShooting == 1 && collideLineCircle(p2.pos.x,p2.pos.y,p2.pos.x + 700*sin(p2.bulletDir),p2.pos.y +700*cos(p2.bulletDir), this.pos.x,this.pos.y,20)) {
    this.dead = 1;
    this.color = createVector(255,0,0);
  }
  else if (p1.isShooting == 1 && collideLineCircle(p1.pos.x,p1.pos.y,p1.pos.x + 700*sin(p1.bulletDir),p1.pos.y +700*cos(p1.bulletDir), this.pos.x,this.pos.y,20)) {
    this.dead = 1;
    this.color = createVector(255,0,0);
  }
}

function keyTyped() {
  if (key==='r') {
    p1 = new Player(random(0,590),random(0,590),87,83,65,68,81,1);
    p2 = new Player(random(0,590),random(0,590),38,40,37,39,16,2);
    npcs = [];
    for (var i = 0; i < 61; i++) {
      npcs.push(new NPC());
    }
  }
}
