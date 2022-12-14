import React, { useContext } from "react";
import { APP_PAGE } from "../../scripts/constants";
import { AppContext } from "../ShopperApp/ShopperApp";

const LoginSwitch = () => {

    const {currentPage, setAppPage} = useContext(AppContext);

    const handleOnChange = ({target : {value}}) => {

        setAppPage(value);
    }

    const buttonData = [
        {label: "SIGN IN", value: APP_PAGE.PAGE_LOGIN},
        {label: "CREATE ACCOUNT", value: APP_PAGE.PAGE_CREATE},
    ];

    const result = <div className="display-flex space-between">
        {buttonData.map(function(data) {
            return(
                <label className={currentPage === data.value ? "label-horizontal text-blue" : "label-horizontal"}  key={data.label}>
                    <input
                        type="radio"
                        name="account"
                        checked={currentPage === data.value}
                        value={data.value}
                        onChange={handleOnChange}
                    />
                    <div className="label-text">{data.label}</div>
                </label>
            );
        })}
    </div>

    return(result);
}

export default LoginSwitch;