import seqActions from '../actions/seqActions';

export default function reducer(state, action) {
	//
	switch (action.type) {
		// next value
		case seqActions.NEXT_VALUE:
			return {
				...state,
				value: action.value,
			};
		// new sequencer
		case seqActions.NEW_SEQUENCER:
			return {
				...state,
				sequencer: action.sequencer,
				value: action.value,
			};
		// SET_PIPELINE
		case seqActions.SET_PIPELINE:
			return {
				...state,
				pipeline: action.pipeline,
				value: action.value,
			};
		// SET_SEQ_BASES
		case 'SET_SEQ_BASES':
			return {
				...state,
				seqBases: action.seqBases,
				value: action.value,
			};
		// UPDATE_RANGE_START
		case 'UPDATE_RANGE_START':
			return {
				...state,
				start: action.start,
				value: action.value,
			};
		// UPDATE_RANGE_STEP
		case 'UPDATE_RANGE_STEP':
			return {
				...state,
				step: action.step,
				value: action.value,
			};
		// default
		default:
			return state;
	}
}
