var backg, background, backImage;
var monkey, monkey_running, monkey_stop, monkeysad;
var Score;
var bananaImage, bananaGroup;
var obstacleImage, obstacleGroup;
var ground;
var PLAY, END, gameState;
var ivg;


function preload() {
  backImage = loadImage("jungle.jpg");

  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

  monkey_stop = loadImage("Monkey_07.png");

  monkeysad = loadAnimation("My Monkey.gif");
}

function setup() {
  createCanvas(400, 400);

  backg = createSprite(200, 200, 400, 400);
  backg.addImage("background", backImage);
  backg.velocityX = -6;

  monkey = createSprite(50, 330, 50, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("monkeystop", monkey_stop);
  monkey.addAnimation("Sad Monkey", monkeysad);
  monkey.scale = 0.15;

  ivg = createSprite(200, 380, 400, 10);
  ivg.visible = false;

  obstacleGroup = new Group();
  bananaGroup = new Group();

  

  ground = createSprite(200, 350, 800, 5);
  ground.velocityX = -2;
  ground.x = ground.width / 2;
  ground.visible = false;

  PLAY = 1;
  END = 0;
  gameState = 1;

}

function draw() {

  if (gameState === PLAY) {
    background(220);
    
    Score = 0;

    Score = Math.ceil(frameCount / frameRate());

    if (backg.x < 0) {
      backg.x = backg.width / 2;
    }

    //console.log(monkey.y);
    if (keyDown("space") && monkey.y >= 330) {
      monkey.velocityY = -15;
    }
    //Adding gravity
    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ivg);
    obstacleGroup.collide(ivg);
    
    if (bananaGroup.isTouching(monkey)) {

      var score = Math.round(random(0, 50));

      switch (score) {
        case 10:
          monkey.scale = 0.12;
          break;
        case 20:
          monkey.scale = 0.14;
          break;
        case 30:
          monkey.scale = 0.16;
          break;
        case 40:
          monkey.scale = 0.18;
          break;
        default:
          break;
      }
      bananaGroup.destroyEach();
    }


    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
    
    if(Score>=150){
      stroke("black");
      textSize(20);
      fill("black");
      text("You Won The Game, and made me Win!!!",30,200);
     
    }

    
    if (obstacleGroup.isTouching(monkey)) {
      monkey.scale = 0.1;
    }

    Food();
    Obstacles();
  } else if (gameState === END) {
    background('pink');

    backg.velocity = 0;

    monkey.changeAnimation("monkeystop", monkey_stop);

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);

    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    backg.destroy();

    monkey.changeAnimation("Sad Monkey", monkeysad);
    monkey.scale = 1.5;
    monkey.x = 150;
    monkey.y = 150;

    stroke("black");
    textSize(20);
    fill("black");
    text("You made me hit on the rock,its ok press 'R'  ", 10, 330);
    text("To Restart and you can play the game   ", 10, 350);
    text("again and make me win. All The Best!!", 10, 370);

    if (keyDown('R')) {
      Restart();
    }

  }


  drawSprites();

  stroke("black");
  textSize(20);
  fill("black");
  text("Score:" + Score, 100, 50);
}


function Food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400, 160, 50, 20);

    //Adding animation to the banana
    banana.addImage("Banana", bananaImage);
    banana.scale = 0.05;

    //Giving veelocity to the banana
    banana.velocityX = -6;

    //random position for banana
    var rand = random(120, 200);
    banana.y = rand;

    //Giving lifeTime for the bananas
    banana.lifetime = 80;

    //Adding bananas to the banana group
    bananaGroup.add(banana);
  }
}

function Obstacles() {
  if (frameCount % 300 === 0) {
    var stone = createSprite(400, 350, 10, 20);

    //Adding animation to the stone
    stone.addImage("Stone", obstacleImage);
    stone.scale = 0.1;

    //Giving velocity to the stone
    stone.velocityX = -6;

    //Giving lifeTime to the stones
    stone.lifetime = 133;

    obstacleGroup.add(stone);
  }
}

function Restart() {
  backg.velocity = -6;

  

  obstacleGroup.setVelocityXEach(-6);
  bananaGroup.setVelocityXEach(-6);

 
  monkey.changeAnimation("monkey", monkey_running);
  monkey.scale = 0.15;
  monkey.x = 50;
  monkey.y = 330;
  
  backg.addImage("background", backImage);
  backg.velocityX = -6;

  ivg = createSprite(200, 380, 400, 10);
  ivg.visible = false;

  obstacleGroup = new Group();
  bananaGroup = new Group();

  Score = 0;

  
  ground.velocityX = -2;
  ground.x = ground.width / 2;
  ground.visible = false;

  gameState=PLAY;


}