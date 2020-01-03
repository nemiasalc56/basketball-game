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
	// throw the ball
	throwBall() {
		// ball goes up
		$('#ball').animate({ 
			top:'-=70%'
		}, 600);

		// the ball goes down
		$('#ball').animate({
			top: '+=100%'
		}, 800)
	},

	// check collision
	checkCollision() {
		const $ring = $('#ring')[0].getBoundingClientRect()
		const $ball = $('#ball')[0].getBoundingClientRect()

		// const dx = $ring.x - $ball.x
		// const dy = $ring.y - $ball.y
		// const ballRadius = $ball.height / 2
		// const ringRadius = $ring.height / 2
		// console.log(ballRadius);
		// console.log(ringRadius);
		// const distance = Math.sqrt(dx*dx + dy*dy)

		// check the position 

		if($ball.top < 100) {
			console.log('is less');
			this.highEnough = true

		}

		if(this.highEnough) {
			if($ring.x < $ball.x + $ring.width && 
				$ring.x + $ring.width > $ball.x &&
				$ring.y < $ball.y + $ball.height &&
				$ring.y + $ring.height > $ball.y) {
				console.log('Collision detected');
	
				this.collisionDetected = true
				$('#ball').attr('class', 'collision-state')
				this.stopBall()

			}  else {
			this.collisionDetected = false
			$('#ball').attr('class', 'collision-state1')

		}	

		}
		console.log($ball);
	},
	stopBall(){
		const $ball = $('#ball')[0].getBoundingClientRect()
		if(this.collisionDetected && $ball.left < 540) {
			$('#ball').stop()
			this.collisionDetected = false
			this.highEnough = false
			$('#ball').animate({ 
			top:'-=80%',
			left: '-=40%'
		}, 600);
		}
	},
	time() {
		this.myIntervalId = setInterval(function(){
			game.checkCollision()
		}, )
	},
	checkHitTarget() {

	}
}


// Listeners
$('#ball').click(function() {
	game.time()
	game.throwBall()
});
