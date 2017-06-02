import React from 'react';
import $ from 'jquery';

class CreateCgroupComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            account: 0,
            successCreation: null
        };

        this.onNumberChange = this.onNumberChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onAccountChange = this.onAccountChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onNumberChange(e) {
        this.setState({number: e.target.value});
    }

    // handle name change
    onNameChange(e){
        this.setState({name: e.target.value});
    }

    onAccountChange(e){
        this.setState({account: e.target.value});
    }

    onSave(e) {
        // data in the form
        let form_data = {
            number: this.state.number,
            name: this.state.name,
            account: this.state.account
        };
        // submit form data to api
        $.ajax({
            url: "http://localhost/api/cgroup/create.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : (response) => {
                // api message
                this.setState({successCreation: response['message']});
                // empty form
                this.setState({number: 0});
                this.setState({name: ""});
                this.setState({account: 0});
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

                    this.state.successCreation == "Customer group was created." ?
                        <div className='alert alert-success'>
                            Customer group was saved.
                        </div>
                        : null
                }

                {

                    this.state.successCreation == "Unable to create customer group." ?
                        <div className='alert alert-danger'>
                            Unable to save customer group. Please try again.
                        </div>
                        : null
                }

                <a href='#' onClick={() => this.props.changeGroupMode('readc')}
                   className='btn btn-primary margin-bottom-1em'> Back
                </a>

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
                            <td>Account</td>
                            <td>
                                <input type='number' className='form-control' value={this.state.account}
                                       required onChange={this.onAccountChange}/>
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

export default CreateCgroupComponent;