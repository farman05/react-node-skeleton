import { FLASH_MESSAGE, SHOW_LOADER, BUTTON_DISABLED } from "../type";
import { apiCall } from "../../../helpers";

export function flashMessage(payload) {
    return {
        type: FLASH_MESSAGE,
        payload,
    };
}

export const enableDisableBtn = (payload) => {
    return {
        type: BUTTON_DISABLED,
        payload,
    };
};

export const showLoader = (payload) => {
    return {
        type: SHOW_LOADER,
        payload,
    };
};

export function commonCall(
    dispatchAction,
    apiName,
    method,
    sendData = {},
    btnName = "",
    isModal = false,
    loaderName = ""
) {
    return async (dispatch) => {
        function onSuccess(data, msg = "") {
            dispatch(dispatchAction(data));
            setFlashMessage(dispatch, method, true, msg, false);
            btnData(dispatch, btnName, false, true);
        }
        try {
            btnData(dispatch, btnName, true, false);
            if (loaderName) {
                dispatch(showLoader({ loader: true, loaderName: loaderName }));
            }
            let apiRes = await apiCall(apiName, method, sendData);
            const { msg, status, data, err } = apiRes;
            if (status) {
                onSuccess(data, msg);
            } else {
                btnData(dispatch, btnName, false);
                setFlashMessage(
                    dispatch,
                    method,
                    false,
                    ErrMsg(err, msg),
                    isModal
                );
            }
            dispatch(showLoader({ loader: false, loaderName: "" }));
        } catch (e) {
            console.log(e);
            btnData(dispatch, btnName, false);
            dispatch(showLoader({ loader: false, loaderName: "" }));

            setFlashMessage(dispatch, method, false, e.message, isModal);
        }
    };
}

const setFlashMessage = (dispatch, method, success, msg, isModal=false) => {
    if (method == "post" || !success) {
        dispatch(
            flashMessage({
                className: success ? "alert-success" : "alert-danger",
                msg: msg,
                isModal:isModal
            })
        );
    }
};

export const btnData = (
    dispatch,
    btnName,
    disabled = false,
    success = false
) => {
    if (btnName) {
        const data = {
            btnName: btnName,
            disabled: disabled,
            success: success,
        };
        dispatch(enableDisableBtn(data));
    }
};

const ErrMsg = (err, msg) => {
    if (err) {
        err = Array.isArray(err) ? err.join(", ") : err;
    }

    return msg + " " + (err ? err : "");
};
