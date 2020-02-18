import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom"

export default class ListingDisplayCustomer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {listings: [], productname: "", sorttype: "price"}

        this.onChangeProductname = this.onChangeProductname.bind(this);
        this.onChangeSortType = this.onChangeSortType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }

    onChangeProductname(event)
    {
        this.setState({productname: event.target.value});

    }

    onChangeSortType(event)
    {
        this.setState({sorttype: event.target.value});
    }

    onSubmit(e){
        e.preventDefault();

        axios.get('http://localhost:4000/api/product/getall')
        .then(response => {
            this.setState({listings: JSON.parse(JSON.stringify(response.data))});
            let productname = this.state.productname    
            let products_to_display = this.state.listings.filter(function(prod){return prod.status === "waiting" && prod.name === productname});
            console.log(products_to_display)
            let listings = (
                <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Vendor Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                { 
                    products_to_display.map((currentProduct, i) => {
                        return (
                            <tr>
                                <td>{currentProduct.name}</td>
                                <td>{currentProduct.vendor_id.username}</td>
                                <td>{currentProduct.price}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
    
            )
            ReactDOM.render( listings,document.getElementById("listings"))
        })
        .catch(function(error) {
            console.log(error);
        })

       
    }






    render() {
        return (
            <div>
            <div>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Search product: </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.productname}
                  onChange={this.onChangeProductname}
                />
              </div>
   

              <div className="form-group">
                <label>Sort by: </label>
                <select
                  className="form-control"
                  value={this.state.sorttype}
                  onChange={this.onChangeSortType}
                >
                  <option value="price">Price</option>
                  <option value="quantity">Quantity of items left in bundle</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Get listings"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>

          <div id ="listings"></div>
        </div>
        )
    }
}