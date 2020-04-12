import { GENERATE_URLS } from '../actions'
export default function urls(state = {
    displayLongUrl: "",
    displayShortUrl: ""
}, action) {
    switch (action.type) {
        case GENERATE_URLS: {
            return { ...state, 
                displayLongUrl: action.payload.displayLongUrl, 
                displayShortUrl: action.payload.displayShortUrl 
            }
                         }
        default:
            return state;
    }
}