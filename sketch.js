function preload() {}

function setup() {
  createCanvas(400, 400);

  let nn = new NeuralNetwork(2, 2, 2);
  let training_data = [
    { inputs: [1, 0], targets: [1] },
    { inputs: [0, 1], targets: [1] },
    { inputs: [1, 1], targets: [0] },
    { inputs: [0, 0], targets: [0] },
  ];
  // let output = nn.feedforward(input);
  for (let i = 0; i < 100; i++) {
    for (data of trainin_data) {
      nn.train(data.inputs, data.targets);
    }
  }

  nn.feedforward([1], [0]).print();
  nn.feedforward([0], [1]).print();
  nn.feedforward([1], [1]).print();
  nn.feedforward([0], [0]).print();

  // nn.train(inputs, targets);
  // console.log(output);
}

function draw() {}
