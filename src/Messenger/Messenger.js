import React from 'react';
import './Messenger.css';

class Messenger extends React.Component {

    render() {


        let conversations = this.props.conversations;

        const listItems = conversations.map((o) =>
                <li key={o.id}>
                    <div>
                        <h5>{o.topic}</h5>
                        <h6>{o.correspondent}</h6>

                        <p>{o.messages[o.messages.length - 1].date} : {o.messages[o.messages.length - 1].content}</p>
                    </div>
                </li>
        );
        return (
            <ul>
                <ul>This are your messages</ul>
                {listItems}
            </ul>
        );

    }
}

export default Messenger;