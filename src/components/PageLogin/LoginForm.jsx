import React, { useContext } from "react";
import LoginSwitch from "./LoginSwitch";
import InputField from "../InputField/InputField";
import "./LoginForm.css";
import Button from "../Button/Button";
import { AppContext } from "../ShopperApp/ShopperApp";
import { APP_PAGE } from "../../scripts/constants";

const Form = ({data, account, error, errorM, onSubmit, handleInput, handleBlur}) => {

    const {setAppPage} = useContext(AppContext);

    const handleSubmit = (e) => {

        e.preventDefault();
        onSubmit(account);
    }

    const onHandleBack = () => {

        setAppPage(APP_PAGE.PAGE_HOME);
    }

    const errorText =  errorM && <div className="error label-container">{errorM}</div>

    const result = <div className="login-container shadow">
            <LoginSwitch />
        
            {errorText}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="display-grid grid-col-3">
                    {data && data.map(function(data) {

                        return(
                            <InputField
                                key={data.name}
                                value={account[data.name] || ""}
                                errorM={error[`${data.name}Error`]}
                                {...data}
                                onChange={handleInput} 
                                onBlur={handleBlur}
                            />
                        );
                })}
                </div>

                <button type="submit" className="login-btn">
                    <div>SAVE</div>
                </button>

                <Button 
                    text="CANCEL"
                    className="product-button"
                    onClick={onHandleBack}
                />

            </form>
        </div>

    return(result);
}

export default Form;