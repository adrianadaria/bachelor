import React from 'react';
import $ from 'jquery';

class DeletePgroupComponent extends React.Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    // handle single row deletion
    onDelete(e) {
        let pgroupNo = this.props.pgroupNo;
        // submit form data to api
        let data = {
          number: pgroupNo
        };
        $.ajax({
            url: "http://localhost/api/pgroup/delete.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(data),
            success : (response) => {
                this.props.changeGroupMode('readp');
            },
            error: (xhr, resp, text) => {
                // show error in console
                console.log(xhr, resp, text);
            }
        });
    }

    render() {
        return (
            <div className="delete_section">
                <h4 className="line_height_del">DO YOU WANT TO</h4>
                <h4 className="line_height_del">DELETE THIS GROUP?</h4>
                    <div className="btn_wrap">
                        <button className="btn_yes" onClick={this.onDelete}>Yes</button>
                        <button className="btn_no" onClick={() => this.props.changeGroupMode('readp')}>No</button>
                    </div>
            </div>
        );
    }
}

export default DeletePgroupComponent;