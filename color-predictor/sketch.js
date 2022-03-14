let r, g, b;
let brain;
let which = "black";
let outputs = [0.0, 0.0];

function pickColor() {
  r = random(255);
  g = random(255);
  b = random(255);
}

function setup() {
  brain = new NeuralNetwork(3, 3, 2);
  createCanvas(600, 300);
  pickColor();
  colorPredictor(r, g, b);
  for (let i = 0; i < 10000; i++) {
    let red = random(255);
    let green = random(255);
    let blue = random(255);
    let answers = trainColor(red, green, blue);
    brain.train([red / 255, green / 255, blue / 255], answers);
  }
}

function colorPredictor() {
  let inputs = [r / 255, g / 255, b / 255];
  outputs = brain.predict(inputs);
  console.log(outputs);
  if (outputs[0] > outputs[1]) {
    which = "black";
  } else {
    which = "white";
  }
}

function train() {
  let targets = [0.0, 0.0];
  if (mouseX <= width / 2) {
    targets[0] = 1.0;
  } else {
    targets[1] = 1.0;
  }
  brain.train([r / 255, g / 255, b / 255], targets);
}

function trainColor(r, g, b) {
  if (r + g + b > 300) {
    return [0, 1];
  } else {
    return [1, 0];
  }
}

function draw() {
  background(r, g, b);
  strokeWeight(4);
  stroke(0);
  line(width / 2, 0, width / 2, height);

  textSize(64);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  text("black", 150, 100);
  text(outputs[0].toFixed(2), 150, 180);
  fill(255);
  text("white", 450, 100);
  text(outputs[1].toFixed(2), 450, 180);

  if (which === "black") {
    fill(0);
    ellipse(150, 250, 60);
  } else {
    fill(255);
    ellipse(450, 250, 60);
  }
}

function mousePressed() {
  train();
  pickColor();
  colorPredictor();
  return false;
}
