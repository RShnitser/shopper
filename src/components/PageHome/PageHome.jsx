import React from "react";
import { commerce } from "../../services";

class PageHome extends React.Component {

    state = {
        loading: true,
        products: []
    }

    fetchProducts = async () => {
        
        const {data} = await commerce.products.list();

        this.setState({
            products: data,
            loading: false
        });
    }

    componentDidMount() {
        this.fetchProducts();
    }

    render() {

        const{ loading, products} = this.state;

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
                    <div><i className="fa-solid fa-cart-shopping"></i></div>
                </div>
                {display}
            </div>
        );
    }
}

export default PageHome;