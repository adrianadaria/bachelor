import React from 'react';
import $ from 'jquery';

import GroupTopBarComponent from './group_top_bar.component.jsx';
import GroupTableComponent from './group_table.component.jsx';
import ReadOnePgroupComponent from './read_one_pgroup.component.jsx';
import ReadOneCgroupComponent from './read_one_cgroup.component.jsx';
import UpdatePgroupComponent from './update_pgroup.component.jsx';
import UpdateCgroupComponent from './update_cgroup.component.jsx';
import DeletePgroupComponent from './delete_pgroup.component.jsx';
import CreatePgroupComponent from './create_pgroup.component.jsx';
import CreateCgroupComponent from './create_cgroup.component.jsx';

class ReadGroupsComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentMode: 'readp',
            cgroupNo: null,
            pgroupNo: null,
            cgroups: [],
            pgroups: []
        };

        this.fetchPgroups = this.fetchPgroups.bind(this);
        this.fetchCgroups = this.fetchCgroups.bind(this);
        this.refreshTables = this.refreshTables.bind(this);
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

    refreshTables() {
        this.serverRequestP.abort();
        this.serverRequestC.abort();
        this.fetchPgroups();
        setTimeout(this.fetchCgroups(), 2000);
    }

    componentDidMount() {
        this.fetchPgroups();
        setTimeout(this.fetchCgroups(), 2000);

    }

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
        let topBar = null;
        let modeComponent = <GroupTableComponent pgroups={filteredPgroups}  changeGroupMode={this.changeGroupMode} />;
        let cdata = filteredCgroups.map((cgroup, i) => {
            return (
                <tr key={cgroup.number}>
                    <td>{cgroup.number}</td>
                    <td>{cgroup.name}</td>
                    <td>{cgroup.account}</td>
                    <td>
                        <a href='#'
                           onClick={() => this.changeGroupMode('readOnec', '', cgroup.number)}
                           className='btn btn-info m-r-1em'> Read One
                        </a>
                        <a href='#'
                           onClick={() => this.changeGroupMode('updatec','', cgroup.number)}
                           className='btn btn-primary m-r-1em'> Edit
                        </a>
                    </td>
                </tr>
            );
        });
        let cusTable = (
            <div>
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

        switch(this.state.currentMode) {
            case 'readp':
                topBar = <GroupTopBarComponent changeGroupMode={this.changeGroupMode} refresh={this.refreshTables}/>;
                break;
            case 'readc':
                topBar = <GroupTopBarComponent changeGroupMode={this.changeGroupMode}/>;
                modeComponent = cusTable;
                break;
            case 'readOnep':
                modeComponent =
                    <ReadOnePgroupComponent pgroupNo={this.state.pgroupNo} changeGroupMode={this.changeGroupMode}/>;
                break;
            case 'readOnec':
                modeComponent =
                    <ReadOneCgroupComponent cgroupNo={this.state.cgroupNo} changeGroupMode={this.changeGroupMode}/>;
                break;
            case 'createp':
                modeComponent = <CreatePgroupComponent changeGroupMode={this.changeGroupMode}/>;
                break;
            case 'createc':
                modeComponent = <CreateCgroupComponent changeGroupMode={this.changeGroupMode}/>;
                break;
            case 'updatep':
                modeComponent =
                   <UpdatePgroupComponent pgroupNo={this.state.pgroupNo} changeGroupMode={this.changeGroupMode}/>;
                break;
            case 'updatec':
                modeComponent =
                    <UpdateCgroupComponent cgroupNo={this.state.cgroupNo} changeGroupMode={this.changeGroupMode}/>;
                break;
            case 'deletep':
                modeComponent =
                    <DeletePgroupComponent pgroupNo={this.state.pgroupNo} changeGroupMode={this.changeGroupMode}/>;
                break;
            default:
                break;
        }

        return (
            //if current mode read render tobar
            <div className='overflow-hidden'>
                {
                    topBar !== null ?
                        topBar
                    : null
                }
                {modeComponent}
            </div>
        );
    }

}

export default ReadGroupsComponent;