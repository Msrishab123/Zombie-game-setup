var bg, bgI;
var player, playerI, playerS;
/* playerS is for shooting Image*/

function preload(){
  //loading images to sprites
  bgI = loadImage( "assets/bg.jpeg");
  playerI = loadImage( "assets/shooter_2.png");
  playerS = loadImage( "assets/shooter_3.png"); 
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
}

function draw(){
background(0);

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
  player.addImage(playerS);
}
else if(keyWentUp("space")){
player.addImage(playerI);
}

  drawSprites();
}

