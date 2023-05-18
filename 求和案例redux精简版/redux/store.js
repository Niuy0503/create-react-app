import { legacy_createStore as createStore } from "redux";
import countReducer from './count_reducer'

const store = createStore(countReducer)

export default store