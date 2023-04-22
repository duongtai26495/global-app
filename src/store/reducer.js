import { CHANGE_DARK_MODE, DARKMODE, LIGHT, RESULT_NATION, UPDATE_LOADING, UPDATE_RESULT } from "../config/constants";


const initState = {
    localDarkmode: window.localStorage.getItem(DARKMODE) ?? LIGHT,
    result_nation: JSON.parse(window.localStorage.getItem(RESULT_NATION)) ?? [],
    page_loading: false
}

function reducer(state, action) {
    switch (action.type) {
        case CHANGE_DARK_MODE:
            return {
                ...state,
                localDarkmode: action.payload
            }
        case UPDATE_RESULT:
            return {
                ...state,
                result_nation: action.payload
            }
        case UPDATE_LOADING:
            return {
                ...state,
                page_loading: action.payload
            }
        default:
            throw new Error("Action is wrong")
    }
}


export { initState };
export default reducer;