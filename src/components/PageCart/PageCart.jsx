import React, {useContext} from "react";
import { AppContext } from "../ShopperApp/ShopperApp";

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
            return <div>{product.name}</div>;
        });
    
        const result = <div className="product-grid">
            {items}
        </div>
    
        return(result);
    }

    const result = <div>
        {mapProducts()}
    </div>;

    return(result);
}

export default PageCart;