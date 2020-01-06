console.log('basketball game');

class Basketball {
	constructor(collision) {
		this.powerLevel = null
		this.direction = null
	}
	// run power slider
	runPowerSelector() {
		const $dot = $('#dotP').css('animation-play-state', 'running')
	}

	// stop selector
	stopPowerSelector() {
		const $dot2 = $('#dotP').css('animation-play-state', 'paused')
		const $dot = $('#dotP').position().top
		this.getPowerLevel($dot)
		console.log($dot);
		console.log($dot2);
	}

	runDirSelector() {
		const $dot = $('#dotD').css('animation-play-state', 'running')
	}

	// stop selector
	stopDirSelector() {
		const $dot2 = $('#dotD').css('animation-play-state', 'paused')
		const $dot = $('#dotD').position().top
		this.getBallDirection($dot)
		console.log($dot);
		console.log($dot2);
	}

	getPowerLevel(power) {
		const myPower = Math.floor((power * 100) / 203)
		this.powerLevel = myPower
	}

	getBallDirection(dir) {
		const ballDirection = Math.floor((dir*100) / 500)
		console.log(ballDirection);

		this.direction = ballDirection

	}
}

const game = {
	remainingAttemp: 2,
	score: 0,
	round: 1,
	power: 1,
	collisionDetected: false,
	myIntervalId: 0,
	highEnough: false,
	hitTarget: false,
	powerWasCalled: false,
	dirWasCalled: false,
	basketballClass: new Basketball(),
	// throw the ball
	throwBall(power, num) {
		$('#ball').css('animation-play-state', 'running')
		// ball goes up
		$('#ball').animate(power, 900);
		// the ball goes down
		$('#ball').animate({
			top: '+=130%',
			width: '-=2%',
			height: '-=4%'
		}, 1500)
	},
	// shooting direction
	shootingDir(input1, input2) {
		const num = {
			// left: `${this.basketballClass.direction}
			top: `-=${this.basketballClass.powerLevel}%`,
			left: `${this.basketballClass.direction}%`,
			width: '-=2%',
			height: '-=4%'
			}
		this.throwBall(num)
		game.time()
	},

	// check collision
	checkCollision() {
		const $ring = $('#ring')[0].getBoundingClientRect()
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
		if(this.collisionDetected && $ball.left < 680) {
			$('#ball').stop()
			clearInterval(this.myIntervalId);
			this.collisionDetected = false
			this.highEnough = false
			// bounce to left
			$('#ball').animate({ 
				top:'-=20%',
				left: '-=10%'
			}, 600);
			$('#ball').animate({
				top: '+=130%',
				left: '-=9%'
			}, 1500)
			console.log($ball);
			console.log(1);
		} else if(this.collisionDetected && $ball.left < 700) {
			$('#ball').stop()
			clearInterval(this.myIntervalId);
			this.collisionDetected = false
			this.highEnough = false
			// bounce to right
			$('#ball').animate({ 
				top:'-=20%',
				left: '+=15%'
			}, 600);
			$('#ball').animate({
				top: '+=130%',
				left: '+=9%',
			}, 1500)

			console.log(2);
		} 
		// else if(this.collisionDetected && 
		// 	$ball.left > 670 && $ball.left < 709) {
		// 	$('#ball').stop()
		// 	this.collisionDetected = false
		// 	this.highEnough = false
		// 	clearInterval(this.myIntervalId);
		// 	console.log(3);
		// } else if(this.collisionDetected && 
		// 	$ball.left > 709 && $ball.left < 720) {
		// 	$('#ball').stop()
		// 	this.collisionDetected = false
		// 	this.highEnough = false
		// 	clearInterval(this.myIntervalId);
		// 	// bounce to left
		// 	$('#ball').animate({ 
		// 		top:'-=20%',
		// 		left: '-=10%'
		// 	}, 600);
		// 	$('#ball').animate({
		// 		top: '+=130%',
		// 		left: '-=9%'
		// 	}, 1500)

		// 	console.log(4);
		// } else if(this.collisionDetected && 
		// 	$ball.left > 720) {
		// 	$('#ball').stop()
		// 	this.collisionDetected = false
		// 	this.highEnough = false
		// 	clearInterval(this.myIntervalId);
		// 	console.log(3);
		// }
	},
	time() {
		this.myIntervalId = setInterval(function(){
			game.checkCollision()
		}, 1)
	// Stop timer
	},
	keyPressed(key) {
		if(key === 'w' && this.powerWasCalled === false) {
			this.basketballClass.runPowerSelector()
			this.powerWasCalled = true
		} else if(key === 'w' && this.powerWasCalled) {
			this.basketballClass.stopPowerSelector()
		} else if(key === 'r' && this.dirWasCalled === false) {
			this.basketballClass.runDirSelector()
			this.dirWasCalled = true
		} else if(key === 'r' && this.dirWasCalled) {
			this.basketballClass.stopDirSelector()
		} else if(key === 'f') {
			this.shootingDir()
		}
	}

}



$(document).on('keypress', (e) => {
	console.log(e.key);
	game.keyPressed(e.key)
})


// 1. tuning aim
// 2. shoting direction
// 3. Selector


// Check collision
// Work with direction of the ball
// Check if it hit the target
// Aiming selector
// 