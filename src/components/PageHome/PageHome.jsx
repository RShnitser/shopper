import React, { useState, useEffect, useCallback, useContext } from "react";
import { fetchCategories, fetchProducts } from "../../scripts/services";
import Pagination from "./Pagination";
import DropDown, {DropDownItem} from "./DropDown";
import Products, {ProductLarge} from "./Product";
import SearchBar from "./SearchBar";
import { AppContext } from "../ShopperApp/ShopperApp";
import { APP_PAGE } from "../../scripts/constants";
import "./PageHome.css";

const PageHome = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    //const [cart, setCart] = useState({});
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [categories, setCategories] = useState([]);
    const [params, setParams] = useState({query: "", category_id: "", page: ""});
    const [selectedProduct, selectProduct] = useState(null);

    const {setAppPage, cart, setCart} = useContext(AppContext);

    const setProductData = (products, pagination) => {
        setProducts(products);
        setPagination(pagination);
        selectProduct(null);
    }

    const searchProducts = useCallback(async () => {
        
        const paramsCopy = {};

        for(const key of Object.keys(params)) {
            if(params[key].length > 0) {
                 paramsCopy[key] = params[key];
             }
        }

        try {
            
            const result = await fetchProducts(paramsCopy);

          
            if(result && result.response.ok) {
    
                const products = result.data.products;
                const pagination = result.data.pagination;

                return({products: products, pagination: pagination});
            }
        }
        catch {
           
            return({products: [], pagination: {}});
        }
    }, [params]);

    useEffect(() => {
        
        const fetchData = async () => {

            try {
                const products = fetchProducts();
                const categories = fetchCategories();
                //const cartParam = getCart(cart.id);
    
                const [resProd, resCat] = await Promise.all([products, categories]);
             
                if(resProd && resProd.response.ok && resCat && resCat.response.ok) {
        
                    const prodData = resProd.data.products;
                    const pagination = resProd.data.pagination;
                    const catData = resCat.data;
                    //const cartData = resCart.data;
                    
                    //setCart(cartData);
                    setProducts(prodData);
                    setPagination(pagination);
                    setCategories(catData);
                    setLoading(false);
                }
                else {
                    setLoading(false);
                }
            }
            catch(error) {
                setLoading(false);
                setError(true);
            }
        }

        fetchData();

    }, []);

    useEffect(() => {

        const search = async () => {
            const result = await searchProducts();
            setProductData(result.products, result.pagination);
        }
        
        search();

    },[params, searchProducts]);

    const handleOnSubmit = async (e) => {
    
        e.preventDefault();
        const result = await searchProducts();
        setProductData(result.products, result.pagination);
    }

    const handleOnChange = ({target: {name, value}}) => {

        setParams((prevParams) => {
            return {...prevParams, [name] : value, page: ""};
        });
    }

    const setPage = (number) => {
        //setParams({...params, page : String(number)}); 
        setParams((prevParams) => {
            return {...prevParams, page: String(number)};
        });
    };


    let result = null;
    
    if(loading) {
        result = <div>Loading...</div>;
    }
    else if(error) {
        result = <div>Error</div>;
    }
    else {
        let display = null;
        let itemCount = null;
        let pages = null;

        if(cart.total_items) {
            itemCount = <div className="cart-count">{cart.total_items}</div>
        }
        if(products && products.length === 0) {
            display = <div>No results to display</div>
        }
        else if(selectedProduct) {
            display = <ProductLarge cartId={cart.id} product={selectedProduct} setCart={setCart}/>;
        }
        else {

            // display = products && products.map(function(product) {
            //     return <Product key={product.name} product={product} onClick={() => {selectProduct(product)}}/>;
            // });

            display = <Products products={products} selectProduct={selectProduct} />;

            pages = <Pagination totalPages={pagination.total_pages} currentPage={pagination.current_page} changePage={setPage} />;
        }
        
        // const setPage = React.useContext(PageContext);

        result =  <div >
        <div className="nav-container display-flex">
            <div className="nav-title">Shopper</div>

            <SearchBar categories={categories} query={params.query} handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit}/>

            <DropDown title={"Sign In"}>
                <DropDownItem  label={"Sign In"} onClick={() => {setAppPage(APP_PAGE.PAGE_LOGIN)}}/>
                <DropDownItem label={"Create Account"} onClick={() => {setAppPage(APP_PAGE.PAGE_CREATE)}}/>
            </DropDown>
           {/* <AppContext.Consumer>
               {({setAppPage}) => (
                <DropDown title={"Sign In"}>
                    <DropDownItem  label={"Sign In"} onClick={() => {setAppPage(APP_PAGE.PAGE_LOGIN)}}/>
                    <DropDownItem label={"Create Account"} onClick={() => {setAppPage(APP_PAGE.PAGE_CREATE)}}/>
                </DropDown>
               )}
           </AppContext.Consumer> */}

            <div className="cart-icon" onClick={() => {setAppPage(APP_PAGE.PAGE_CART)}}>
                <i className="fa-solid fa-cart-shopping"></i>
                {itemCount}
            </div>
        </div>
        {/* <div className="product-grid">
            {display}
        </div> */}
        {display}
        {pages}
    </div>
    }

    return(result);
}



export default PageHome;