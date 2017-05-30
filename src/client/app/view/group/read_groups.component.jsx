import React from 'react';
import $ from 'jquery';

import GroupTableComponent from './group_table.component.jsx';

class ReadGroupsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentMode: 'read',
            cgroupNo: null,
            pgroupNo: null,
            cgroups: [],
            pgroups: []
        };

        this.fetchPgroups = this.fetchPgroups.bind(this);
        this.fetchCgroups = this.fetchCgroups.bind(this);
        this.changeGroupMode = this.changeGroupMode.bind(this);
    }

    fetchPgroups() {
        this.serverRequestP = $.get("http://localhost/api/pgroup/read.php", (pgroup) => {
            this.setState({
                pgroups: pgroup.records
            });
        });
    }

    fetchCgroups() {
        this.serverRequestC = $.get("http://localhost/api/cgroup/read.php", (cgroup) => {
            this.setState({
               cgroups: cgroup.records
            });
        });
    }

    // on mount, fetch all products and stored them as this component's state
    componentDidMount() {
        this.fetchPgroups();
        setTimeout(this.fetchCgroups(), 1500);

    }

    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount() {
        this.serverRequestP.abort();
        this.serverRequestC.abort();
    }

    changeGroupMode(newMode, pgroupNo, cgroupNo ) {
        this.setState({currentMode: newMode});

        if(pgroupNo !== undefined && pgroupNo !== '') {
            this.setState({pgroupNo: pgroupNo});
        }

        if(cgroupNo !== undefined) {
            this.setState({cgroupNo: cgroupNo});
        }
    }

    // render component on the page
    render() {
        let filteredPgroups = this.state.pgroups;
        let filteredCgroups = this.state.cgroups;
        let modeComponent = <GroupTableComponent pgroups={filteredPgroups}  changeGroupMode={this.changeGroupMode} />;

        let cdata = filteredCgroups.map((cgroup, i) => {
            return (
                <tr key={cgroup.number}>
                    <td>{cgroup.number}</td>
                    <td>{cgroup.name}</td>
                    <td>{cgroup.account}</td>
                    <td>
                        <a href='#'
                           onClick={() => this.props.changeGroupMode('readOne', '', cgroup.number)}
                           className='btn btn-info m-r-1em'> Read One
                        </a>
                        <a href='#'
                           onClick={() => this.props.changeGroupMode('update','', cgroup.number)}
                           className='btn btn-primary m-r-1em'> Edit
                        </a>
                        <a
                            onClick={() => this.props.changeGroupMode('delete','', cgroup.number)}
                            className='btn btn-danger'> Delete
                        </a>
                    </td>
                </tr>
            );
        });
        //console.log(cdata);

        $('.page-header h1').text('Read Groups');
        switch(this.state.currentMode) {
            case 'read':
                break;
            case 'readOne':
                //modeComponent =
                //    <ReadOneProductComponent productId={this.state.productId} changeProductMode={this.changeProductMode}/>;
                break;
            case 'create':
                //modeComponent = <CreateProductComponent changeProductMode={this.changeProductMode}/>;
                break;
            case 'update':
                //modeComponent =
                //   <UpdateProductComponent productId={this.state.productId} changeProductMode={this.changeProductMode}/>;
                break;
            case 'delete':
                //modeComponent =
                //    <DeleteProductComponent productId={this.state.productId} changeProductMode={this.changeProductMode}/>;
                break;
            default:
                break;
        }

        return (
            //if current mode read render tobar
            <div className='overflow-hidden'>
                <h3>Product Groups</h3>
                {modeComponent}
                <h3>Customer Groups</h3>
                <table className='table table-bordered table-hover'>
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>Account</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {cdata}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default ReadGroupsComponent;