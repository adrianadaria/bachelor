import React from 'react';
import { render } from 'react-dom';
import HomePageComponent from './home_page.component.jsx';
import style from './sass/home_page.scss';

// navigation imports
import ReadProductsComponent   from './product/read_products.component.jsx';
import ReadCustomersComponent from './customer/read_customers.component.jsx';
import ReadInvoicesComponent from './invoice/read_invoices.component.jsx';

class AppComponent extends React.Component {
	
	// es6 way of initiating state. Initial mode is 'read' mode
	constructor(props, context) {
		super(props, context);

		this.state = {
			currentMode: 'home',
			productId: null
		}

		this.changeAppMode = this.changeAppMode.bind(this);
		//setInterval(() => {
        //    this.setState({currentMode: 'create'});
		//}, 3000);
		//this.setState = this.setState.bind(this);
	}
	
	// used when use clicks something that changes the current mode
    changeAppMode(newMode, productId) {
        this.setState({currentMode: newMode});
		
        if(productId !== undefined) {
			this.setState({productId: productId});
		}
    }

	render() {
		let modeComponent = <HomePageComponent changeAppMode = {this.changeAppMode} />;
			
		switch(this.state.currentMode) {
			case 'home':
				break;
			case 'read':
				modeComponent = <ReadProductsComponent changeAppMode = {this.changeAppMode} />;
				break;
			case 'customer':
				modeComponent = <ReadCustomersComponent />;
				break;
			case 'invoice':
				modeComponent = <ReadInvoicesComponent />;
				break;
			default:
				break;
		}
		
	return (
		<div className="container">
				<a href='#'  onClick={() => this.props.changeAppMode('home')}>
					<div className="nav-header">
						<h1>Logo</h1>
					</div>
				</a>
			{modeComponent}
		</div>
		);
	}
}

render(<AppComponent />, document.getElementById('app'));