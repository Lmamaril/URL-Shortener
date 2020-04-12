import { GENERATE_URLS } from '../actions'

export default function provideStatus(state = { message: "" }, action) {
    switch (action.type) {
        case GENERATE_URLS: {
            return { ...state, 
                message: action.message
            }
        }
        default:
            return state;
    }
}