import React, {useState, useContext} from "react";
import LoginForm from "./LoginForm";
import { APP_PAGE, INPUT_LOGIN } from "../../scripts/constants";
import { createUser } from "../../scripts/services";
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

    const {setAppPage, setAppAccount} = useContext(AppContext);

    const [handleInput, handleBlur, checkErrorBeforeSave] = useInputValidations(account, error, setAccount, setError, setErrorM);


    const handleOnSubmit = async ({email, password, firstName, lastName, zip}) => {

        const errorCheck = checkErrorBeforeSave();

        if(!errorCheck) {

            try {
            
                const accountData = await createUser(email, password, firstName, lastName, zip);
    
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