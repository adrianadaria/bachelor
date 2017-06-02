import React from 'react';
import $ from 'jquery';

class DeleteCustomerComponent extends React.Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    // handle single row deletion
    onDelete(e) {
        let cusNo = this.props.cusNo;
        // submit form data to api
        $.ajax({
            url: "http://localhost/api/customer/delete.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify({'number' : cusNo}),
            success : (response) => {
                this.props.changeCustomerMode('read');
            },
            error: (xhr, resp, text) => {
                // show error in console
                console.log(xhr, resp, text);
            }
        });
    }

    render() {
        return (
            <div>
                <h4 className="line_height_del">DO YOU WANT TO</h4>
                <h4 className="line_height_del">DELETE THIS CUSTOMER?</h4>
                            <div className="btn_wrap">
                                <button className="btn_yes" onClick={this.onDelete}>Yes</button>
                                <button className="btn_no" onClick={() => this.props.changeCustomerMode('read')}>No</button>
                             </div>
                           </div>
                                
        
           
        );
    }
}

export default DeleteCustomerComponent;