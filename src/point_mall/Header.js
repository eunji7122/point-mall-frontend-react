import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { autorun } from 'mobx';
import DataHelper from '../DataHelper';



class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };

        const helper = new DataHelper();
        autorun(() => {
            console.log('header' + helper.authToken);
        });
    }

    

    componentDidMount() {
        this.indexCategories();
    }

    indexCategories() {
        axios.get(DataHelper.baseURL() + '/categories/')
            .then((response) => {
                const categories = response.data;
                this.setState({
                    categories: categories
                })
            });
    }

    render() {
        const categories = this.state.categories.map((category) => {
            return (
                <Link key={category.id} to={'/categories/' + category.id}>{category.title}</Link>
            )
        });

        return (
            <header>
                <a href="/">Point Mall</a>
                {categories}
                <a href=""></a>
                <div className="header-right">
                    <Link to="/cart/items">장바구니</Link>
                    <Link to="/me/items">My Items</Link>
                    <Link to="/login">Login</Link>
                </div>
            </header>
        );
    }
}

export default Header;