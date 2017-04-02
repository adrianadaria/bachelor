import React from 'react';

class Customer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {likesCount : 0};
    this.onLike = this.onLike.bind(this);
  }


  getInitialState() {
    return {
        customers: [],
    };
}
componentDidMount() {
    this.serverRequest = $.get("get_all_customers.php", function (customers) {
        this.setState({
            customers: JSON.parse(customers)
        });
    }.bind(this));
 
    $('.page-header h1').text('Create customer');
}



componentWillUnmount() {
    this.serverRequest.abort();
}

  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }


  render() {
    return (
      <div>
        <p>{this.getInitialState}</p>
        Likes : <span>{this.state.likesCount}</span>
        <div><button onClick={this.onLike}>Like Me</button></div>
      </div>
    );
  }

}

export default Customer;