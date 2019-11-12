import React from 'react';

class ProductCard extends React.Component {

    getProductStatistics = () => {
        console.error("you clicked stats");
    }

    render() {
        return (
            <div key={this.props.product.Id} className="productCard">
                <h2>{this.props.product.productName}</h2>
                <h2>Regular Price: ${this.props.product.productRegularPrice}</h2>
                {this.props.product.productPromoPrice === 0 ? <h2>Not on Clearance</h2>: <h2>Clearance Price: ${this.props.product.productPromoPrice}</h2>}
                <div>
                  <button onClick={this.getProductStatistics}>View Product Statistics</button>
                </div>
             </div>
        )
    }
}

export default ProductCard;