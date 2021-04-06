import { types } from "./types";

export const setSocketIO = (socket) => ({
    type: types.setSocket,
    payload: socket
});