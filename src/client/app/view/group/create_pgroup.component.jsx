import React from 'react';
import $ from 'jquery';

class CreatePgroupComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            vatAcc: 0,
            noVatAcc: 0,
            successCreation: null
        };

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onVataccChange = this.onVataccChange.bind(this);
        this.onNovataccChange = this.onNovataccChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onNumberChange(e) {
        this.setState({number: e.target.value});
    }

    // handle name change
    onNameChange(e){
        this.setState({name: e.target.value});
    }

    onVataccChange(e){
        this.setState({vatAcc: e.target.value});
    }

    onNovataccChange(e){
        this.setState({noVatAcc: e.target.value});
    }

    onSave(e) {
        // data in the form
        let form_data = {
            number: this.state.number,
            name: this.state.name,
            vatAcc: this.state.vatAcc,
            noVatAcc: this.state.noVatAcc
        };
        // submit form data to api
        $.ajax({
            url: "http://localhost/api/pgroup/create.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : (response) => {
                // api message
                this.setState({successCreation: response['message']});
                // empty form
                this.setState({number: 0});
                this.setState({name: ""});
                this.setState({vatAcc: 0});
                this.setState({noVatAcc: 0});
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

                    this.state.successCreation == "Product group was created." ?
                        <div className='alert alert-success'>
                            Product group was saved.
                        </div>
                        : null
                }

                {

                    this.state.successCreation == "Unable to create product group." ?
                        <div className='alert alert-danger'>
                            Unable to save product group. Please try again.
                        </div>
                        : null
                }

                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                            <tr>
                                <td>Number</td>
                                <td>
                                    <input type='number' className='form-control' value={this.state.number}
                                           required onChange={this.onNumberChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input type='text' className='form-control' value={this.state.name}
                                        required onChange={this.onNameChange} />
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
                                           required onChange={this.onNovataccChange} />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button className='btn btn-primary' onClick={this.onSave}>Save</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}

export default CreatePgroupComponent;