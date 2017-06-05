import React from 'react';
import $ from 'jquery';
import style from '../sass/subpage.scss';

class DeleteAccountComponent extends React.Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(e) {
        let accountNo = this.props.accountNo;
        let data = {
          number: accountNo
        };
        $.ajax({
            url: "http://localhost/api/account/delete.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(data),
            success : (response) => {
                this.props.changeAccountMode('read');
            },
            error: (xhr, resp, text) => {
                console.log(xhr, resp, text);
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
                    <button className="btn_no" onClick={() => this.props.changeAccountMode('read')}>No</button>
                </div>
            </div>
        );
    }
}

export default DeleteAccountComponent;