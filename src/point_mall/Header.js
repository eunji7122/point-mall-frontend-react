import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';


@inject('itemStore', 'httpService', 'authStore', 'history')
@observer
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            categories: []
        };
    }

    componentDidMount() {
        this.indexCategories();
    }

    indexCategories() {
        this.props.httpService.indexCategories()
            .then(categories => {
                this.setState({
                    categories
                });
            });
    }

    logout = () => {
        const { authStore } = this.props;
        authStore.deleteToken();
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'search') {
            this.setState({
                searchText: target.value
            });
        }
    }

    search = () => {
        this.props.history.push('/tags/' + this.state.searchText);
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
                    <input value={this.state.searchText} onChange={this.onInputChanged} type="text" name="search"></input>
                    <button style={{ marginRight: '1em' }} onClick={this.search}>Search</button>
                    <Link to="/cart/items">Cart {itemStore.cartItemsCount}</Link>
                    {
                        authStore.isLoggedIn &&
                        <Link to="/me/histories">구매내역</Link>
                    }
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