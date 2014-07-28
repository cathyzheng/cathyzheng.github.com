var heart = document.querySelector('#heart'),
	marginLeft = + window.getComputedStyle(heart).marginLeft.replace('px', ''),
	clientWidth = document.body.clientWidth,
	halfClientW = clientWidth / 2;

function Orientation(selector) {}

Orientation.prototype.init = function(){
	window.addEventListener('deviceorientation', this.orientationListener, false);
	window.addEventListener('MozOrientation', this.orientationListener, false);
	window.addEventListener('devicemotion', this.orientationListener, false);
}

Orientation.prototype.orientationListener = function(evt) {
	// For FF3.6+
	if (!evt.gamma && !evt.beta) {
		// angle=radian*180.0/PI 在firefox中x和y是弧度值,
		evt.gamma = (evt.x * (180 / Math.PI)); //转换成角度值,
		evt.beta = (evt.y * (180 / Math.PI)); //转换成角度值
		evt.alpha = (evt.z * (180 / Math.PI)); //转换成角度值
	}
	/* beta:   -180..180 (rotation around x axis) */
	/* gamma:  -90..90   (rotation around y axis) */
	/* alpha:  0..360    (rotation around z axis) (-180..180) */

	var gamma = evt.gamma;
	var beta  = evt.beta;
	var alpha = evt.alpha;

	if(evt.accelerationIncludingGravity){
		// window.removeEventListener('deviceorientation', this.orientationListener, false);
		gamma = event.accelerationIncludingGravity.x*10;
		beta = -event.accelerationIncludingGravity.y*10;
		alpha = event.accelerationIncludingGravity.z*10;
	}

	gamma = parseInt(gamma);
	beta = parseInt(beta);

	if (this._lastGamma != gamma || this._lastBeta != beta) {
		//marginLeft = + window.getComputedStyle(heart).marginLeft.replace('px', '');
		//console.log(marginLeft + gamma/90 + 10);
      	heart.style.left = gamma/90 * halfClientW + halfClientW +"px";

		this._lastGamma = gamma;
    	this._lastBeta = beta;
    }

};
(new Orientation()).init();