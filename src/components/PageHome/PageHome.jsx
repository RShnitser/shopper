import React from "react";
import { fetchCategories, fetchProducts } from "../../services";

class PageHome extends React.Component {

    state = {
        loading: true,
        error: false,
        products: [],
        categories: [],
        params: {
            query: "",
            category_id: "",
        }
    }

    async componentDidMount() {
        
        try {
            const products = fetchProducts();
            const categories = fetchCategories();

            const [resProd, resCat] = await Promise.all([products, categories]);
    
          
            if(resProd && resProd.response.ok && resCat && resCat.response.ok) {
    
                const prodData = resProd.data;
                const catData = resCat.data;

                
                this.setState({
                    products: prodData,
                    categories: catData,
                    loading: false
                });
            }
            else {
                this.setState({
                    loading: false
                });
            }
        }
        catch(error) {
            //console.error(error);
            this.setState({
                loading: false,
                error: true,
            });
        }
    }

    searchProducts = async () => {
        
        const params = this.state.params;

        for(const key of Object.keys(params)) {
             if(params[key].length === 0) {
                 delete params[key];
             }
        }

        try {
            
            const result = await fetchProducts(params);

          
            if(result && result.response.ok) {
    
                const data = result.data;

                this.setState({
                    products: data,
                });
            }
        }
        catch {
            this.setState({
                error: true,
            });
        }
    }

    handleOnChange = ({target: {name, value}}) => {

        this.setState(function(prevState){
                
            return({
                //...prevState,
                params: {
                    ...prevState.params,
                    [name]: value,
                }
            });
        });   
    }

    render() {

        const{ loading, products, categories, params} = this.state;

        let display;

        if(loading) {
            display = <div>Loading...</div>;
        }
        else {
            display = products && products.map(function(product) {
                return <div key={product.name}>{product.name}</div>;
            });
        }

        return(
            <div>
                <div>
                    <div>Shopper</div>

                    <select name="category_id" onChange={this.handleOnChange}>
                        <option value="">All</option>
                        {categories && categories.map(function(category){
                            return(<option key={category.id} value={category.id}>{category.name}</option>);
                        })}
                    </select>

                    <label htmlFor="search">
                        <input type="text" id="search" name="query" value={params.query} onChange={this.handleOnChange}/>
                    </label>

                    <button type="button" onClick={this.searchProducts}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>

                    <ul>
                        <li>Sign In</li>
                        <li>Create Account</li>
                    </ul>

                    <div><i className="fa-solid fa-cart-shopping"></i></div>
                </div>
                {display}
            </div>
        );
    }
}

export default PageHome;