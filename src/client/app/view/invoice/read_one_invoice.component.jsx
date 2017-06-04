import React from 'react';
import $ from 'jquery';

class ReadOneInvoiceComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            date: '',
            name: '',
            total: 0.00
        };
    }

    componentDidMount() {
        let invId = this.props.invId;

        this.serverRequestProd = $.get("http://localhost/api/invoice/read_one.php?id=" + invId,
             (invoice) => {
                this.setState({id: invoice.id});
                this.setState({date: invoice.date});
                this.setState({name: invoice.name});
                this.setState({total: invoice.total});
             });
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    render() {
        return (
            <div>
                <a href='#' onClick={() => this.props.changeInvoiceMode('read')}>
                    <div className="back"/>
                </a>
                <table className="table_list">
                        <caption className="products_caption"><h4 className="table_title">DETAILS OF</h4>
                        <h4 className="table_title">THE INVOICE</h4></caption>
                        <tbody>
                        
                        <tr>
                            <td>Id</td>
                            <td>{this.state.id}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>{this.state.date}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td>Amount (DKK)</td>
                            <td>{parseFloat(this.state.total).toFixed(2)}</td>
                        </tr>
                        </tbody>
                </table>
            </div>
        );
    }
}

export default ReadOneInvoiceComponent;