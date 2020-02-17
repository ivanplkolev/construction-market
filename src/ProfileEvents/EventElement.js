import React from 'react';
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
        let offer = theEvent.parent;

        return (

            <div class="card mb-3" key={theEvent.id}>
                <div class="row no-gutters">
                    <div >
                        <img src={ require('../images/ni_small.jpg') }/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{theEvent.title}</h5>
                            <h5 class="card-title"> {theEvent.fromDate} -  {theEvent.toDate}</h5>

                            <Link class="btn btn-primary" to={`/createAgreement/${theEvent.id}`}>
                                <span >View The Offer</span>
                            </Link>
                            <Link class="btn btn-primary" to={`/createAgreement/${theEvent.id}`}>
                                <span >Add Agreement</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default EventElement;