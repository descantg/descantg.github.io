var p1;
var ai
var npcs = [];

function setup() {
  createCanvas(600,600);
  background(50);
  angleMode(DEGREES);
  p1 = new Player(random(0,590),random(0,590),87,83,65,68,81,1);
  ai = new Ai();
  for (var i = 0; i < 61; i++) {
    npcs.push(new NPC());
  }
}

function draw() {
  background(50);
  if (p1.dead == 0 && ai.dead == 0) {
    p1.move();
    ai.move();
    ai.find();
    for (var i = 0; i<npcs.length;i++) {
      npcs[i].move();
    }
    p1.shoot();
    ai.gun();
    p1.dying();
    ai.dying();
    for (var i = 0; i<npcs.length;i++) {
      npcs[i].dying();
    }
  }
  else if (p1.dead == 1 && ai.dead == 1) {
    fill(255);
    textSize(80);
    text("Tie", 230, 250);
  }
  else if (p1.dead == 1) {
    fill(ai.color.x,ai.color.y,ai.color.z);
    textSize(50);
    text("AI Wins", 220, 250);
  }
  else if (ai.dead == 1) {
    fill(p1.color.x,p1.color.y,p1.color.z);
    textSize(50);
    text("You Win", 200, 250);
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
  ai.draw();
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
    if (ai.isShooting == 1 && collideLineCircle(ai.pos.x,ai.pos.y,ai.pos.x + 700*sin(ai.bulletDir),ai.pos.y +700*cos(ai.bulletDir), this.pos.x,this.pos.y,20)) {
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
  if (ai.isShooting == 1 && collideLineCircle(ai.pos.x,ai.pos.y,ai.pos.x + 700*sin(ai.bulletDir),ai.pos.y +700*cos(ai.bulletDir), this.pos.x,this.pos.y,20)) {
    this.dead = 1;
    this.color = createVector(255,0,0);
  }
  else if (p1.isShooting == 1 && collideLineCircle(p1.pos.x,p1.pos.y,p1.pos.x + 700*sin(p1.bulletDir),p1.pos.y +700*cos(p1.bulletDir), this.pos.x,this.pos.y,20)) {
    this.dead = 1;
    this.color = createVector(255,0,0);
  }
}

Ai = function() {
  this.pos = createVector(random(0,600),random(0,600));
  this.action = Math.floor(random(-1,9));
  this.color = createVector(random(0,255),random(0,255),random(0,255));
  this.quality = 700;
  this.seesPlayer = 0;
  this.coolDown = 0;
  this.reloadTime = 0;
  this.reloading = 0;
  this.bulletsLeft = 2;
  this.isShooting = 0;
  this.trails = [];
  this.dead = 0;
}

Ai.prototype.move = function() {
  if (this.dead == 0) {
    if (Math.floor(random(0,50)) == 1) {
      this.action = Math.floor(random(-1,9));
    }
    if (this.action == 1) {
      this.pos.add(createVector(0,-3));
      fill(0,0,255);
      rect(450,50,50,50);
    }
    else if (this.action == 2) {
      this.pos.add(createVector(2.12,-2.12));
      fill(0,0,255);
      rect(500,50,50,50);
    }
    else if (this.action == 3) {
      this.pos.add(createVector(3,0));
      fill(0,0,255);
      rect(500,100,50,50);
    }
    else if (this.action == 4) {
      this.pos.add(createVector(2.12,2.12));
      fill(0,0,255);
      rect(500,150,50,50);
    }
    else if (this.action == 5) {
      this.pos.add(createVector(0,3));
      fill(0,0,255);
      rect(450,150,50,50);
    }
    else if (this.action == 6) {
      this.pos.add(createVector(-2.12,2.12));
      fill(0,0,255);
      rect(400,150,50,50);
    }
    else if (this.action == 7) {
      this.pos.add(createVector(-3,0));
      fill(0,0,255);
      rect(400,100,50,50);
    }
    else if (this.action == 8) {
      this.pos.add(createVector(-2.12,-2.12));
      fill(0,0,255);
      rect(400,50,50,50);
    }
    else {
      fill(0,0,255);
      rect(450,100,50,50);
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

Ai.prototype.find = function() {
  if (Math.floor(random(0,this.quality)) == 0) {
    this.seesPlayer = 1;
    console.log("Found");
  }
  else if (Math.floor(random(0,this.quality/100)) == 0 && p1.isShooting == 1) {
    this.seesPlayer = 1;
    console.log("Found");
  }
  if (this.seesPlayer == 1 && Math.floor(random(0,this.quality)) == 0) {
    this.seesPlayer = 0;
    console.log("Lost");
  }
}

Ai.prototype.dying = function() {
  if (p1.isShooting == 1 && collideLineCircle(p1.pos.x,p1.pos.y,p1.pos.x + 700*sin(p1.bulletDir),p1.pos.y +700*cos(p1.bulletDir), this.pos.x,this.pos.y,20)) {
    this.dead = 1;
    this.color = createVector(255,0,0);
  }
}

Ai.prototype.gun = function() {
  this.isShooting = 0;
  if (collideLineCircle(this.pos.x,this.pos.y,this.pos.x + 700*sin(180),this.pos.y +700*cos(180),p1.pos.x,p1.pos.y,20) && this.seesPlayer == 1) {
    this.shoot();
    this.dir = 180;
  }
  else if (collideLineCircle(this.pos.x,this.pos.y,this.pos.x + 700*sin(135),this.pos.y +700*cos(135),p1.pos.x,p1.pos.y,20) && this.seesPlayer == 1) {
    this.shoot();
    this.dir = 135;
  }
  else if (collideLineCircle(this.pos.x,this.pos.y,this.pos.x + 700*sin(90),this.pos.y +700*cos(90),p1.pos.x,p1.pos.y,20) && this.seesPlayer == 1) {
    this.shoot();
    this.dir = 90;
  }
  else if (collideLineCircle(this.pos.x,this.pos.y,this.pos.x + 700*sin(45),this.pos.y +700*cos(45),p1.pos.x,p1.pos.y,20) && this.seesPlayer == 1) {
    this.shoot();
    this.dir = 45;
  }
  else if (collideLineCircle(this.pos.x,this.pos.y,this.pos.x + 700*sin(0),this.pos.y +700*cos(0),p1.pos.x,p1.pos.y,20) && this.seesPlayer == 1) {
    this.shoot();
    this.dir = 0;
  }
  else if (collideLineCircle(this.pos.x,this.pos.y,this.pos.x + 700*sin(315),this.pos.y +700*cos(315),p1.pos.x,p1.pos.y,20) && this.seesPlayer == 1) {
    this.shoot();
    this.dir = 315;
  }
  else if (collideLineCircle(this.pos.x,this.pos.y,this.pos.x + 700*sin(270),this.pos.y +700*cos(270),p1.pos.x,p1.pos.y,20) && this.seesPlayer == 1) {
    this.shoot();
    this.dir = 270;
  }
  else if (collideLineCircle(this.pos.x,this.pos.y,this.pos.x + 700*sin(225),this.pos.y +700*cos(225),p1.pos.x,p1.pos.y,20) && this.seesPlayer == 1) {
    this.shoot();
    this.dir = 225;
  }
  if (this.bulletsLeft == 0 && this.reloading == 0) {
    this.reloading = 1;
    this.reloadTime = 150;
  }
  if (this.reloading == 1) {
    this.reloadTime += -1;
    if (this.reloadTime == 0) {
      this.bulletsLeft = 2;
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

Ai.prototype.shoot = function() {
  if (this.coolDown == 0 && this.reloadTime == 0 && this.bulletsLeft >= 0) {
    this.isShooting = 1;
    this.bulletDir = this.dir + random(-5,5);
    this.trails.push(this.pos.x,this.pos.y,this.bulletDir,150,5);
    this.coolDown = 7;
    this.bulletsLeft += -1;
  }
}

Ai.prototype.draw = function() {
  fill(this.color.x,this.color.y,this.color.z);
  ellipse(this.pos.x,this.pos.y,20);
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

function keyTyped() {
  if (key==='r') {
    p1 = new Player(random(0,590),random(0,590),87,83,65,68,81,1);
    ai = new Ai();
    npcs = [];
    for (var i = 0; i < 61; i++) {
      npcs.push(new NPC());
    }
  }
}
