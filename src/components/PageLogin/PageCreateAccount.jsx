import React, {useState, useContext} from "react";
import LoginForm from "./LoginForm";
import { APP_PAGE, INPUT_LOGIN } from "../../scripts/constants";
import { createUser, loginUser } from "../../scripts/services";
//import { validateEmail, validatePassword, validateSecurityCode } from "../../scripts/validations";
import useInputValidations from "../../hooks/UseInputValidations";
import { AppContext } from "../ShopperApp/ShopperApp";

const INIT_ACCOUNT = {
    email: "",
    password: "",
    confirm: "",
    firstName: "",
    lastName: "",
    zip: "",
}


const PageCreateAccount = () => {

    const [account, setAccount] = useState(INIT_ACCOUNT);
    const [errorM, setErrorM] = useState(undefined);
    const [error, setError] = useState({});

    const {setAppPage} = useContext(AppContext);

    const [handleInput, handleBlur, checkErrorBeforeSave] = useInputValidations(account, error, setAccount, setError, setErrorM);


    const handleOnSubmit = ({email, password, firstName, lastName, zip}) => {

        const errorCheck = checkErrorBeforeSave();

        if(!errorCheck) {

            const result = createUser(email, password, firstName, lastName, zip);
            if(result.error === "SUCCESS") {
                if(loginUser(email, password)) {
    
                    setAppPage(APP_PAGE.PAGE_CART);
                }
            }
            else {
                setErrorM("Invalid Username or Password");
            }

        }
    }

    //  const handleInput = ({target: {name, value}}) => {
      
    //     let result = value;
    //     if(name === INPUT_LOGIN.LOGIN_ZIP) {
    //         result = value.replace(/\D/g, "");
    //     }
    //     else if(name === INPUT_LOGIN.LOGIN_FIRST_NAME || name === INPUT_LOGIN.LOGIN_LAST_NAME) {
    //         result = value.replace(/[^A-Z]/ig, "");
    //     }

    //     setAccount({
    //         ...account,
    //         [name]: result,
    //     });
    // }

    // const handleBlur = ({target: {name, value}}) => {
        
    //     const errorText = handleValidations(name, value);

    //     let errorValue = error;

    //     let errorKey = `${name}Error`;

    //     if(errorText) {
    //         errorValue[errorKey] = errorText;
    //     }
    //     else {
    //         delete errorValue[errorKey];
    //     }

    //    setError(errorValue);
    // }

    // const handleValidations = (type, value) => {

    //     let errorText;
      
    //     switch(type) {
    //         case INPUT_LOGIN.LOGIN_EMAIL:
    //             errorText = validateEmail(value);
    //         break;

    //         case INPUT_LOGIN.LOGIN_PASSWORD:
    //             errorText = validatePassword(value);
    //         break;

    //         case INPUT_LOGIN.LOGIN_CONFIRM:
    //             //const {account: {password}} = this.state;
    //             if(account.password !== value) {
    //                 errorText = "Must match password";
    //             }
    //         break;

    //         case INPUT_LOGIN.LOGIN_ZIP:
    //             errorText = validateSecurityCode(5, value);
    //         break;

    //         default:
    //         break;
    //     }

    //     return errorText;
    // }

    // const checkErrorBeforeSave = () => {
        
    //     let errorValue = {};
    //     let isError = false;

    //     for(const key of Object.keys(account)) {
            
    //         let errorKey = `${key}Error`;
            
    //         if(!account[key].length) {

    //             errorValue = {...errorValue, [errorKey]: "Required"};
    //             isError = true;
    //         }
    //         else {
    //             const errorText = handleValidations(key, account[key]);

    //             if(errorText) {
    //                 errorValue = {...errorValue, [errorKey]: errorText};
    //                 isError = true;
    //             }
    //         }
    //     }

    //     setError(errorValue);
    //     setErrorM(undefined);

    //     return isError;
    // }

    const createData = [
        {label: "E-mail", type: "email", name: INPUT_LOGIN.LOGIN_EMAIL},
        {label: "Password", type: "password", name: INPUT_LOGIN.LOGIN_PASSWORD}, 
        {label: "Confirm Password", type: "password", name: INPUT_LOGIN.LOGIN_CONFIRM},
        {label: "First Name", type: "text", name: INPUT_LOGIN.LOGIN_FIRST_NAME},
        {label: "Last Name", type: "text", name: INPUT_LOGIN.LOGIN_LAST_NAME},
        {label: "Zip Code", type: "text", name: INPUT_LOGIN.LOGIN_ZIP},
    ];

    const result =  <LoginForm 
        onSubmit={handleOnSubmit} 
        handleInput={handleInput} 
        handleBur={handleBlur}
        data={createData} 
        account={account}
        error={error}
        errorM={errorM} 
    />

    return(result);
}

export default PageCreateAccount;