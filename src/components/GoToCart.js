import React, { Component } from 'react';

class GoToCart extends Component {

	state = {
        selectedItem: [],
        idArray: [],
        countArray: []
    }

    componentDidMount(){
        const { clickedItemList } = this.props;
        this.setState({
            selectedItem: [...new Set(this.props.itemId)],
            idArray: [...clickedItemList()[0]],
            countArray: [...clickedItemList()[1]],
        })
    }

    deleteItem = (deleteId, index) => {
        const {selectedItem } = this.state;
        this.setState({
            selectedItem: selectedItem.filter(di=>{
                                return di !== deleteId;
                            }),
        })
    }

    increment = (index) => {
        this.props.increDecreItems('plus');
        const {countArray} = this.state;
        (countArray[index]>=1) && ++countArray[index];
        this.setState({
            countArray: countArray
        })
    }

    decrement = (id, index) => {
        this.props.increDecreItems('minus');
        const {countArray} = this.state;
        (countArray[index]>=1) && --countArray[index];
        (countArray[index]===0) && this.deleteItem(id, index);
        this.setState({
            countArray: countArray
        })
    }
    
	render() {
        const { items, clickedItemList } = this.props;
        const { selectedItem, countArray } = this.state;
        let total=0;
        let discount=0;
        
		return (
            <div className='row'>
                <div className='col-md-8'>
                    <table className='table table-borderless'>
                        <thead>
                            <tr>
                                <th scope="col">Items ({countArray.reduce((a, b) => a + b, 0)})</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            selectedItem.map(sortData=>{
                                return items.map(data=>{
                                    let index = clickedItemList()[0].indexOf(sortData);
                                    data.id===sortData&&(total += data.price*countArray[index]);
                                    data.id===sortData&&(discount += data.discount*countArray[index]);
                                        return (data.id===sortData)&& <tr key={data.id}>
                                            <td>
                                                <div className='d-flex bd-highlight select-item align-middle'>
                                                    <img src={data.img_url} alt='jamal' className='p-2 bd-highlight' />
                                                    <div className='item-name p-2 bd-highlight align-middle'>
                                                        {data.name}
                                                </div>
                                                    <span 
                                                        className='ml-auto p-2 bd-highlight align-middle'
                                                        onClick={()=>this.deleteItem(data.id, index)}
                                                    >
                                                        X
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="quantity">
                                                    <button
                                                        onClick={()=>this.decrement( data.id ,index)}
                                                    >-</button>
                                                    <span>{countArray[index]}</span>
                                                    <button
                                                        onClick={()=>this.increment(index)}
                                                    >+</button>
                                                </div>
                                            </td>
                                            <td>{`$${data.price*countArray[index]}`}</td>
                                        </tr>
                                })
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className='col-md-4'>
                    <div className='total'>
                    <table>
                        <thead>
                            <tr>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Items ({countArray.reduce((a, b) => a + b, 0)})</td>
                                <td>:</td>
                                <td>{total}</td>
                            </tr>
                            <tr>
                                <td>Discount</td>
                                <td>:</td>
                                <td>{`-$${discount}`}</td>
                            </tr>
                            <tr>
                                <td>Type Discount</td>
                                <td>:</td>
                                <td>{`-$0`}</td>
                            </tr>
                            <tr className='total-bottom'>
                                <td>order Total</td>
                                <td>:</td>
                                <td>{`$${total-discount}`}</td>
                            </tr>
                        </tbody>
                    </table>    
                    </div>
                </div>
            </div>
		);
	}
}

export default GoToCart;
