import { combineReducers } from "redux";
import friendsReducer from "./friends-and-wannabees/slice.js";
import messageReducer from "./messages/slice.js";

const rootReducer = combineReducers({
    friendsAndWannabees: friendsReducer,
    chatMessages: messageReducer,
});

export default rootReducer;
