var bullets;
var ens;
var ship;
var shipImage, bulletImage, particleImage,bgImage;
var MARGIN = 40;
var gameOver;
//var host = 'http://ruedrion.github.io/DangerZero/audio/';
//var hit, bgm;
function setup() {
createCanvas(windowWidth-10,windowHeight-10);

bulletImage = loadImage("assets/Bullet.png");
shipImage = loadImage("assets/ship0.png");
particleImage = loadImage("assets/destroy.png");
bgImage=loadImage("assets/Background0.png")
ship = createSprite(width/2, height/2);
ship.maxSpeed = 6;
ship.friction = .98;
ship.setCollider("circle", 0,0, 20);

ship.addImage("normal", shipImage);
ship.addAnimation("thrust", "assets/shipf0.png", "assets/shipf1.png");

ens = new Group();
bullets = new Group();

for(var i = 0; i<75; i++) {
  var ang = random(360);
  var px = width/2 + 1000 * cos(radians(ang));
  var py = height/2+ 1000 * sin(radians(ang));
  createEn(3, px, py);
  }
}
function reload(){
hit= loadSound('audio/boom.wav');
bgm= loadSound('audio/bacground.wav');
}
function draw() {
  background(0);
  
  
    if(gameOver && keyWentDown("x"))
    newGame();
  
  for(var i=0; i<allSprites.length; i++) {
  var s = allSprites[i];
  if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
  if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
  if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
  if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
  }
  
  ens.overlap(bullets, enHit);
  
  if(ship.overlap(ens))
      die();
  
  if(keyDown(LEFT_ARROW))
    ship.rotation -= 4;
  if(keyDown(RIGHT_ARROW))
    ship.rotation += 4;
  if(keyDown(UP_ARROW))
    {
    ship.addSpeed(.2, ship.rotation);
    ship.changeAnimation("thrust");
    }
  else
    ship.changeAnimation("normal");
    
  if(keyWentDown("x"))
    {
    var bullet = createSprite(ship.position.x, ship.position.y);
    bullet.addImage(bulletImage);
    bullet.setSpeed(10, ship.rotation);
    bullet.life = 70;
    bullet.rotateToDirection=true
    bullets.add(bullet);
    }
  image(bgImage, 0, 0)
  image(bgImage,width/2,0)
  fill(255);
  textAlign(CENTER);
  text("Controls: Arrow Keys + X", width/2, 20);
    //loadSound(host + 'backgound.wav')
  drawSprites();
  
}

function createEn(type, x, y) {
  var a = createSprite(x, y);
  var img  = loadImage("assets/en"+floor(random(0,4))+".png");
  a.addImage(img);
  a.setSpeed(2.5-(type/2), random(360));
  a.maxSpeed=1
  //a.debug = true;
  a.type = type;
  if(type == 2)
    a.scale = .6;
  if(type == 1)
    a.scale = .3;
  a.mass = 2+a.scale;
  a.setCollider("circle", 0, 0, 15);
  ens.add(a);
  return a;
}

function enHit(en, bullet) {
var newType = en.type-1;

if(newType>0) {
  createEn(newType, en.position.x, en.position.y);
  createEn(newType, en.position.x, en.position.y);
  }

for(var i=0; i<10; i++) {
  var p = createSprite(bullet.position.x, bullet.position.y);
  p.addImage(particleImage);
  p.setSpeed(random(3,5), random(360));
  p.friction = 0.95;
  p.life = 15;
  }
//hit.play();
    //loadSound(host +'boom.wav'
bullet.remove();
en.remove();
}
function die() {
  updateSprites(false);

  gameOver = true;   
}

function newGame() {
  ens.removeSprites();
  gameOver = false;
  updateSprites(true);
  ship.position.x = width/2;
  ship.position.y = height/2;
  ship.velocity.y = 0;
  for(var i = 0; i<75; i++) {
  var ang = random(360);
  var px = width/2 + 1000 * cos(radians(ang));
  var py = height/2+ 1000 * sin(radians(ang));
  createEn(3, px, py);
  }
}
