import React, { useReducer } from "react";

//
import seqActions from "../actions/seqActions";
import seqReducer from "../reducers/seqReducer";

//
import { getGenerator } from "../sequencers/generator";

//
export default function SeqGenerator(props) {
	// initial state
	const initialState = {
		// sequencer
		sequencer: "factorialSeq",
		// pipeline
		pipeline: "noPipeline",
		// for rangeSeq
		start: 2,
		step: 3,
		// seqBases
		seqBases: [1, 3, 7, 2, 0],
		// value
		value: 0
	};

	//
	if (!window.hasOwnProperty("seqGenerator")) {
		initialiseSeqGenerator(initialState);
	}

	//
	const [state, dispatch] = useReducer(seqReducer, {
		...initialState,
		value: window.seqGenerator.currentValue()
	});

	//
	function initialiseSeqGenerator(initialState) {
		window.seqGenerator = getGenerator(initialState);
	}

	//
	function nextValue() {
		dispatch({
			type: seqActions.NEXT_VALUE,
			value: window.seqGenerator.next()
		});
	}

	function newSequencer(e) {
		const sequencer = e.target.value;

		// re-init seqGenerator
		initialiseSeqGenerator({ ...state, sequencer });

		//
		dispatch({
			type: seqActions.NEW_SEQUENCER,
			sequencer,
			value: window.seqGenerator.next()
		});
	}

	function setPipeline(e) {
		//
		const pipeline = e.target.value;

		// re-init seqGenerator
		initialiseSeqGenerator({ ...state, pipeline });

		//
		dispatch({
			type: seqActions.SET_PIPELINE,
			pipeline,
			value: window.seqGenerator.next()
		});
	}

	function setSeqBases(e) {
		const seqBases =
			e.target.value && e.target.value.length > 0
				? e.target.value
						.replace(/, +/g, ",")
						.split(",")
						.map(Number)
				: [];

		// re-init seqGenerator
		initialiseSeqGenerator({ ...state, seqBases });

		//
		dispatch({
			type: seqActions.SET_SEQ_BASES,
			seqBases,
			value: window.seqGenerator.next()
		});
	}

	function updateRangeStart(e) {
		const start = parseInt(e.target.value);

		// re-init seqGenerator
		initialiseSeqGenerator({ ...state, start });

		//
		dispatch({
			type: seqActions.UPDATE_RANGE_START,
			start,
			value: window.seqGenerator.next()
		});
	}

	function updateRangeStep(e) {
		const step = parseInt(e.target.value);

		// re-init seqGenerator
		initialiseSeqGenerator({ ...state, step });

		//
		dispatch({
			type: seqActions.UPDATE_RANGE_STEP,
			step,
			value: window.seqGenerator.next()
		});
	}

	//
	return (
		<div>
			<div>
				<label>Sequencer</label>
				<div>{state.sequencer}</div>
				{[
					"factorialSeq",
					"fibonacciSeq",
					"partialSumSeq",
					"primeSeq",
					"rangeSeq"
				].map(sequencer => (
					<button
						key={sequencer}
						type="button"
						onClick={newSequencer}
						value={sequencer}
					>
						{sequencer}
					</button>
				))}
				{/* partialSumSeq input */}
				{state.sequencer === "partialSumSeq" && (
					<div>
						<input
							type="text"
							onChange={setSeqBases}
							defaultValue={state.seqBases.join(", ")}
						/>
						<p className="hint">Comma separated</p>
					</div>
				)}
				{/* rangeSeq input */}
				{state.sequencer === "rangeSeq" && (
					<div>
						<label>Start</label>
						<input
							type="text"
							onChange={updateRangeStart}
							defaultValue={state.start}
						/>
						<label>Step</label>
						<input
							type="text"
							onChange={updateRangeStep}
							defaultValue={state.step}
						/>
					</div>
				)}
			</div>
			{/* pipelines */}
			<div>
				<label>pipeline</label>
				<div>{state.pipeline}</div>
				{["noPipeline", "accumulator"].map(pipeline => (
					<button
						key={pipeline}
						type="button"
						onClick={setPipeline}
						value={pipeline}
					>
						{pipeline}
					</button>
				))}
			</div>
			{/* output */}
			<div>
				<pre>{JSON.stringify(state, null, 2)}</pre>
			</div>
			<button type="button" onClick={nextValue}>
				Next
			</button>
		</div>
	);
}
