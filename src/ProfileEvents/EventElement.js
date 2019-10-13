import React from 'react';
import './ProfileEvents.css';
import {Link} from 'react-router-dom'


class EventElement extends React.Component {

    //handleDelete = () => {
    //    //this.props.deleteOffer(this.props.offer);
    //    const url = 'http://localhost:8080/api/eventEs/' + this.props.offer.id;
    //    this.props.offer.deleted = true;
    //    fetch(url, {
    //        method: 'PUT',
    //        headers: {
    //            Accept: 'application/json',
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify(this.props.offer)
    //    })
    //        .then(window.location.reload())
    //        .catch(function (error) {
    //            console.log('Request failed', error)
    //        });
    //};


    render() {
        let theEvent = this.props.theEvent;
        return (
            <div key={theEvent.id}>
                <table className="offerElement">
                    <tbody>
                    <tr>
                        <td colSpan="2">
                            {theEvent.title}
                        </td>

                        <td >
                            <Link to={`/createAgreement/${theEvent.id}`}>
                                <button className="buttonEvent">Add Agreement</button>
                            </Link>

                        </td>
                    </tr>
                    <tr>
                        <td >
                            {theEvent.fromDate}
                        </td>
                        <td >
                            {theEvent.toDate}
                        </td>
                        <td>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default EventElement;