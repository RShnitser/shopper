import React, { useState, useEffect, useCallback } from "react";
import { fetchCategories, fetchProducts } from "../../scripts/services";
import "./PageHome.css";

const PageHome = () => {

    // state = {
    //     loading: true,
    //     error: false,
    //     products: [],
    //     categories: [],
    //     params: {
    //         query: "",
    //         category_id: "",
    //     }
    // }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [params, setParams] = useState({query: "", category_id: ""});

    const searchProducts = useCallback(async () => {
        
        //const params = this.state.params;
        const paramsCopy = {};

        for(const key of Object.keys(params)) {
             if(params[key].length > 0) {
                 paramsCopy[key] = params[key];
             }
        }

        try {
            
            const result = await fetchProducts(paramsCopy);

          
            if(result && result.response.ok) {
    
                const data = result.data.products;

                // this.setState({
                //     products: data,
                // });
                setProducts(data);
            }
        }
        catch {
           
            // this.setState({
            //     products: [],
            // });
            setProducts([]);
        }
    }, [params]);

    useEffect(() => {
        
        const fetchData = async () => {

            try {
                const products = fetchProducts();
                const categories = fetchCategories();
    
                const [resProd, resCat] = await Promise.all([products, categories]);
        
              
                if(resProd && resProd.response.ok && resCat && resCat.response.ok) {
        
                    const prodData = resProd.data.products;
                    const catData = resCat.data;
    
                    
                    // this.setState({
                    //     products: prodData,
                    //     categories: catData,
                    //     loading: false
                    // });
                    setProducts(prodData);
                    setCategories(catData);
                    setLoading(false);
                }
                else {
                    // this.setState({
                    //     loading: false
                    // });
                    setLoading(false);
                }
            }
            catch(error) {
                //console.error(error);
                // this.setState({
                //     loading: false,
                //     error: true,
                // });
                setLoading(false);
                setError(true);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const search = async () => {
            await searchProducts();
        }
        search();
    },[params, searchProducts]);

    const handleOnSubmit = async (e) => {
    
        e.preventDefault();
        await searchProducts();
    }

    const handleOnChange = ({target: {name, value}}) => {

        // this.setState(function(prevState){
                
        //     return({
        //         //...prevState,
        //         params: {
        //             ...prevState.params,
        //             [name]: value,
        //         }
        //     });
        // });  
        setParams({...params, [name] : value}); 
    }

    //render() {

        //const{ loading, products, categories, params} = this.state;

        let display;

        if(loading) {
            display = <div>Loading...</div>;
        }
        else {
            display = products && products.map(function(product) {
                // return <div key={product.name}>{product.name}</div>;
                return <Product key={product.name} product={product} />;
            });

            if(products && products.length === 0) {
                display = <div>No results to display</div>
            }
        }

        const result =  <div className="center-container shadow">
        <div className="home-nav">
            <div>Shopper</div>

            <form onSubmit={handleOnSubmit}>
                <select name="category_id" onChange={handleOnChange}>
                    <option value="">All</option>
                    {categories && categories.map(function(category){
                        return(<option key={category.id} value={category.id}>{category.name}</option>);
                    })}
                </select>

                <label htmlFor="search">
                    <input type="text" id="search" name="query" value={params.query} onChange={handleOnChange}/>
                </label>

                <button type="submit" onClick={searchProducts}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>

            <ul>
                <li>Sign In</li>
                <li>Create Account</li>
            </ul>

            <div><i className="fa-solid fa-cart-shopping"></i></div>
        </div>
        {display}
    </div>

        return(result);
    //}
}

const Product = (props) => {

const {product: {image, name, description}} = props;

 const result = <>
    <div>
        <img src={image} alt="product" />
    </div>
    <div>{name}</div>
    <div>{description}</div>
 </>

 return result;
}

export default PageHome;