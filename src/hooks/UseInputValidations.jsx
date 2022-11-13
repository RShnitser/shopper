//import React from "react"

import { INPUT_LOGIN } from "../scripts/constants";
import { validateEmail, validatePassword, validateSecurityCode } from "../scripts/validations";

const useInputValidations = (data, error, setData, setError, setErrorM) => {

    const handleInput = ({target: {name, value}}) => {
      
        let result = value;
        if(name === INPUT_LOGIN.LOGIN_ZIP) {
            result = value.replace(/\D/g, "");
        }
        else if(name === INPUT_LOGIN.LOGIN_FIRST_NAME || name === INPUT_LOGIN.LOGIN_LAST_NAME) {
            result = value.replace(/[^A-Z]/ig, "");
        }

        setData( (prevData) => {
            return { ...prevData, [name]: result,}
        });
    
    }

    const handleBlur = ({target: {name, value}}) => {
        
        const errorText = handleValidations(name, value);

        let errorValue = error;

        let errorKey = `${name}Error`;

        if(errorText) {
            errorValue[errorKey] = errorText;
        }
        else {
            delete errorValue[errorKey];
        }

       setError(errorValue);
    }

    const handleValidations = (type, value) => {

        let errorText;
      
        switch(type) {
            
            case INPUT_LOGIN.LOGIN_EMAIL:
                errorText = validateEmail(value);
            break;

            case INPUT_LOGIN.LOGIN_PASSWORD:
                errorText = validatePassword(value);
            break;

            case INPUT_LOGIN.LOGIN_CONFIRM:
                //const {account: {password}} = this.state;
                if(data.password !== value) {
                    errorText = "Must match password";
                }
            break;

            case INPUT_LOGIN.LOGIN_ZIP:
                errorText = validateSecurityCode(5, value);
            break;
           
            default:
            break;
        }

        return errorText;
    }

    const checkErrorBeforeSave = () => {
        
        let errorValue = {};
        let isError = false;

        for(const key of Object.keys(data)) {
            
            let errorKey = `${key}Error`;
            
            if(!data[key].length) {

                errorValue = {...errorValue, [errorKey]: "Required"};
                isError = true;
            }
            else {
                const errorText = handleValidations(key, data[key]);

                if(errorText) {
                    errorValue = {...errorValue, [errorKey]: errorText};
                    isError = true;
                }
            }
        }

        setError(errorValue);
        setErrorM(undefined);

        return isError;
    }

    return [handleInput, handleBlur, checkErrorBeforeSave];

}

export default useInputValidations;