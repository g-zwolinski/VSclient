/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY, startLvl, startProffesion) {
	//zmienna do animacji
	var counter=0;
	var animating=0;
	var sprite = new Image();
	sprite.src = 'images/sprites.png';
	var cOne = new Image();
	cOne.src = 'images/c_one.png';
	var cTwo = new Image();
	cTwo.src = 'images/c_two.png';
	var cThree = new Image();
	cThree.src = 'images/c_three.png';
	var mOne = new Image();
	mOne.src = 'images/m_one.png';
	var mTwo = new Image();
	mTwo.src = 'images/m_two.png';
	var mThree = new Image();
	mThree.src = 'images/m_three.png';
	
	var hpToShow;
	var mpToShow;
	var localId;
	var x = startX,
		y = startY,
		lvl = startLvl,
		//hp = 100*lvl,
		//mp = 200*lvl,
		hp = 1,
		mp = 1,
		moveAmount = 2;
	var attackedPlayer;
	var usingSkill;
	var moveDirection = 0;
	var proffesion = 0;
	
	var wilk = {x: 333,y: 500,hp: 200,hpmax: 200,moveDirection: 0,pong: 0};
	
	switch(proffesion){
		case 0:
			hp=lvl*150;
			mp=lvl*150;
		break;
		case 1:
			hp=lvl*200;
			mp=lvl*100;
		break;
		case 2:
			hp=lvl*100;
			mp=lvl*200;
		break;
		default:
	}

	
	// Getters and setters
	var getHp = function() {
		return hp;
	};
	var getMp = function() {
		return mp;
	};
	var getLvl = function() {
		return lvl;
	};
	
	var getX = function() {
		return x;
	};

	var getY = function() {
		return y;
	};

	var setX = function(newX) {
		x = newX;
	};
	var setHp = function(newHp) {
		hp = newHp;
	};
	var setMp = function(newMp) {
		mp = newMp;
	};
	var setY = function(newY) {
		y = newY;
	};
	var setLvl = function(newLvl) {
		lvl = newLvl;
	};
	var getattackedPlayer = function() {
		return attackedPlayer;
	};

	var setattackedPlayer = function(newattackedPlayer) {
		attackedPlayer = newattackedPlayer;
	};
	var getLocalId = function() {
		return localId;
	};

	var setLocalId = function(newLocalId) {
		localId = newLocalId;
	};
	var getUsingSkill = function() {
		return usingSkill;
	};

	var setUsingSkill = function(newUsingSkill) {
		usingSkill = newUsingSkill;
	};
	var getMoveDirection = function() {
		return moveDirection;
	};

	var setMoveDirection = function(newMoveDirection) {
		moveDirection = newMoveDirection;
	};
	var getProffesion = function() {
		return proffesion;
	};

	var setProffesion = function(newProffesion) {
		proffesion = newProffesion;
	};
	var getCounter = function() {
		return counter;
	};
	var setCounter = function(newCounter) {
		counter = newCounter;
	};
	//MONSTERS
	var getWilkX = function() {
		return wilk.x;
	};
	var setWilkX = function(newWilkX) {
		wilk.x = newWilkX;
	};
	var getWilkY = function() {
		return wilk.y;
	};
	var setWilkY = function(newWilkY) {
		wilk.y = newWilkY;
	};
	var getWilkHp = function() {
		return wilk.hp;
	};
	var setWilkHp = function(newWilkHp) {
		wilk.hp = newWilkHp;
	};
	var getWilkMoveDirection = function() {
		return wilk.moveDirection;
	};
	var setWilkMoveDirection = function(newWilkMoveDirection) {
		wilk.moveDirection = newWilkMoveDirection;
	};
	// Update player position
	var update = function(keys) {
		//zapis aktualnie uzywanego skilla
		//usingSkill=document.getElementById("spriteToDraw").innerHTML;
		//regeneracja many i hp
		if(x>=0 && y>=0 && x<=1000 && y<=1000){
		switch(proffesion){
		case 0:
			if(mp<150*lvl){
				mp++;
			}
			if(hp<150*lvl){
				hp++;
			}
		break;
		case 1:
			if(mp<100*lvl){
				mp++;
			}
			if(hp<200*lvl){
				hp++;
			}
		break;
		case 2:
			if(mp<200*lvl){
				mp++;
			}
			if(hp<100*lvl){
				hp++;
			}
		break;
		default:
		}
		}
		//attackedPlayer=localPlayer.getattackedPlayer();
		// Previous position
		var prevX = x,
			prevY = y;

		// Up key takes priority over down
		if (keys.up) {
			counter++;
			y -= moveAmount;
			moveDirection = 3;
			
		} else if (keys.down) {
			counter++;
			y += moveAmount;
			moveDirection = 0;
		};

		// Left key takes priority over right
		if (keys.left) {
			counter++;
			x -= moveAmount;
			moveDirection = 1;
		} else if (keys.right) {
			counter++;
			x += moveAmount;
			moveDirection = 2;
		};

		return (prevX != x || prevY != y) ? true : false;
	};
	//wybor Sprite'a do rywsowania
	var drawSprite = function(profesja, kierunek, licznik, offsetX, offsetY) {
		switch(profesja){
		case 0:
			ctx2.drawImage(cOne, (licznik%3)*32, 32*kierunek, 32, 32, offsetX + 184, offsetY + 184, 32, 32);
		break;
		case 1:
			ctx2.drawImage(cTwo, (licznik%3)*32, 32*kierunek, 32, 32, offsetX + 184, offsetY + 184, 32, 32);
		break;
		case 2:
			ctx2.drawImage(cThree, (licznik%3)*32, 32*kierunek, 32, 32, offsetX + 184, offsetY + 184, 32, 32);	
		break;
		case 3:
			ctx2.drawImage(mThree, (licznik%3)*32, 32*kierunek, 32, 32, offsetX + 184, offsetY + 184, 32, 32);	
		break;
		default:
		}
	}
	// Draw player
	
	var draw = function(ctx3,ctx2,x2,y2,lvl) {
		//wypisanie pozycji
		//document.getElementById('stats').innerHTML="x, y: " + x2 + ", "+ y2 + "<br>";
		//wypisanie statystyk
		//hpbar
		switch(proffesion){
		case 0:
			hpToShow = (hp/(150*lvl))*650;
			mpToShow = (mp/(150*lvl))*650;
			document.getElementById('stats').innerHTML="Health:"+"<br>"+hp+"/"+150*lvl+" HP"+"<br>"+mp+"/"+150*lvl+" MP"+"<br><br>Your statistics:<br>Level: " + lvl+"<br>"+"Magic level: "+lvl	+"<br>"+"Strenght: "+lvl;	
		break;
		case 1:
			hpToShow = (hp/(200*lvl))*650;
			mpToShow = (mp/(100*lvl))*650;
			document.getElementById('stats').innerHTML="Health:"+"<br>"+hp+"/"+200*lvl+" HP"+"<br>"+mp+"/"+100*lvl+" MP"+"<br><br>Your statistics:<br>Level: " + lvl+"<br>"+"Magic level: "+lvl/2	+"<br>"+"Strenght: "+lvl*2;	
		break;
		case 2:
			hpToShow = (hp/(100*lvl))*650;
			mpToShow = (mp/(200*lvl))*650;
			document.getElementById('stats').innerHTML="Health:"+"<br>"+hp+"/"+100*lvl+" HP"+"<br>"+mp+"/"+200*lvl+" MP"+"<br><br>Your statistics:<br>Level: " + lvl+"<br>"+"Magic level: "+lvl*2	+"<br>"+"Strenght: "+lvl/2;	
		break;
		default:
		}
	
		document.getElementById('hpbar').style.width=hpToShow+"px";
		document.getElementById('mpbar').style.width=mpToShow+"px";
//		document.getElementById('xx').value=x2;
//		document.getElementById('yy').value=y2;
	//	document.getElementById('lvllvl').value=lvl;
		//minimapa
		ctx3.fillRect((x2/5), (y2/5), 5, 5);
		//postac
		switch(document.getElementById("spriteToDraw").innerHTML){
		case "":
		case "teleport":
			drawSprite(proffesion,moveDirection,counter,0,0);
		    break;
		case "basic":
			drawSprite(proffesion,moveDirection,counter,0,0);
			ctx2.drawImage(sprite, 295, 50, 66, 60, 200-33, 200-30, 66, 60);
			break;
		case "nova":
			drawSprite(proffesion,moveDirection,counter,0,0);
			ctx2.drawImage(sprite, 375, 0, 137, 130, 200-69, 200-65, 137, 130);
			break;
		default:
			drawSprite(proffesion,moveDirection,counter,0,0);
		}
		//rysowanie potworow
		ctx3.fillRect((wilk.x/5), (wilk.y/5), 3, 3);
		if((x-wilk.x<=Math.abs(200)) && (y-wilk.y<=Math.abs(200))){
			
			//hp--;
			drawSprite(3,wilk.moveDirection,animating,(wilk.x-x),(wilk.y-y));
			animating++;
			if((wilk.x-x<=Math.abs(30)) && (wilk.y-y<=Math.abs(30)) && (y-wilk.y<=Math.abs(30)) && (x-wilk.x<=Math.abs(30))){
			switch(usingSkill){
			case "":
			case "teleport":
				//hp--;
				break;
			case "basic":
				wilk.hp=wilk.hp-20*lvl;
				drawSprite(proffesion,moveDirection,counter,0,0);
				ctx2.drawImage(sprite, 295, 50, 66, 60, 200-33, 200-30, 66, 60);
				break;
			case "nova":
				wilk.hp=wilk.hp-40*lvl;
				drawSprite(proffesion,moveDirection,counter,0,0);
				ctx2.drawImage(sprite, 375, 0, 137, 130, 200-69, 200-65, 137, 130);
				break;
			default:
				hp--;
			}
			hp--;
			}
			//moving(luj,1,1800,1950);
			//function moving(a,d,b,c){
			if(wilk.hp>0){
					
					if((wilk.x===0) || (wilk.x===1000)){
						wilk.pong++;
					}
					if(wilk.pong%2===0){
						wilk.x=wilk.x+1;
						wilk.moveDirection = 2;
						}
					if(wilk.pong%2===1){
						wilk.x=wilk.x-1;
						wilk.moveDirection = 1;
						}
					if((wilk.y===1000) || (wilk.y===0)){
						wilk.pong++;
					}
					if(wilk.pong%3===0){
						wilk.y=wilk.y+1;
						wilk.moveDirection = 0;
						}
					if(wilk.pong%3===1){
						wilk.y=wilk.y-1;
						wilk.moveDirection = 3;
						}
			}else{
				wilk.x=(-100);wilk.y=(-100);
				setTimeout(function(){
					wilk.x=500;
					wilk.y=500;
					wilk.hp=2000;
				},5000); 
			} 
		}		
		//czarna ramka granicy 
		ctx2.fillStyle= "#505347";
		ctx2.fillRect(0, 0,400, 184-y2);
		ctx2.fillRect(0, 0, 184-x2, canvas2.height);
		ctx2.fillRect(1200-x2, 0, 250, canvas2.height);
		ctx2.fillRect(0, 1200-y2, 400, 250);

		//usmiercenie gracza
		if(hp<=0){
				lvl=1;
				x=0;
				y=0;
				hp=lvl*100;
			}
	};
	//x2-local x1-remote
	var drawRemote = function(ctx3,ctx2,x2,x1,y2,y1,playerToAttack,spriteToDrawRemote,attackerLvl,idToGetExp,remoteProffesion,remoteMoveDirection,remoteCounter,rWilkX,rWilkY,rWilkHp,rWilkMoveDirection) {
		document.getElementById("spriteToDrawRemote").innerHTML=spriteToDrawRemote;
		remoteProffesion=0;
		if(localId===playerToAttack){
			document.getElementById("spriteToDrawRemote").innerHTML=spriteToDrawRemote;
			switch(spriteToDrawRemote){
				case "":
					//ctx2.drawImage(sprite, 60, 45, 48, 60, (x1-x2)+176, (y1-y2)+170, 48, 60);
					drawSprite(remoteProffesion,remoteMoveDirection,remoteCounter,(x1-x2),(y1-y2));
					document.getElementById("spriteToDrawRemote").innerHTML=""
				break;
				case "basic":
					drawSprite(remoteProffesion,remoteMoveDirection,remoteCounter,(x1-x2),(y1-y2));
					ctx2.drawImage(sprite, 295, 50, 66, 60, (x1-x2)+167, (y1-y2)+170, 66, 60);
					hp=hp-2*attackerLvl;	
					
				break;
				case "nova":
					drawSprite(remoteProffesion,remoteMoveDirection,remoteCounter,(x1-x2),(y1-y2));
					ctx2.drawImage(sprite, 375, 0, 137, 130, (x1-x2)+131, (y1-y2)+135, 137, 130);
					hp=hp-5*attackerLvl;
				break;
				default:
				drawSprite(remoteProffesion,remoteMoveDirection,remoteCounter,(x1-x2),(y1-y2));
				ctx2.drawImage(sprite, 60, 45, 48, 60, (x1-x2)+176, (y1-y2)+170, 48, 60);
				
			}
			socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill(), moveDirection: localPlayer.getMoveDirection(), proffesion: localPlayer.getProffesion(), counter: localPlayer.getCounter(), wilkx: localPlayer.getWilkX(), wilky: localPlayer.getWilkY(), wilkhp: localPlayer.getWilkHp(), wilkmoveDirection: localPlayer.getWilkMoveDirection()});
		}else{
			if(playerToAttack==="wilk"){
				if((x1-wilk.x<=Math.abs(30)) && (y1-wilk.y<=Math.abs(30))){
					switch(spriteToDrawRemote){
						case "":
					break;
					case "basic":
						wilk.hp=wilk.hp-20*attackerLvl;
						ctx2.drawImage(sprite, 295, 50, 66, 60, (x1-x2)+167, (y1-y2)+170, 66, 60);
					
											
					break;
					case "nova":
						wilk.hp=wilk.hp-40*attackerLvl;	
						ctx2.drawImage(sprite, 375, 0, 137, 130, (x1-x2)+131, (y1-y2)+135, 137, 130);
					
					break;
					default:
					}
				}
			}
			document.getElementById("spriteToDrawRemote").innerHTML="";
			}
		//minimapa
		ctx3.fillRect((x1/5), (y1/5), 5, 5);
		ctx3.fillRect((rWilkX/5), (rWilkY/5), 3, 3);
		//viewport	
		//if((x1-x2<=Math.abs(200)) && (y1-y2<=Math.abs(200))){
		switch(document.getElementById("spriteToDrawRemote").innerHTML){
			//switch(spriteToDrawRemote){
			case "":
				drawSprite(remoteProffesion,remoteMoveDirection,remoteCounter,(x1-x2),(y1-y2));
				//ctx2.drawImage(sprite, 60, 45, 48, 60, (x1-x2)+176, (y1-y2)+170, 48, 60);
		    break;
			case "nova":
				drawSprite(remoteProffesion,remoteMoveDirection,remoteCounter,(x1-x2),(y1-y2));
				ctx2.drawImage(sprite, 375, 0, 137, 130, (x1-x2)+131, (y1-y2)+135, 137, 130);
		    break;
			case "basic":
				drawSprite(remoteProffesion,remoteMoveDirection,remoteCounter,(x1-x2),(y1-y2));
				ctx2.drawImage(sprite, 295, 50, 66, 60, (x1-x2)+167, (y1-y2)+170, 66, 60);
		    break;
			default:
				drawSprite(remoteProffesion,remoteMoveDirection,remoteCounter,(x1-x2),(y1-y2));
				//ctx2.drawImage(sprite, 60, 45, 48, 60, (x1-x2)+176, (y1-y2)+170, 48, 60);
			}
		//}

	//###SEKCJA REMOTE MONSTERS
	//rWilkX,rWilkY,rWilkHp,rWilkMoveDirection
	//if(playerToAttack==="wilk"){
	
	
	
		drawSprite(3,rWilkMoveDirection,animating,(rWilkX-x2),(rWilkY-y2));
		//if((rWilkX-x2<=Math.abs(200)) && (rWilkY-y2<=Math.abs(200))){
			//drawSprite(3,rWilkMoveDirection,animating,(rWilkX-x2),(rWilkY-y2));
			if((rWilkX-x2<=Math.abs(30)) && (rWilkY-y2<=Math.abs(30)) && (x2-rWilkX<=Math.abs(30)) && (y2-rWilkY<=Math.abs(30))){
				hp=hp-2;
			//}
		}
		
		if((x1-wilk.x<=Math.abs(30)) && (y1-wilk.y<=Math.abs(30))){
			if(playerToAttack==="wilk"){
				switch(spriteToDrawRemote){
				case "":
				break;
				case "basic":
					wilk.hp=wilk.hp-20*attackerLvl;	
				break;
				case "nova":
					wilk.hp=wilk.hp-40*attackerLvl;
				break;
				default:
				}
			}
		}
		socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY(), lvl: localPlayer.getLvl(), hp: localPlayer.getHp(), mp: localPlayer.getMp(), attackedPlayer: localPlayer.getattackedPlayer(), usingSkill: localPlayer.getUsingSkill(), moveDirection: localPlayer.getMoveDirection(), proffesion: localPlayer.getProffesion(), counter: localPlayer.getCounter(), wilkx: localPlayer.getWilkX(), wilky: localPlayer.getWilkY(), wilkhp: localPlayer.getWilkHp(), wilkmoveDirection: localPlayer.getWilkMoveDirection()});
		
	};
	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		getLvl: getLvl,
		setLvl: setLvl,
		setX: setX,
		setY: setY,
		getHp: getHp,
		setHp: setHp,
		getMp: getMp,
		setMp: setMp,
		getattackedPlayer: getattackedPlayer,
		setattackedPlayer: setattackedPlayer,
		setLocalId: setLocalId,
		getLocalId: getLocalId,
		setUsingSkill: setUsingSkill,
		getUsingSkill: getUsingSkill,
		setMoveDirection: setMoveDirection,
		getMoveDirection: getMoveDirection,
		setProffesion: setProffesion,
		getProffesion: getProffesion,
		setCounter: setCounter,
		getCounter: getCounter,
		setWilkX: setWilkX,
		getWilkX: getWilkX,
		setWilkY: setWilkY,
		getWilkY: getWilkY,
		setWilkHp: setWilkHp,
		getWilkHp: getWilkHp,
		setWilkMoveDirection: setWilkMoveDirection,
		getWilkMoveDirection: getWilkMoveDirection,
		update: update,
		drawRemote: drawRemote,
		draw: draw
	}
};
