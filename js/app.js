console.log('basketbal game');

class Basketball {
	constructor(ball) {
		this.ball = ball
		hitTarget = false
	}
}

const game = {
	remainingAttemp: 2,
	points: 0,
	throwBall() {
		$('.ball').animate({ 
		bottom:'+=80%',
		width: '-=6%',
		height: '-=6%'
	}, 600);
	$('.ball').animate({ top: '+=40%'}, 800)
	}
}


// Listeners
$('.ball').click(function() {
	game.throwBall()
});