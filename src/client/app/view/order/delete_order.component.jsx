import React from 'react';
import $ from 'jquery';

class DeleteOrderComponent extends React.Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }
    onDelete(e) {
        let orderId = this.props.orderId;
        let data = {
          id: orderId
        };
        $.ajax({
            url: "http://localhost/api/order/delete.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(data),
            success : (response) => {
                this.props.changeOrderMode('read');
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
                <h4 className="line_height_del">DELETE THIS ORDER?</h4>
                    <div className="btn_wrap">
                        <button className="btn_yes" onClick={this.onDelete}>Yes</button>
                        <button className="btn_no" onClick={() => this.props.changeOrderMode('read')}>No</button>
                    </div>
            </div>
        );
    }
}

export default DeleteOrderComponent;