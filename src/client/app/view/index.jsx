import React from 'react';
import {render} from 'react-dom';
import Customer from './Customer.jsx';

class App extends React.Component {

  render () {
    return <div>
      <p> Hello Reactdsss!</p>
      <p> tdsssjknknjknjknjnjknj!</p>
      <Customer />
    </div>;
  }
}

render(<App/>, document.getElementById('app'));