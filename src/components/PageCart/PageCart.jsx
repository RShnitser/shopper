import React, {useContext} from "react";
import { AppContext } from "../ShopperApp/ShopperApp";
import CartItem from "./CartItem";
import InfoForm from "./InfoForm";

const PageCart = () => {

    //const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(false);
    //onst [cart, setCart] = useState({});

    const {cart} = useContext(AppContext);

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

    const mapProducts = () => {

        const items = cart.line_items && cart.line_items.map(function(product) {
            //return <Product key={product.name} product={product} onClick={() => {}}/>;
            return <CartItem key={product.name} product={product}/>;
        });
    
        const result = <div className="product-grid">
            {items}
        </div>
    
        return(result);
    }

    const result = <InfoForm progress={1}>
        {mapProducts()}
    </InfoForm>;

    return(result);
}

export default PageCart;