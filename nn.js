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
  }

  feedforward(input) {
    // LOTS OF MATRIX MATH!!
    return guess;
  }
}
