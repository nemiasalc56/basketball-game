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
			top: '+=130%'
		}, 800)
	},
	// shooting direction
	shootingDir(power, dir) {
		const num = {
			top: `-=${power}%`,
			left: `+=${dir}%`
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
				$('#ball').attr('class', 'collision-state')
				this.checkHitTarget()

			} else {
					this.collisionDetected = false
					$('#ball').attr('class', 'collision-state1')
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
			}, 600);
		} else if(this.collisionDetected && $ball.left > 600) {
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
			}, 600);
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
	}
	// Stop timer

}


// Listeners
// $('#ball').click(function() {
// 	game.time()
// 	game.shootingDir()
// });




// 1. tuning aim
// 2. shoting direction
// 3. Selector


// Check collision
// Work with direction of the ball
// Check if it hit the target
// Aiming selector
// 