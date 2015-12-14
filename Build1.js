//flappy bird-like
//mouse click or x to flap

var FLAP = -7;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var bird, ground;
var pipes;
var bullets;
var gameOver;
var birdImg, bulletImage, pipeImg, groundImg, bgImg;

function setup() {
  createCanvas(400,600);

  birdImg = loadImage("assets/Ship.png");
  pipeImg = loadImage("assets/flappy_pipe.png");
  bulletImage = loadImage("assets/asteroids_bullet.png");
  groundImg = loadImage("assets/flappy_ground.png");
  bgImg = loadImage("assets/flappy_bg.png");
  
  bird = createSprite(width/2, height/2, 40,40);
  bird.rotateToDirection = false;
  bird.velocity.x = 6;
  bird.setCollider("circle", 0,0,20);
  bird.addImage(birdImg);

  ground = createSprite(800/2, GROUND_Y+100); //image 800x200
  ground.addImage(groundImg);

  pipes = new Group();
  bullets = new Group();


  gameOver = true;
  updateSprites(false);
  
  camera.position.y = height/2;
}

function draw() {

  if(gameOver && keyWentDown("x"))
    newGame();

  if(!gameOver) {

   if(keyDown("UP_ARROW"))
      bird.position.y -= 3;
      
    if(keyDown("DOWN_ARROW"))
      bird.position.y += 3;
      
    if(keyDown("RIGHT_ARROW"))
      bird.position.x += 2;
    
    if(keyDown("LEFT_ARROW"))
      bird.position.x -= 2; 
      
    if(keyDown("x"))
    {
    var bullet = createSprite(bird.position.x, bird.position.y);
    bullet.addImage(bulletImage);
    bullet.setSpeed(10+bird.getSpeed(), bird.rotation);
    bullet.life = 100;
    bullets.add(bullet);
    }
    
    if(bird.position.y<0)
      bird.position.y = 0;
    
    if(bird.position.y+bird.height/2 > GROUND_Y)
      die();

    if(bird.overlap(pipes))
      die();
      
      

    //spawn pipes
    if(frameCount%50 == 0) {
      var pipeH = random(50, 300);
      var pipe = createSprite(bird.position.x + width, GROUND_Y-pipeH/2+1+100, 80, pipeH);
      pipe.addImage(pipeImg);
      pipes.add(pipe);

      //top pipe
      if(pipeH<200) {
        pipeH = height -(pipeH+MIN_OPENING);
        pipe = createSprite(bird.position.x + width, pipeH/2-100, 80, pipeH);
        pipe.mirrorY(-1);
        pipe.addImage(pipeImg);
        pipes.add(pipe);
      }
    }

    //get rid of passed pipes
    for(var i = 0; i<pipes.length; i++)
      if(pipes[i].position.x < bird.position.x-width/2)
        pipes[i].remove();
  }

  camera.position.x = bird.position.x + width/4;

  //wrap ground
  
  //background(247, 134, 131); 
  //camera.off();
  //image(bgImg, 0, GROUND_Y-190);
  //camera.on();
  drawSprites(bg);
  drawSprites(pipes);
  drawSprite(ground);
  drawSprite(bird);
}

function die() {
  updateSprites(false);

  gameOver = true;   
}

function newGame() {
  pipes.removeSprites();
  gameOver = false;
  updateSprites(true);
  bird.position.x = width/2;
  bird.position.y = height/2;
  bird.velocity.y = 0;
  ground.position.x = 800/2;
  ground.position.y = GROUND_Y+100;
}

function mousePressed() {
  if(gameOver)
    newGame();
}