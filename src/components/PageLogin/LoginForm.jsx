import React from "react";
import LoginSwitch from "./LoginSwitch";
import InputField from "../InputField/InputField";
import "./LoginForm.css";

const Form = ({data, account, error, errorM, onSubmit, handleInput, handleBlur}) => {

    const handleSubmit = (e) => {

        // const{onSubmit, account} = this.props;

        e.preventDefault();
        onSubmit(account);
    }

    const errorText =  errorM && <div className="error label-container">{errorM}</div>

    const result = <div className="login-container login-width shadow">
            <LoginSwitch />
        
            {errorText}
            <form onSubmit={handleSubmit}>
                <div className="display-grid grid-col-3">
                    {data && data.map(function(data) {

                        return(
                            <InputField
                                key={data.name}
                                // vertical={true}
                                value={account[data.name] || ""}
                                errorM={error[`${data.name}Error`]}
                                {...data}
                                //onSubmit={handleOnSubmit} 
                                onChange={handleInput} 
                                onBlur={handleBlur}
                                // {...inputProps}
                            />
                        );
                })}
                </div>

                <button type="submit" className="login-btn">
                    <div>SAVE</div>
                </button>

            </form>
        </div>

    return(result);
}

export default Form;