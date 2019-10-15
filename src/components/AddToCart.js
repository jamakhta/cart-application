import React, { Component } from 'react';

class AddToCart extends Component {

	state = {
        clickCount: 0
	}

	render() {
        const { items, displayMessage } = this.props;
        return (
                    <div className='row'>
                        {
                            items.map(item=>{
                                return  <div className='col-md-3' key={item.id}>
                                        <div className='cart-items'> 
                                            <div className='single-item'>
                                                {
                                                    item.discount!==0&&
                                                        <div className='discount'>{`${item.discount}% off`}</div>
                                                }
                                                <div className='productImage'>
                                                    <img src={item.img_url} alt={item.name}/>
                                                </div>
                                            </div>
                                            <div className='cart-bottom'>
                                                <p>{item.name}</p>
                                                {
                                                    item.discount!==0&&
                                                    <span className='without-discount'>${item.price}</span>
                                                }
                                                <span className='with-discount'>${item.price - (item.price*item.discount)/100}</span>
                                                <button
                                                    onClick={()=>displayMessage(item.name, item.id)}
                                                >
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                </div>
                            })
                        }
                    </div>
		);
	}
}

export default AddToCart;
