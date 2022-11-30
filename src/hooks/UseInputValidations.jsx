import { INPUT_LOGIN, INPUT_SHIPPING, INPUT_PAYMENT } from "../scripts/constants";
import { validateEmail, validatePassword, validateSecurityCode, validatePhoneNumber, validateExpirationDate, validateCreditCard } from "../scripts/validations";

const useInputValidations = (data, error, setData, setError, setErrorM) => {

    const handleInput = ({target: {name, value}}) => {
      
        let result = value;
        if(name === INPUT_LOGIN.LOGIN_ZIP || name === INPUT_SHIPPING.SHIPPING_PHONE || name === INPUT_SHIPPING.SHIPPING_ZIP || name === INPUT_PAYMENT.PAYMENT_CVV) {
            result = value.replace(/\D/g, "");
        }
        else if(name === INPUT_LOGIN.LOGIN_FIRST_NAME || name === INPUT_LOGIN.LOGIN_LAST_NAME || name === INPUT_SHIPPING.SHIPPING_NAME || name === INPUT_PAYMENT.PAYMENT_CARDHOLDER) {
            result = value.replace(/[^A-Z]/ig, "");
        }
        else if(name === INPUT_PAYMENT.PAYMENT_NUMBER) {
            const numOnly =  value.replace(/\D/g, "");
            let mask = numOnly.split(" ").join("");
        
            if(mask.length) {
                mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
            
                result = mask;
            }
            else {
              
                result = "";
            }
        }
      
        setData( (prevData) => {
            return { ...prevData, [name]: result,}
        });
    
    }

    const handleBlur = ({target: {name, value}}) => {
        
        const errorText = handleValidations(name, value);

        let errorValue = error;

        let errorKey = `${name}Error`;

        if(name === "expire_m" || name === "expire_y") {
            errorKey = "expireError";
        }

        if(errorText) {
            errorValue[errorKey] = errorText;
        }
        else {
            delete errorValue[errorKey];
        }

       setError(errorValue);
    }

    const findCardType = (cardNumber) => {

        const regexPattern = {
            MASTER_CARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
            VISA: /^4[0-9]{2,}/,
            AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
            DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
        };

        for(const card in regexPattern) {
            if(cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) {
                return card;
            }

        }

        return "";
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
              
                if(data.password !== value) {
                    errorText = "Must match password";
                }

            break;

            case INPUT_LOGIN.LOGIN_ZIP:
                errorText = validateSecurityCode(5, value);
            break;

            case INPUT_SHIPPING.SHIPPING_PHONE:
                errorText = validatePhoneNumber(value);
            break;
            case INPUT_SHIPPING.SHIPPING_CELL:
                errorText = validatePhoneNumber(value);
            break;
            case INPUT_SHIPPING.SHIPPING_ZIP:
                errorText = validateSecurityCode(5, value);
            break;

            case INPUT_PAYMENT.PAYMENT_NUMBER:
              
                setData((prevPayment) => {
                   return({
                        ...prevPayment,
                        cardType: findCardType(value)
                   })
                });
             
                errorText = validateCreditCard(value);
            break;
            case INPUT_PAYMENT.PAYMENT_EXPIRE_M:
                errorText = validateExpirationDate(data.expire_y, data.expire_m);
            break;
            case INPUT_PAYMENT.PAYMENT_EXPIRE_Y:
               
                errorText = validateExpirationDate(data.expire_y, data.expire_m);
            break;
            case INPUT_PAYMENT.PAYMENT_CVV:
                errorText = validateSecurityCode(3, value);
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

            if(key === "expire_m" || key === "expire_y") {
                errorKey = "expireError";
            }
            
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