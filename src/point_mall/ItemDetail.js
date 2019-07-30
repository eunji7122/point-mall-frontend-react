import React from 'react';
import axios from 'axios';

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
        axios.get('http://localhost:8000/items/' + itemId)
            .then((response) => {
                console.log(response.data);
                const item = response.data;
                this.setState({
                    item: item
                })
            });
    }

    purchase = () => {
        const itemId = this.state.item.id;
        axios.post(
            'http://localhost:8000/items/' + itemId + '/purchase/',
            {},
            {
                headers: {
                    'Authorization': localStorage.getItem('authorization')
                }
            }
        ).then((response) => {
            this.props.history.push('/me/items')
        });
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
                </div>
            </div>
        );
    }
}

export default ItemDetail;