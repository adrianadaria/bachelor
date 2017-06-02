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
                <a href='#' onClick={() => this.props.changeInvoiceMode('read')}
                   className='btn btn-primary margin-bottom-1em'>Back
                </a>
                <form>
                    <table className='table table-bordered table-hover'>
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
                </form>
            </div>
        );
    }
}

export default ReadOneInvoiceComponent;