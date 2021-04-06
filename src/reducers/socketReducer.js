import { types } from "../actions/types";

const initialState = {}

export const socketReducer = (state = initialState, action) => {
    switch(action.type){
        case types.setSocket:
            return {
                ...state,
                socket: action.payload
            }
        default:
            return state;
    }
}