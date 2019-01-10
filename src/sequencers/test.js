import { generator } from './generator';

// sequencers
import factorialSeq from './factorialSeq';
import fibonacciSeq from './fibonacciSeq';
import rangeSeq from './rangeSeq';
import primeSeq from './primeSeq';
import partialSumSeq from './partialSumSeq';
import pipeSeq from './pipeSeq';

// pipelines
import accumulator from './pipes/accumulator';

it('test sequencers', () => {
	// factorialGen
	const factorialGen = generator(factorialSeq);
	expect(factorialGen.next()).toBe(1); // 1
	expect(factorialGen.next()).toBe(1); // 1
	expect(factorialGen.next()).toBe(2); // 2
	expect(factorialGen.next()).toBe(6); // 6

	// fibonacciGen
	const fibonacciGen = generator(fibonacciSeq);
	expect(fibonacciGen.next()).toBe(1); // 1
	expect(fibonacciGen.next()).toBe(1); // 1
	expect(fibonacciGen.next()).toBe(2); // 2
	expect(fibonacciGen.next()).toBe(3); // 3
	expect(fibonacciGen.next()).toBe(5); // 5
	expect(fibonacciGen.next()).toBe(8); // 8

	// rangeGen
	const rangeGen = generator(rangeSeq, 1, 2);
	expect(rangeGen.next()).toBe(1); // 1
	expect(rangeGen.next()).toBe(3); // 3
	expect(rangeGen.next()).toBe(5); // 5

	// primeGen
	const primeGen = generator(primeSeq);
	expect(primeGen.next()).toBe(2); // 2
	expect(primeGen.next()).toBe(3); // 3
	expect(primeGen.next()).toBe(5); // 5
	expect(primeGen.next()).toBe(7); // 7

	// primeGen
	const partialSumGen = generator(partialSumSeq, 1, 3, 7, 2, 0); // 1, 4, 11, 13, 13, end
	expect(partialSumGen.next()).toBe(1); // 1
	expect(partialSumGen.next()).toBe(4); // 4
	expect(partialSumGen.next()).toBe(11); // 11
	expect(partialSumGen.next()).toBe(13); // 13
	expect(partialSumGen.next()).toBe(13); // 13
	expect(partialSumGen.next()).toBe(13); // 13

	// rangeSeq & accumulator
	const pipedSeq = pipeSeq(rangeSeq, 2, 3) // 2, 5, 8, 11
		.pipeline(accumulator) // 2, 7(5+2), 15(7+8), 26(15+11)
		.invoke();

	// pipeGen
	const pipeGen = generator(pipedSeq);
	expect(pipeGen.next()).toBe(2); // 2
	expect(pipeGen.next()).toBe(7); // 7
	expect(pipeGen.next()).toBe(15); // 15
	expect(pipeGen.next()).toBe(26); // 26
});
