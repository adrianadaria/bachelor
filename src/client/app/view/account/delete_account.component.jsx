import React from 'react';
import $ from 'jquery';
import style from '../sass/subpage.scss';

class DeleteAccountComponent extends React.Component {

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
        let accountNo = this.props.accountNo;
        // submit form data to api
        let data = {
          number: accountNo
        };
        $.ajax({
            url: "http://localhost/api/product/delete.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(data),
            success : (response) => {
                this.props.changeProductMode('read');
            },
            error: (xhr, resp, text) => {
                // show error in console
                console.log(xhr, resp, text);
                console.warn(xhr.responseText);
            }
        });
    }

    render() {
        return (
            <div>
                <h4 className="line_height_del">DO YOU WANT TO</h4>
                <h4 className="line_height_del">DELETE THIS ACCOUNT?</h4>
                            <div className="btn_wrap">
                                <button className="btn_yes" onClick={this.onDelete}>Yes</button>
                                <button className="btn_no" onClick={() => this.props.changeAccountMode('read')}>No
                                </button>
                            </div>
            </div>
        );
    }
}

export default DeleteAccountComponent;