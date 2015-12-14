var ship;
var bg;
var shipImg;
var x= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var y= [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
var star

function setup() {
  createCanvas(windowWidth-2,windowHeight-2);
  //create a sprite and add the 3 animations
 ship=createSprite(width/2, height/2, 40,40);
 shipImg = loadImage("assets/Ship.png");
 starImg= loadImage("assests/star0.png")
 ship.addImage(shipImg)
   //ship.velocity.x =10
  bg = new Group();
  //create some background for visual reference  
  for(var i=0; i<80; i++)
  {
  //create a sprite and add the 3 animations
   star= createSprite(random(-width, +width), random(-height, +height));
  //cycles through rocks 0 1 2
   star.addAnimation("normal", "assets/star"+i%3+".png");
   bg.add(star);
  }
    
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw()
}
function draw() {
  background(0,0,0);  
   camera.position.x = ship.position.x;
   // if(gameOver && keyWentDown("x"))
    //newGame();
  
if(ship.position.x > star.position.x-star.width+width/2)
    //star.position.x=windowWidth;
    

   if(keyDown("UP_ARROW"))
   {
      ship.position.y -= 3;
   }
    if(keyDown("DOWN_ARROW"))
    {
        ship.position.y += 3;
    }
    if(keyDown("RIGHT_ARROW"))
    {
        ship.position.x += 2;
    }
    if(keyDown("LEFT_ARROW"))
    {
        ship.position.x -= 2; 
    }
  drawSprites(bg);
  drawSprite(ship);
  camera.on();
}
