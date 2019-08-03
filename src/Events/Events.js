import React from 'react';
import './Events.css';

class Events extends React.Component {

    render() {
        let myArray = this.props.eventsList;

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

export default Events;