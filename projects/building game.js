// Template project for p5
var dt = 0;
var player = [300,300,0]
var startBuildingX = 0;
var building1 = [750,500,600]
var building2 = [700,700,0]
var building3 = [800,700,0]
var numWindows = 0;
var emptySpace = 0;
var canJump = 0;
var gameOver = 0;
var noDeath = 0;
var glassShattered = 0;
var brokenGlassY = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var brokenGlassSpeed = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var highScore = 0;
function setup() {
  createCanvas(600,600);
}

function draw() {
  background(135,206,250);
  if (gameOver == 0) {
    dt = dt + 1;
  }
  canJump = 0;
  //Moves buildings
  if (gameOver == 0) {
    building1[0] = building1[0]-2-dt*0.005;
    building2[0] = building2[0]-2-dt*0.005;
    building3[0] = building3[0]-2-dt*0.005;
    startBuildingX = startBuildingX-2-dt*0.005
  }
  //Tests for player being on buildings
  if (player[0]>building1[0] && player[0]<building1[0]+building1[2]) {
    if (player[1] >= building1[1]-40 && player[1] <= building1[1]) {
      player[1] = building1[1]-40;
      player[2] = 0;
      canJump = 1;
    }
    else if (player[1] > building1[1]) {
      gameOver = 1;
    }
    else {
      player[2]=player[2]+.5;
    }
  }
  else if (player[0]>building2[0] && player[0]<building2[0]+building2[2]) {
    if (player[1] >= building2[1]-40  && player[1] <= building2[1]) {
      player[1] = building2[1]-40;
      player[2] = 0;
      canJump = 1;
    }
    else if (player[1] > building2[1]) {
      gameOver = 1;
    }
    else {
      player[2]=player[2]+.5;
    }
  }
  else if (player[0]>building3[0] && player[0]<building3[0]+building3[2]) {
    if (player[1] >= building3[1]-40  && player[1] <= building3[1]) {
      player[1] = building3[1]-40;
      player[2] = 0;
      canJump = 1;
    }
    else if (player[1] > building3[1]) {
      gameOver = 1;
    }
    else {
      player[2]=player[2]+.5;
    }
  }
  else if (player[0]<startBuildingX+700) {
    if (player[1] >= 360  && player[1] <= 400) {
      player[1] = 360;
      player[2] = 0;
      canJump = 1;
    }
    else if (player[1] > 400) {
      gameOver = 1;
    }
    else {
      player[2]=player[2]+.5;
    }
  }
  else {
    player[2]=player[2]+.5;
    canJump = 0;
  }
  player[1] = player[1]+player[2];

  if (glassShattered==1 && brokenGlassY[0]<800) {
    for (i=0;i<21;i++) {
      brokenGlassY[i] = brokenGlassY[i]-brokenGlassSpeed[i];
      brokenGlassSpeed[i] = brokenGlassSpeed[i]-.5;
    }
  }
  //Random generation of buildings
  if (building1[0]+building1[2] < 0) {
    building1[0] = building3[0] + building3[2] + random(20,100+dt*0.05);
    building1[1] = building3[1] + random(-60,50);
    building1[2] = random(150,600);
    if (building1[1]>600) {
      building1[1] = 500;
    }
    else if (building1[1]<0) {
      building1[1] = 500;
      building1[2] = 900;
    }
  }
  if (building2[0]+building2[2] < 0) {
    building2[0] = building1[0] + building1[2] + random(20,100+dt*0.05);
    building2[1] = building1[1] + random(-60,50);
    building2[2] = random(150,600);
    if (building2[1]>600) {
      building2[1] = 500;
    }
    else if (building2[1]<0) {
      building2[1] = 500;
      building2[2] = 900;
    }
  }
  if (building3[0]+building3[2] < 0) {
    building3[0] = building2[0] + building2[2] + random(20,100+dt*0.05);
    building3[1] = building2[1] + random(-60,50);
    building3[2] = random(250,800);
    if (building3[1]>600) {
      building3[1] = 500;
    }
    else if (building3[1]<0) {
      building3[1] = 500;
      building3[2] = 900;
    }
  }
  //Drawing of buildings
  drawStart(startBuildingX);
  drawPlayer(player[0],player[1]);
  if (glassShattered == 0) {
    drawGlass();
    if (player[0] >= (startBuildingX + 670)) {
      glassShattered = 1;
      for (i=0;i<21;i++) {
        brokenGlassY[i] = (random(150,400));
        brokenGlassSpeed[i] = (random(1,10));
      }

    }
  }
  else if (brokenGlassY[0]<800) {
    for (i=0;i<21;i++) {
      drawBG(brokenGlassY[i]);
    }
  }
  basicBuilding(building1[0],building1[1],building1[2]);
  basicBuilding(building2[0],building2[1],building2[2]);
  basicBuilding(building3[0],building3[1],building3[2]);
  fill(255,0,0);
  text("Score = "+dt,50,50);
  text("High Score = "+highScore,50,75);
  if (highScore<=dt) {
    highScore=dt;
    text("NEW!",15,75);
  }
  if (noDeath == 1) {
    gameOver = 0;
  }
}

function drawPlayer(x, y) {
  fill(0,255,10);
  rect(x,y,20,40);
}

function basicBuilding(x,y,w) {
  fill(100);
  rect(x,y,w,1000);
  numWindows = Math.floor(w/100);
  emptySpace = (w-(numWindows*50))/(numWindows*2)
  for (o = 0; o < numWindows; o++) {
    for (i = 0; i <= 10; i++) {
      fill(0,0,255);
      rect(x+emptySpace+o*(2*emptySpace+50),y+25 + (i*100), 50,50)
    }
  }
}

function drawStart(x) {
  fill(100);
  rect(x,0,700,150);
  rect(x,400,700,200);
  fill(200);
  rect(x,150,700,250);
}

function drawGlass() {
  fill(0,191,255);
  rect(startBuildingX+690,150,10,250);
}

function drawBG(y) {
  fill(0,191,255);
  triangle(random(298,305),y,random(298,305),random(y-8,y+8),random(298,305),random(y-8,y+8));
}



//Jumping
function keyPressed() {
  if ((keyCode===UP_ARROW || keyCode===32) && canJump == 1) {
    player[2]=-12;
    player[1]=player[1]-1
  }
}

function keyTyped() {
  if (key==='r') {
    dt = 0;
    player = [300,300,0]
    startBuildingX = 0;
    building1 = [750,500,600]
    building2 = [700,700,0]
    building3 = [800,700,0]
    numWindows = 0;
    emptySpace = 0;
    canJump = 0;
    gameOver = 0;
    noDeath = 0;
    glassShattered = 0;
  }
  else if (key==='z') {
    noDeath = 1;
  }
}

function keyReleased() {
  if (keyCode===UP_ARROW || keyCode===32) {
    player[2]=player[2]+5;
  }
}
