import React, { useContext, useState } from "react";
import LoginForm from "./LoginForm";
import { APP_PAGE, INPUT_LOGIN } from "../../scripts/constants";
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
       
        const errorCheck = checkErrorBeforeSave();

        if(!errorCheck) {

            try {
            
                const accountData = await loginUser(email, password);
    
                if(accountData) {
        
                    setAppAccount(accountData);
                    setAppPage(APP_PAGE.PAGE_HOME);
                   
                }
            }
            catch(error) {
                setErrorM(error.error);
            }
        }
    }

    const loginData = [
        {label: "E-Mail", type: "text", name: INPUT_LOGIN.LOGIN_EMAIL},
        {label: "Password", type: "password", name: INPUT_LOGIN.LOGIN_PASSWORD},
    ];

    const result =  <LoginForm 
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

