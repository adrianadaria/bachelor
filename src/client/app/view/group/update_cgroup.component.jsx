import React from 'react';
import $ from 'jquery';

class UpdateCgroupComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            name: '',
            account: 0,
            successCreation: null
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onAccountChange = this.onAccountChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.fetchCgroup = this.fetchCgroup.bind(this);
    }

    fetchCgroup(cgroupNo) {
        this.serverRequestProd = $.get("http://localhost/api/cgroup/read_one.php?number=" + cgroupNo,
            (cgroup) => {
                this.setState({number: cgroup.number});
                this.setState({name: cgroup.name});
                this.setState({account: cgroup.account});
            });
    }

    componentDidMount() {
        let cgroupNo = this.props.cgroupNo;
        this.fetchCgroup(cgroupNo);
    }

    componentWillUnmount() {
        this.serverRequestProd.abort();
    }

    onNameChange(e){
        this.setState({name: e.target.value});
    }

    onAccountChange(e){
        this.setState({account: e.target.value});
    }

    // handle save changes button clicked
    onSave(e){
        // data in the form
        let form_data = {
            number: this.state.number,
            name: this.state.name,
            account: this.state.account
        };
        // submit form data to api
        $.ajax({
            url: "http://localhost/api/cgroup/update.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : (response) => {
                this.setState({successUpdate: response['message']});
                setTimeout(() => {
                    this.props.changeGroupMode('readc');
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
                    this.state.successUpdate == "Customer group was updated." ?
                        <div className='alert alert-success'>Customer group was updated.</div>
                        : null
                }

                {
                    this.state.successUpdate == "Unable to update customer group." ?
                        <div className='alert alert-danger'>Unable to update customer group. Please try again.</div>
                        : null
                }

                <a href='#'
                   onClick={() => this.props.changeGroupMode('readc')} className='btn btn-primary margin-bottom-1em'>
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
                            <td>Account</td>
                            <td>
                                <input type='number' className='form-control' value={this.state.account}
                                       required onChange={this.onAccountChange}/>
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

export default UpdateCgroupComponent;