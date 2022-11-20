import React, { useState, useEffect, useContext } from "react";
import { INPUT_SHIPPING } from "../../scripts/constants";
import InfoForm from "./InfoForm";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { fetchCheckoutToken } from "../../scripts/services";
import { AppContext } from "../ShopperApp/ShopperApp";

const INIT_SHIPPING = {
    title: "",
    name: "",
    address: "",
    zip: "",
    country: "",
    city: "",
    state: "",
    //cell: "",
    phone: "",
}

const PageShipping = () => {

    const [shipping, setShipping] = useState(INIT_SHIPPING);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});

    const {cart} = useContext(AppContext);

    useEffect(() => {
        
        const fetchData = async () => {

            try {
                // const checkoutTokenRes = await fetchCheckoutToken(cart.id)
                // const categories = fetchCategories();
              
    
             
             
                // if(resProd && resProd.response.ok && resCat && resCat.response.ok) {
        
                //     const prodData = resProd.data.products;
                //     const pagination = resProd.data.pagination;
                //     const catData = resCat.data;
                  
                //     setProducts(prodData);
                //     setPagination(pagination);
                //     setCategories(catData);
                //     setLoading(false);
                // }
                // else {
                //     setLoading(false);
                // }
            }
            catch(error) {
                setLoading(false);
                setError(true);
            }
        }

        fetchData();

    }, []);

    const mapData = (data) => {

        //const {error} = this.state;
       
        //const onChange = this.handleOnChange;
        //const onBlur = this.handleBlur;

        const labels = data && data.map(function(item) {

            let result = <InputField
                key={item.label}
                value={shipping[item.name] || ""}
                errorM={error[`${item.name}Error`]}
                {...item}
                //onChange={onChange}
                //onBlur={onBlur}
            />;

            return (result);
         });

        return labels;
    }

    const countries = ["USA"];
    const regions = ["NY"];

    const shipData = [
        {label: "Address Title", type: "text", name: INPUT_SHIPPING.SHIPPING_TITLE},
        {label: "Name-Surname", type: "text", name: INPUT_SHIPPING.SHIPPING_NAME},
        {label: "Your Address", type: "text", name: INPUT_SHIPPING.SHIPPING_ADDRESS},
        {label: "Zip Code", type: "text", name: INPUT_SHIPPING.SHIPPING_ZIP},
        {label: "Country", type: "option", name: INPUT_SHIPPING.SHIPPING_COUNTRY, children: countries},
        {label: "City", type: "text", name: INPUT_SHIPPING.SHIPPING_CITY},
        {label: "State", type: "option", name: INPUT_SHIPPING.SHIPPING_STATE, children: regions},
        {label: "Telephone", type: "tel", name: INPUT_SHIPPING.SHIPPING_PHONE},
        // {label: "Cell Phone", type: "tel", name: INPUT_SHIPPING.SHIPPING_CELL},
    ];

    const nextButton = <Button 
        text="CHECKOUT"
        //onClick={onHandleNextPage}
    />

    const result = <InfoForm button={nextButton}>
       
    {mapData(shipData)}
    <Button 
        text="HOME"
        //onClick={onHandleBack}
    />
  
    </InfoForm>;

    return(result);

}

export default PageShipping;