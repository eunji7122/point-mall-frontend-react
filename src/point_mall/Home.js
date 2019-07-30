import React from 'react';
import axios from 'axios';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.indexItems();
    }

    indexItems(){
        axios.get('http://localhost:8000/items/')
            .then((response) => {
                const items = response.data;
                this.setState({
                    items: items
                })
            });
        
    }

    render() {
        const items = this.state.items.map((item) => {
            return (
                <div key={item.id} className="item-container">
                    <img src={item.image} alt="" />
                    <p className="item-title">{item.title}</p>
                    <p className="item-price">가격: {item.price} P</p>
                </div>
            )
        });
        return (
            <div id="container">
                <div id="item-list-container">
                    {items}
                </div>
            </div>
        );
    }
}

export default Home;