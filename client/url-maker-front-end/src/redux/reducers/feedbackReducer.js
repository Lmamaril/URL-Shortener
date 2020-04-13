import { UPDATE_FEEDBACK } from '../actions'

export default function provideStatus(state = { message: "" }, action) {
    switch (action.type) {
        case UPDATE_FEEDBACK: {
            console.log("action payload", action.payload)
            return { ...state, 
                message: action.payload
            }
        }
        default:
            return state;
    }
}