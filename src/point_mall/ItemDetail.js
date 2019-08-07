import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import DataHelper from '../DataHelper';
import { inject } from 'mobx-react';


@inject('authStore', 'itemStore')
class ItemDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null
        };
    }

    componentDidMount() {
        this.getItem();
    }

    getItem = () => {
        const itemId = this.props.match.params.itemId;
        axios.get(DataHelper.baseURL() + '/items/' + itemId)
            .then((response) => {
                const item = response.data;
                this.setState({
                    item: item
                })
            });
    }

    purchase = () => {
        const itemId = this.state.item.id;
        const { authStore } = this.props;
        axios.post(
            DataHelper.baseURL() + '/items/' + itemId + '/purchase/',
            {},
            {
                headers: {
                    'Authorization': authStore.authToken
                }
            }
        ).then((response) => {
            this.props.history.push('/me/items')
        });
    }

    addToCart = () => {
        const { itemStore } = this.props;
        const item = this.state.item;
        itemStore.addItemToCart(item);
    }

    render() {
        const item = this.state.item;
        const title = item ? item.title : '';
        const desc = item ? item.description: '';
        const image = item ? item.image: null;

        return (
            <div id="container">
                <div className="item-image-container">
                    <img src={image} alt="" />
                </div>
                <div className="item-detail-container">
                    <p>
                        <b>{title}</b>
                    </p>
                    <p>
                        {desc}
                    </p>
                    <button onClick={this.purchase}>구입</button>
                    <button onClick={this.addToCart}>장바구니에 담기</button>
                </div>
            </div>
        );
    }
}

export default withRouter(ItemDetail);