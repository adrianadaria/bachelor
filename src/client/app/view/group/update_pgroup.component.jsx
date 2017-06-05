import React from 'react';
import $ from 'jquery';

class UpdatePgroupComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            vatAcc: 0,
            noVatAcc: 0,
            successCreation: null
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onVataccChange = this.onVataccChange.bind(this);
        this.onNovataccChange = this.onNovataccChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.fetchPgroup = this.fetchPgroup.bind(this);
    }

    fetchPgroup(pgroupNo) {
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
        this.fetchPgroup(pgroupNo);
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    onNameChange(e){
        this.setState({name: e.target.value});
    }

    onVataccChange(e){
        this.setState({vatAcc: e.target.value});
    }

    onNovataccChange(e){
        this.setState({noVatAcc: e.target.value});
    }

    // handle save changes button clicked
    onSave(e){
        // data in the form
        let form_data = {
            number: this.state.number,
            name: this.state.name,
            vatAcc: this.state.vatAcc,
            noVatAcc: this.state.noVatAcc
        };
        // submit form data to api
        $.ajax({
            url: "http://localhost/api/pgroup/update.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : (response) => {
                this.setState({successUpdate: response['message']});
                setTimeout(() => {
                    this.props.changeGroupMode('readp');
                }, 1500);
            },
            error: (xhr, resp, text) => {
                // show error to console
                console.log(xhr, resp, text);
            }
        });
        e.preventDefault();
    }

    render() {
        return (
            <div>
                {
                    this.state.successUpdate == "Product group was updated." ?
                        <div className="msg_success"><h4>Product group was updated</h4></div>
                        : null
                }

                {
                    this.state.successUpdate == "Unable to update product group." ?
                        <div className="msg_fail"><h4>Unable to update product group. Please try again</h4></div>
                        : null
                }

                <a href='#'
                   onClick={() => this.props.changeGroupMode('readp')}>
                    <div className="back"/>
                </a>

                 <form onSubmit={this.onSave} className="update_form">
                   <h4 className="group">UPDATE</h4>
                    <h4 className="group">THIS GROUP</h4>
                        <label><h5>Number</h5></label>
                            <input type='number' value={this.state.number} readOnly/>
                        <label><h5>Name</h5></label>
                            <input type='text' value={this.state.name}
                                           required onChange={this.onNameChange}/>
                        <label><h5>VatAcc</h5></label>
                            <input type='number' value={this.state.vatAcc}
                                    required onChange={this.onVataccChange}/>
                        <label><h5>NoVatAcc</h5></label>
                            <input type='number' value={this.state.noVatAcc}
                                        required onChange={this.onNovataccChange}/>
                        <input type="submit" value="Update" onClick={this.onSave}/>
                </form>
            </div>
        );
    }
}

export default UpdatePgroupComponent;