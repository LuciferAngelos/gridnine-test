import flights from '../flights.json'

const SET_FLIGHTS_DATA = 'SET_FLIGHTS_DATA'

let initialState = {

}

const flightsReducer = (state = initialState, action) => {

	switch (action.type) {
		case SET_FLIGHTS_DATA:
			return {
				...state,
				...action.payload
			}
		default:
			return state;
	}

}

export const setFlightsData = (payload) => ({ type: SET_FLIGHTS_DATA, payload })


export const getFlightsRecords = () => (dispatch) => {
	let response = JSON.stringify(flights)
	let finalResp = JSON.parse(response).result
	dispatch(setFlightsData(finalResp))
}

export default flightsReducer