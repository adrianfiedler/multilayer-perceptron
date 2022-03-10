function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();

    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();
  }

  feedforward(input_array) {
    let input = Matrix.fromArray(input_array);

    // hidden nodes outputs
    let hidden = Matrix.multiply(this.weights_ih, input);
    hidden.add(this.bias_h);
    hidden.map(sigmoid); // activation function!

    // output nodes outputs
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid); // activation function!

    return output.toArray();
  }

  train(inputs, targets) {
    let outputs = this.feedforward(inputs);

    outputs = Matrix.fromArray(outputs);
    targets = Matrix.fromArray(targets);

    // Calculate the error
    // ERROR = TARGETS - OUTPUTS
    let output_errors = Matrix.substract(targets, outputs);

    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);
  }
}
