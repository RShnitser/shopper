import React from "react";
import InputField from "../InputField/InputField";
import LoginSwitch from "../PageLogin/LoginSwitch";
import "./Form.css";

const Form = ({data, errorText}) => {

    const handleSubmit = (e) => {

        // const{onSubmit, account} = this.props;

        e.preventDefault();
        // onSubmit(account);
    }

    const result = <div className="form-container login-width shadow page-margin-padding">
        <LoginSwitch />
        
            <form onSubmit={handleSubmit}>
                <div className="form-grid grid-columns-3">
                    {errorText}
                    {data.map(function(data) {

                        return(
                            <InputField
                                key={data.name}
                                // vertical={true}
                                // value={account[data.name] || ""}
                                // errorM={error[`${data.name}Error`]}
                                {...data}
                                // {...inputProps}
                            />
                        );
                    })}
                </div>

                <button type="submit" className="form-btn">
                    <div>SAVE</div>
                </button>

            </form>
        </div>

    return(result);
}

export default Form;