import React from 'react';

class GroupTableRowComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.pgroup.number}</td>
                <td>{this.props.pgroup.name}</td>
                <td>{this.props.pgroup.vatAcc}</td>
                <td>{this.props.pgroup.noVatAcc}</td>
                <td>
                    <a href='#'
                       onClick={() => this.props.changeGroupMode('readOnep', this.props.pgroup.number)}>
                       <div className="action_btn view" />
                    </a>
                    <a href='#'
                       onClick={() => this.props.changeGroupMode('updatep', this.props.pgroup.number)}>
                       <div className="action_btn edit"/>
                    </a>
                    <a
                        onClick={() => this.props.changeGroupMode('deletep', this.props.pgroup.number)}>
                        <div className="action_btn delete"/>
                    </a>
                </td>
            </tr>
        );
    }

}

export default GroupTableRowComponent;