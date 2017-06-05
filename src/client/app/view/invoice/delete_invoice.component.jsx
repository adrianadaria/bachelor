import React from 'react';
import $ from 'jquery';

class DeleteInvoiceComponent extends React.Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(e) {
        let invId = this.props.invId;
        let data = {
          id: invId
        };
        $.ajax({
            url: "http://localhost/api/invoice/delete.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(data),
            success : (response) => {
                this.props.changeInvoiceMode('read');
            },
            error: (xhr, resp, text) => {
                console.log(xhr, resp, text);
            }
        });
    }

    render() {
        return (
            <div className="delete_section">
                <h4 className="line_height_del">DO YOU WANT TO</h4>
                <h4 className="line_height_del">DELETE THIS INVOICE?</h4>
                    <div className="btn_wrap">
                        <button className="btn_yes" onClick={this.onDelete}>Yes</button>
                        <button className="btn_no" onClick={() => this.props.changeInvoiceMode('read')}>No</button>
                    </div>
            </div>
        );
    }
}

export default DeleteInvoiceComponent;