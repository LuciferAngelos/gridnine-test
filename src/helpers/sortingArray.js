function reducerHelper(arr) {
	arr.reduce(function (sum, current) {
		return sum + current.duration;
	}, 0);
}

export const filterDataFromCompanies = (arr, args) => {
	let sortedArrByCompany = [];

	if (args.length > 0) {

		for (let k of args) {
			sortedArrByCompany = [...[].slice.call(arr).filter(flightItem => flightItem.flightToken === k)]
		}
	} else {
		sortedArrByCompany = [...arr]
	}

	return sortedArrByCompany;
}

export const sortByRisingPrice = (arr) => {
	return [].slice.call(arr).sort((a, b) => {
		return parseInt(a.flight.price.total.amount) - parseInt(b.flight.price.total.amount);
	})
}

export const sortByLowingPrice = (arr) => {
	return [].slice.call(arr).sort((a, b) => {
		return parseInt(b.flight.price.total.amount) - parseInt(a.flight.price.total.amount);
	})
}

export const sortByTravelDuration = (arr) => {
	return [].slice.call(arr).sort((a, b) => {
		return parseInt(reducerHelper(a.flight.legs)) - parseInt(reducerHelper(b.flight.legs));
	})
}

export const filterFlightsByTransfers = (arr, transfersCount) => {
	let sortedArrByTransfers = [];

	if (transfersCount === 1) {
		sortedArrByTransfers = [...[].slice.call(arr).filter(transf => {
			if (transf.flight.legs[0].segments.length === 2 && transf.flight.legs[1].segments.length === 2) {
				return transf.flight.legs[0].segments[0].aircraft.uid !== transf.flight.legs[0].segments[1].aircraft.uid || transf.flight.legs[1].segments[0].aircraft.uid !== transf.flight.legs[1].segments[1].aircraft.uid
			}
			if ((transf.flight.legs[0].segments.length === 1 && transf.flight.legs[1].segments.length === 2)) {
				return transf.flight.legs[1].segments[0].aircraft.uid !== transf.flight.legs[1].segments[1].aircraft.uid
			}
			if ((transf.flight.legs[0].segments.length === 2 && transf.flight.legs[1].segments.length === 1)) {
				return transf.flight.legs[0].segments[0].aircraft.uid !== transf.flight.legs[0].segments[1].aircraft.uid
			}
		})]
	} else {
		sortedArrByTransfers = [...[].slice.call(arr).filter(transf => {
			if (transf.flight.legs[0].segments.length === 2 && transf.flight.legs[1].segments.length === 2) {
				return transf.flight.legs[0].segments[0].aircraft.uid === transf.flight.legs[0].segments[1].aircraft.uid || transf.flight.legs[1].segments[0].aircraft.uid === transf.flight.legs[1].segments[1].aircraft.uid
			}
			if ((transf.flight.legs[0].segments.length === 1 && transf.flight.legs[1].segments.length === 2)) {
				return transf.flight.legs[1].segments[0].aircraft.uid === transf.flight.legs[1].segments[1].aircraft.uid
			}
			if ((transf.flight.legs[0].segments.length === 2 && transf.flight.legs[1].segments.length === 1)) {
				return transf.flight.legs[0].segments[0].aircraft.uid === transf.flight.legs[0].segments[1].aircraft.uid
			}
		})]
	}
	return sortedArrByTransfers;
}

export const uniqueFiltered = (arr) => {
	return arr.filter((v, i, a) => a.findIndex(t => (t.flight.carrier.caption === v.flight.carrier.caption && t.flight.price.total.amount === v.flight.price.total.amount)) === i)

}

export const sortByPortion = (arr, portion) => {
	let sortedByPortionArray = [];

	for (let i = 0; i < portion; i++) {

		if (arr[i] !== undefined) {
			sortedByPortionArray = [...sortedByPortionArray, arr[i]]
		} else {
			return sortedByPortionArray
		}
	}

	return sortedByPortionArray
}

export const convertDateToTime = (date) => {
	return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`
}
export const convertDateToDate = (date) => {
	let days = [
		'вс',
		'пн',
		'вт',
		'ср',
		'чт',
		'пт',
		'сб'
	];
	var d = new Date(date);
	var n = d.getDay();

	return `${new Date(date).toLocaleString('ru-RU', { month: 'short', day: 'numeric' })} ${days[n]}`
}

export const convertNumberToTime = (endDate, startDate) => {

	let endDateR = Date.parse(endDate);
	let startDateR = Date.parse(startDate);
	let diff = endDateR - startDateR;

	return `${new Date(diff).getHours()} ч ${new Date(diff).getMinutes()} мин`
}
