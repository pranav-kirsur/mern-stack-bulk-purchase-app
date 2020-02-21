import React, {Component} from 'react';
import axios from 'axios';
import CustomerOrder from "./customer-order.component"

export default class CustomerOrderDisplay extends Component {
    
    constructor(props) {
        super(props);
        this.state = {orders: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/order/getbycustomerid/'  + localStorage.getItem("UserID"))
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
                            <th>Vendor Name</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Quantity left</th>
                            <th>Edit order</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.orders.map((currentProduct, i) => {
                            return (
                                <CustomerOrder orderdata = {currentProduct}/>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}