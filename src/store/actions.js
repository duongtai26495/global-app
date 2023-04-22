import { CHANGE_DARK_MODE, UPDATE_LOADING, UPDATE_RESULT } from "../config/constants";

export const changeDarkMode = payload => ({
    type:CHANGE_DARK_MODE,
    payload
})

export const updateResult = payload => ({
    type:UPDATE_RESULT,
    payload
})

export const updateLoading = payload => ({
    type:UPDATE_LOADING,
    payload
})