var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, restart, gameOverImage, restartImage;
var score = 0;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
let gravity = 1
//var score;
function preload() {
	trex_running = loadAnimation("assets/Teacher.jpeg");
	trex_collided = loadImage("assets/trex_collided.png");
	restartImage = loadImage("assets/restart.png");
	gameOverImage = loadImage("assets/gameOver.png");
	groundImage = loadImage("assets/ground2.png");
	cloudImage = loadImage("assets/cloud.png");
	obstacle1 = loadImage("assets/hack.png");
	obstacle2 = loadImage("assets/BossBaby.jpeg");
	obstacle3 = loadImage("assets/turtle-game-obstacle-gif-animation_still_2x.webp");
	obstacle4 = loadImage("assets/brawl-stars-video-games-beat-em-up-single-player-video-game-png-favpng-dAk8jAPJEb0CtVqV5NAC4Sgqc-removebg-preview.png");
	obstacle5 = loadImage("assets/download.jpeg");
	obstacle6 = loadImage("assets/stone.png");
	sound = loadSound('assets/Children Yay!   Sound Effect.mp4');
	song = loadSound('assets/y2mate.com - 50 Cent  Candy Shop CLEAN HQ_1080p.mp4')
}

function setup() {
	createCanvas(2000, 500);
	trex = createSprite(50, 170, 20, 50);
	trex.addAnimation("running", trex_running);
	trex.scale = 0.14;
	trex.gravity;
	obstacle1.resize(100, 100);
	obstacle2.resize(100, 100);
	obstacle3.resize(100, 200);
	obstacle4.resize(100, 100);
	obstacle5.resize(100, 100);
	obstacle6.resize(100, 100);
	ground = createSprite(2000, 180, 400, 20);
	ground.addImage("ground", groundImage);
	ground.x = ground.width / 2;
	ground.velocityX = -(4 + 3 * score / 100);
	invisibleGround = createSprite(200, 190, 400, 10);
	invisibleGround.visible = false;
	cloudsGroup = new Group();
	obstaclesGroup = new Group();
	gameOver = createSprite(300, 100, 10, 10);
	gameOver.addImage(gameOverImage);
	gameOver.scale = 0.5;
	gameOver.visible = false;
	restart = createSprite(300, 140, 10, 10);
	restart.addImage(restartImage);
	restart.scale = 0.5
	restart.visible = false;
}

function draw() {
	background('white');
	text("Score: " + score, 500, 50);
	if (gameState == PLAY) {
		score = score + Math.round(getFrameRate() / 60);
		
		if (keyDown("space") && trex.y >= 100) {
			trex.velocityY = -10;
			
		}
		trex.velocityY = trex.velocityY + 0.8;
		
		if (ground.x < 0) {
			ground.x = ground.width / 2;
		}
		trex.collide(invisibleGround);
		spawnClouds();
		spawnObstacles();
		if (obstaclesGroup.isTouching(trex)) {
			gameState = END;
		}
	} else if (gameState === END) {
		gameOver.visible = true;
		restart.visible = true;
		//set velcity of each game object to 0
		ground.velocityX = 0;
		trex.velocityY = 0;
		obstaclesGroup.setVelocityXEach(0);
		cloudsGroup.setVelocityXEach(0);
		//change the trex animation
		trex.addAnimation("trex_collided", trex_collided);
		//set lifetime of the game objects so that they are never destroyed
		obstaclesGroup.setLifetimeEach(-1);
		cloudsGroup.setLifetimeEach(-1);
	}
	if (mousePressedOver(restart)) {
		reset();
	}
	if (score >= 1000) {
		reset2()
	}
	textSize(22);
	text('Mrs K, survive all the obstacles, and save the students!', 10, 30);
	drawSprites();
}

function spawnClouds() {
	//write code here to spawn the clouds
	if (frameCount % 60 === 0) {
		var cloud = createSprite(600, 120, 40, 10);
		cloud.y = Math.round(random(80, 120));
		cloud.addImage(cloudImage);
		cloud.scale = 0.5;
		cloud.velocityX = -3;
		//assign lifetime to the variable
		cloud.lifetime = 200;
		//adjust the depth
		cloud.depth = trex.depth;
		trex.depth = trex.depth + 1;
		//add each cloud to the group
		cloudsGroup.add(cloud);
	}
}

function spawnObstacles() {
	if (frameCount % 60 === 0) {
		var obstacle = createSprite(600, 165, 10, 40);
		obstacle.velocityX = -(4 + 3 * score / 100);
		//generate random obstacles
		var rand = Math.round(random(1, 6));
		switch (rand) {
			case 1:
				obstacle.addImage(obstacle1);
				break;
			case 2:
				obstacle.addImage(obstacle2);
				break;
			case 3:
				obstacle.addImage(obstacle3);
				break;
			case 4:
				obstacle.addImage(obstacle4);
				break;
			case 5:
				obstacle.addImage(obstacle5);
				break;
			case 6:
				obstacle.addImage(obstacle6);
				break;
			default:
				break;
		}
		//assign scale and lifetime to the obstacle           
		obstacle.scale = 0.5;
		obstacle.lifetime = 300;
		//add each obstacle to the group
		obstaclesGroup.add(obstacle);
	}
}

function reset() {
	gameState = PLAY;
	gameOver.visible = false;
	restart.visible = false;
	obstaclesGroup.destroyEach();
	cloudsGroup.destroyEach();
	trex.addAnimation("trex", trex_running);
	score = 0;
}

function reset2() {
	score = 300;
	text('YAY! THE STUDENTS ARE NOW FREE. MRS K YOU SAVED THE DAY!', 12, 80)
	sound.play();
	sound.noLoop();
	obstaclesGroup.destroyEach();
}

