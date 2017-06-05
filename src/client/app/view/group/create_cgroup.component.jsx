import React from 'react';
import $ from 'jquery';

class CreateCgroupComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: '',
            name: '',
            account: '',
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

    onNameChange(e){
        this.setState({name: e.target.value});
    }

    onAccountChange(e){
        this.setState({account: e.target.value});
    }

    onSave(e) {
        let form_data = {
            number: this.state.number,
            name: this.state.name,
            account: this.state.account
        };

        $.ajax({
            url: "http://localhost/api/cgroup/create.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : (response) => {
                this.setState({successCreation: response['message']});
                this.setState({number: 0});
                this.setState({name: ""});
                this.setState({account: 0});
            },
            error: (xhr, resp, text) => {
                console.log(xhr, resp, text);
            }
        });
        e.preventDefault();
    }

    render() {

        return (
            <div className="form_style">
                {
                    this.state.successCreation == "Customer group was created." ?
                        <div className="msg_success">
                            <h4>Customer group was saved</h4>
                        </div>
                        : null
                }

                {

                    this.state.successCreation == "Unable to create customer group." ?
                        <div className="msg_fail">
                            <h4>Unable to save customer group. Please try again</h4>
                        </div>
                        : null
                }
                <h4 className="title_right_col">CREATE A NEW</h4>
                <h4 className="title_right_col">CUSTOMER GROUP</h4>
                <form onSubmit={this.onSave}>
                    <input type='number' placeholder="Number" value={this.state.number}
                                       required onChange={this.onNumberChange} />
                    <input type='text' placeholder="Name" value={this.state.name}
                                       required onChange={this.onNameChange} />
                    <input type='number' placeholder="Account" value={this.state.account}
                                       required onChange={this.onAccountChange}/>
                    <input type="submit" value="Save" onClick={this.onSave}/>
                </form>
            </div>
        );
    }
}

export default CreateCgroupComponent;