import React from 'react';

import GroupTableRowComponent from './group_table_row.component.jsx';

class GroupTableComponent extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        let rows = this.props.pgroups.map(function(pgroup, i) {
            return (
                <GroupTableRowComponent key={i} pgroup={pgroup} changeGroupMode={this.props.changeGroupMode} />
            );
        }.bind(this));

        return (
            !rows.length
                ? <div className='alert alert-danger'>No product groups found.</div>
                :
                <div>
                <table className='table table-bordered table-hover'>
                    <thead>
                    <tr>
                        <th>Number</th>
                        <th>Name</th>
                        <th>VatAcc</th>
                        <th>NoVatAcc</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                </div>
        );
    }
}

export default GroupTableComponent;