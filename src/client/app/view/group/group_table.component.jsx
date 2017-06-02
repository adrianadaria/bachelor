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
                ? <h4>NO PRODUCT GROUPS FOUND</h4>
                :
                <table className="table_list">
                    <caption><h4 className="table_title">LIST OF</h4>
                    <h4 className="table_title">PRODUCT GROUPS</h4></caption>
                <div>
                <table className='table table-bordered table-hover'>
                    <thead>
                    <tr>
                        <th><h5>Number</h5></th>
                        <th><h5>Name</h5></th>
                        <th><h5>VatAcc</h5></th>
                        <th><h5>NoVatAcc</h5></th>
                        <th className="extra_width"><h5>Action</h5></th>
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