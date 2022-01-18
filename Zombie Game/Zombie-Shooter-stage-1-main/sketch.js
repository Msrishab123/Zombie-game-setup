var bg, bgI;
var player, playerI, playerS;
var zombie, zombieI;
var heart1, heart2, heart3;
var heart1I, heart2I, heart3I;
var zombieGroup;
var bullets = 70;
//no of bullets is equal to 70
var bullet;
var gameState = "fight";
var bulletGroup;
/* playerS is for shooting Image*/

function preload(){
  //loading images to sprites
  bgI = loadImage( "assets/bg.jpeg");
  playerI = loadImage( "assets/shooter_2.png");
  playerS = loadImage( "assets/shooter_3.png"); 
  zombieI = loadImage( "assets/zombie.png");
  heart1I = loadImage( "assets/heart_1.png");
  heart2I = loadImage( "assets/heart_2.png");
  heart3I = loadImage( "assets/heart_3.png");
}

function setup(){
  //creating canvas
  createCanvas(windowWidth,windowHeight);

  //assigning sprites different works
  bg = createSprite(displayWidth/2 - 20, displayHeight/2 - 40, 20 , 20);
  //adding image to sprites
  bg.addImage(bgI);
  //scaling images
  bg.scale = 1.1;

  player = createSprite(displayWidth - 1150, displayHeight - 300, 50,50);
  player.addImage(playerI);
  player.scale = 0.3;
 //setting a collider
  player.setCollider("rectangle", 0,0,300,300);
  player.debug = true;

  heart1 = createSprite(displayWidth-150, 40,20,20);
  heart1.visible = false;
  //making sprites invisible
  heart1.addImage(heart1I);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth-100, 40,20,20);
  heart2.visible = false;
  heart2.addImage(heart2I);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth-150, 40,20,20);
  heart3.addImage(heart3I);
  heart3.scale = 0.4;

  //creating new Groups
  zombieGroup = new Group;
  bulletGroup = new Group;
}

function draw(){
background(0);

if(gameState === "fight"){

  // if we press the up arrow key the player should move to the up
if (keyDown("UP_ARROW")|| touches.length > 0){
  player.y = player.y -30;
}

// if we press the down arrow key the player should move to the down
if (keyDown("DOWN_ARROW")|| touches.length > 0){
  player.y = player.y +30;
}

// if we press the space key the player should change to the shoot animation
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150, player.y - 30, 20, 10);
  bullet.velocityX = 20;
  bulletGroup.add(bullet);
 //setting depth helps no to put extra layers on the bulet
  player.depth = bullet.depth;
  player.depth += 2;
  player.addImage(playerS);
  bullets -= 1;
}
else if(keyWentUp("space")){
player.addImage(playerI);
}

if(zombieGroup.isTouching(bulletGroup)){
  //adding zombieGroup to a particular array i
  for(var i = 0; i < zombieGroup.length; i++){
    //if zombie group comes in contact of player then the sprite gets destroyed
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
    }
  }
}

if(zombieGroup.isTouching(player)){
  for(var i = 0; i < zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
    }
  }
}

  zombies();
}
  drawSprites();

  if(gameState === "lost"){
    textSize(100);
    //setting the size of text
    fill("red");
    // filling colour to the text
    text("You Lost", 400,400);
    //setting what is the text and its positions
    zombieGroup.destroyEach();
    // destroy each and every sprite which belongs to zombie Group
    player.destroy();
  }
  else if(gameState === "won"){
    textSize(100);
    fill("yellow");
    text("You Won!!",400,400);
    zombieGroup.destroyEach();
    player.destroy();
  }
  else if(gameState === "bullet"){
    textSize(50);
    fill("yellow");
    text("You ran out of Bullets", 470, 410);
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();
  }
}

function zombies(){
if (frameCount%50 === 0 ){
zombie = createSprite(random(500,1100),random(100,500),40,40);
//creating a sprite in which x and y positions will be random
zombie.addImage(zombieI);
zombie.scale = 0.15;
//setting velocity to the zombie
zombie.velocityX = -3;
zombie.debug = true;
zombie.setCollider("rectangle", 0,0,400,400);
zombie.lifetime = 400;
//giving a lifetime to the sprites so that they dont occupy space an the game doesnot get crashed
zombieGroup.add(zombie);
//adding zombie sprite to zombieGroup
}
}