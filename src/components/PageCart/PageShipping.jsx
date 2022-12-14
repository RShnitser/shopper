import React, { useState, useEffect, useContext } from "react";
import { INPUT_SHIPPING, APP_PAGE } from "../../scripts/constants";
import InfoForm from "./InfoForm";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { fetchCheckoutToken, fetchCountries, fetchRegions} from "../../scripts/services";
import useInputValidations from "../../hooks/UseInputValidations";
import { AppContext } from "../ShopperApp/ShopperApp";

const INIT_SHIPPING = {
    title: "",
    name: "",
    address: "",
    zip: "",
    country: "",
    city: "",
    state: "",
    phone: "",
}

const PageShipping = () => {

    const [shipping, setShipping] = useState(INIT_SHIPPING);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const [errorM, setErrorM] = useState(undefined);
    const [countries, setCountries] = useState([]);
    const [regions, setRegions] = useState([]);
    const [shippingMethods, setShippingMethods] = useState([]);
    const [shippingMethod, setShippingMethod] = useState(null);

    const {cart, setAppPage, setCheckout, setAppShipping, setAppShippingMethod} = useContext(AppContext);

    const [handleInput, handleBlur, checkErrorBeforeSave] = useInputValidations(shipping, error, setShipping, setError, setErrorM);

    useEffect(() => {
        
        const fetchData = async () => {

            try {
               
                const resToken = await fetchCheckoutToken(cart.id)
              
                if(resToken && resToken.response.ok) {

                    const tokenData = resToken.data;
                    setCheckout(tokenData);
                    setShippingMethods(tokenData.shipping_methods);
                    setShippingMethod(tokenData.shipping_methods[0]);

                    const countryRes = await fetchCountries(resToken.data.id);

                    if(countryRes && countryRes.response.ok) {
                     
                        const countryData = countryRes.data.countries;
                        
                        const countryArray = [];
                        for(const key of Object.keys(countryData)) {
                       
                            countryArray.push(key);
                        }

                        setCountries(countryArray);

                        const regionRes = await fetchRegions(resToken.data.id, countryArray[0]);

                        if(regionRes && regionRes.response.ok) {
                            
                            const regionData = regionRes.data.subdivisions;
                        
                            const regionArray = [];
                            for(const key of Object.keys(regionData)) {
                            
                                regionArray.push(key);
                            }
    
                            setRegions(regionArray);

                            setShipping( (prevData) => {
                                return { 
                                    ...prevData, 
                                    country: countryArray[0],
                                    state: regionArray[0],
                                }
                            });


                            setLoading(false);
                        }
                    }
        
            
                }
                else {
                    setLoading(false);
                }
            }
            catch(error) {
                setLoading(false);
                setErrorM(error.error)
            }
        }

        fetchData();

    }, [cart.id, setCheckout]);

    useEffect(() => {
        setAppShippingMethod(shippingMethod);
    }, [shippingMethod, setAppShippingMethod])

    const onHandleBack = () => {
        setAppPage(APP_PAGE.PAGE_CART);
    }

    const handleShippingMethod = ({target: {value}}) => {

        const result = shippingMethods.find(function(method) {
            return method.id === value;
        });
       
        setShippingMethod(result);
    }

    const handleOnSubmit = () => {

        const errorCheck = checkErrorBeforeSave();

        if(!errorCheck) {
            setAppShipping(shipping);
            setAppShippingMethod(shippingMethod);
            setAppPage(APP_PAGE.PAGE_PAYMENT);
        }

    }

    const mapData = (data) => {

        const labels = data && data.map(function(item) {

            let result = <InputField
                key={item.label}
                value={shipping[item.name] || ""}
                errorM={error[`${item.name}Error`]}
                {...item}
                onChange={handleInput}
                onBlur={handleBlur}
            />;

            return (result);
         });

        return labels;
    }

    const mapShippingMethods = () => {

        const result = shippingMethods && shippingMethods.map(function(item) {
         
            return(
                <React.Fragment key={item.id}>
                    <label>
                        <input 
                            type="radio"
                            name="shipping-method"
                            value={item.id}
                            checked={shippingMethod.id === item.id}
                            onChange={handleShippingMethod}
                        />
                    </label>
                    <div className="label-text">{item.description}</div>
                    <div className="label-text">{item.price.formatted_with_symbol}</div>
                </React.Fragment>
            );
        })

        return result;
    }

    let result = null;
    
    if(loading) {
        result = <div>Loading...</div>;
    }
    else {
           
        const shipData = [
            {label: "Address Title", type: "text", name: INPUT_SHIPPING.SHIPPING_TITLE},
            {label: "Name-Surname", type: "text", name: INPUT_SHIPPING.SHIPPING_NAME},
            {label: "Your Address", type: "text", name: INPUT_SHIPPING.SHIPPING_ADDRESS},
            {label: "Zip Code", type: "text", name: INPUT_SHIPPING.SHIPPING_ZIP},
            {label: "Country", type: "option", name: INPUT_SHIPPING.SHIPPING_COUNTRY, children: countries},
            {label: "City", type: "text", name: INPUT_SHIPPING.SHIPPING_CITY},
            {label: "State", type: "option", name: INPUT_SHIPPING.SHIPPING_STATE, children: regions},
            {label: "Telephone", type: "tel", name: INPUT_SHIPPING.SHIPPING_PHONE},
        ];

        const buttonNext = <Button 
            text="CHECKOUT"
            onClick={handleOnSubmit}
        />

        const buttonBack =  <Button 
            text="BACK TO CART"
            className="product-button"
            onClick={onHandleBack}
        />

        result = <InfoForm 
            progress={1} 
            buttonBack={buttonBack} 
            buttonNext={buttonNext}
            errorM={errorM}
        >
        
        <h2 className="bold">Shipping Information</h2>
        <div className="display-grid grid-col-3">
            {mapData(shipData)}
        </div>
        <h2 className="bold">Shipping Method</h2>
        <div className="display-grid grid-col-3">
            {mapShippingMethods()}
        </div>
       
    
        </InfoForm>;
    }

    return(result);

}

export default PageShipping;