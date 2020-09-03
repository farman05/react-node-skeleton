import { createStore, applyMiddleware,compose } from "redux";
import rootReducer from "./reducers";
import Thunk from "redux-thunk";

const allStoreEnhancer = compose(
    applyMiddleware(Thunk),
    // composeWithDevTools()

    // window.devToolsExtension && window.devToolsExtension()

)

const store = createStore(rootReducer, allStoreEnhancer);

export default store;
