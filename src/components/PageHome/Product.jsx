import React, {useState} from "react";
import { addToCart } from "../../scripts/services";

export const ProductLarge = ({cartId, product: {id, image, name, price, description}, setCart}) => {

    const [quantity, setQuantity] = useState(1);

    const handleOnChange = ({target: {value}}) => {

        setQuantity(value);
    }

    const handleAddToCart = async () => {
        try {
            const result = await addToCart(cartId, id, quantity);
            
            if(result && result.response.ok) {

                setCart(result.data);
            }
        }
        catch{

        }
    }
    
    const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    
    const result = <div className="product-item display-flex">
         <div className="product-image-large">
            <img src={image} alt="product" />
        </div>
        <div>
            <div className="product-name">{name}</div>
            <div className="product-price">{price}</div>
            <div>{description}</div>
            <div className="display-flex">
                <div className="product-name">{"Quantity: "}</div>
                <select className="product-button" name="quantity" value={quantity} onChange={handleOnChange}>
                    {quantities && quantities.map((number) => {
                        const select = <option key ={`quantity_${number}`} value={number}>
                            {number}
                        </option>

                        return(select);
                    })}
                </select>
            </div>
            <button className="product-button" type="button" onClick={handleAddToCart}>
                <div>Add to Cart</div>
            </button>
        </div>
    </div>

    return(result);
}

const Product = ({product: {image, name, price}, onClick}) => {

 const result = <div className="product-item display-flex product-hover" onClick={onClick}>
    <div className="product-image">
        <img src={image} alt="product" />
    </div>
    <div>
        <div className="product-name">{name}</div>
        <div className="product-price">{price}</div>
    </div>
 </div>

 return(result);
}

export default Product;