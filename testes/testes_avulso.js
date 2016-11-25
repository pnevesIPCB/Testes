/**
 * Created by pauloalexandreneves on 21/11/2016.
 */
;(function(){
var FizzyText = function() {
    this.color0 = "#ffae23"; // CSS string
    this.color1 = [ 0, 128, 255 ]; // RGB array
    this.color2 = [ 0, 128, 255, 0.3 ]; // RGB with alpha
    this.color3 = { h: 350, s: 0.9, v: 0.3 }; // Hue, saturation, value
};

window.onload = function() {

    var text = new FizzyText();
    var gui = new dat.GUI();

    gui.remember (text);

    gui.addColor(text, 'color0');
    gui.addColor(text, 'color1');
    gui.addColor(text, 'color2');
    gui.addColor(text, 'color3');

};


})();