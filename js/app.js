console.log('basketball game');

class Basketball {
	constructor() {
		this.powerLevel = null
		this.direction = null
		this.start = false
		this.player = 1
	}
	// run power slider
	runPowerSelector() {
		const $dot = $('#dotP').css('animation-play-state', 'running')
	}

	runPowerSelector2() {
		const $dot = $('#dotP2').css('animation-play-state', 'running')
	}

	// stop selector
	stopPowerSelector() {
		const $dot2 = $('#dotP').css('animation-play-state', 'paused')
		const $dot = $('#dotP').position().top
		this.getPowerLevel($dot)
	}

	stopPowerSelector2() {
		const $dot2 = $('#dotP2').css('animation-play-state', 'paused')
		const $dot = $('#dotP2').position().top
		this.getPowerLevel($dot)
	}

	runDirSelector() {
		const $dot = $('#dotD').css('animation-play-state', 'running')
	}

	runDirSelector2() {
		const $dot = $('#dotD2').css('animation-play-state', 'running')
	}

	// stop selector
	stopDirSelector() {
		const $dot2 = $('#dotD').css('animation-play-state', 'paused')
		const $dot = $('#dotD').position().top
		this.getBallDirection($dot)
		console.log($dot);
		console.log($dot2);
	}

	stopDirSelector2() {
		const $dot2 = $('#dotD2').css('animation-play-state', 'paused')
		const $dot = $('#dotD2').position().top
		this.getBallDirection($dot)
		console.log($dot);
		console.log($dot2);
	}

	getPowerLevel(power) {
		const myPower = Math.floor((power*100)/50)
		this.powerLevel = myPower
	}

	getBallDirection(dir) {
		const ballDirection = Math.floor((dir*100) / 100)
		console.log(ballDirection);

		this.direction = ballDirection

	}

	// switch game on/off
	startSwitch() {
		if(this.start=== false) {
			this.start = true
		} else if(this.start === true) {
			this.start = false
		}
	}

	// switch player
	switchPlayer() {
		if(this.player === 1) {
			this.player = 2
			$('.player-info').css('color', 'white')
		} else if(this.player === 2) {
			this.player = 1
		}
	}
}

const game = {
	remainingAttemp: 3,
	score: 0,
	round: 0,
	power: 1,
	collisionDetected: false,
	myIntervalId: 0,
	myIntervalId2: 0,
	highEnough: false,
	hitTarget: false,
	powerWasCalled: false,
	dirWasCalled: false,
	basketballClass: new Basketball(),
	playerOnePoint: 0,
	playerTwoPoint: 0,
	playerOneRound: 0,
	playerTwoRound: 0,
	// start game
	startGame() {
		// Show the game
		$('.player-info').css('display', 'block')
		$('#select-panel').css('display', 'block')
		$('#select-panel2').css('display', 'block')
		$('.main-container').css('display', 'block')
		$('.control1').css('display', 'block')
		$('.control2').css('display', 'block')

		// hide the instructions
		$('.start').css('display', 'none')

		// switch the game start
		this.basketballClass.startSwitch()
		$('.score-num').text(this.score)
		$('.attemp-num').text(this.remainingAttemp)
	},
	// throw the ball
	throwBall(power, num) {
		$('#ball').css('animation-play-state', 'running')
		// ball goes up
		$('.ball2').animate(power, 900);
		// the ball goes down
		$('.ball2').animate({
			top: '+=2000px',
			width: '-=60px',
			height: '-=80px'
		}, 2500)

		this.myIntervalId2 = setInterval(() => {
			this.resetBallPosition()
			this.getStatus()
		}, 10)

	},
	// shooting direction
	shootingDir(input1, input2) {
		const num = {
			top: `-=${this.basketballClass.powerLevel}px`,
			left: `${this.basketballClass.direction}px`,
			width: '-=30px',
			height: '-=30px'
		}
		this.throwBall(num)
		this.time()
	},

	// check collision
	checkCollision() {
		const $ring = $('#rim')[0].getBoundingClientRect()
		const $ball = $('#ball')[0].getBoundingClientRect()
		// console.log(body);

		const dx = $ball.x + $ring.x
		const dy = $ball.y - $ring.y
		const ballRadius = $ball.height / 2
		const ringRadius = $ring.height / 2
		const distance = Math.sqrt(dx*dx + dy*dy)
		// check the position
		if($ball.top < 100) {
			this.highEnough = true
			$('#rim').appendTo($('.main-container'))
		}

		if(this.highEnough) {
			if( $ring.x < $ball.x + $ball.width && 
				$ring.x + $ring.width > $ball.x &&
				$ring.y < $ball.y + $ball.height &&
				$ring.y + $ring.height > $ball.y) {
	
				this.collisionDetected = true
				this.checkHitTarget()
				console.log('collision!');
				console.log(dx);

			} else {
				this.collisionDetected = false
			}	
		}
		console.log($ball);
	},
	checkHitTarget() {
		const $ball = $('#ball')[0].getBoundingClientRect()
		console.log($ball);
		if(this.collisionDetected && 
			$ball.left > 664 && $ball.left < 687) {
			this.score++
			// this.collisionDetected = false
			this.highEnough = false
			clearInterval(this.myIntervalId);
			console.log(3);
		} else if(this.collisionDetected && $ball.left < 635) {
			$('#ball').stop()
			clearInterval(this.myIntervalId);
			// this.collisionDetected = false
			this.highEnough = false
			// bounce to left
			$('#ball').animate({ 
				top:'-=180px',
				left: '-=90px'
			}, 600);
			$('#ball').animate({
				top: '+=1300px',
				left: '-=90px'
			}, 1800)

			// substrac attemps
			this.remainingAttemp--
			console.log($ball);
			console.log(1);
		} else if(this.collisionDetected && $ball.left > 635 &&
			$ball.left < 665) {
			$('#ball').stop()
			clearInterval(this.myIntervalId);
			// this.collisionDetected = false
			this.highEnough = false
			// bounce to right
			$('#ball').animate({ 
				top:'-=180px',
				left: '+=100px'
			}, 600);
			$('#ball').animate({
				top: '+=1300px',
				left: '+=90px',
			}, 1800)

			// Substrac attemps
			this.remainingAttemp--
			console.log(2);
		} else if(this.collisionDetected &&
			$ball.left > 684 && $ball.left < 708) {
			$('#ball').stop()
			clearInterval(this.myIntervalId)
			// this.collisionDetected = false
			this.highEnough = false
			//bounce left
			$('#ball').animate({ 
				top:'-=180px',
				left: '-=90px'
			}, 600);
			$('#ball').animate({
				top: '+=1300px',
				left: '-=90px'
			}, 1800)

			// substrac attemps
			this.remainingAttemp--
			console.log('right 1');
			console.log($ball);
		} else if(this.collisionDetected &&
			$ball.left > 708) {
			$('#ball').stop()
			clearInterval(this.myIntervalId)
			// this.collisionDetected = false
			this.highEnough = false

			// bounce to right
			$('#ball').animate({ 
				top:'-=180px',
				left: '+=100px'
			}, 600);
			$('#ball').animate({
				top: '+=1300px',
				left: '+=90px',
			}, 1800)

			// substrac attemps
			this.remainingAttemp--

			console.log('right 2');
			console.log($ball);
		} 
		
		$('.score-num').text(this.score)
		$('.attemp-num').text(this.remainingAttemp)
	},
	time() {
		this.myIntervalId = setInterval(() => {
			this.checkCollision()
		}, 1)
	// Stop timer
	},
	keyPressed(key) {
		if(key.toLowerCase() === 'w' && this.powerWasCalled === false &&
			this.basketballClass.start === true &&
			this.basketballClass.player === 1) {
			this.basketballClass.runPowerSelector()
			this.powerWasCalled = true
		} else if(key.toLowerCase() === 'w' && this.powerWasCalled &&
			this.basketballClass.start === true &&
			this.basketballClass.player === 1) {
			this.basketballClass.stopPowerSelector()
		} else if(key.toLowerCase() === 'r' && this.dirWasCalled === false &&
			this.basketballClass.start === true &&
			this.basketballClass.player === 1) {
			this.basketballClass.runDirSelector()
			this.dirWasCalled = true
		} else if(key.toLowerCase() === 'r' && this.dirWasCalled &&
			this.basketballClass.start === true &&
			this.basketballClass.player === 1) {
			this.basketballClass.stopDirSelector()
		} else if(key.toLowerCase() === 'f' && 
			this.basketballClass.start === true &&
			this.basketballClass.player === 1) {
			this.shootingDir()
		}
	},
	resetBallPosition() {
	// reset the position
		if($('#ball')[0].getBoundingClientRect().top > 700) {
			$('#ball').stop()
			$('#ball').css({
				left: '170px',
				top: '590px',
				width: '130px',
				height: '130px'
			})
			$('#dotP').css({
				'animation-name': 'more',
				top: '20px'
			})
			$('#dotD').css({
				'animation-name': 'more',
				top: '20px'
			})

			if($('#dotP').css('animation-name') == 'more') {
				$('#dotP').css({
					'animation-name': 'slide'
				})
				this.powerWasCalled = false
				$('#dotD').css({
					'animation-name': 'range'
				})

				this.dirWasCalled = false
				this.basketballClass.powerLevel = 0
				this.basketballClass.direction = 0
				if(this.collisionDetected === false) {
					this.remainingAttemp--
				}

				$('#ball').appendTo($('.main-container'))
				clearInterval(this.myIntervalId2)
				clearInterval(this.myIntervalId)
			}
			this.collisionDetected = false
			this.highEnough = false
			$('.attemp-num').text(this.remainingAttemp)
		}
		// console.log($('#ball')[0].getBoundingClientRect().top);
	},

	// status
	getStatus() { 
		// check the attemps
		if(this.remainingAttemp === 0) {

			// transfer score to player
			if(this.basketballClass.player===1) {
				this.playerOnePoint = this.score
			} else if(this.basketballClass.player===2) {
				this.playerTwoPoint = this.score
				this.winRound()
				this.round++
				this.winSceneario()
			}

			// switch player
			this.remainingAttemp = 3
			this.basketballClass.switchPlayer()
			this.score = 0
			$('.attemp-num').text(this.remainingAttemp)
			$('.score-num').text(this.score)
			$('.player-num').text(this.basketballClass.player)
			$('.player').text(this.basketballClass.player)

			console.log('hi');
		}

	},
	winRound() {
		// check the values
		if(this.remainingAttemp === 0 && 
			this.basketballClass.player===2) {

			if(this.playerOnePoint > this.playerTwoPoint) {
				this.playerOneRound++
				this.winCircle()
				console.log('Player 1 won the round');
			} else if(this.playerOnePoint < this.playerTwoPoint) {
				this.playerTwoRound++
				this.winCircle2()
				console.log('Player 2 won the round');
			} else if(this.playerOnePoint === this.playerTwoPoint) {
				console.log('This round is a tie');
			}
		}
	},
	keyPressed2(key) {
		if(key.toLowerCase() === 'u' && 
			this.powerWasCalled === false &&
			this.basketballClass.start === true &&
			this.basketballClass.player === 2) {
			this.basketballClass.runPowerSelector2()
			this.powerWasCalled = true
		} else if(key.toLowerCase() === 'u' && 
			this.powerWasCalled &&
			this.basketballClass.start === true &&
			this.basketballClass.player === 2) {
			this.basketballClass.stopPowerSelector2()
		} else if(key.toLowerCase() === 'i' && 
			this.dirWasCalled === false &&
			this.basketballClass.start === true &&
			this.basketballClass.player === 2) {
			this.basketballClass.runDirSelector2()
			this.dirWasCalled = true
		} else if(key.toLowerCase() === 'i' && this.dirWasCalled &&
			this.basketballClass.start === true &&
			this.basketballClass.player === 2) {
			this.basketballClass.stopDirSelector2()
		} else if(key.toLowerCase() === 'j' && 
			this.basketballClass.start === true &&
			this.basketballClass.player === 2) {
			this.shootingDir()
		}	
	},
	// check win scenario
	winSceneario() {
		if(this.round >= 2) {
			if(this.playerOneRound > this.playerTwoRound) {
				$('.board1').remove('.rounds')
				console.log('Player 1 is the winner');
			} else if(this.playerOneRound < this.playerTwoRound) {
				console.log('Player 2 is the winner');
			}

		}

	},
	//create win circles
	winCircle() {
		$('<div class="rounds"></div>').appendTo($('.board1'))
	},
	winCircle2() {
		$('<div class="rounds"></div>').appendTo($('.board2'))
	}

}



$(document).on('keypress', (e) => {
	game.keyPressed(e.key)
	game.keyPressed2(e.key)
})

$('.start-button').click((e) => {
	game.startGame()
})

// 1. tuning aim
// 2. shoting direction
// 3. Selector

// dificulty