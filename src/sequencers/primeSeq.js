import math from 'mathjs';

//
export default function primeSeq() {
	const getValue = (valueIndex, prevValue) => {
		if (valueIndex < 1) {
			return 2;
		}
		let primeValue = prevValue + 1;
		if (primeValue % 2 === 0) {
			primeValue++;
		}
		while (!math.isPrime(primeValue)) {
			primeValue += 2;
		}
		return primeValue;
	};

	return { getValue };
}
