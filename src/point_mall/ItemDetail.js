import React from 'react';

class ItemDetail extends React.Component {
    render() {
        const itemID = this.props.match.params.itemID;
        return (
            <div>
                <h1>Item Detail</h1>
                <h2>{itemID}</h2>
            </div>
        );
    }
}

export default ItemDetail;