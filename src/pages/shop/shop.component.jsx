import React from 'react';
import './shopdata.js';
import SHOP_DATA from './shopdata.js';
import Collection from '../../components/collection/collection.component.jsx';


class ShopPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            collections: SHOP_DATA
    }
}
    render(){
        const {collections} = this.state;
        return(
            <div className="shop-page">
            {
                collections.map(({id, ...otherCollectionProps}) =>(
                    <Collection key={id} {...otherCollectionProps} />
                ))
            }
            </div>
        );
    }
}

export default ShopPage;