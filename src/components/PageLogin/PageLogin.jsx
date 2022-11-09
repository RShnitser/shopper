import React from "react";
import { INPUT_LOGIN } from "../../scripts/constants";
import Form from "../Form/Form";

const PageLogin = () => {

    const loginData = [
        {label: "E-Mail", type: "text", name: INPUT_LOGIN.LOGIN_EMAIL},
        {label: "Password", type: "password", name: INPUT_LOGIN.LOGIN_PASSWORD},
    ];

    const result =  <Form 
        // currentPage={currentPage}
        // setData={setData}
        // onSubmit={this.handleOnSubmit} 
        // handleInput={this.handleInput} 
        // handleBur={this.handleBlur}
        data={loginData} 
        // account={account}
        // error={error}
        // errorM={errorM} 
    />

    return(result);
}

export default PageLogin;

