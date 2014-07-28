var x = 0,
	y = 0,
	v = 0,
	content = document.getElementById("content"),
	lastGamma = 0,
	lastBeta = 0,
	positionX = 50,
	positionY = 50;

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
	/* gamma:  -90..90  (rotation around y axis) */
	/* alpha:  0..360 (rotation around z axis) (-180..180) */

	var gamma = evt.gamma
	var beta  = evt.beta
	var alpha = evt.alpha

	if(evt.accelerationIncludingGravity){
		// window.removeEventListener('deviceorientation', this.orientationListener, false);
		gamma = event.accelerationIncludingGravity.x*10
		beta = -event.accelerationIncludingGravity.y*10
		alpha = event.accelerationIncludingGravity.z*10
	}

	gamma = parseInt(gamma);
	beta = parseInt(beta);

	if (this._lastGamma != gamma || this._lastBeta != beta) {
        var rFontSize = window.getComputedStyle(document.querySelector('body')).fontSize.replace('px', ''),
        	marginLeft = window.getComputedStyle(document.querySelector('#heart')).marginLeft.replace('px', ''),
        	delta =  gamma/90 + 200;

        document.getElementById('e-btn-download').text = delta;
        console.log(rFontSize);
        console.log(marginLeft);
        console.log(delta);

        //style.marginLeft = gamma/90 * 200 + 200 +"px";
        document.querySelector('#heart').style.marginLeft = marginLeft + delta + 'px';

        this._lastGamma = gamma;
        this._lastBeta = beta;
    }

};
(new Orientation()).init();