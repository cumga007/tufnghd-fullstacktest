import math from "mathjs";

// RETURN X!
export default function factorialSeq() {
	const getValue = valueIndex => {
		return math.factorial(valueIndex);
	};

	return { getValue };
}
