import React from 'react';
import { render } from 'react-dom';

// product imports
import ReadProductsComponent   from './product/read_products.component.jsx';
import ReadOneProductComponent from './product/read_one_product.component.jsx';
import CreateProductComponent  from './product/create_product.component.jsx';
import UpdateProductComponent  from './product/update_product.component.jsx';
import DeleteProductComponent  from './product/delete_product.component.jsx';

class AppComponent extends React.Component {
	
	// es6 way of initiating state. Initial mode is 'read' mode
	constructor(props, context) {
		super(props, context);

		this.state = {
			currentMode: 'read',
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
		
		let modeComponent = <ReadProductsComponent changeAppMode = {this.changeAppMode} />;
			
		switch(this.state.currentMode) {
			case 'read':
				break;
			case 'readOne':
				modeComponent = 
					<ReadOneProductComponent productId = {this.state.productId} changeAppMode = {this.changeAppMode} />;
				break;
			case 'create':
				modeComponent = <CreateProductComponent changeAppMode = {this.changeAppMode} />;
				break;
			case 'update':
				modeComponent = 
					<UpdateProductComponent productId = {this.state.productId} changeAppMode = {this.changeAppMode} />;
				break;
			case 'delete':
				modeComponent =
					<DeleteProductComponent productId = {this.state.productId} changeAppMode = {this.changeAppMode} />;
				break;
			default:
				break;
		}
		
			return modeComponent;
	}
}

render(<AppComponent />, document.getElementById('app'));