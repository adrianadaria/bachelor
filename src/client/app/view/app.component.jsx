import React from 'react';
import { render } from 'react-dom';
import HomePageComponent from './home_page.component.jsx';
import style from './sass/home_page.scss';


// navigation imports
import ReadProductsComponent   from './product/read_products.component.jsx';
import ReadCustomersComponent from './customer/read_customers.component.jsx';
import ReadInvoicesComponent from './invoice/read_invoices.component.jsx';
import ReadAccountsComponent from './account/read_accounts.component.jsx';
import ReadOrdersComponent from './order/read_orders.component.jsx';
import ReadGroupsComponent from './group/read_groups.component.jsx';

class AppComponent extends React.Component {
	
	// es6 way of initiating state. Initial mode is 'home' mode
	constructor(props, context) {
		super(props, context);

		this.state = {
			currentMode: 'home',
			productId: null
		};

		this.changeAppMode = this.changeAppMode.bind(this);
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
			case 'account':
				modeComponent = <ReadAccountsComponent />;
				break;
			case 'order':
				modeComponent = <ReadOrdersComponent />;
				break;
			case 'group':
				modeComponent = <ReadGroupsComponent />;
				break;			
			default:
				break;
		}
	return (
		<div id="container">
   			<div id="header">

   					<div className="nav-header">
					<a href='#'  onClick={() => this.changeAppMode('home')} >
						<img alt="home" src={require('./img/logo_small.png')}/>
					</a>
				</div>
   			</div>
   			<div id="body">
   						{modeComponent}
   			</div>
   			<div id="footer">
   				<h6>Copyrights 2017 - THRIFT</h6>
   			</div>
		</div>
				


		);
	}
}

render(<AppComponent />, document.getElementById('app'));