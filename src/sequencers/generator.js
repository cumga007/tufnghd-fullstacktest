// sequencers
import factorialSeq from './factorialSeq';
import fibonacciSeq from './fibonacciSeq';
import rangeSeq from './rangeSeq';
import primeSeq from './primeSeq';
import partialSumSeq from './partialSumSeq';
import pipeSeq from './pipeSeq';

// pipelines
import accumulator from './pipes/accumulator';

function generator(sequencer) {
	const seqArgs = Array.prototype.slice.call(arguments, 1);
	const sequencerInstance = sequencer(...seqArgs);
	let valueIndex = -1;
	let prevValue = 0;

	//
	const next = () => {
		valueIndex++;
		prevValue = sequencerInstance.getValue(valueIndex, prevValue);
		return prevValue;
	};

	const currentValue = () => {
		if (valueIndex < 0) {
			return next();
		}
		return prevValue;
	};

	//
	return { next, currentValue };
}

function getSequencer(props) {
	const { sequencer } = props;

	//
	if (sequencer === 'factorialSeq') {
		return [factorialSeq];
	}
	if (sequencer === 'fibonacciSeq') {
		return [fibonacciSeq];
	}
	if (sequencer === 'rangeSeq') {
		const { start, step } = props;
		return [rangeSeq, start, step];
	}
	if (sequencer === 'primeSeq') {
		return [primeSeq];
	}
	if (sequencer === 'partialSumSeq') {
		const { seqBases } = props;
		return [partialSumSeq, ...seqBases];
	}

	//
	return null;
}

function getPipeline(props) {
	const { pipeline } = props;
	if (pipeline === 'accumulator') {
		return accumulator;
	}
	return null;
}

function getGenerator(props) {
	//
	const sequencerArgs = getSequencer(props);
	const pipeline = getPipeline(props);

	//
	let sequenceGen = null;

	//
	if (pipeline) {
		const pipedSeq = pipeSeq(...sequencerArgs).pipeline(pipeline).invoke();
		sequenceGen = generator(pipedSeq);
	} else {
		sequenceGen = generator(...sequencerArgs);
	}

	//
	return sequenceGen;
}

export {
	generator,
	getGenerator,
};
