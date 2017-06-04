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
                        <div className="msg_success"><h4>Customer group was updated</h4></div>
                        : null
                }

                {
                    this.state.successUpdate == "Unable to update customer group." ?
                        <div className="msg_fail"><h4>Unable to update customer group. Please try again</h4></div>
                        : null
                }

                <a href='#'
                   onClick={() => this.props.changeGroupMode('readc')}>
                   <div className="back"/>
                </a>

                <form onSubmit={this.onSave} className="update_form">
                   <h4 className="group">UPDATE</h4>
                    <h4 className="group">THIS GROUP</h4>
                        <label><h5>Number</h5></label>
                            <input type='number' className='form-control' value={this.state.number} readOnly/>
                        <label><h5>Name</h5></label>
                            <input type='text' className='form-control' value={this.state.name}
                                       required onChange={this.onNameChange}/>
                        <label><h5>Account</h5></label>
                            <input type='number' className='form-control' value={this.state.account}
                                       required onChange={this.onAccountChange}/>
                         <input type="submit" value="Update" onClick={this.onSave}/>
                </form>
            </div>
        );
    }
}

export default UpdateCgroupComponent;