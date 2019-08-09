import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import DataHelper from '../DataHelper';


@inject('authStore', 'itemStore')
@observer
class Header extends React.Component {

    helper = new DataHelper();

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
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

    logout = () => {
        const { authStore } = this.props;
        authStore.deleteToken();
    }

    render() {
        const { authStore, itemStore } = this.props;
        const categories = this.state.categories.map((category) => {
            return (
                <Link key={category.id} to={'/categories/' + category.id}>{category.title}</Link>
            )
        });

        return (
            <header>
                <Link to="/">Point Mall</Link>
                {categories}
                <div className="header-right">
                    <Link to="/cart/items">Cart {itemStore.cartItemsCount}</Link>
                    {
                        authStore.isLoggedIn ? 
                            <Link to="/me/items">My Items</Link> : 
                            <Link to="/register">회원가입</Link>
                    }
                    {
                        authStore.isLoggedIn ?
                        <button href="#" onClick={this.logout}>Logout</button> :
                        <Link to="/login">Login</Link>
                    }
                </div>
            </header>
        );
    }
}

export default Header;