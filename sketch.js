var player;
var guards = [];
var walls = [];
var buildingX = 50;
var buildingY = 50;
var buildingW = 500;
var buildingH = 500;
var run;
var a = 0;
var levelNumber = 0;

function setup() {
  createCanvas(600,600);
  angleMode(DEGREES);
  noStroke();
  run = new Level(4);
}

function draw() {
  if (run.running) {
    background(30,144,255);
    fill(65,105,225);
    rect(buildingX,buildingY,buildingW,buildingH);
    player.ability();
    player.move();
    player.shoot();
    for (i = 0; i < guards.length; i++) {
      guards[i].targeting();
      guards[i].direction();
      guards[i].see();
      guards[i].shoot();
      guards[i].move();
      guards[i].dying();
    }
    player.dying();
    player.draw();
    for (i = 0; i < guards.length; i++) {
      guards[i].draw();
    }
    for (i = 0; i < walls.length; i++) {
      walls[i].draw();
    }
    run.draw();
    run.events();
  }
  run.draw();
  run.events();
}

Player = function(x,y) {
  this.pos = createVector(x,y);
  this.dir = Math.atan2((mouseX - this.pos.x), (mouseY - this.pos.y));
  this.coolDown = 0;
  this.reloadTime = 0;
  this.reloading = 0;
  this.bulletsLeft = 6;
  this.isShooting = 0;
  this.bulletDir = 0;
  this.bulletLength = 1000;
  this.bullet = [];
  this.trails = [];
  this.fast = 0;
  this.visibility = 15;
  this.stamina = 100;
  this.tired = 0;
  this.notdead = true;
}

Player.prototype.draw = function() {
  fill(255,0,0);
  if (this.notdead) {
    fill(0);
  }
  if (this.visibility<10) {
    fill('rgba(0,0,0,.25)');
  }
  rect(this.pos.x-3,this.pos.y-3,6,6);
  fill(255,0,0);
  rect(10,10,10,10);
  rect(20,10,5.4*this.stamina,10)
  for (var i=0;i<this.trails.length;i+=6) {
    stroke(this.trails[i+4]);
    if (this.trails[i+5] > 0) {
      stroke(255,100,0);
    }
    line(this.trails[i],this.trails[i+1],this.trails[i+2],this.trails[i+3]);
    stroke(0);
  }
  noStroke();
}

Player.prototype.move = function() {
  if (this.notdead) {
    if (keyIsDown(87) && keyIsDown(68)) {
      this.visibility = 15;
      if (this.fast == 1) {
        this.pos.add(createVector(2.12,-2.12));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(-2.12,2.12));
          }
        }
      }
      else {
        this.pos.add(createVector(.71,-.71));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(-.71,.71));
          }
        }
      }
    }
    else if (keyIsDown(68) && keyIsDown(83)) {
      this.visibility = 15;
      if (this.fast == 1) {
        this.pos.add(createVector(2.12,2.12));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(-2.12,-2.12));
          }
        }
      }
      else {
        this.pos.add(createVector(.71,.71));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(-.71,-.71));
          }
        }
      }
    }
    else if (keyIsDown(83) && keyIsDown(65)) {
      this.visibility = 15;
      if (this.fast == 1) {
        this.pos.add(createVector(-2.12,2.12));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(2.12,-2.12));
          }
        }
      }
      else {
        this.pos.add(createVector(-.71,.71));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(.71,-.71));
          }
        }
      }
    }
    else if (keyIsDown(65) && keyIsDown(87)) {
      this.visibility = 15;
      if (this.fast == 1) {
        this.pos.add(createVector(-2.12,-2.12));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(2.12,2.12));
          }
        }
      }
      else {
        this.pos.add(createVector(-.71,-.71));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(.71,.71));
          }
        }
      }
    }
    else if (keyIsDown(87)) {
      this.visibility = 15;
      if (this.fast == 1) {
        this.pos.add(createVector(0,-3));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(0,3));
          }
        }
      }
      else {
        this.pos.add(createVector(0,-1));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(0,1));
          }
        }
      }
    }
    else if (keyIsDown(83)) {
      this.visibility = 15;
      if (this.fast == 1) {
        this.pos.add(createVector(0,3));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(0,-3));
          }
        }
      }
      else {
        this.pos.add(createVector(0,1));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(0,-1));
          }
        }
      }
    }
    else if (keyIsDown(65)) {
      this.visibility = 15;
      if (this.fast == 1) {
        this.pos.add(createVector(-3,0));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(3,0));
          }
        }
      }
      else {
        this.pos.add(createVector(-1,0));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(1,0));
          }
        }
      }
    }
    else if (keyIsDown(68)) {
      this.visibility = 15;
      if (this.fast == 1) {
        this.pos.add(createVector(3,0));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(-3,0));
          }
        }
      }
      else {
        this.pos.add(createVector(1,0));
        for (var i = 0; i<walls.length; i++) {
          if (collideRectRect(this.pos.x-3,this.pos.y-3,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
            this.pos.add(createVector(-1,0));
          }
        }
      }
    }
  }
}

Player.prototype.shoot = function() {
  this.isShooting = 0;
  if (mouseIsPressed && this.coolDown == 0 && this.reloadTime == 0 && this.bulletsLeft >= 0 && this.notdead) {
    for (var i = 0;i<guards.length;i++) {
      guards[i].target = createVector(player.pos.x,player.pos.y);
      guards[i].alert = true;
    }
    this.isShooting = 1;
    this.dir = Math.atan2((mouseX - this.pos.x), (mouseY - this.pos.y))*57.2958;
    this.bulletDir = this.dir + random(-2,2);
    this.bulletLength = 1000;
    this.bullet = [this.pos.x,this.pos.y,this.pos.x + this.bulletLength*sin(this.bulletDir),this.pos.y + this.bulletLength*cos(this.bulletDir)];
    for (var i = 0; i<walls.length;i++) {
      while (collideLineRect(this.bullet[0] + 3,this.bullet[1] + 3,this.bullet[2],this.bullet[3],walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
        this.bulletLength -= 10;
        this.bullet = [this.pos.x,this.pos.y,this.pos.x + this.bulletLength*sin(this.bulletDir),this.pos.y + this.bulletLength*cos(this.bulletDir)];
      }
    }
    this.bulletLength += 5;
    this.bullet = [this.pos.x,this.pos.y,this.pos.x + this.bulletLength*sin(this.bulletDir),this.pos.y + this.bulletLength*cos(this.bulletDir)];
    this.trails.push(this.pos.x,this.pos.y,this.bullet[2],this.bullet[3],50,5);
    this.coolDown = 20;
    this.bulletsLeft += -1;
  }
  if (this.bulletsLeft == 0 && this.reloading == 0) {
    this.reloading = 1;
    this.reloadTime = 150;
  }
  if (this.reloading == 1) {
    this.reloadTime += -1;
    if (this.reloadTime == 0) {
      this.bulletsLeft = 6;
      this.reloading = 0;
    }
  }
  if (this.coolDown > 0) {
    this.coolDown += -1;
  }
  for (var i = 0; i < this.trails.length; i+=6) {
    this.trails[i+4] += +1;
    this.trails[i+5] += -1;
    if (this.trails[i+4] >= 130) {
      this.trails.splice(0,6)
    }
  }
}

Player.prototype.dying = function() {
  for (var i=0;i<guards.length;i++) {
    if (guards[i].isShooting == 1 && i!=this.guardNumber) {
      if (collideLineRect(guards[i].bullet[0] + 3,guards[i].bullet[1] + 3,guards[i].bullet[2],guards[i].bullet[3],this.pos.x-3,this.pos.y-3,6,6)) {
        this.notdead = false;
      }
    }
  }
  if (run.level == 2) {
    for (var i = 0;i<run.fires.length;i++) {
      if (collideRectCircle(this.pos.x-3,this.pos.y-3,6,6,run.fires[i].pos.x,run.fires[i].pos.y,run.fires[i].size*20)) {
        this.notdead = false;
      }
    }
  }
}

Player.prototype.ability = function() {
  this.visibility = 15;
  this.fast = 0;
  if (this.notdead) {
    if (keyIsDown(16)) {
      if (this.stamina>0) {
        this.fast = 1;
        this.stamina--;
        this.tired = 50;
      }
    }
    else if (keyIsDown(81)) {
      if (this.stamina>0) {
        this.visibility = .1;
        this.stamina--;
        this.tired = 50;
      }
    }
    else if (this.stamina<100 && this.tired < 0) {
      this.stamina+=.2;
    }
    else {
      this.tired--;
    }
  }
  if (keyIsDown(82)) {
    run = new Level(levelNumber);
  }
}

Wall = function(x,y,w,h,c) {
  this.pos = createVector(x,y);
  this.w = w;
  this.h = h;
  this.color = c;
}

Wall.prototype.draw = function() {
  if (this.color == 1) {
    fill(0,0,139);
  }
  else {
    fill(70);
  }
  rect(this.pos.x,this.pos.y,this.w,this.h);
}

Level = function(level) {
  levelNumber = level;
  this.level = level;
  this.step = 0;
  this.running = false;
  this.timer = 0;
  this.thought = "";
  this.fires;
  if (this.level == 1) {
    buildingX = 150;
    buildingY = 80;
    buildingW = 300;
    buildingH = 450;
    player = new Player(100,50);
    guards = [];
    walls = [];
    walls.push(new Wall(150,80,140,10,2));
    walls.push(new Wall(310,80,140,10,2));
    walls.push(new Wall(440,80,10,450,2));
    walls.push(new Wall(150,520,300,10,2));
    walls.push(new Wall(150,80,10,450,2));
    walls.push(new Wall(160,90,100,70,1));
    walls.push(new Wall(160,190,100,80,1));
    walls.push(new Wall(340,90,100,70,1));
    walls.push(new Wall(340,190,100,80,1));
    walls.push(new Wall(160,350,100,170,1));
    walls.push(new Wall(340,350,100,70,1));
    walls.push(new Wall(340,450,70,10,1));
    walls.push(new Wall(340,450,10,70,1));
    walls.push(new Wall(350,460,20,30,1));
    guards.push(new Guard(200,170,270,-1,2,[],[],[270],0));
    guards.push(new Guard(400,170,90,-1,2,[],[],[90],1));
    guards.push(new Guard(170,280,0,-1,1,[170,170,430,430],[300,330,330,300],[],2));
    guards.push(new Guard(375,480,0,-1,2,[],[],[0,270],1));
    //guards.push(new Guard(x,y,dir,walk,typeOfPatrol,x2,y2,dir2,guardNumber));
  }
  else if (this.level == 2) {
    this.fires = [];
    buildingX = 100;
    buildingY = 200;
    buildingW = 400;
    buildingH = 200;
    player = new Player(300,550);
    walls = [];
    guards = [];
    walls.push(new Wall(100,200,190,10,2));
    walls.push(new Wall(310,200,190,10,2));
    walls.push(new Wall(290,200,20,10,1));
    walls.push(new Wall(490,200,10,200,2));
    walls.push(new Wall(100,390,400,10,2));
    walls.push(new Wall(100,200,10,200,2));
    walls.push(new Wall(330,210,160,50,1));
    walls.push(new Wall(150,250,210,10,1));
    walls.push(new Wall(150,250,30,100,1));
    walls.push(new Wall(210,330,200,10,1));
    walls.push(new Wall(210,340,200,15,2));
    walls.push(new Wall(180,260,230,30,2));
    walls.push(new Wall(410,260,10,50,1));
    walls.push(new Wall(410,330,10,60,1));
    walls.push(new Wall(445,370,30,15,1));
    guards.push(new Guard(330,360,90,-1,2,[],[],[],0));
    guards.push(new Guard(280,370,90,-1,2,[],[],[],1));
    guards.push(new Guard(480,300,90,-1,2,[],[],[],2));
    guards.push(new Guard(300,310,90,-1,2,[],[],[],3));
    guards.push(new Guard(140,300,90,-1,2,[],[],[],4));
    for (var i = 0; i <guards.length;i++) {
      guards[i].notdead = false;
    }
  }
  else if (this.level == 3) {
    this.fires = [];
    buildingX = 50;
    buildingY = 50;
    buildingW = 500;
    buildingH = 500;
    player = new Player(100,40);
    walls = [];
    guards = [];
    walls.push(new Wall(50,50,500,10,2));
    walls.push(new Wall(540,50,10,500,2));
    walls.push(new Wall(50,540,500,10,2));
    walls.push(new Wall(50,80,10,470,2));
    walls.push(new Wall(140,60,10,440,1));
    for (var i = 0; i < 11; i++ ) {
      walls.push(new Wall(110,90+(i*40),30,10,1));
    }
    for (var i = 0; i < 6; i++ ) {
      guards.push(new Guard(90,70+(i*80),90,-1,2,[],[],[270,90],i));
    }
    walls.push(new Wall(180,90,250,410,1));
    walls.push(new Wall(460,60,80,250,1));
    walls.push(new Wall(460,350,40,190,1));
    walls.push(new Wall(508,500,24,15,2));
    guards.push(new Guard(165,70,90,-1,1,[165,440,440,165],[520,520,70,70],[],6));
    guards.push(new Guard(165,520,90,-1,1,[440,440,165,165],[520,70,70,520],[],7));
    guards.push(new Guard(440,520,90,-1,1,[440,165,165,440],[70,70,520,520],[],8));
    guards.push(new Guard(440,70,90,-1,1,[165,165,440,440],[70,520,520,70],[],9));
  }
  else if (this.level == 4) {
    buildingX = 50;
    buildingY = 100;
    buildingW = 500;
    buildingH = 400;
    player = new Player(300,90);
    walls = [];
    guards = [];
    walls.push(new Wall(50,100,500,10,2));
    walls.push(new Wall(540,100,10,190,2));
    walls.push(new Wall(540,310,10,190,2));
    walls.push(new Wall(50,490,240,10,2));
    walls.push(new Wall(310,490,240,10,2));
    walls.push(new Wall(50,100,10,400,2));
    walls.push(new Wall(290,130,20,250,1));
    walls.push(new Wall(175,245,250,20,1));
    walls.push(new Wall(330,130,95,20,1));
    walls.push(new Wall(405,130,20,95,1));
    walls.push(new Wall(330,360,95,20,1));
    walls.push(new Wall(405,285,20,95,1));
    walls.push(new Wall(175,130,95,20,1));
    walls.push(new Wall(175,130,20,95,1));
    walls.push(new Wall(175,360,95,20,1));
    walls.push(new Wall(175,285,20,95,1));
    walls.push(new Wall(455,120,75,145,1));
    walls.push(new Wall(455,285,75,95,1));
    walls.push(new Wall(340,400,200,90,1));
    walls.push(new Wall(175,400,50,90,1));
    walls.push(new Wall(225,455,50,35,1));
    walls.push(new Wall(245,400,30,35,1));
    walls.push(new Wall(60,400,100,90,1));
    walls.push(new Wall(80,290,80,90,1));
    walls.push(new Wall(130,120,20,105,1));
    walls.push(new Wall(80,205,70,20,1));
    walls.push(new Wall(60,110,40,25,1));
    walls.push(new Wall(270,425,20,10,1));
    guards.push(new Guard(280,480,90,-1,2,[280,280,230,230,70,70],[480,440,440,390,390,200],[],0));
    guards.push(new Guard(320,480,180,-1,2,[],[],[180],1));
    guards.push(new Guard(320,230,90,-1,1,[320,390,390,320],[230,230,160,160],[],2));
    guards.push(new Guard(390,160,270,-1,1,[390,320,320,390],[160,160,230,230],[],3));
    guards.push(new Guard(200,230,90,-1,1,[200,270,270,200],[230,230,160,160],[],4));
    guards.push(new Guard(270,160,270,-1,1,[270,200,200,270],[160,160,230,230],[],5));
    guards.push(new Guard(200,350,90,-1,1,[200,270,270,200],[350,350,280,280],[],6));
    guards.push(new Guard(270,280,270,-1,1,[270,200,200,270],[280,280,350,350],[],7));
    guards.push(new Guard(320,350,90,-1,1,[320,390,390,320],[350,350,280,280],[],8));
    guards.push(new Guard(390,280,270,-1,1,[390,320,320,390],[280,280,350,350],[],9));
    guards.push(new Guard(440,120,270,-1,1,[440,160],[120,120],[],10));
    guards.push(new Guard(160,120,90,-1,1,[160,440],[120,120],[],11));
    guards.push(new Guard(80,140,180,-1,2,[],[],[180],12));
  }
  else if (this.level == 5) {
    buildingX = 50;
    buildingY = 50;
    buildingW = 500;
    buildingH = 500;
    player = new Player(40,570);
    walls = [];
    guards = [];
    walls.push(new Wall(50,50,500,10,2));
    walls.push(new Wall(540,50,10,500,2));
    walls.push(new Wall(50,540,500,10,2));
    walls.push(new Wall(50,50,10,470,2));
    walls.push(new Wall(90,60,20,230,1));
    walls.push(new Wall(90,90,330,20,1));
    walls.push(new Wall(90,310,20,200,1));
    walls.push(new Wall(90,500,150,20,1));
    walls.push(new Wall(130,130,110,350,1));
    walls.push(new Wall(270,130,110,350,1));
    walls.push(new Wall(270,500,150,20,1));
    walls.push(new Wall(400,130,20,410,1));
    walls.push(new Wall(450,90,20,450,1));
    walls.push(new Wall(450,90,70,300,1));
    walls.push(new Wall(450,410,90,130,1));
    guards.push(new Guard(70,70,0,-1,1,[70,70],[70,200],[],0));
    guards.push(new Guard(350,525,90,-1,2,[],[],[90],1));
    guards.push(new Guard(230,485,0,-1,2,[],[],[0,90],2));
    guards.push(new Guard(275,485,0,-1,2,[],[],[0,270],3));
    guards.push(new Guard(230,115,180,-1,2,[],[],[180,90],4));
    guards.push(new Guard(275,115,180,-1,2,[],[],[180,270],5));
    guards.push(new Guard(115,70,0,-1,1,[115,120],[70,70],[],6));
    guards.push(new Guard(430,525,90,-1,1,[430,430],[525,500],[],7));
    guards.push(new Guard(115,115,90,-1,1,[115,115,385,385],[115,485,485,115],[],8));
    guards.push(new Guard(385,485,90,-1,1,[385,385,115,115],[485,115,115,485],[],9));
  }
  else if (this.level == 6) {
    buildingX = 50;
    buildingY = 100;
    buildingW = 500;
    buildingH = 400;
    player = new Player(300,90);
    walls = [];
    guards = [];
    walls.push(new Wall(50,100,500,10,2));
  }
}

Level.prototype.events = function() {
  if (this.level == 0) {
    this.running = false;
    if (this.step == 0 && mouseIsPressed && collidePointRect(mouseX,mouseY,250,300,100,50)) {
      this.step++;
    }
    if (this.step == 1) {
      if (keyIsDown(13)) {
        run = new Level(1);
      }
    }
  }
  else if (this.level == 1) {
    if (this.step == 0) {
      this.running = true;
      this.thought = "This is the address"
      if (this.timer>100) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 1) {
      this.thought = "from the telegram"
      if (this.timer>100) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 2) {
      this.thought = "";
      fill(255,0,0);
      if (collidePointRect(player.pos.x,player.pos.y,150,270,300,100)) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 3) {
      this.thought = "I think I recognise those guards..."
      if (this.timer > 200) {
        this.step++;
      }
    }
    else if (this.step == 4) {
      this.thought = "";
      if (collidePointCircle(player.pos.x,player.pos.y,380,470,10,10)) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 5) {
      this.thought = "I need to leave"
      if (collidePointRect(player.pos.x,player.pos.y,0,0,600,600) == false) {
        this.step++;
        this.running = false;
        this.timer = 0;
      }
    }
    else if (this.step == 6) {
      if (this.timer == 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 7) {
      if (this.timer == 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 8) {
      if (this.timer == 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 9) {
      run = new Level(2);
    }
  }
  else if (this.level == 2) {
    if (this.step>0 && this.step<12) {
      for (var i = 0; i<this.fires.length;i++) {
        this.fires[i].burn();
      }
    }
    if (this.step == 0) {
      this.running = true;
      this.thought = "This is the place that has stopped ordering.";
      if (this.timer > 200) {
        this.thought = "I  smell smoke!";
      }
      if (this.timer > 400) {
        this.step++
      }
    }
    else if (this.step == 1) {
      this.fires.push(new Fire(300,395,1));
      this.fires.push(new Fire(260,290,2));
      this.step++;
      this.timer = 0;
    }
    else if (this.step == 2) {
      this.thought = "Fire!";
      if (this.timer>150) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 3) {
      this.thought = "I need to help survivors";
      if (this.timer>200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 4) {
      this.thought = "There has to be a back door";
      if (collideRectRect(player.pos.x-3,player.pos.y-3,6,6,290,190,20,20,1)) {
        this.step++;
      }
    }
    else if (this.step == 5) {
      this.thought = "Locked";
      if (collidePointRect(player.bullet[2],player.bullet[3],290,200,20,10) && player.isShooting == 1) {
        walls.splice(2,1);
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 6) {
      this.thought = "";
      if (this.timer>200) {
        this.fires.push(new Fire(400,350,3));
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 7) {
      this.thought = "Who would do this?";
      if (this.timer > 200) {
        this.timer = 0;
        this.step++;
      }
    }
    else if (this.step == 8) {
      this.thought = "";
      if (this.timer > 200) {
        this.step++;
      }
    }
    else if (this.step == 9) {
      run.fires.push(new Fire(150,300,2));
      this.step++;
    }
    else if (this.step == 10) {
      if (collideRectCircle(player.pos.x-3,player.pos.y-3,6,6,460,360,10)) {
        run.fires.push(new Fire(480,250,4));
        this.step++;
      }
    }
    else if (this.step == 11) {
      this.thought = "I need to leave NOW!";
      if (collideRectRect(player.pos.x-3,player.pos.y-3,6,6,100,200,400,200)) {
      }
      else if (this.timer%200 == 0)  {
        this.fires.push(new Fire(random(100,500),random(200,400),Math.floor(random(3,9))));
        if (collidePointRect(player.pos.x,player.pos.y,0,0,600,600)) {
        }
        else {
          this.step++;
          this.timer= 0;
        }
      }
    }
    else if (this.step == 12) {
      this.running = false;
      if (this.timer>200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 13) {
      if (this.timer>200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 14) {
      if (this.timer>200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 15) {
      if (this.timer>200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 16) {
      if (this.timer>200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 17) {
      if (this.timer>200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 18) {
      if (this.timer>200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 19) {
      if (this.timer>200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 20) {
      run = new Level(3);
    }
  }
  else if (this.level == 3) {
    if (this.step == 0) {
      this.running = true;
      this.thought = "Smells like moonshine.";
      if (this.timer == 200) {
        this.step++;
        this.timer = 0;
      }
    }
    if (this.step == 1) {
      this.thought = "";
      if (this.timer > 1000) {
        this.step++;
        this.timer = 0;
      }
    }
    if (this.step == 2) {
      this.thought = "I need to get into the office";
      if (this.timer > 500) {
        this.step++;
        this.timer = 0;
      }
    }
    if (this.step == 3) {
      this.thought = "";
      if (collideRectCircle(player.pos.x-3,player.pos.y-3,6,6,520,490,10)) {
        this.step++;
        this.timer = 0;
      }
    }
    if (this.step == 4) {
      this.thought = "Hey! It's a letter.";
      if (this.timer == 150) {
        this.step++;
        this.timer = 0;
      }
    }
    if (this.step == 5) {
      this.thought = "Mine now";
      if (this.timer == 200) {
        this.step++;
        this.timer = 0;
      }
    }
    if (this.step == 6) {
      this.thought = "";
      if (collidePointRect(player.pos.x,player.pos.y,0,0,600,600)) {
      }
      else {
        this.step++;
        this.timer = 0;
      }
    }
    if (this.step == 7) {
      this.running = false;
      if (this.timer == 100) {
        this.step++;
        this.timer = 0;
      }
    }
    if (this.step == 8) {
      if (this.timer == 150) {
        this.step++;
        this.timer = 0;
      }
    }
    if (this.step == 9) {
      if (this.timer == 900) {
        this.step++;
        this.timer = 0;
      }
    }
    if (this.step == 10) {
      if (this.timer == 150) {
        this.step++;
        this.timer = 0;
      }
    }
    if (this.step == 11) {
      if (this.timer == 150) {
        this.step++;
        this.timer = 0;
      }
    }
    if (this.step == 12) {
      if (this.timer == 150) {
        this.step++;
        this.timer = 0;
      }
    }
    if (this.step == 13) {
      run = new Level(4);
    }
  }
  else if (this.level == 4) {
    if (this.step == 0) {
      this.running = true;
      this.step++
    }
    else if (this.step == 1) {
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 2) {
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 3) {
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 4) {
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 5) {
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 6) {
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 7) {
      if (this.timer > 100) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 8) {
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 9) {
      guards[0].patrolType = 1;
      guards[0].turnSpeed =  5;
      if (collideRectRect(guards[0].pos.x,guards[0].pos.y,6,6,60,110,70,100)) {
        this.step++;
      }
      if (collideRectRect(player.pos.x,player.pos.y,6,6,guards[12].pos.x,guards[12].pos.y,6,6)) {
        this.step = 11;
        guards.splice(12,1);
      }
    }
    else if (this.step == 10) {
      guards[0].inControl = false;
      guards[0].fire = 1;
      guards[0].bullet = [guards[0].pos.x,guards[0].pos.y,guards[12].pos.x+3,guards[12].pos.y+3]
      guards[0].patrolType = 2;
      guards[0].patrolDir = 180;
      guards[0].shoot();
      guards[12].notdead = false;
      this.step = 100;
    }
    else if (this.step == 11) {
      this.thought = "Come with me!"
      if (collidePointRect(player.pos.x,player.pos.y,0,0,600,600)) {
      }
      else {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 12) {
      this.running = false;
      this.step++
      this.timer = 0;
    }
    else if (this.step == 13) {
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 14) {
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 15) {
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 16) {
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 17) {
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 18) {
      run = new Level(5);
    }
  }
  else if (this.level == 5) {
    if (this.step == 0) {
      this.running = true;
      this.step++;
      this.timer = 0;
    }
    else if (this.step == 1) {
      if (collideRectCircle(player.pos.x-3,player.pos.y-3,6,6,480,400,10)) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 2) {
      this.thought = "I'm out of here";
      if (this.timer == 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 3) {
      this.thought = "";
      if (collidePointRect(player.pos.x,player.pos.y,0,0,600,600)) {
      }
      else {
        this.step++;
        this.timer= 0;
      }
    }
    else if (this.step == 4) {
      this.running = false;
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 5) {
      this.running = false;
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 6) {
      this.running = false;
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 7) {
      this.running = false;
      if (this.timer > 200) {
        this.step++;
        this.timer = 0;
      }
    }
    else if (this.step == 8) {
      run = new Level(6);
    }
  }
  else if (this.level == 6) {
    if (this.step == 0) {
      this.running = true;
    }
  }
  this.timer++;
}

Level.prototype.draw = function() {
  if (this.level == 0) {
    if (this.step == 0) {
      background(255);
      fill(0);
      rect(250,300,100,50)
    }
    if (this.step == 1) {
      background(0);
    }
  }
  else if (this.level == 1) {
    fill(255);
    text(this.thought,player.pos.x-(this.thought.length*3),player.pos.y-5);
    text("Nov 1 1921. 8:32 AM",10,550);
    text("Office district. Number 55 3rd St.",10,565);
    stroke(0,255,0);
    fill(0,0,0,5);
    ellipse(380,470,10);
    noStroke();
    fill(100,50,10);
    rect(350,460,20,30);
    rect(160,150,30,10);
    rect(160,190,30,10);
    rect(410,150,30,10);
    rect(410,190,30,10);
    rect(410,410,30,10);
    fill(255);
    text(this.thought,player.pos.x-(this.thought.length*3),player.pos.y-5);
    if (this.step == 6) {
      background(0);
      textSize(20);
      fill(255);
      text("Hmm. A shady office building. Police officers\nguarding it and this file.",10,550);
    }
    else if (this.step == 7) {
      background(0);
      textSize(20);
      fill(255);
      text("These are some sort of delivery documents!",10,550);
    }
    else if (this.step == 8) {
      background(0);
      textSize(20);
      fill(255);
      text("Apperently someone on 8th St. cancelled an order.\nI should check it out.",10,550);
    }
    textSize(12);
  }
  else if (this.level == 2) {
    stroke(0,255,0);
    fill(0,0,0,5);
    ellipse(460,360,10);
    noStroke();
    fill(100,50,10);
    rect(290,390,20,10);
    rect(180,260,230,30);
    rect(210,330,200,10);
    rect(445,370,30,15);
    fill(65,105,225);
    rect(210,340,200,15);
    for (var i = 0;i<5;i++) {
      fill(220,20,60);
      ellipse(215+(40*i),347,10);
    }
    if (this.step>0 && this.step<12) {
      for (var i = 0;i<this.fires.length;i++) {
        this.fires[i].draw();
      }
    }
    if (this.step<6) {
      fill(100,50,10);
      rect(290,200,20,10);
      fill(0);
      rect(110,210,380,180);
    }
    fill(255);
    text(this.thought,player.pos.x-(this.thought.length*3),player.pos.y-5);
    text("Nov 3 1921. 10:54 PM",10,550);
    text("Social district. Number 22 8th St.",10,565);
    if (this.step == 8) {
      fill(255);
      text("Help... Me...",130,290);
    }
    if (this.step == 12) {
      background(0);
    }
    if (this.step == 13) {
      background(0);
      textSize(20);
      fill(255);
      text("Wow.",10,550);
    }
    if (this.step == 14) {
      background(0);
      textSize(20);
      fill(255);
      text("So someone doesn't want people to stop buying from them.",10,550);
    }
    if (this.step == 15) {
      background(0);
      textSize(20);
      fill(255);
      text("The folder I grabbed seems to be full of old telegrams.",10,550);
    }
    if (this.step == 16) {
      background(0);
      textSize(20);
      fill(255);
      text("Hey! \nThis one is dated 3 days ago!",10,550);
    }
    if (this.step == 17) {
      background(0);
      textSize(20);
      fill(255);
      text("It's from someone asking the owners to reconsider \ntheir decision to not buy any more 'product'.",10,550);
    }
    if (this.step == 18) {
      background(0);
      textSize(20);
      fill(255);
      text("It was sent from an address on 19th St!",10,550);
    }
    if (this.step == 19) {
      background(0);
      textSize(20);
      fill(255);
      text("I should pay a visit to that 'warehouse'",10,550);
    }
  }
  else if (this.level == 3) {
    stroke(0,255,0);
    fill(0,0,0,5);
    ellipse(520,490,10);
    noStroke();
    fill(100,50,10);
    rect(508,500,24,15);
    fill(255);
    textSize(12);
    text(this.thought,player.pos.x-(this.thought.length*3),player.pos.y-5);
    textLeading(10);
    text("Nov 4 1921. 12:13 AM",10,570);
    text("Social district. Number 22 8th St.",10,585);
    if (this.step == 7) {
      background(0);
    }
    if (this.step == 8) {
      background(0);
      textSize(20);
      fill(255);
      text("Oh no!",10,550);
    }
    if (this.step == 9) {
      background(0);
      rect(150,100,300,400);
      textSize(15);
      textLeading(40);
      fill(0);
      text("Somebody thinks givin away information is \na good idea. Send a couple of legbreakers to \nnumber 45 18th st. Teach the canary in Apartment \n12 to sing.",155,115);
      text("- The Boss",350,450);
    }
    if (this.step == 10) {
      background(0);
      textSize(20);
      fill(255);
      text("I need to help him!",10,550);
    }
    if (this.step == 11) {
      background(0);
      textSize(20);
      fill(255);
      text("I might still have time!",10,550);
    }
    if (this.step == 12) {
      background(0);
    }
  }
  else if (this.level == 4) {
    noStroke();
    fill(100,50,10);
    rect(60,110,40,25);
    fill(255);
    textSize(12);
    text(this.thought,player.pos.x-(this.thought.length*3),player.pos.y-5);
    textLeading(10);
    text("Nov 4 1921. 1:15 AM",10,570);
    text("Apartment row. Number 19 17th St.",10,585);
    if (this.step < 11) {
      fill(0,255,0);
      rect(guards[12].pos.x,guards[12].pos.y,6,6);
    }
    fill(255);
    if (this.step == 1) {
      text("What number?",240,480);
    }
    if (this.step == 2) {
      text("Apartment 12.",280,480);
    }
    if (this.step == 3) {
      text("Ok.",280,480);
    }
    if (this.step == 4) {
      text("Wait.",260,480);
    }
    if (this.step == 5) {
      text("Does the boss want me to teach him a lesson",200,480);
    }
    if (this.step == 6) {
      text("or 'teach him a lesson'",220,480);
    }
    if (this.step == 7) {
      text("sigh",310,480);
    }
    if (this.step == 8) {
      text("Just shoot him.",280,480);
    }
    if (this.step == 100) {
      textSize(20);
      fill(255);
      text("Press R to restart",10,80);
    }
    if (this.step == 13) {
      background(0);
    }
    if (this.step == 14) {
      background(0);
      textSize(20);
      fill(255);
      text("I'm skipping town\nYou should too",10,80);
    }
    if (this.step == 15) {
      background(0);
      textSize(20);
      fill(255);
      text("I still have a job to do",10,550);
    }
    if (this.step == 16) {
      background(0);
      textSize(20);
      fill(255);
      text("Ok, suit yourself.\nGo to the factory on number 15 9th st.",10,80);
    }
    if (this.step == 17) {
      background(0);
      textSize(20);
      fill(255);
      text("Thanks",10,550);
    }
  }
  else if (this.level == 5) {
    stroke(0,255,0);
    fill(0,0,0,5);
    ellipse(480,400,10);
    noStroke();
    fill(100,50,10);
    rect(460,390,10,20);
    fill(255);
    textSize(12);
    text(this.thought,player.pos.x-(this.thought.length*3),player.pos.y-5);
    textLeading(10);
    text("Nov 4 1921. 2:50 AM",10,570);
    text("Factory  district. Number 15 9th St.",10,585);
    if (this.step == 4) {
      background(0);
    }
    if (this.step == 5) {
      background(0);
      textSize(20);
      fill(255);
      text("I'm in way over my head",10,550);
    }
    if (this.step == 6) {
      background(0);
      textSize(20);
      fill(255);
      text("I'm calling the DA then going home.",10,550);
    }
    if (this.step == 7) {
      background(0);
      textSize(20);
      fill(255);
      text("I've been up for 35 hours and need sleep.",10,550);
    }
  }
}

Fire = function(x,y,size) {
  this.pos = createVector(x,y);
  this.size = size;
  this.firesX = [];
  this.firesY = [];
  this.firesSize = [];
  this.fill = 0;
  for (var i = 0; i < size*2;i++) {
    this.firesX.push(random(this.pos.x-(size*10),this.pos.x+(size*10)));
    this.firesY.push(random(this.pos.y-(size*10),this.pos.y+(size*10)));
    this.firesSize.push(random(0,5));
  }
}

Fire.prototype.burn = function() {
  for (var i = 0; i < this.firesSize.length;i++) {
    this.firesSize[i] += random(0.1,0.3);
    if (this.firesSize[i]>5) {
      this.firesSize[i] = 0;
      this.firesX.splice(i,1,random(this.pos.x-(this.size*10),this.pos.x+(this.size*10)));
      this.firesY.splice(i,1,random(this.pos.y-(this.size*10),this.pos.y+(this.size*10)));
    }
  }
}

Fire.prototype.draw = function() {
  fill('rgba(255,0,0,0.5)');
  ellipse(this.pos.x,this.pos.y,this.size*20);
  for (var i = 0; i < this.firesSize.length;i++) {
    this.fill = 1-this.firesSize[i]*.2;
    this.fill = 0.25;
    fill('rgba(255,0,0,.5)');
    ellipse(this.firesX[i],this.firesY[i],this.firesSize[i]*this.size);
    fill('rgba(255,165,0,.75)');
    ellipse(this.firesX[i],this.firesY[i],this.firesSize[i]*this.size*.5);
  }
}
