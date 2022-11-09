import React, { useContext } from "react";
import { APP_PAGE } from "../../scripts/constants";
import { PageContext } from "../ShopperApp/ShopperApp";

const LoginSwitch = () => {

    const {currentPage, setAppPage} = useContext(PageContext);

    // const result = <PageContext.Consumer>
    //     {(currentPage, setAppPage) => {

             const handleOnChange = ({target : {value}}) => {

                // const { setData } = this.props;
                // setData(STATE_DATA.STATE_PAGE, value);
                setAppPage(value);
            }

            const buttonData = [
                // {label: "SIGN IN", key: "login", defaultChecked: currentPage === APP_PAGE.PAGE_LOGIN, value: APP_PAGE.PAGE_LOGIN},
                // {label: "CREATE ACCOUNT", key: "create", defaultChecked: currentPage === APP_PAGE.PAGE_CREATE, value: APP_PAGE.PAGE_CREATE},
                {label: "SIGN IN", value: APP_PAGE.PAGE_LOGIN},
                {label: "CREATE ACCOUNT", value: APP_PAGE.PAGE_CREATE},
            ];
        
            const result = <div className="display-flex">
                {buttonData.map(function(data) {
                    return(
                        <label className={data.defaultChecked ? "label-horizontal error" : "label-horizontal"}  key={data.label}>
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
        
            // return(display);

        // }}
    // </PageContext.Consumer>

    return(result);
}

export default LoginSwitch;