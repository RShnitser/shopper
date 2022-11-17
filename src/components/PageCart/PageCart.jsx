import React, {useContext} from "react";
import { APP_PAGE } from "../../scripts/constants";
import Button from "../Button/Button";
import { AppContext } from "../ShopperApp/ShopperApp";
import CartItem from "./CartItem";
import InfoForm from "./InfoForm";
import "./PageCart.css";

const PageCart = () => {

    //const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(false);
    //onst [cart, setCart] = useState({});

    const {setAppPage, cart} = useContext(AppContext);

    // useEffect(() => {
        
    //     const fetchData = async () => {

    //         try {
                
    //             const resCart = await getCart();
    
    //             if(resCart && resCart.response.ok) {
        
    //                 const cartData = resCart.data;
                    
    //                 setCart(cartData);
    //                 setLoading(false);
    //             }
    //             else {
    //                 setLoading(false);
    //             }
    //         }
    //         catch(error) {
    //             setLoading(false);
    //             setError(true);
    //         }
    //     }

    //     fetchData();

    // }, []);

    // const mapHeaders = () => {
        
    //     const headers = ["", "Product", "Price", "Quantity", "Total Price"];

    //     let result = headers.map(function(header) {
    //         return(<div key={`header-${header}`} className="bold">{header}</div>);
    //     });

    //     return result;
    // }

    const onHandleBack = () => {
        setAppPage(APP_PAGE.PAGE_HOME);
    }

    const mapProducts = () => {

        const result = cart.line_items && cart.line_items.map(function(product) {
            //return <Product key={product.name} product={product} onClick={() => {}}/>;
            return <CartItem key={product.name} product={product}/>;
        });
    
        return(result);
    }


    const result = <InfoForm progress={1}>
        <div className="">
            {/* {mapHeaders()} */}
            {mapProducts()}
            <Button 
                text="HOME"
                onClick={onHandleBack}
            />
        </div>
    </InfoForm>;

    return(result);
}

export default PageCart;