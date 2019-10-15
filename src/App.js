import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddToCart from './components/AddToCart'
import GoToCart from './components/GoToCart'
import axios from 'axios';

class App extends Component {

	state = {
		itemId:[],
		switchComp:false,
		clickedItem:null,
        count: 0,
		items: [],
		clickCount:[]
	}

	switchComponents = (value) => {
		this.setState({
			switchComp: value
		});
	}

	componentDidMount() {
		axios.get(`https://api.myjson.com/bins/qhnfp`)
			.then(res => {
				this.setState({
					items: res.data
				})
			});
    }
    
    displayMessage = (itemName, id) => {
		console.log('displayMessage', itemName, id);
		
        this.setState({
            itemId: [...this.state.itemId, id],
            count: ++this.state.count,
			clickedItem: itemName
		})
	}

	increDecreItems = (type) => {
		this.setState({
            count: type==='plus'?++this.state.count:type==='minus'?--this.state.count:'',
		})
	}
	
	clickedItemList = () => {
		const { itemId } = this.state;
		var a = [], b = [], prev;

		itemId.sort();
		for ( var i = 0; i < itemId.length; i++ ) {
			if ( itemId[i] !== prev ) {
				a.push(itemId[i]);
				b.push(1);
			} else {
				b[b.length-1]++;
			}
			prev = itemId[i];
		}
		return [a, b];
	}

	render() {
		const { switchComp, items, clickedItem, itemId} = this.state;
		this.clickedItemList();
		return (
			<div className='container'>
                <div className="AddToCart">
                    <div className='d-flex justify-content-between header'>
                        <span
							onClick={()=>this.switchComponents(false)}
						>
							{!switchComp?'All Items':'< Order Summary'}
						</span>
                        {
							!switchComp&&
                            <div className='message'>
                                {clickedItem?clickedItem:'No Item'} is added to cart
                            </div>
                        }
                        {
                            (this.state.count !== 0 && !switchComp) &&
                            <span className='count'>
                                {this.state.count}
                            </span>
                        }
                        {
							!switchComp&&
							<button
								onClick={()=>this.switchComponents(true)}
							>
								Go To Cart
							</button>
						}
                    </div>
				{
					switchComp?
						<GoToCart
							itemId={itemId}
							items={items}
							increDecreItems={this.increDecreItems}
							clickedItemList={this.clickedItemList}
						/>:
						<AddToCart
							displayMessage={this.displayMessage}
							items={items}
						/>
				}
			</div>
			</div>
		);
	}
}

export default App;
