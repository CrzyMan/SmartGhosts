// Neuron handler
Neuron = {
};

// [ weight 1, weight 2, ... , activation]
Neuron.new = function(nputs){
    var n = new Array(nputs+1);
    Neuron.randomize(n);
    return n;
};

// randomize a neuron
Neuron.randomize = function (n){
    for (var i = 0; i < n.length -1; i++){
        n[i] = Math.random()*2 - 1; // input weight i
    }
    
    n[n.length-1] = Math.random()*2*(n.length-1) - 0.5*(n.length-1); // activation energy
};

// "cross" the traits of two neurons
Neuron.cross = function(n1, n2){
    
    // get number in range and perfom a cross technique based
    switch (~~(Math.random()*5)){
        // max
        case 0:
            return n1.map(function(e,i){
                return Math.max(n1[i], n2[i]);
            });
            break;
        
        // min
        case 1:
            return n1.map(function(e,i){
                return Math.min(n1[i], n2[i]);
            });
            break;
        
        // avg, has a higher chance
        case 2:
        case 3:
        case 4:
            return n1.map(function(e,i){
                return (n1[i] + n2[i])/2;
            });
            break;
        
        // shouldn't happen...
        default:
            console.log("wat... ");
            break;
    }
    return [0,0,-1];
}

// return a mutated neuron
Neuron.mutate = function(n){
    // mutate the weights
    return n.map(function(w,i){return w + 0.05*nrand()});
}

// get the result from the neuron
Neuron.process = function(n){
    // how far above activation energy this neuron is
    return input.map(function mapNeuron(e,i){
        return e*n[i];
    }).reduce(reduceSum);
};