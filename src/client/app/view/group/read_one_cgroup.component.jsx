import React from 'react';
import $ from 'jquery';

class ReadOneCgroupComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            account: 0,
        };
        this.fetchSingleCgroup = this.fetchSingleCgroup.bind(this);
    }

    fetchSingleCgroup(cgroupNo){
        this.serverRequestProd = $.get("http://localhost/api/cgroup/read_one.php?number=" + cgroupNo,
            (cgroup) => {
                this.setState({number: cgroup.number});
                this.setState({name: cgroup.name});
                this.setState({account: cgroup.account});
            });
    }

    componentDidMount() {
        let cgroupNo = this.props.cgroupNo;
        this.fetchSingleCgroup(cgroupNo);
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    render() {
        return (
            <div>
                <a href='#' onClick={() => this.props.changeGroupMode('readc')}>
                    <div className="back"/>
                </a>
                <table className="table_list">
                        <caption className="products_caption"><h4 className="group">DETAILS OF THE</h4>
                        <h4 className="group">CUSTOMER GROUP</h4></caption>
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
                            <td>Account</td>
                            <td>{this.state.account}</td>
                        </tr>
                        </tbody>
                    </table>
            </div>
        );
    }
}

export default ReadOneCgroupComponent;