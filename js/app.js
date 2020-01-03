console.log('basketball game');

class Basketball {
	constructor(position) {
		this.position = position
	}
}

const game = {
	remainingAttemp: 2,
	points: 0,
	power: 1,
	collisionDetected: false,
	myIntervalId: 0,
	highEnough: false,
	hitTarget: false,
	// throw the ball
	throwBall(power) {
		// ball goes up
		$('#ball').animate(power, 600);

		// the ball goes down
		$('#ball').animate({
			top: '+=130%',
			width: '-=3%',
			height: '-=3%'
		}, 900)
	},
	// shooting direction
	shootingDir(power, dir) {
		const num = {
			top: `-=${power}%`,
			left: `+=${dir}%`,
			width: '-=1%',
			height: '-=1%'
			}
		this.throwBall(num)
		game.time()
	},

	// check collision
	checkCollision() {
		const $ring = $('#ring')[0].getBoundingClientRect()
		const $ball = $('#ball')[0].getBoundingClientRect()

		const dx = $ring.x - $ball.x
		const dy = $ring.y - $ball.y
		const ballRadius = $ball.height / 2
		const ringRadius = $ring.width
		const distance = Math.sqrt(dx*dx + dy*dy)

		// check the position 

		if($ball.top < 100) {
			this.highEnough = true

		}

		if(this.highEnough) {
			if($ring.x < $ball.x + $ring.width && 
				$ring.x + $ring.width > $ball.x &&
				$ring.y < $ball.y + $ball.height &&
				$ring.y + $ring.height > $ball.y && 
				distance < ballRadius + ringRadius) {
	
				this.collisionDetected = true
				$('#ball').addClass('collision-state')
				this.checkHitTarget()

			} else {
					this.collisionDetected = false
					$('#ball').addClass('collision-state1')
				}	
		}
		console.log($ball);
	},
	checkHitTarget() {
		const $ball = $('#ball')[0].getBoundingClientRect()
		if(this.collisionDetected && $ball.left < 510) {
			$('#ball').stop()
			clearInterval(this.myIntervalId);
			this.collisionDetected = false
			this.highEnough = false
			$('#ball').animate({ 
				top:'-=20%',
				left: '-=40%'
			}, 600);
		} else if(this.collisionDetected && $ball.left < 528) {
			$('#ball').stop()
			clearInterval(this.myIntervalId);
			this.collisionDetected = false
			this.highEnough = false
			$('#ball').animate({ 
				top:'-=20%',
				left: '+=10%'
			}, 600);
		} else if(this.collisionDetected && $ball.left > 630) {
			$('#ball').stop()
			this.collisionDetected = false
			this.highEnough = false
			clearInterval(this.myIntervalId);
			$('#ball').animate({ 
				top:'-=20%',
				left: '+=20%'
			}, 600);
			$('#ball').animate({ 
				top:'+=120%'
			}, 800);
		} else if(this.collisionDetected && $ball.left > 550) {
			$('#ball').stop()
			this.collisionDetected = false
			this.highEnough = false
			clearInterval(this.myIntervalId);
			$('#ball').animate({ 
				top:'-=20%',
				left: '-=20%'
			}, 600);
			$('#ball').animate({ 
				top:'+=120%',
			}, 800);
		} else if(this.collisionDetected && $ball.left < 600 && $ball.left > 529) {
			this.collisionDetected = false
			this.highEnough = false
			clearInterval(this.myIntervalId);
		}
	},
	time() {
		this.myIntervalId = setInterval(function(){
			game.checkCollision()
		}, 0)
	// Stop timer
	},
	powerSelector() {
		const $power = $('#dotP')

		// $($power).animate({
		// 	top: '+=50.7%',
		// }, 800);
		// $($power).animate({
		// 	top: '-=50.7%',
		// }, 800);
		$($power).slider('option', 'animate');
	},
	dirSelector() {
		const $dir = $('#dotD')

		$($dir).animate({
			top: '+=50.7%',
		}, 900);
		$($dir).animate({
			top: '-=50.7%',
		}, 900);		
	},

	// run selector
	runPowerSelector() {
		const $dot = $('#dotP').css('animation-play-state', 'running')
	},

	// stop selector
	stopPowerSelector() {
		const $dot = $('#dotP').position().top
		// const $dot2 = $('#dotP').removeClass('power')
		const $dot2 = $('#dotP').css('animation-play-state', 'paused')
		console.log($dot);
		console.log($dot2);
	},
	runDirSelector() {
		const $dot = $('#dotD').addClass('dir')
	},

	// stop selector
	stopDirSelector() {
		const $dot = $('#dotD').position().top
		const $dot2 = $('#dotD').removeClass('dir')
		console.log($dot);
	}

}



// 1. tuning aim
// 2. shoting direction
// 3. Selector


// Check collision
// Work with direction of the ball
// Check if it hit the target
// Aiming selector
// 