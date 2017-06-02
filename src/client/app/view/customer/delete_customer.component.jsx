import React from 'react';
import $ from 'jquery';

class DeleteProductComponent extends React.Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        $('.page-header h1').text('Delete Product');
    }

    // handle single row deletion
    onDelete(e) {
        // product to delete
        let productId = this.props.productId;
        // submit form data to api
        $.ajax({
            url: "http://localhost/api/product/delete.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify({'id' : productId}),
            success : (response) => {
                this.props.changeAppMode('read');
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
                                <button className="btn_no" onClick={() => this.props.changeProductMode('read')}>No
                                </button>
                            </div>
            </div>
           
        );
    }
}

export default DeleteProductComponent;