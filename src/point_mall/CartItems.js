import React from 'react';
import axios from 'axios';
import ItemBox from './ItemBox';
import { withRouter } from 'react-router-dom';


class CartItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            cartItems: [],
        }
    }

    componentDidMount() {
        this.indexItems();
    }

    indexItems = () => {
        let cartItems = localStorage.getItem('cart_items');

        if (cartItems == null || cartItems.length < 1) {
            cartItems = [];
        } else {
            cartItems = JSON.parse(cartItems);
        }
        this.setState({
            cartItems: cartItems
        });
    }

    purchase = () => {
        const itemsQueue = [];
        for (let cartItem of this.state.cartItems) {
            for (let i = 0; i < cartItem.count; i++) {
                itemsQueue.push(cartItem.item.id);
            }
        }
        this.purchaseNextItem(itemsQueue);
    }

    purchaseNextItem(itemsQueue) {
        if (itemsQueue.length < 1) {
            localStorage.setItem('cart_items', '[]');
            this.props.history.push('/me/items');
        } else {
            const itemId = itemsQueue.shift();

            axios.post(
                'http://localhost:8000/items/' + itemId + '/purchase/',
                {},
                {
                    headers: {
                        'Authorization': localStorage.getItem('authorization')
                    }
                }
            ).then((response) => {
                this.purchaseNextItem(itemsQueue);
            });
        }
        
    }

    render() {
        const items = this.state.cartItems.map((cartItems) => {
            const item = cartItems.item;
            return (
                <ItemBox key={item.id} item={item} count={cartItems.count} />
            )
        });
        return (
            <div id="container">
                <h1>장바구니</h1>
                <button onClick={this.purchase}>모두구입</button>
                <div id="item-list-container">
                    {items}
                </div>
            </div>
        );
    }

}

export default withRouter(CartItems);