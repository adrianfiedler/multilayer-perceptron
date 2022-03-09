console.log("ml5 version:", ml5.version);

function preload() {}

function setup() {
  createCanvas(400, 400);

  let nn = new NeuralNetwork(2, 2, 1);
  let input = [1, 0];
  let output = nn.feedforward(input);
  console.log(output);
}

function draw() {}
