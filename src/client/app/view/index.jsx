import React from 'react';
import {render} from 'react-dom';
import Customer from './Customer.jsx';

class App extends React.Component {

  render () {
    return <div>
      <div class="page-header">
            <h1>Loading...</h1>
        </div>
      <p>{this.props.changeAppMode}</p>
      <p> tdsssjknknjknjknjnjknj!</p>
      <Customer />
    </div>;
  }
}



render(<App/>, document.getElementById('app'));