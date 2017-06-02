import React from 'react';
import $ from 'jquery';

class DeleteOrderComponent extends React.Component {

    constructor(props) {
        super(props);

        this.onDelete = this.onDelete.bind(this);
    }

    // handle single row deletion
    onDelete(e) {
        let orderId = this.props.orderId;
        // submit form data to api
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
                // show error in console
                console.log(xhr, resp, text);
            }
        });
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='panel panel-default'>
                        <div className='panel-body text-align-center'>Are you sure?</div>
                        <div className='panel-footer clearfix'>
                            <div className='text-align-center'>
                                <button onClick={this.onDelete} className='btn btn-danger m-r-1em'>Yes</button>
                                <button onClick={() => this.props.changeOrderMode('read')} className='btn btn-primary'>No
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3'></div>
            </div>
        );
    }
}

export default DeleteOrderComponent;