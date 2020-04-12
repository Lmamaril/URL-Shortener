import { combineReducers } from "redux";
import urls from './urlReducer';
import provideStatus from './feedbackReducer';

export default combineReducers({
    urlLinks: urls, // long url/short url
    feedback: provideStatus
});
