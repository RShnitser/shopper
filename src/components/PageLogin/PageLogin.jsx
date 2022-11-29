import React, { useContext, useState } from "react";
import LoginForm from "./LoginForm";
import { APP_PAGE, INPUT_LOGIN } from "../../scripts/constants";
//import { validateEmail } from "../../scripts/validations";
import { AppContext } from "../ShopperApp/ShopperApp";
import { loginUser } from "../../scripts/services";
import useInputValidations from "../../hooks/UseInputValidations";

const INIT_ACCOUNT = {
    email: "",
    password: "",
}

const PageLogin = () => {

    const [account, setAccount] = useState(INIT_ACCOUNT);
    const [errorM, setErrorM] = useState(undefined);
    const [error, setError] = useState({});

    const {setAppPage, setAppAccount} = useContext(AppContext);

    const [handleInput, handleBlur, checkErrorBeforeSave] = useInputValidations(account, error, setAccount, setError, setErrorM);

    const handleOnSubmit = async ({email, password}) => {
       
        //const {setData} = this.props;
        const errorCheck = checkErrorBeforeSave();

        if(!errorCheck) {

            // if(loginUser(email, password))
            // {
            //     setAppAccount();
            //     setAppPage(APP_PAGE.PAGE_CART);

            // }
            // else {
            //     setErrorM("Invalid Username or Password");
            // }
            try {
            
                const accountData = await loginUser(email, password);
    
                if(accountData) {
        
                    setAppAccount(accountData);
                    setAppPage(APP_PAGE.PAGE_HOME);
                   
                }
                // else {
                //     setLoading(false);
                // }
            }
            catch(error) {
                setErrorM("Invalid Username or Password");
            }
        }
    }

    // const handleInput = ({target: {name, value}}) => {

    //     setAccount({
    //         ...account,
    //         [name]: value,
    //     });
    // }

    // const handleBlur = ({target: {name, value}}) => {
        
    //     const errorText = handleValidations(name, value);

    //     let errorValue = {...error};

    //     let errorKey = `${name}Error`;

    //     if(errorText) {
    //         errorValue[errorKey] = errorText;
    //     }
    //     else {
    //         delete errorValue[errorKey];
    //     }

    //     setError(errorValue);
    // }

    // const handleValidations = (type, value) => {

    //     let errorText;
      
    //     switch(type) {
            
    //         case INPUT_LOGIN.LOGIN_EMAIL:
    //             errorText = validateEmail(value);
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

   

    const loginData = [
        {label: "E-Mail", type: "text", name: INPUT_LOGIN.LOGIN_EMAIL},
        {label: "Password", type: "password", name: INPUT_LOGIN.LOGIN_PASSWORD},
    ];

    const result =  <LoginForm 
        // currentPage={currentPage}
        // setData={setData}
        onSubmit={handleOnSubmit} 
        handleInput={handleInput} 
        handleBur={handleBlur}
        data={loginData} 
        account={account}
        error={error}
        errorM={errorM} 
       
    />

    return(result);
}

export default PageLogin;

