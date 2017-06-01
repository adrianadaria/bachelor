import React from 'react';
import $ from 'jquery';
import style from '../sass/subpage.scss';
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
        let productNo = this.props.productNo;
        // submit form data to api
        let data = {
          number: productNo
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
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className='panel panel-default'>
                        <div className='panel-body text-align-center'>Are you sure?</div>
                        <div className='panel-footer clearfix'>
                            <div className='text-align-center'>
                                <button onClick={this.onDelete} className='btn btn-danger m-r-1em'>Yes</button>
                                <button onClick={() => this.props.changeProductMode('read')} className='btn btn-primary'>No
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

export default DeleteProductComponent;