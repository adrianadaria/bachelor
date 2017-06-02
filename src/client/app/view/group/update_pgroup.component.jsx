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
                        <div className='alert alert-success'>Product group was updated.</div>
                        : null
                }

                {
                    this.state.successUpdate == "Unable to update product group." ?
                        <div className='alert alert-danger'>Unable to update product group. Please try again.</div>
                        : null
                }

                <a href='#'
                   onClick={() => this.props.changeGroupMode('readp')} className='btn btn-primary margin-bottom-1em'>
                    Back
                </a>

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                            <tr>
                                <td>Number</td>
                                <td>
                                    <input type='number' className='form-control' value={this.state.number} readOnly/>
                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input type='text' className='form-control' value={this.state.name}
                                           required onChange={this.onNameChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>VatAcc</td>
                                <td>
                                <input type='number' className='form-control' value={this.state.vatAcc}
                                    required onChange={this.onVataccChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>NoVatAcc</td>
                                <td>
                                    <input type='number' className='form-control' value={this.state.noVatAcc}
                                        required onChange={this.onNovataccChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button className='btn btn-primary' onClick={this.onSave}>Save Changes</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default UpdatePgroupComponent;