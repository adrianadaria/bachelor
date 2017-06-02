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
                <a href='#' onClick={() => this.props.changeGroupMode('readc')}
                   className='btn btn-primary margin-bottom-1em'>Back
                </a>
                <form>
                    <table className='table table-bordered table-hover'>
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
                </form>
            </div>
        );
    }
}

export default ReadOneCgroupComponent;