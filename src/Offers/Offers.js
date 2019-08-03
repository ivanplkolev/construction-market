import React from 'react';
import './Offers.css';

class Offers extends React.Component {

    render() {


        let myArray = this.props.offerList;

        const listItems = myArray.map((number) =>
            <li key={number.toString()}>
                {number}
            </li>
        );
        return (
            <ul>{listItems}</ul>
        );

    }
}

export default Offers;