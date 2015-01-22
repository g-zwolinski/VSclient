/**************************************************
** GAME VARIABLES
**************************************************/
var canvas, canvas2, canvas3,		// Canvas DOM element
	ctx, ctx2, ctx3,	// Canvas rendering context
	keys,			// Keyboard input
	localPlayer,	// Local player
	remotePlayers,	// Remote players
	socket;			// Socket connection
var gameBackground = new Image();
	gameBackground.src = 'images/gamebackground.png';
var mapaBackground = new Image();
	mapaBackground.src = 'images/mapabackground.png';
var sprite = new Image();
	sprite.src = 'images/sprites.png';
var nova = "nova";
var basic = "basic";
/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	
	// Declare the canvas and rendering context
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");
	canvas2 = document.getElementById("viewport");
	ctx2 = canvas2.getContext("2d");
	canvas3 = document.getElementById("mapa");
	ctx3 = canvas3.getContext("2d");

	// Maximise the canvas
	canvas.width = 1000;
	canvas.height = 1000;
	canvas2.width = 400;
	canvas2.height = 400;
	canvas3.width = 200;
	canvas3.height = 200;

	// Initialise keyboard controls
	keys = new Keys();
	
	var startX = 2;
	var startY = 2;
	var iddd = 0;
	var lvl = 1;
	var startProffesion = 0;
	//przepisanie id z div do form
	//document.getElementById("idid").value=iddd;
	//document.getElementById("lvllvl").value=lvl;
	//document.getElementById("xx").value=startY;
//	document.getElementById("yy").value=startY;
	//document.getElementById("pro").innerHTML=startProffesion;
	///////////////
	//na podstawie id bedzie trzeba pobierac z innej tabeli dane gracza,
	//ktora bedzie aktualizowana po stronie serwera
	//////////////////
	
	localPlayer = new Player(startX, startY, lvl, startProffesion);
	// Initialise socket connection
	socket = io.connect("http://104.236.72.245", {port: 9000, transports: ["websocket"]});

	// Initialise remote players array
	remotePlayers = [];

	// Start listening for events
	setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Keyboard
	window.addEventListener("keydown", onKeydown, false);
	window.addEventListener("keyup", onKeyup, false);
	canvas2.addEventListener("click", skilll, false);
	canvas2.addEventListener("contextmenu", skillp, false);
	// Window resize
	//window.addEventListener("resize", onResize, false);

	// Socket connection successful
	socket.on("connect", onSocketConnected);

	// Socket disconnection
	socket.on("disconnect", onSocketDisconnect);

	// New player message received
	socket.on("new player", onNewPlayer);

	// Player move message received
	socket.on("move player", onMovePlayer);
	/*
	// Monster move message received
	socket.on("move monster", onMoveMonster);
*/
	// Player removed message received
	socket.on("remove player", onRemovePlayer);

};
//myszka
function skilll(){
	document.getElementById("spriteToDraw").innerHTML="";
	switch(document.getElementById("activeSkillL").innerHTML) {
	case "nova":
		if(localPlayer.getMp()>20){
			localPlayer.setUsingSkill(nova);
			//ctx2.drawImage(sprite, 375, 0, 137, 130, 200-69, 200-65, 137, 130);
			localPlayer.setMp(localPlayer.getMp()-20);
			var i;
			for (i = 0; i < remotePlayers.length; i++) {
				if((remotePlayers[i].getX()-localPlayer.getX()<=Math.abs(50)) && (remotePlayers[i].getY()-localPlayer.getY()<=Math.abs(50)) && (localPlayer.getX()-remotePlayers[i].getX()<=Math.abs(50)) && (localPlayer.getY()-remotePlayers[i].getY()<=Math.abs(50))){
					localPlayer.setUsingSkill(nova);
					document.getElementById("spriteToDraw").innerHTML="nova";
					localPlayer.setattackedPlayer(remotePlayers[i].id);
					//onAttackPlayer(localPlayer);
					//localPlayer.setattackedPlayer("");
					socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill(), moveDirection: localPlayer.getMoveDirection(), proffesion: localPlayer.getProffesion(), counter: localPlayer.getCounter(), wilkx: localPlayer.getWilkX(), wilky: localPlayer.getWilkY(), wilkhp: localPlayer.getWilkHp(), wilkmoveDirection: localPlayer.getWilkMoveDirection()});
				
				}
				if((remotePlayers[i].getWilkX()-localPlayer.getX()<=Math.abs(30)) && (remotePlayers[i].getWilkY()-localPlayer.getY()<=Math.abs(30))){
					localPlayer.setattackedPlayer("wilk");
					localPlayer.setUsingSkill(nova);
					document.getElementById("spriteToDraw").innerHTML="nova";
					socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill(), moveDirection: localPlayer.getMoveDirection(), proffesion: localPlayer.getProffesion(), counter: localPlayer.getCounter(), wilkx: localPlayer.getWilkX(), wilky: localPlayer.getWilkY(), wilkhp: localPlayer.getWilkHp(), wilkmoveDirection: localPlayer.getWilkMoveDirection()});
				
				}
		}
	}
    break;
	case "basic":
		localPlayer.setUsingSkill(basic);
		if(localPlayer.getMp()>10){
			
			//ctx2.drawImage(sprite, 295, 50, 66, 60, 200-33, 200-30, 66, 60);
			//localPlayer.setMp();
			var i;
			for (i = 0; i < remotePlayers.length; i++) {
				if((remotePlayers[i].getX()-localPlayer.getX()<=Math.abs(50)) && (remotePlayers[i].getY()-localPlayer.getY()<=Math.abs(50)) && (localPlayer.getX()-remotePlayers[i].getX()<=Math.abs(50)) && (localPlayer.getY()-remotePlayers[i].getY()<=Math.abs(50))){
					//remotePlayers[i].setHp(remotePlayers[i].getHp()-10);
					localPlayer.setUsingSkill(basic);
					localPlayer.setattackedPlayer(remotePlayers[i].id);
					document.getElementById("spriteToDraw").innerHTML="basic";
					//onAttackPlayer(localPlayer);
					//localPlayer.setattackedPlayer("");
					socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill(), moveDirection: localPlayer.getMoveDirection(), proffesion: localPlayer.getProffesion(), counter: localPlayer.getCounter(), wilkx: localPlayer.getWilkX(), wilky: localPlayer.getWilkY(), wilkhp: localPlayer.getWilkHp(), wilkmoveDirection: localPlayer.getWilkMoveDirection()});
				
				
			};
			if((remotePlayers[i].getWilkX()-localPlayer.getX()<=Math.abs(30)) && (remotePlayers[i].getWilkY()-localPlayer.getY()<=Math.abs(30))){
				localPlayer.setattackedPlayer("wilk");
				localPlayer.setUsingSkill(basic);
				document.getElementById("spriteToDraw").innerHTML="basic";
				socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill(), moveDirection: localPlayer.getMoveDirection(), proffesion: localPlayer.getProffesion(), counter: localPlayer.getCounter(), wilkx: localPlayer.getWilkX(), wilky: localPlayer.getWilkY(), wilkhp: localPlayer.getWilkHp(), wilkmoveDirection: localPlayer.getWilkMoveDirection()});
				
			}
	}
	}
    break;
	default:
    //default 
}
    setTimeout(function(){
    document.getElementById("spriteToDraw").innerHTML="";
	//zmiana po zaatakowaniu gracza
	localPlayer.setattackedPlayer();
	localPlayer.setUsingSkill();
	socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill(), moveDirection: localPlayer.getMoveDirection(), proffesion: localPlayer.getProffesion(), counter: localPlayer.getCounter(), wilkx: localPlayer.getWilkX(), wilky: localPlayer.getWilkY(), wilkhp: localPlayer.getWilkHp(), wilkmoveDirection: localPlayer.getWilkMoveDirection()});
	},500);
}

 
function skillp(e){
  var element = canvas2;
  var offsetX = 0, offsetY = 0;
  e.stopPropagation();
  e.preventDefault();
  if(document.getElementById("activeSkillP").innerHTML==="teleport") {
	
      if (element.offsetParent) {
        do {
          offsetX += element.offsetLeft;
          offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
      }
      x = e.pageX - offsetX;
      y = e.pageY - offsetY;
	  if(localPlayer.getMp()>60){
	  document.getElementById("spriteToDraw").innerHTML="teleport";
	  
      localPlayer.setX(localPlayer.getX() + (x-200));
      localPlayer.setY(localPlayer.getY() + (y-200));
	  
	  localPlayer.setMp(localPlayer.getMp()-60);
      }
  };
    setTimeout(function(){

    document.getElementById("spriteToDraw").innerHTML="";
	socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill(), moveDirection: localPlayer.getMoveDirection(), proffesion: localPlayer.getProffesion(), counter: localPlayer.getCounter(), wilkx: localPlayer.getWilkX(), wilky: localPlayer.getWilkY(), wilkhp: localPlayer.getWilkHp(), wilkmoveDirection: localPlayer.getWilkMoveDirection()});
	},500); 
};



// Keyboard key down
function onKeydown(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	};
};

// Keyboard key up
function onKeyup(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	};
};

// Socket connected
function onSocketConnected() {
	localPlayer.setLocalId(socket.socket.sessionid);
	console.log("Connected to socket server, " + localPlayer.getLocalId());
	
	
	// Send local player data to the game server
	//socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill()});
	socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill(), moveDirection: localPlayer.getMoveDirection(), proffesion: localPlayer.getProffesion(), counter: localPlayer.getCounter(), wilkx: localPlayer.getWilkX(), wilky: localPlayer.getWilkY(), wilkhp: localPlayer.getWilkHp(), wilkmoveDirection: localPlayer.getWilkMoveDirection()});
				
	//);
}; 

// Socket disconnected
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
};

// New player
function onNewPlayer(data) {
	console.log("New player connected: "+data.id);

	// Initialise the new player
	var newPlayer = new Player(data.x, data.y, data.lvl, data.mp, data.hp, data.attackedPlayer, data.usingSkill, data.moveDirection, data.proffesion, data.counter, data.wilkx, data.wilky, data.wilkhp, data.wilkmoveDirection);
	newPlayer.id = data.id;

	// Add new player to the remote players array
	remotePlayers.push(newPlayer);
};

// Move player
function onMovePlayer(data) {
	var movePlayer = playerById(data.id);

	// Player not found
	if (!movePlayer) {
		console.log("Player not found: "+data.id);
		return;
	};

	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
	movePlayer.setHp(data.hp);
	movePlayer.setMp(data.mp);
	movePlayer.setLvl(data.lvl);
	movePlayer.setattackedPlayer(data.attackedPlayer);
	movePlayer.setUsingSkill(data.usingSkill);
	movePlayer.setMoveDirection(data.moveDirection);
	movePlayer.setProffesion(data.proffesion);
	movePlayer.setCounter(data.counter);
	movePlayer.setWilkX(data.wilkx);
	movePlayer.setWilkY(data.wilky);
	movePlayer.setWilkHp(data.wilkhp);
	movePlayer.setWilkMoveDirection(data.wilkmoveDirection);
	//socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill()});
	
};

// Remove player
function onRemovePlayer(data) {
	var removePlayer = playerById(data.id);

	// Player not found
	if (!removePlayer) {
//		console.log("Player not found: "+data.id);
		return;
	};

	// Remove player from array
	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
};


/**************************************************
** GAME ANIMATION LOOP
**************************************************/
function animate() {
	update();
	draw();

	// Request a new animation frame using Paul Irish's shim
	window.requestAnimFrame(animate);
};


/**************************************************
** GAME UPDATE
**************************************************/
function update() {
/*	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		console.log(remotePlayers[i].getattackedPlayer());
		if(localPlayer.getLocalId()===remotePlayers[i].getattackedPlayer()){
			document.getElementById("spriteToDrawRemote").innerHTML=remotePlayers.getUsingSkill();
			localPlayer.setHp(localPlayer.getHp()-100);
			socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill()});
			setTimeout(function(){
				document.getElementById("spriteToDrawRemote").innerHTML="";
			},500); 		
			
		
		}
	}
	*/
	socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill(), moveDirection: localPlayer.getMoveDirection(), proffesion: localPlayer.getProffesion(), counter: localPlayer.getCounter(), wilkx: localPlayer.getWilkX(), wilky: localPlayer.getWilkY(), wilkhp: localPlayer.getWilkHp(), wilkmoveDirection: localPlayer.getWilkMoveDirection()});
				
	//socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill()});// Update local player and check for change
	if (localPlayer.update(keys)) {
		// Send local player data to the game server
		socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill(), moveDirection: localPlayer.getMoveDirection(), proffesion: localPlayer.getProffesion(), counter: localPlayer.getCounter(), wilkx: localPlayer.getWilkX(), wilky: localPlayer.getWilkY(), wilkhp: localPlayer.getWilkHp(), wilkmoveDirection: localPlayer.getWilkMoveDirection()});
				};
	//document.getElementById('hpbar').style.width=(localPlayer.getHp()/(100*localPlayer.getLvl()))*650+"px";
	//document.getElementById('mpbar').style.width=(localPlayer.getMp()/(200*localPlayer.getLvl()))*650+"px";
	switch(localPlayer.getProffesion()){
		case 0:
			document.getElementById('hpbar').style.width=(localPlayer.getHp()/(150*localPlayer.getLvl()))*650+"px";
			document.getElementById('mpbar').style.width=(localPlayer.getMp()/(150*localPlayer.getLvl()))*650+"px";
		break;
		case 1:
			document.getElementById('hpbar').style.width=(localPlayer.getHp()/(200*localPlayer.getLvl()))*650+"px";
			document.getElementById('mpbar').style.width=(localPlayer.getMp()/(100*localPlayer.getLvl()))*650+"px";
		break;
		case 2:
			document.getElementById('hpbar').style.width=(localPlayer.getHp()/(100*localPlayer.getLvl()))*650+"px";
			document.getElementById('mpbar').style.width=(localPlayer.getMp()/(200*localPlayer.getLvl()))*650+"px";
		break;
		default:
	}
	
};
/*************************
*****************************/



/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill(), moveDirection: localPlayer.getMoveDirection(), proffesion: localPlayer.getProffesion(), counter: localPlayer.getCounter(), wilkx: localPlayer.getWilkX(), wilky: localPlayer.getWilkY(), wilkhp: localPlayer.getWilkHp(), wilkmoveDirection: localPlayer.getWilkMoveDirection()});
				
	// Wipe the canvas clean
	ctx2.drawImage(gameBackground, localPlayer.getX(), localPlayer.getY(), 400, 400, 0, 0, 400, 400);
	ctx3.drawImage(mapaBackground, 0, 0, 200, 200, 0, 0, 200, 200);
	// draw
	localPlayer.draw(ctx3,ctx2,localPlayer.getX(),localPlayer.getY(),localPlayer.getLvl());
	// Draw the remote players
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		//wyswietlanie statystyk w konsoli
		//console.log(localPlayer.getX(),remotePlayers[i].getX(),localPlayer.getY(),remotePlayers[i].getY(),remotePlayers[i].getattackedPlayer(), remotePlayers[i].getUsingSkill(), remotePlayers[i].getLvl());
		localPlayer.drawRemote(ctx3,ctx2,localPlayer.getX(),remotePlayers[i].getX(),localPlayer.getY(),remotePlayers[i].getY(),remotePlayers[i].getattackedPlayer(), remotePlayers[i].getUsingSkill(), remotePlayers[i].getLvl(), remotePlayers[i].id, remotePlayers[i].getProffesion(), remotePlayers[i].getMoveDirection(), remotePlayers[i].getCounter(), remotePlayers[i].getWilkX(), remotePlayers[i].getWilkY(), remotePlayers[i].getWilkHp(), remotePlayers[i].getWilkMoveDirection());
	};
};


/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
//function playerById(id) {
function playerById(id) {
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		if (remotePlayers[i].id == id)
			return remotePlayers[i];
	};
	
	return false;
};
