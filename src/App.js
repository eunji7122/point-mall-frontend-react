import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './point_mall/Home';
import Login from './point_mall/Login';
import Header from './point_mall/Header';
import Footer from './point_mall/Footer';
import ItemDetail from './point_mall/ItemDetail';
import MyItems from './point_mall/MyItems';
import CategoryItems from './point_mall/CategoryItems';
import CartItems from './point_mall/CartItems';
import ObserverTest from './observer/ObserverTest';
import Register from './point_mall/Register';
import PromiseTest from './promise/PromiseTest';
import MyHistory from './point_mall/MyHistory';
import TagItems from './point_mall/TagItems';

function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/items/:itemId" component={ItemDetail} />
        <Route exact path="/me/items" component={MyItems} />
        <Route exact path="/me/histories" component={MyHistory} />
        <Route exact path="/categories/:categoryId" component={CategoryItems} />
        <Route exact path="/cart/items" component={CartItems} />
        <Route exact path="/observer-test" component={ObserverTest} />
        <Route exact path="/promise-test" component={PromiseTest} />
        <Route exact path="/tags/:tag" component={TagItems} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
