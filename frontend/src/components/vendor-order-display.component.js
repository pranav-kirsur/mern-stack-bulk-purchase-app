import React, {Component} from 'react';
import axios from 'axios';
import VendorOrder from "./vendor-order.component"

export default class VendorOrderDisplay extends Component {
    
    constructor(props) {
        super(props);
        this.state = {orders: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/product/getbystatus/' + this.props.status + '/' + localStorage.getItem("UserID"))
             .then(response => {
                 this.setState({orders: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.orders.map((currentProduct, i) => {
                            return (
                                <VendorOrder orderdata = {currentProduct}/>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}