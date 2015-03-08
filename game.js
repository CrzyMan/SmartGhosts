var canvas_size = 700;

// Canvas for the ghosts
var ctx_ghosts = document.createElement('canvas').getContext('2d');
ctx_ghosts.canvas.width = canvas_size;
ctx_ghosts.canvas.height = canvas_size;
document.body.appendChild(ctx_ghosts.canvas);


// Canvas for the Pacmen
var ctx_pacmen = document.createElement('canvas').getContext('2d');
ctx_pacmen.canvas.width = canvas_size;
ctx_pacmen.canvas.height = canvas_size;
document.body.appendChild(ctx_pacmen.canvas);


// input is updated each time we evaluate a brain
var input = [];

var ghosts = [];
var pacmen = [];

document.body.onload = initializeGame;

var generation = 1;
document.getElementById('span_generation').innerText = generation;

var numOfNeurons = 3;
var numOfGhosts = 10;
var numOfPacmen = 10;
var numOfInputs = 2;

// should be called once everything has been loaded
function initializeGame(){
    input = [];
    
    ghosts = [];
    pacmen = [];
    
    // populate ghosts
    for (var i = 0; i < numOfGhosts; i++)
        ghosts.push(Ghost.new());
    
    // populate pacmen
    for (var i = 0; i < numOfPacmen; i++)
        pacmen.push(Pacman.new());
    
    mainTick();
    
    pacmen.forEach(Pacman.draw);
}





var reqAnimFrame = 0;
var ticks = 0;
function mainTick(){
    ticks++;
    clear(ctx_ghosts);
    
    ghosts.forEach(Ghost.update);
    
    // if this generation has been going for 30 seconds (30 seconds * 60 ticks per second)
    if(ticks >= 1800){
        ticks = 0;
        generation++;
        document.getElementById('span_generation').innerText = generation;
        
        var byFitness = ghosts.sort(Ghost.fitnessSort);
        
        // if it was at least a decent generation
        if(byFitness[0].fitness > 2){
            ghosts.forEach(function(g, i){
                var g1 = byFitness[crand(byFitness.length)];
                var g2 = byFitness[crand(byFitness.length)];
                ghosts[i] = Ghost.mate(g1,g2);
            });
        } // if it sucked
        else {
            // new stuff, except the best from last time
            for (var i = 0; i < ghosts.length; i++){
                ghosts[i] = Ghost.new();
            }
            ghosts[0].brain = byFitness[0].brain;
        }
        
        // reset pacmen
        clear(ctx_pacmen);
        pacmen.forEach(function(p, i){pacmen[i] = Pacman.new(); Pacman.draw(pacmen[i]);});
        
        // redraw the ghosts
        clear(ctx_ghosts);
        ghosts.forEach(Ghost.draw);
    }
    
    reqAnimFrame = requestAnimationFrame(mainTick);
}






function findBiasedIndex(l){
    var a = 0;
    // find a ghost, biased toward more fit individuals
    do {
        a = ~~Math.abs(byFitness.length*nrand());
    } while (a >= byFitness.length)
    return a;
}

// stop animation
function stop(){
    cancelAnimationFrame(reqAnimFrame);
}

// clear a canvas
function clear(ctx){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}



// return a vector object
function makeVector(x, y){
    return {x: x, y: y};
}

// random float inclusively between min and max
function rand(min, max){
    return min + Math.random()*(max-min);
}

// normally distributed random numbers
function nrand(){
    var x1, x2, rad, y1;
    do {
        x1 = 2 * Math.random() - 1;
        x2 = 2 * Math.random() - 1;
        rad = x1 * x1 + x2 * x2;
    } while (rad >= 1 || rad == 0);
    var c = Math.sqrt(-2 * Math.log(rad) / rad);
    return x1 * c;
}

/**
 * Get random number
 * Distribution: 4th quadrant circular starting at 0,0
 */
function crand(max){
    return ~~(max - max*Math.sin(Math.acos(Math.random())));
}

// activation formula
function balancedActivation(x){
    return 1-(2/(1+Math.pow(4,x)));
};

// get the squared distance between two objects
function dist2(e1, e2){
    return Math.pow(e1.x-e2.x,2) + Math.pow(e1.y-e2.y,2);
}

// gets the normalized difference between the two objects
function normalizedDiff(e1, e2){
    var dx = e2.x-e1.x;
    var dy = e2.y-e1.y;
    var d = Math.sqrt(dx*dx+dy*dy);
    return makeVector(dx/d, dy/d);
}

// sum an array with this
function reduceSum(e1, e2){
    return e1 + e2;
}

// find the min with this
function reduceMin(a, b){
    return a < b ? a : b;
}

