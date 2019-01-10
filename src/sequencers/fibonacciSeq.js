import numbers from "numbers";

//
export default function fibonacciSeq() {
	const getValue = valueIndex => {
		return numbers.generate.fibonacci(valueIndex + 1);
	};

	return { getValue };
}
