export default function rangeSeq(start, step) {
	const getValue = function (valueIndex) {
		return start + valueIndex * step;
	};

	return { getValue };
}
