import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject } from 'mobx-react';


@inject('authStore', 'itemStore', 'httpService')
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
        this.props.httpService.getItems(itemId)
            .then(item => {
                this.setState({
                    item
                });
            });
    }

    purchase = () => {
        const itemId = this.state.item.id;
        this.props.httpService.purchaseItem(itemId)
            .then(item => {
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