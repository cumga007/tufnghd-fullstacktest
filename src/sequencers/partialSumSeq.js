import math from 'mathjs';

export default function partialSumSeq() {
	//
	const seqValues = Array.from(arguments);

	//
	const getValue = (valueIndex) => {
		const count = valueIndex + 1;
		if (count >= seqValues.length) {
			return math.sum(seqValues);
		}
		return math.sum(seqValues.slice(0, count));
	};

	return { getValue };
}
