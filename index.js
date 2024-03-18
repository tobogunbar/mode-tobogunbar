// quantum-calculator.js

const math = require('mathjs');
const { QuantumCircuit, Simulator } = require('qiskit');

// Function to calculate the probability of a qubit being in the |0> state
function probabilityOfZero(qubitState) {
    const amplitudeSquared = math.abs(math.complex(qubitState[0])) ** 2;
    return amplitudeSquared;
}

// Function to calculate the probability of a qubit being in the |1> state
function probabilityOfOne(qubitState) {
    return 1 - probabilityOfZero(qubitState);
}

// Function to measure the expectation value of a quantum operator
function expectationValue(operator, qubitState) {
    const conjugateTranspose = math.transpose(math.conj(operator));
    const innerProduct = math.multiply(conjugateTranspose, qubitState);
    return math.squeeze(math.multiply(qubitState, innerProduct));
}

// Function to simulate a quantum circuit and measure the expectation value of an operator
async function simulateCircuitAndMeasure(circuit, operator) {
    const simulator = new Simulator();
    await simulator.execute(circuit);
    const finalState = simulator.getFinalState();
    return expectationValue(operator, finalState);
}

module.exports = {
    probabilityOfZero,
    probabilityOfOne,
    expectationValue,
    simulateCircuitAndMeasure
};
