'use strict';

import BaseLayer from './base';
import makeKernel from '../utilities/make-kernel';
import sigmoid from '../activation/sigmoid';

export default class SigmoidLayer extends BaseLayer {
  setupKernels() {
    this.predictKernel = makeKernel(function(inputs) {
      return activate(inputs[this.thread.y][this.thread.x]);
    }, {
      functions: [sigmoid.activate]
    });

    this.learnKernel = makeKernel(function(weights, deltas) {
      return derivative(weights[this.thread.y][this.thread.x], deltas[this.thread.y][this.thread.x]);
    }, {
      functions: [sigmoid.derivative]
    });
  }

  predict() {
    this.outputs = this.predictKernel(this.inputs);
  }

  learn() {
    this.learnKernel(this.weights, this.deltas);
  }
}