import { combineReducers } from "redux";
import friendsReducer from "./friends-and-wannabees/slice.js";

const rootReducer = combineReducers({
    friendsAndWannabees: friendsReducer,
});

export default rootReducer;
