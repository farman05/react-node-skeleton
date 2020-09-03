import { FLASH_MESSAGE, SHOW_LOADER, BUTTON_DISABLED } from "../type";
const initialState = {
    flash: false,
    disabled: false,
    btnName: "",
    success: false,
    loader: false,
    loaderName: "",
};
function globalReducer(state = initialState, action) {
    switch (action.type) {
        case FLASH_MESSAGE:
            return { ...state, flash: action.payload };
        case SHOW_LOADER:
            const { loader, loaderName } = action.payload;
            return { ...state, loader, loaderName };
        case BUTTON_DISABLED:
            const {
                disabled = false,
                btnName = "",
                success = false,
            } = action.payload;
            return {
                ...state,
                disabled: disabled,
                btnName: disabled ? btnName : "",
                success: success,
            };
        default:
            return state;
    }
}

export default globalReducer;
