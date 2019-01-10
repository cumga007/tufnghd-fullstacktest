const pipedSeq = function (sequencer, pipeline) {
	return () => {
		const seqArgs = Array.prototype.slice.call(arguments, 2);
		const sequencerInstance = sequencer(...seqArgs);
		const pipeFunc = pipeline();

		//
		const getValue = (valueIndex, prevValue) => {
			const value = sequencerInstance.getValue(valueIndex, prevValue);
			return pipeFunc(value);
		};

		//
		return { getValue };
	}
};

export default function pipeSeq(sequencer) {
	let pipelineFunc = null;

	// pipeline
	const pipeline = function (pipe) {
		pipelineFunc = pipe;
		return this;
	};

	// invoke
	const invoke = () => {
		const pipedSeqArgs = Array.prototype.slice.call(arguments, 1);
		return pipedSeq(sequencer, pipelineFunc, ...pipedSeqArgs);
	};

	//
	return { pipeline, invoke };
};
