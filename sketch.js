var backImage,backgr;
var player, player_running,man;
var ground,ground_img,ground1;
var obstacleGroup,obstacle
var END =0;
var PLAY =1;
var gameState = PLAY;
var coinImage,coin,coinGroup;
var gameOverImage,gameover
function preload(){
  backImage=loadImage("background1.png");
  player_running = loadAnimation("running1.png","running2.png","running3.png","running4.png");
  coinImage=loadImage("coin.png")
obstaceImage=loadImage("stone.png")
gameOverImage=loadImage("gameOver.png")
}

function setup() {
  createCanvas(1200, 800);
  
 

  var survivalTime=0;
  
  
   man=createSprite(80,315,20,20);
   man.addAnimation("moving", player_running);
  
   man.scale=0.5
  
  ground1 = createSprite(400,350,900,10);
  ground1.velocityX=-4;
  ground1.x=ground1.width/2;
  

 obstacleGroup = new Group();
  coinGroup=new Group()

  score = 0;
 
    backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
 
  gameover=createSprite(600,400,800,400);
  gameover.addImage(gameOverImage);
  //backgr.scale=1.5;
 // backgr.x=backgr.width/2;
 gameover.visible=false;
}


function draw() {
  
  background(255);
 
  if(frameCount%200===0)
  {spawngrounds()}
    
  if(ground1.x<0) {
    ground1.x=ground1.width/2;
  }
  
    if(backgr.x<100) {
    backgr.x=backgr.width/2;
  }
    if(coinGroup.isTouching(man)){
      //coinGroup.destroyEach();
    score = score + 2;
    }
  /*  switch(score){
        case 10: man.scale=0.12;
                break;
        case 20: man.scale=0.14;
                break;
        case 30: man.scale=0.16;
                break;
        case 40: man.scale=0.18;
                break;
        default: break;
    }*/
   
    if(keyDown("space")&&(man.y>50) ) {
      man.velocityY = -20;
    }
    man.velocityY = man.velocityY + 0.8;
  
    man.collide(ground1);   
    spawncoins();
    spawnObstacles();
  /* if(obstacleGroup.isTouching(man)){ 
    man.scale=0.08;
     
    }*/
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
    if(obstacleGroup.isTouching(man)){
        ground1.velocityX = 0;
        man.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
       coinGroup.setLifetimeEach(-1);
      obstacleGroup.destroyEach()
      coinGroup.destroyEach()
      gameState=END;
      gameover.visible=true;
    }

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);


}




function spawnObstacles() {
 
  if (frameCount % 80 === 0) {
    obstacle = createSprite(600,250,40,10);
    //obstacle.y = random(10,200);    
    obstacle.y=ground1.y-20;
    obstacle.velocityX = -5;
    
     
    obstacle.lifetime = 300;
    man.depth = obstacle.depth + 1;
    
    
     obstacle.addImage(obstaceImage);
     obstacle.scale=0.2
    
    obstacleGroup.add(obstacle);
  }
}

function spawngrounds() {
   var rand1=Math.round(random(1,3))
   switch(rand1){
    case 1:  ground1.y=350;
    man.y=315
            break;
    case 2:  ground1.y=500;
    man.y=465;
            break;
    case 3:  ground1.y=600;
    man.y=565;
            break;
    default: break;

}
    
   
    
       
  
  
}
function spawncoins(){
  if (frameCount % 80 === 0) {
    coin = createSprite(600,250,40,10);
   // coin.y = random(120,200);
   coin.y=ground1.y-100;
    coin.velocityX = -5;
    
     
    coin.lifetime = 300;
    man.depth = coin.depth + 1;
    
    
     coin.addImage(coinImage);
     coin.scale=0.2;
    
    coinGroup.add(coin);
  }


}