import React from 'react';
import $ from 'jquery';

class CreatePgroupComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            number: '',
            name: '',
            vatAcc: '',
            noVatAcc: '',
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
        let form_data = {
            number: this.state.number,
            name: this.state.name,
            vatAcc: this.state.vatAcc,
            noVatAcc: this.state.noVatAcc
        };
        $.ajax({
            url: "http://localhost/api/pgroup/create.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : (response) => {
                this.setState({successCreation: response['message']});
                this.setState({number: 0});
                this.setState({name: ""});
                this.setState({vatAcc: 0});
                this.setState({noVatAcc: 0});
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

                    this.state.successCreation == "Product group was created." ?
                        <div className="msg_success">
                            <h4>Product group was saved</h4>
                        </div>
                        : null
                }

                {

                    this.state.successCreation == "Unable to create product group." ?
                        <div className="msg_fail">
                            <h4>Unable to save product group. Please try again</h4>
                        </div>
                        : null
                }
                    <h4 className="title_right_col">CREATE A NEW</h4>
                    <h4 className="title_right_col">PRODUCT GROUP</h4>
                <form onSubmit={this.onSave}>
                    <input type='number' placeholder="Number" value={this.state.number}
                                           required onChange={this.onNumberChange} />
                    <input type='text' placeholder="Name" value={this.state.name}
                                        required onChange={this.onNameChange} />
                    <input type='number' placeholder="VatAcc" value={this.state.vatAcc}
                                            required onChange={this.onVataccChange}/>
                    <input type='number' placeholder="NoVatAcc" value={this.state.noVatAcc}
                                           required onChange={this.onNovataccChange} />
                    <input type="submit" value="Save" onClick={this.onSave}/>
                </form>
            </div>
        );
    }
}

export default CreatePgroupComponent;