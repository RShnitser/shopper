import React, { useState, useEffect, useCallback } from "react";
import { fetchCategories, fetchProducts } from "../../scripts/services";
import "./PageHome.css";

const PageHome = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [categories, setCategories] = useState([]);
    const [params, setParams] = useState({query: "", category_id: "", page: ""});
    const [selectedProduct, selectProduct] = useState(null);

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

                setProductData(products, pagination);
            }
        }
        catch {
           
            setProductData(products, pagination);
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
                    const pagination = resProd.data.pagination;
                    const catData = resCat.data;
    
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
            await searchProducts();
        }

        search();

    },[params, searchProducts]);

    const handleOnSubmit = async (e) => {
    
        e.preventDefault();
        await searchProducts();
    }

    const handleOnChange = ({target: {name, value}}) => {

        setParams({...params, [name] : value, page: ""});
    }

    const setPage = (number) => {
        setParams({...params, page : String(number)}); 
    };

    // const onClickProduct = (product) => {

    //     selectProduct(product);
    // }
    //render() {

        //const{ loading, products, categories, params} = this.state;

        let result = null;
        
        if(loading) {
            result = <div>Loading...</div>;
        }
        else {
            let display = null;
            if(products && products.length === 0) {
                display = <div>No results to display</div>
            }
            else if(selectedProduct) {
                // display = null;
                display = <ProductLarge product={selectedProduct} />;
            }
            else {

                display = products && products.map(function(product) {
                    // return <div key={product.name}>{product.name}</div>;
                    return <Product key={product.name} product={product} onClick={() => {selectProduct(product)}}/>;
                });
            }

            const pages = selectedProduct ? null : <Pagination totalPages={pagination.total_pages} currentPage={pagination.current_page} changePage={setPage} />;

            result =  <div className="shadow">
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

                {/* <div className="dropdown-container">
                    <div>
                        <div>Sign In</div>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                    <ul className="dropdown-menu">
                        <li>Sign In</li>
                        <li>Create Account</li>
                    </ul>
                </div> */}
                <DropDown title={"Sign In"}>
                    {/* <li>Sign In</li>
                    <li>Create Account</li> */}
                    <DropDownItem  label={"Sign In"}/>
                    <DropDownItem label={"Create Account"}/>
                </DropDown>

                <div><i className="fa-solid fa-cart-shopping"></i></div>
            </div>
            <div className="product-grid">
                {display}
            </div>
            {pages}
            {/* <Pagination totalPages={pagination.total_pages} currentPage={pagination.current_page} changePage={setPage} /> */}

            {/* <Pagination totalPages={pagination.total_pages} currentPage={pagination.current_page} changePage={handleOnChange} /> */}
        </div>
        }

        return(result);
    //}
}

const DropDown = ({title, children}) => {

    const DROPDOWN_STATE = {
        DROPDOWN_OPEN: "o",
        DROPDOWN_CLOSED: "c",
    };

    const [open, setOpen] = useState(DROPDOWN_STATE.DROPDOWN_CLOSED);

    const handleOnClick = () => {

        

            const openState = open === DROPDOWN_STATE.DROPDOWN_OPEN ? 
                DROPDOWN_STATE.DROPDOWN_CLOSED : 
                DROPDOWN_STATE.DROPDOWN_OPEN;
    
            //console.log("click");
            setOpen(openState);
        

    }

    // const handleMouseEnter = () => {

    //     if(window.innerWidth > 800) {
    //         setOpen(DROPDOWN_STATE.DROPDOWN_OPEN)
    //     }
    // }

    let menu = "open";
    let caret = "down";

    if(open === DROPDOWN_STATE.DROPDOWN_CLOSED) {
        menu = "closed"
        caret = "up";
    }



    const result = <div
        // style={{backgroundColor: "blue"}}
        onClick={handleOnClick}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={() => {setOpen(DROPDOWN_STATE.DROPDOWN_CLOSED)}}
        >
        <div>
            <div>{title}</div>
            <i className={`fa-solid fa-caret-${caret}`}></i>
        </div>
        <ul 
            className={`dropdown-menu ${menu}`}
            // onMouseLeave={() => {setOpen(DROPDOWN_STATE.DROPDOWN_CLOSED)}}
        >
            {children}
        </ul>
    </div>

    return(result);
}

const DropDownItem = ({label, onClick}) => {

    const result = <li>
        <button type="button" onClick={onClick}>
            {label}
        </button>
    </li>

    return result;
}

const Pagination = ({totalPages, currentPage, changePage}) => {

    const Range = (start, end) => {
        
        const result = [];

        for(let i = start; i <= end; i++) {
            result.push(i);
        }
        
        return result;
    }

    let pages = [];
    const siblingCount = 1;
    const pagesShown = 2 * siblingCount + 5;

    const DOTS = {
        DOTS_NONE: 0,
        DOTS_LEFT: 1,
        DOTS_RIGHT: 2,
        DOTS_BOTH: 3,
    }

    let dotType = DOTS.DOTS_NONE;

  

    //const firstPage = 1;
    //const lastPage = totalPages;

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const isLeftDot = leftSibling > 3;
    const isRightDot = rightSibling < totalPages - 2;

    if(pagesShown >= totalPages) {
        dotType = DOTS.DOTS_NONE;  
    }
    else if(!isLeftDot && isRightDot) {
        dotType = DOTS.DOTS_RIGHT;
    }
    else if(isLeftDot && !isRightDot) {
        dotType = DOTS.DOTS_LEFT;
    }
    else {
        dotType = DOTS.DOTS_BOTH;
    }

    switch(dotType) {
        case DOTS.DOTS_NONE:
            pages = Range(1, totalPages);
        break;
        case DOTS.DOTS_RIGHT:
            let leftItemCount = 3 + 2 * siblingCount;
            pages = [...Range(1, leftItemCount), -1, totalPages]
        break;
        case DOTS.DOTS_LEFT:
            let rightItemCount = 3 + 2 * siblingCount;
            pages = [1, -2, ...Range(totalPages - rightItemCount + 1, totalPages)]
        break;
        case DOTS.DOTS_BOTH:
            pages = [1, -2, ...Range(leftSibling, rightSibling), -1, totalPages];
        break;
        default:
        break;
    }

   

    // for(let i = 0; i < totalPages; i++) {
    //     pages.push(String(i + 1));
    // }
    
    //const {value, handleOnChange} = props;

    // const result = <button 
    //     type="button"
    //     //key={`page_${i}`}
    //     name="page"
    //     value={value}
    //     onClick={handleOnChange}
    // >
    //     <div>{value}</div>
    // </button>

    const pageButtons = pages.length && pages.map((page) => {
        
        let button = null;
        if(page > 0) {
            button =  <li key={`page_${page}`}>
                    <PageButton 
                        className={page === currentPage ? "page-button-selected" : ""}
                        label={page}
                        page={page} 
                        changePage={changePage}
                    />
            </li>
        }
        else {
            button = 
            <li key={`page_D${-page}`}>
                &#8230;
                {/* <div key={`page_D${-page}`}>{". . ."}</div> */}
            </li>
        }

            return (button
                // <button 
                //     type="button"
                //     key={`page_${page}`}
                //     // name="page"
                //     // value={page}
                //     onClick={() => {changePage(page)}}
                //     //onClick={changePage}
                // >
                //     <div>{page}</div>
                // </button>
              
    
                  
            );
    
    });

            // <a
            //     type="button"
            //     key={`page_${page}`}
            //     name="page"
            //     value={page}
            //     href="!#"
            //     // onClick={() => {changePage(page)}}
            //     onClick={changePage}
            // >
            //     {page}
            // </a>
            
    const result = <nav>
        <ul>
            <li>
                <PageButton
                    label={"<"}
                    page={currentPage - 1} 
                    changePage={changePage}
                    disabled={currentPage === 1}
                />
            </li>
            {pageButtons}
            <li>
                <PageButton 
                    label={">"}
                    page={currentPage + 1} 
                    changePage={changePage}
                    disabled={currentPage === totalPages}
                />
            </li>
        </ul>
    </nav>
        
    return(result);
}

const PageButton = ({label, page, changePage, ...props}) => {

    const result = <button
        type="button"
        // key={`page_${page}`}
        // name="page"
        // value={page}
        // onClick={changePage}
        // href="!#"
        onClick={() => {changePage(page)}}
        {...props}
    >
        {label}
    </button>

    // const result = <input
    //     type="button"
    //     name="page"
    //     value={page}
    //     onClick={changePage}
    //     {...props}
    // />

    return(result);
}


// const Products = ({products}) => {
  
// }

const ProductLarge = ({product: {image, name, description}}) => {

    const [quantity, setQuantity] = useState(0);

    const handleOnChange = ({target: {value}}) => {

        setQuantity(value);
    }
    
    const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    
    const result = <div>
         <div className="product-image">
            <img src={image} alt="product" />
        </div>
        <div>{name}</div>
        <div>{description}</div>
        <div>{"Quantity: "}</div>
        <select name="quantity" value={quantity} onChange={handleOnChange}>
            {quantities && quantities.map((number) => {
                const select = <option key ={`quantity_${number}`} value={number}>
                    {number}
                </option>

                return(select);
            })}
        </select>
        <button type="button">
            <div>Add to Cart</div>
        </button>
    </div>

    return(result);
}

const Product = ({product: {image, name}, onClick}) => {

//onst {product: {image, name, description}} = props;

 const result = <div onClick={onClick}>
    <div className="product-image">
        <img src={image} alt="product" />
    </div>
    <div>{name}</div>
    {/* <div>{description}</div> */}
 </div>

 return(result);
}

export default PageHome;