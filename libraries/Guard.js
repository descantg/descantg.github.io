//appologising in advance for this cobbled together guard AI. At least it works. Kind of. Sorry.
Guard = function(x,y,dir,walk,typeOfPatrol,x2,y2,dir2,guardNumber) {
  // In control decides if the guards AI will run. It is turned off if I want to manually control a guards path.
  this.inControl = true;
  this.guardNumber = guardNumber;
  //guard number is used to stop the guards own bullets from killing themselves when fired because the bullet overlaps them.
  this.pos = createVector(x,y);
  this.targetDir = dir;
  //Where they want to look
  this.dir = dir;
  //where they look
  this.turnSpeed = 5;
  //how fast they look
  this.walkDir = walk;
  //In what direction the guard is walking. It is almost set to -1 because that is the 'direction' that makes them think about the direction.
  this.alert = false;
  this.possibleDirections = [];
  //Used to narrow down where they should turn
  this.patrolType = typeOfPatrol;
  //Do they: 0. radomly walk. 1. Follow a path. 2. Don't walk. Just look in a direction.
  this.patrolNumber = 0;
  //What step in the patrol is the guards in
  this.patrolX = x2;
  //X positions of the other points on the guards patrol
  this.patrolY = y2;
  //Same as patrol X
  this.patrolDir = dir2;
  //What direction the guard should face
  this.target = createVector(150,70);
  //Where the guard immediatly wants to move. It is differnt from patrolX and Y because those two are all patrol targets and target dir cycles through them. Sorry.
  this.leftLine = createVector(0,0);
  this.leftLineLength = 1000;
  this.rightLineLength = 1000;
  this.rightLine = createVector(0,0);
  //These variable are for the lines that display the guards Line of sight
  this.nanda = 0;
  this.nandb = 0;
  //Because p5.js doesn't have nand so I have to do it myself. That was fun
  this.coolDown = 0;
  this.reloadTime = 0;
  this.reloading = 0;
  this.bulletsLeft = 20;
  this.isShooting = 0;
  this.bulletLength = 0;
  this.bullet = 0;
  this.trails = [];
  //All the variables to do with bullets are the same as player
  this.notdead = true;
  for (var i = 0; i<walls.length; i++) {
    //It's in a weird place but if the randomly generated target it in a wall it re-generates it to allow the guard to find
    while (collideRectRect(this.target.x,this.target.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
      this.target = createVector(random(buildingX,buildingX+buildingW),random(buildingY,buildingY+buildingH));
    }
  }
}

Guard.prototype.draw = function() {
  fill(255,0,0);
  if (this.notdead) {
    fill(0,0,255);
  }
  rect(this.pos.x,this.pos.y,6,6);
  //pretty generic drawing of guard.
  if (this.notdead) {
    //if the guard is alive it draws the Line of sight lines.
    stroke(255);
    this.leftLineLength = 1000;
    this.rightLineLength = 1000;
    //They start a certain length and similar to bullets they shorten if they collide with a wall.
    this.leftLine = createVector(this.pos.x + 3 + this.leftLineLength*sin(this.dir+(10)),this.pos.y + 3 + this.leftLineLength*cos(this.dir+(10)));
    this.rightLine = createVector(this.pos.x + 3 + this.rightLineLength*sin(this.dir+(-10)),this.pos.y +  3 + this.rightLineLength*cos(this.dir+(-10)));
    for (var i = 0; i<walls.length;i++) {
      while (collideLineRect(this.pos.x + 3,this.pos.y + 3,this.leftLine.x,this.leftLine.y,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
        this.leftLineLength -= 10;
        this.leftLine = createVector(this.pos.x + 3 + this.leftLineLength*sin(this.dir+(10)),this.pos.y + 3 + this.leftLineLength*cos(this.dir+(10)));
      }
      while (collideLineRect(this.pos.x + 3,this.pos.y + 3,this.rightLine.x,this.rightLine.y,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
        this.rightLineLength -= 10;
        this.rightLine = createVector(this.pos.x + 3 + this.rightLineLength*sin(this.dir+(-10)),this.pos.y +  3 + this.rightLineLength*cos(this.dir+(-10)));
      }
    }
    this.leftLineLength += 7;
    this.leftLine = createVector(this.pos.x + 3 + this.leftLineLength*sin(this.dir+(10)),this.pos.y + 3 + this.leftLineLength*cos(this.dir+(10)));
    this.rightLineLength += 7;
    this.rightLine = createVector(this.pos.x + 3 + this.rightLineLength*sin(this.dir+(-10)),this.pos.y +  3 + this.rightLineLength*cos(this.dir+(-10)));
    //Once the line is no longer colliding with a wall it lengthens a bit so there is a no gap.
    line(this.pos.x + 3,this.pos.y + 3,this.leftLine.x,this.leftLine.y);
    line(this.pos.x + 3,this.pos.y + 3,this.rightLine.x,this.rightLine.y);
  }
  //For loops through all the bullet trails and fraws them.
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

Guard.prototype.targeting = function() {
  //sorry.
  for (var i = 0; i < walls.length; i++) {
    //It is a weird way of saying if the guard has clear line of sight with the player and some random chance, he will stop running and look at the player/shoot. Sorry
    if (collideLineRect(this.pos.x,this.pos.y,player.pos.x,player.pos.y,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
    }
    else if (random(0,1000)<1 && this.alert) {
      this.patrolType = 2;
    }
  }
  if (this.patrolType == 0 || this.patrolType == 1) {
    //These two patroltypes are the ones where the guard walks.
    if (collideRectRect(this.pos.x,this.pos.y,6,6,this.target.x,this.target.y,6,6) && this.patrolType == 0) {
      //In the patroltype where the guard randomly walks, it it is on it't target it gets a new one.
      this.target = createVector(random(buildingX,buildingX+buildingW),random(buildingY,buildingY+buildingH));
      for (var i = 0; i < walls.length; i++) {
        while (collideRectRect(this.target.x,this.target.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
          this.target = createVector(random(buildingX,buildingX+buildingW),random(buildingY,buildingY+buildingH));
        }
        //Same code from earlier. If the target is inside a building it makes it a different place.
      }
    }
    if (this.patrolType == 1) {
      //this section of code cycles through positions on the guards patrol. Sorry
      if (collideRectRect(this.pos.x,this.pos.y,6,6,this.patrolX[this.patrolNumber],this.patrolY[this.patrolNumber],2,2)) {
        this.patrolNumber++;
        if (this.patrolNumber>this.patrolX.length-1) {
          this.patrolNumber = 0;
        }
      }
      if (this.alert == true) {
        //If the guard is allerted, it changes patrol type to zero. This might seem like it will run around randomly, but patroltype 1 goes to the target, and if a guard sees the player or if the player fires the target will be on the player. Sorry
        this.patrolType = 0;
      }
      this.target = createVector(this.patrolX[this.patrolNumber],this.patrolY[this.patrolNumber]);
    }
    if (this.walkDir == -1) {
      //This is the simple pathfinding. If a direction leads it closer to the target than it goes on possible directions that randomly chooses on of the directions from that array.
      //Also, this is why when guards are first made their walkdir is set to -1.
      this.possibleDirections = [];
      if (this.pos.y < this.target.y) {
        this.possibleDirections.push(3);
      }
      if (this.pos.y > this.target.y) {
        this.possibleDirections.push(1);
      }
      if (this.pos.x < this.target.x) {
        this.possibleDirections.push(2);
      }
      if (this.pos.x > this.target.x) {
        this.possibleDirections.push(4);
      }
      this.walkDir = this.possibleDirections[Math.floor(random(0,this.possibleDirections.length))];

    }
    this.nanda = 0;
    this.nandb = 0;
    //sorry for the whole nand situation. Not my fault but still. Sorry.
    //This whole section is the same bit of code repeating with certain things changed it prevents the guard frro walking through walls.
    for (var i = 0; i < walls.length; i++) {
      if (this.walkDir == 1 && this.pos.y < this.target.y) {
        if (collideRectRect(this.pos.x+6,this.pos.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
        }
        else {
          this.nanda++;
        }
        //If it doesnt collide with a wall everytime. sorry
        this.possibleDirections = [];
        if (this.nanda == walls.length && random(0,6)<1) {
          if (this.pos.x < this.target.x) {
            this.walkDir = 2;
          }
        }
        if (collideRectRect(this.pos.x-6,this.pos.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
        }
        else {
          this.nandb++;
        }
        if (this.nandb == walls.length && random(0,6)<1) {
          if (this.pos.x > this.target.x) {
            this.walkDir = 4;
          }
        }
        //Sorry.
      }
      else if (this.walkDir == 2 && this.pos.x > this.target.x) {
        if (collideRectRect(this.pos.x,this.pos.y+6,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
        }
        else {
          this.nanda++;
        }
        this.possibleDirections = [];
        if (this.nanda == walls.length && random(0,6)<1) {
          if (this.pos.y < this.target.y) {
            this.walkDir = 3;
          }
        }
        if (collideRectRect(this.pos.x,this.pos.y-6,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
        }
        else {
          this.nandb++;
        }
        if (this.nandb == walls.length && random(0,6)<1) {
          if (this.pos.y > this.target.y) {
            this.walkDir = 1;
          }
        }
      }
      else if (this.walkDir == 3 && this.pos.y > this.target.y) {
        if (collideRectRect(this.pos.x+6,this.pos.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
        }
        else {
          this.nanda++;
        }
        this.possibleDirections = [];
        if (this.nanda == walls.length && random(0,6)<1) {
          if (this.pos.x < this.target.x) {
            this.walkDir = 2;
          }
        }
        if (collideRectRect(this.pos.x-6,this.pos.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
        }
        else {
          this.nandb++;
        }
        if (this.nandb == walls.length && random(0,6)<1) {
          if (this.pos.x > this.target.x) {
            this.walkDir = 4;
          }
        }
      }
      else if (this.walkDir == 4 && this.pos.x < this.target.x) {
        if (collideRectRect(this.pos.x,this.pos.y+6,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
        }
        else {
          this.nanda++;
        }
        this.possibleDirections = [];
        if (this.nanda == walls.length && random(0,6)<1) {
          if (this.pos.y < this.target.y) {
            this.walkDir = 3;
          }
        }
        if (collideRectRect(this.pos.x,this.pos.y-6,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
        }
        else {
          this.nandb++;
        }
        if (this.nandb == walls.length && random(0,6)<1) {
          if (this.pos.y > this.target.y) {
            this.walkDir = 1;
          }
        }

      }
    }
  }
  if (this.patrolType == 2) {
    //patroltype 2 is the one where the guard stands still and looks around
    this.walkDir = -1;
    if (this.alert == false)  {
      //cycles through patrol directions when not alert
      this.turnSpeed = 1;
      if (this.dir == this.patrolDir[this.patrolNumber]) {
        this.patrolNumber++;
        if (this.patrolNumber>this.patrolDir.length-1) {
          this.patrolNumber = 0;
        }
      }
      this.targetDir = this.patrolDir[this.patrolNumber];
    }
    else {
      //if the guard is alert the guard looks at the player
      this.turnSpeed = 5;
      this.dir = Math.floor(this.dir/5)*5;
      this.targetDir = (Math.floor((Math.atan2((this.target.x - this.pos.x), (this.target.y - this.pos.y))*57.2958)/5)*5);
      if (this.targetDir < 0) {
        this.targetDir+=360;
      }
    }
    for (var i = 0; i < walls.length; i++) {
      if (collideLineRect(this.pos.x,this.pos.y,player.pos.x,player.pos.y,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h) && this.alert) {
        this.patrolType = 0;
        //If the guard has direct line of sight. IE there is no wall in the way. Ther guard runs towards the player.
      }
    }
  }
}

Guard.prototype.direction = function() {
  //This allows the guard to turned
  if (this.targetDir != this.dir) {
    if (Math.abs(this.dir-this.targetDir)>180) {
      //If the targetdir doesn't = the guards actual dir and the distance between the two points not going over 360 the guard turns.
      if (this.dir > this.targetDir) {
        this.dir += this.turnSpeed;
      }
      else if (this.dir < this.targetDir) {
        this.dir -= this.turnSpeed;
      }
    }
    else {
      //Else going over 360 is faster so the guard does. Sorry.
      if (this.dir > this.targetDir) {
        this.dir -= this.turnSpeed;
      }
      else if (this.dir < this.targetDir) {
        this.dir += this.turnSpeed;
      }
    }
  }
  if (this.dir<0) {
    this.dir+=360;
  }
  else if (this.dir>360) {
    this.dir-=360;
  }
}

Guard.prototype.move = function() {
  if (this.notdead) {
    //Moves the guard. Not much to say. Adds a value to the x or y depending on the direction
    if (this.patrolType == 0 || this.patrolType == 1) {
      if (this.walkDir == 1) {
        if (this.alert) {
          this.pos.add(0,-3);
          this.targetDir = 180;
          for (var i = 0; i < walls.length; i++) {
            if (collideRectRect(this.pos.x,this.pos.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
              this.pos.add(0,3);
              this.walkDir = -1;
            }
          }
        }
        else {
          this.pos.add(0,-1);
          this.targetDir = 180;
          for (var i = 0; i < walls.length; i++) {
            if (collideRectRect(this.pos.x,this.pos.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
              this.pos.add(0,1);
              this.walkDir = -1;
            }
          }
        }
      }
      else if (this.walkDir == 2) {
        if (this.alert) {
          this.pos.add(3,0);
          this.targetDir = 90;
          for (var i = 0; i < walls.length; i++) {
            if (collideRectRect(this.pos.x,this.pos.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
              this.pos.add(-3,0);
              this.walkDir = -1;
            }
          }
        }
        else {
          this.pos.add(1,0);
          this.targetDir = 90;
          for (var i = 0; i < walls.length; i++) {
            if (collideRectRect(this.pos.x,this.pos.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
              this.pos.add(-1,0);
              this.walkDir = -1;
            }
          }
        }
      }
      else if (this.walkDir == 3) {
        if (this.alert) {
          this.pos.add(0,3);
          this.targetDir = 0;
          for (var i = 0; i < walls.length; i++) {
            if (collideRectRect(this.pos.x,this.pos.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
              this.pos.add(0,-3);
              this.walkDir = -1;
            }
          }
        }
        else {
          this.pos.add(0,1);
          this.targetDir = 0;
          for (var i = 0; i < walls.length; i++) {
            if (collideRectRect(this.pos.x,this.pos.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
              this.pos.add(0,-1);
              this.walkDir = -1;
            }
          }
        }
      }
      else if (this.walkDir == 4) {
        if (this.alert) {
          this.pos.add(-3,0);
          this.targetDir = 270;
          for (var i = 0; i < walls.length; i++) {
            if (collideRectRect(this.pos.x,this.pos.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
              this.pos.add(3,0);
              this.walkDir = -1;
            }
          }
        }
        else {
          this.pos.add(-1,0);
          this.targetDir = 270;
          for (var i = 0; i < walls.length; i++) {
            if (collideRectRect(this.pos.x,this.pos.y,6,6,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
              this.pos.add(1,0);
              this.walkDir = -1;
            }
          }
        }
      }
    }
  }
}

Guard.prototype.see = function() {
  this.fire = 0;
  if (this.notdead) {
    //This function allows allows the guard to see the player. It checks if the line between the guard and player collides with the wall
    var a = 0;
    this.fire = 0;
    for (var i = 0;i<walls.length;i++) {
      if (collideLineRect(this.pos.x + 3,this.pos.y + 3,player.pos.x,player.pos.y,walls[i].pos.x,walls[i].pos.y,walls[i].w,walls[i].h)) {
        a=1;
      }
    }
    //more nand action. Sorry
    if (a == 0 && collidePointTriangle(player.pos.x,player.pos.y,this.pos.x, this.pos.y, this.pos.x + 3 + 1000*sin(this.dir+(10)),this.pos.y + 3 + 1000*cos(this.dir+(10)), this.pos.x + 3 + 1000*sin(this.dir+(-10)),this.pos.y + 3 + 1000*cos(this.dir+(-10))) ) {
      //Checks whether or not the player is in the guards los
      if (this.alert||(random(0,sqrt(abs(((this.pos.x-player.pos.x)*(this.pos.x-player.pos.x))-((this.pos.y-player.pos.y)*(this.pos.y-player.pos.y)))))/player.visibility<1)) {
        //There is a a random chance the guard won't see the player depending on the distance. If the guard is alert the distance won't matter. It will always see the player
        stroke(255);
        for (var i = 0; i<guards.length;i++) {
          //alerts all the guards to the playerss location
          guards[i].alert = true;
        }
        noStroke();
        this.fire = 1;
        //Fires the gun
        for (var i = 0;i<guards.length;i++) {
          guards[i].target = createVector(player.pos.x,player.pos.y);
        }
      }
    }
  }
}

Guard.prototype.shoot = function() {
  this.isShooting = 0;
  //Same as the one the payer but instead of checking if mouse is clicked it checks if fire is true.
  //fire is true if the guard can 'see' the player.
  if (this.fire == 1 && this.coolDown == 0 && this.reloadTime == 0 && this.bulletsLeft >= 0) {
    this.isShooting = 1;
    if (this.inControl) {
      this.bulletDir = Math.atan2((player.pos.x - this.pos.x), (player.pos.y - this.pos.y))*57.2958 + random(-3,3);
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
    }
    this.trails.push(this.pos.x,this.pos.y,this.bullet[2],this.bullet[3],50,5);
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
      this.bulletsLeft = 20;
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

Guard.prototype.dying = function() {
  //Pretty much the same as the player die function.
  for (var i=0;i<guards.length;i++) {
    if (guards[i].isShooting == 1 && i!=this.guardNumber) {
      //the != guardnumber stops the guards of bullet from killing itself.
      if (collideLineRect(guards[i].bullet[0] + 3,guards[i].bullet[1] + 3,guards[i].bullet[2],guards[i].bullet[3],this.pos.x,this.pos.y,6,6)) {
        this.notdead = false;
      }
    }
  }
  if (collideLineRect(player.bullet[0] + 3,player.bullet[1] + 3,player.bullet[2],player.bullet[3],this.pos.x,this.pos.y,6,6) && player.isShooting == 1) {
    this.notdead = false;
  }
}
//Sorry about that. The code is really difficult to explain.
