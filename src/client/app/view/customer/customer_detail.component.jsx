import React from 'react';
import $ from 'jquery';

class CustomerDetailComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            //currentMode: 'read',
            //customerNo: null,
            details: []
        };

        this.fetchDetails = this.fetchDetails.bind(this);
    }

    fetchDetails() {
        this.serverRequest = $.get("http://localhost/api/detail/read.php", (detail) => {
            this.setState({
                details: detail.records
            });
        });
    }

    componentDidMount() {
        this.fetchDetails();
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        //console.log(this.state.details);
        let details = this.state.details.map((details, i) => {
            let productNames = (
                <p>
                    {details.data[0]['name']}<br/>
                    {details.data[1]['name']}
                </p>
            );
            let total = parseInt(details.data[0]['price']) + parseInt(details.data[1]['price']);
            let productPrices = (
                <p>
                    {parseFloat(details.data[0]['price']).toFixed(2)}<br/>
                    {parseFloat(details.data[1]['price']).toFixed(2)}<br/>
                    Total: {parseFloat(total).toFixed(2)}
                </p>
            );
            return (
                <tr key={details.cusNo}>
                    <td>{details.cusNo}</td>
                    <td>{productNames}</td>
                    <td>{productPrices}</td>
                    <td>
                        <a href='#' className=''> Read</a>
                        <a href='#' className=''> Edit</a>
                        <a href='#' className=''> Delete</a>
                    </td>
                </tr>
            );
        });

        let detailTable = (

            <div className="">
                <div className="col-left bg-grey left-typo scroll col-fullwidth">
                <table className='table_list'>
                    <thead>
                    <tr>
                        <th>CusNo</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {details}
                    </tbody>
                </table>
                </div>
            </div>
        );

        return detailTable;
    }
}

export default CustomerDetailComponent;