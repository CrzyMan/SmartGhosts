// Ghost handler
var Ghost = {
    image: document.createElement('canvas'),
    
    size: 50,
    
    speed: 1,
    
    turnCoefficient: 0.1,
};

// size the image
Ghost.sizeh = Ghost.size/2;
Ghost.image.height = Ghost.size;
Ghost.image.width = Ghost.size;

// draw the ghost
(function(){
    var c = Ghost.image.getContext('2d');
    c.beginPath();
    c.arc(Ghost.sizeh, Ghost.sizeh, Ghost.sizeh, 0, Math.PI, true);
    c.moveTo(0,Ghost.sizeh);
    c.lineTo(0,Ghost.size);
    for (var i = 1; i < 4; i++){
        c.lineTo(Ghost.size*i/4, Ghost.size*(4-i%2)/4);
    }
    c.lineTo(Ghost.size, Ghost.size);
    c.lineTo(Ghost.size, Ghost.sizeh);
    c.closePath();
    c.fillStyle = "#3333ff";
    c.fill();
})();


// Ghost constructor
Ghost.new = function(x, y){
    if (typeof x == "undefined")
        x = rand(Ghost.sizeh, ctx_ghosts.canvas.width-Ghost.sizeh);
    if (typeof y == "undefined")
        y = rand(Ghost.sizeh, ctx_ghosts.canvas.height-Ghost.sizeh);
        
    return {
        x: x,
        y: y,
        a: 0,
        fitness: 0,
        speed: Ghost.speed,
        brain: Brain.new(numOfInputs)
    }
};

// draw a ghost
Ghost.draw = function(g){
    ctx_ghosts.drawImage(Ghost.image, g.x - Ghost.sizeh, g.y - Ghost.sizeh);
};

Ghost.setInput = function(g){
    if (pacmen.length == 0){
        // this should never happen
    }
    
    // normalize the vector from the ghost to the closest pacman

    //                   find the distances                           find the closest([distance, index])
    var closest = pacmen.map(function(e, i){return [dist2(e, g), i]}).reduce(Pacman.reduceMin);
    
    // if it is closer than 50 (50^2 = 2500) count as eaten
    if (closest[0] < 2500){
        
        //eats the pacman
        g.fitness++;
        
        // change the pacman
        clear(ctx_pacmen);
        
        pacmen[closest[1]] = Pacman.new();
        pacmen.forEach(Pacman.draw);
        
        Ghost.setInput(g);
    } else {
        var pos = pacmen[closest[1]];
        var inputRaw = normalizedDiff(g, pos);
        input = [inputRaw.x, inputRaw.y, -1];
    }
    
    
};

// update the ghost
Ghost.update = function(g){
    
    Ghost.setInput(g);
    
    Ghost.turn(Brain.process(g.brain), g);
    
    Ghost.move(g);
    
    Ghost.draw(g, ctx_ghosts);
};

// turns the ghost 
Ghost.turn = function(da, g){
    g.a += da*Ghost.turnCoefficient;
};

// moves the ghost
Ghost.move = function(g){
    g.x += Ghost.speed*Math.cos(g.a);
    g.y += Ghost.speed*Math.sin(g.a);
};

// get the offspring of two ghosts
Ghost.mate = function(g1, g2){
    var g = Ghost.new();
    g.brain = Brain.mutate(Brain.cross(g1.brain, g2.brain));
    return g;
};

Ghost.fitnessSort = function(g1, g2){
    return g2.fitness - g1.fitness;
}