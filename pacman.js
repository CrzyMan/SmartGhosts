// Set up the pacman handler
Pacman = {
    image: document.createElement('canvas'),
    size: 30,
};
Pacman.sizeh = Pacman.size/2;
Pacman.image.width = Pacman.size;
Pacman.image.height = Pacman.size;

// draw the pacman
(function(){
    var c = Pacman.image.getContext('2d');
    c.fillStyle = "yellow";
    c.strokeStyle = "black";
    var d = 0.4;
    c.beginPath();
    c.arc(Pacman.sizeh, Pacman.sizeh, Pacman.sizeh-1, d, Math.PI+d);
    c.closePath();
    c.fill()
    c.stroke();
    c.beginPath();
    c.arc(Pacman.sizeh, Pacman.sizeh, Pacman.sizeh-1, Math.PI-d, 2*Math.PI-d);
    c.closePath();
    c.stroke();
    c.fill();
    c.beginPath();
    c.arc(Pacman.sizeh, Pacman.sizeh, Pacman.sizeh-1, d, Math.PI+d);
    c.closePath();
    c.fill()
})()

// make a new pacman (vector of position)
Pacman.new = function(){
    return makeVector(rand(Pacman.sizeh, ctx_pacmen.canvas.width-Pacman.sizeh), rand(Pacman.sizeh, ctx_pacmen.canvas.height-Pacman.sizeh));
};

// draw the pacman
Pacman.draw  = function(p){
    ctx_pacmen.drawImage(Pacman.image, p.x - Pacman.sizeh, p.y - Pacman.sizeh)
};

Pacman.reduceMin = function(a, b){
    return a[0] < b[0] ? a : b;
}