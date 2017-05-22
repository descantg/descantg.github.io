Sight = function(startX,startY,startDir,angle,r,g,b,a) {
  angleMode(DEGREES);
  this.pos = createVector(startX,startY);
  this.angle = angle
  this.dir = startDir;
  this.rgb = createVector(r,g,b);
  this.alpha = a;
  this.boxCornersX = [];
  this.boxCornersY = [];
  this.boxSides = [];
  this.boxLightSides = [];

}

Sight.prototype.ogTri = function(dir) {
  this.dir = -atan2(mouseY-this.pos.x, mouseX-this.pos.y) + 90;
  //this.dir = dir;
  triangle(this.pos.x,this.pos.y,this.pos.x + 700*sin(this.dir+(.5*this.angle)),this.pos.y + 700*cos(this.dir+(.5*this.angle)),this.pos.x + 700*sin(this.dir-(.5*this.angle)),this.pos.y + 700*cos(this.dir-(.5*this.angle)));
  //line(this.pos.x,this.pos.y,this.pos.x + 700*sin(this.dir),this.pos.y +700*cos(this.dir));
}

Sight.prototype.boxFaces = function() {
  for (var i = 0;i<this.boxSides.length; i++) {
    if ((Math.abs(this.pos.x-this.boxCornersX[i]))*(Math.abs(this.pos.x-this.boxCornersX[i])) + (Math.abs(this.pos.y-this.boxCornersY[i]))*(Math.abs(this.pos.y-this.boxCornersY[i])) > (Math.abs(this.pos.x-(this.boxCornersX[i] + sin(this.boxSides[i]))))*(Math.abs(this.pos.x-(this.boxCornersX[i] + sin(this.boxSides[i])))) + (Math.abs(this.pos.y-(this.boxCornersY[i] + cos(this.boxSides[i]))))*(Math.abs(this.pos.y-(this.boxCornersY[i] + cos(this.boxSides[i]))))) {
      //console.log(i);
    }
  }
}

Sight.prototype.newBox = function(x,y,w,h) {
  this.boxCornersX.push(x,x+w,x+w,x);
  this.boxCornersY.push(y,y,y+h,y+h);
  this.boxSides.push(180,90,0,-90);

}
