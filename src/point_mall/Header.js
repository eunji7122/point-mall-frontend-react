import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import DataHelper from '../DataHelper';


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
        this.helper.deleteToken();
    }

    render() {
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
                    <Link to="/cart/items">장바구니</Link>
                    <Link to="/me/items">My Items</Link>
                    {
                        this.helper.isLoggedIn ?
                        <button href="#" onClick={this.logout}>Logout</button> :
                        <Link to="/login">Login</Link>
                    }
                </div>
            </header>
        );
    }
}

export default Header;