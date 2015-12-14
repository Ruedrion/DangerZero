//virtual camera
//move the mouse around
//the sprite follows the mouse but appears at the center of the sketch
//because the camera is following it

var ship;
var bg, bad, bullets;
var barrier;
var en;
var shipImg, enImg, bulletImg, deadImg;
var gameOver;
//the scene is twice the size of the canvas
var SCENE_W = 3000;
var SCENE_H = 1400;
var chase=false

function setup() {
    createCanvas(1500,700);
    
    ship=createSprite(width/2, height/2, 40,40);
<<<<<<< HEAD
    en=createSprite(random(),random(),30,30);
    shipImg=loadImage("assets/ship0.png");
    enImg=loadImage("assets/en"+floor(random(0,2))+".png");
    bulletImg=loadImage("assets/asteroids_bullet.png");
    deadImg=("assets/destroy.png")
=======
    en1=createSprite(random(),random(),30,30);
    shipImg = loadImage("assets/Ship.png");
    en1Img = loadImage("assets/en1.png");
    bulletImg=loadImage("assets/asteroids_bullet.png")
>>>>>>> origin/gh-pages
    ship.addImage(shipImg);
    
    en.addImage(enImg);
    en.rotateToDirection=false;
    ship.friction=.98;
    en.friction=.98;
    ship.maxSpeed=8;
    en.maxSpeed=5;
    ship.setCollider("circle", 0,0, 20);
    en.setCollider("circle", 0,0, 20);
    bg =new Group();
    bad=new Group();
    bullets=new Group();

    for(var i=0; i<150; i++)
  {
  //create a sprite and add the 3 animations
    var star = createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));
  //cycles through rocks 0 1 2
    star.addAnimation("normal", "assets/star"+i%3+".png");
    bg.add(star);
  }
    barrier = loadImage("assets/frame.png");
}


function draw() {
    background(0,0,0);  
    
    if(gameOver && keyWentDown("x"))
    newGame();

   if(keyDown("UP_ARROW"))
      ship.addSpeed(3, ship.rotation);
      
<<<<<<< HEAD
=======
    if(keyDown("DOWN_ARROW"))
      ship.velocity.x=0
      ship.velocity.y=0
      
>>>>>>> origin/gh-pages
    if(keyDown(RIGHT_ARROW))
      ship.rotation += 4;
    
    if(keyDown("LEFT_ARROW"))
      ship.rotation -= 4; 
      
    if(keyWentDown("x"))
    {
    var bullet = createSprite(ship.position.x, ship.position.y);
    bullet.addImage(bulletImg);
    bullet.setSpeed(10, ship.rotation);
    bullet.life = 100;
    bullets.add(bullet);
    }
    
  //set the camera position to the ship position
    camera.position.x = ship.position.x;
    camera.position.y = ship.position.y;
  
  //limit the ship movements
    if(ship.position.x < 0)
        ship.position.x = 0;
    if(ship.position.y < 0)
        ship.position.y = 0;
    if(ship.position.x > SCENE_W)
        ship.position.x = SCENE_W;
    if(ship.position.y > SCENE_H)
        ship.position.y = SCENE_H;
    
    if(ship.position.x-en.position.x>200)
    {    
        if(ship.position.y-en.position.y>200)
    {
            chase=true
    }
    }
    else if(chase=true)
    {
       en.attractionPoint(4,ship.position.x,ship.position.y);
    }
    else 
        chase=false;
 
    if (en.overlap(bullets)){
    dead();
    }
  //draw the scene
  //rocks first
<<<<<<< HEAD
    drawSprites(bg);
    drawSprite(ship);
    drawSprite(en);
    drawSprites(bullets)
=======
  drawsprites(bullet)
  drawSprites(bg);
  drawSprite(ship);
  drawSprite(en1);
>>>>>>> origin/gh-pages
  //I can turn on and off the camera at any point to restore
  //the normal drawing coordinates, the frame will be drawn at 
  //the absolute 0,0 (try to see what happens if you don't turn it off
  camera.on();
  image(barrier,0,0);
}
function dead(){
en.addImage(deadImg);
}
function newGame() {
  e.remove
}