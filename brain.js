// Brain Handler
var Brain = {};

// Brain constructor
Brain.new = function(nputs){
    var brain = [];
    
    // random dna
    for (var i = 0; i < numOfNeurons; i++){
        brain.push(Neuron.new(nputs));
    }
    
    return brain;
};

// processes the input
Brain.process = function(brain){
    return balancedActivation(brain.map(Neuron.process).reduce(reduceSum));
};

// crosses two brains
Brain.cross = function(b1, b2){
    return b1.map(function(n, i){
        return Neuron.cross(n, b2[i]);
    });
};

// return a mutated brain
Brain.mutate = function(b){
    return b.map(Neuron.mutate);
}

// map function for the brain
function mapBrain(n){
    return Neuron.process(n)
}