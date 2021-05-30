import { getFlightsRecords } from './flightsReducer'

const INITIALIZED_SUCCESSED = 'INITIALIZED_SUCCESSED';

let initialState = {
	initialized: false
}

const appReducer = (state = initialState, action) => {

	switch (action.type) {
		case INITIALIZED_SUCCESSED:
			return {
				...state,
				initialized: true
			}
		default:
			return state;
	}
}


//AC
export const setInitializedSuccess = () => ({ type: INITIALIZED_SUCCESSED });


//thunk
export const initializeApp = () => async (dispatch) => {
	let promise = dispatch(getFlightsRecords());

	Promise.all([promise]).then(() => {
		dispatch(setInitializedSuccess());
	})

}

export default appReducer