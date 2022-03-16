let nn = getModel();
let lr_slider;
let inputs = [];

let resolution = 20;
let cols;
let rows;
let xs;

const train_xs = tf.tensor2d([
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
]);
const train_ys = tf.tensor2d([[0], [1], [1], [0]]);
let fps;

async function setup() {
  createCanvas(400, 400);
  lr_slider = createSlider(0.01, 0.5, 0.1, 0.01);
  cols = width / resolution;
  rows = height / resolution;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      inputs.push([x1, x2]);
    }
  }

  xs = tf.tensor2d(inputs);
  setTimeout(train, 10);
  fps = createSpan("FPS: " + frameRate());
  fps.position(10, 420);
}

function getModel() {
  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      units: 3, // number of nodes
      activation: "sigmoid", // activation function
      inputShape: [2], // input shape
    })
  );
  model.add(
    tf.layers.dense({
      units: 1,
      // input shape is inferred from previous layer
      activation: "sigmoid",
    })
  );

  // use stochastical gradient descent
  const sgdOpt = tf.train.adam(0.1);
  const config = {
    optimizer: sgdOpt,
    loss: "meanSquaredError",
  };
  model.compile(config);
  return model;
}

function train() {
  trainModel().then((result) => {
    // console.log(result.history.loss[0]);
    setTimeout(train, 10);
  });
}

function trainModel() {
  return nn.fit(train_xs, train_ys, {
    shuffle: true,
    epochs: 10,
  });
}

function draw() {
  background(0);
  fps.html("FPS: " + nf(frameRate(), 1, 1));
  

  tf.tidy(() => {
    let ys = nn.predict(xs);
    let y_values = ys.dataSync();

    let index = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let br = y_values[index] * 255;
        fill(br);
        rect(i * resolution, j * resolution, resolution, resolution);
        fill(255 - br);
        textSize(8);
        textAlign(CENTER, CENTER);
        text(
          nf(y_values[index], 1, 2),
          i * resolution + resolution / 2,
          j * resolution + resolution / 2
        );
        index++;
      }
    }
  });
}
