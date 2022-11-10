import React, { useContext, useState } from "react";
import LoginForm from "./LoginForm";
import { APP_PAGE, INPUT_LOGIN } from "../../scripts/constants";
import { validateEmail } from "../../scripts/validations";
import { AppContext } from "../ShopperApp/ShopperApp";
import { loginUser } from "../../scripts/services";

const INIT_ACCOUNT = {
    email: "",
    password: "",
}

const PageLogin = () => {

    const [account, setAccount] = useState(INIT_ACCOUNT);
    const [errorM, setErrorM] = useState(undefined);
    const [error, setError] = useState({});

    const {setAppPage} = useContext(AppContext);

    const handleOnSubmit = ({email, password}) => {
       
        //const {setData} = this.props;
        const errorCheck = checkErrorBeforeSave();

        if(!errorCheck) {

            if(loginUser(email, password))
            {
                //setData(STATE_DATA.STATE_PAGE, PAGE_TYPE.PAGE_CART);
                setAppPage(APP_PAGE.PAGE_CART);

            }
            else {
                setErrorM("Invalid Username or Password");
            }
        }
    }

    const handleInput = ({target: {name, value}}) => {

        // this.setState(function(prevState) {
        //     return {
        //         account: {
        //             ...prevState.account,
        //             [name]: value,
        //         }};
        //     });
        setAccount({
            ...account,
            [name]: value,
        });
    }

    const handleBlur = ({target: {name, value}}) => {
        
        const errorText = handleValidations(name, value);

        let errorValue = {...error};

        let errorKey = `${name}Error`;

        if(errorText) {
            errorValue[errorKey] = errorText;
        }
        else {
            delete errorValue[errorKey];
        }

        // this.setState({
        //     error: errorValue,
        // })

        setError(errorValue);
    }

    const handleValidations = (type, value) => {

        let errorText;
      
        switch(type) {
            
            case INPUT_LOGIN.LOGIN_EMAIL:
                errorText = validateEmail(value);
            break;
           
            default:
            break;
        }

        return errorText;
    }

    const checkErrorBeforeSave = () => {
        
        //const {account} = this.state;
        let errorValue = {};
        let isError = false;

        for(const key of Object.keys(account)) {
            
            let errorKey = `${key}Error`;
            
            if(!account[key].length) {

                errorValue = {...errorValue, [errorKey]: "Required"};
                isError = true;
            }
            else {
                const errorText = handleValidations(key, account[key]);

                if(errorText) {
                    errorValue = {...errorValue, [errorKey]: errorText};
                    isError = true;
                }
            }
        }

        // this.setState({
        //     error: errorValue,
        //     errorM: undefined,
        // });
        setError(errorValue);
        setErrorM(undefined);

        return isError;
    }

   

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

