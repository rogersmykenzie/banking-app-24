//initialState
const initialState = {
    username: '',
    balance: null,
    name: ''
}
//constants
const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_BALANCE = 'UPDATE_BALANCE';
const UPDATE_NAME = 'UPDATE_NAME';
//action creators
export function updateUsername(username) {
    return {
        type: UPDATE_USERNAME,
        payload: username
    }
}
export function updateBalance(balance) {
    return {
        type: UPDATE_BALANCE,
        payload: balance
    }
}
export function updateName(name) {
    return {
        type: UPDATE_NAME,
        payload: name
    }
}
//reducer
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case UPDATE_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case UPDATE_BALANCE:
            return {
                ...state,
                balance: action.payload
            }
        case UPDATE_NAME:
            return {
                ...state,
                name: action.payload
            }
        default: return state;
    }
}