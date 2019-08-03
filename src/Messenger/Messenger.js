import React from 'react';
import './Messenger.css';

class Messenger extends React.Component {

    render() {


        let myArray = this.props.messageslist;

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

export default Messenger;