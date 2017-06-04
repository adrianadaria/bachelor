import React from 'react';
import $ from 'jquery';

class ReadOnePgroupComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            vatAcc: 0,
            noVatAcc: 0
        };
        this.fetchSinglePgroup = this.fetchSinglePgroup.bind(this);
    }

    fetchSinglePgroup(pgroupNo){
        this.serverRequestProd = $.get("http://localhost/api/pgroup/read_one.php?number=" + pgroupNo,
            (pgroup) => {
                this.setState({number: pgroup.number});
                this.setState({name: pgroup.name});
                this.setState({vatAcc: pgroup.vatAcc});
                this.setState({noVatAcc: pgroup.noVatAcc});
            });
    }

    componentDidMount() {
        let pgroupNo = this.props.pgroupNo;
        this.fetchSinglePgroup(pgroupNo);
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    render() {
        return (
            <div>
                <a href='#' onClick={() => this.props.changeGroupMode('readp')}>
                    <div className="back"/>
                </a>
                <table className="table_list">
                        <caption className="products_caption"><h4 className="table_title">DETAILS OF THE</h4>
                        <h4 className="table_title">PRODUCT GROUP</h4></caption>
                        <tbody>
                        <tr>
                            <td>Number</td>
                            <td>{this.state.number}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td>VatAcc</td>
                            <td>{this.state.vatAcc}</td>
                        </tr>
                        <tr>
                            <td>NoVatAcc</td>
                            <td>{this.state.noVatAcc}</td>
                        </tr>
                        </tbody>
                    </table>
            </div>
        );
    }
}

export default ReadOnePgroupComponent;