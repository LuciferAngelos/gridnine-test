import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import appReducer from './appReducer';
import flightsReducer from './flightsReducer';


let reducers = combineReducers(//функция для объединения редьюсеров и передачи их в стор. Передаём редьюсеры
	{
		app: appReducer,
		flightRaces: flightsReducer
	}
)


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));     //redux store + подключили расширение для хрома Redux DevTools

window.__store__ = store;

export default store;

//детерменированность - если передаём одни и те же данные, то функция должна вернуть один и тот же результат