import React from 'react';
import './OfferInElement.css';
import {Link} from 'react-router-dom'


class OfferElement extends React.Component {

    handleDelete = () => {
        //this.props.deleteOffer(this.props.offer);
        const url = 'http://localhost:8080/api/offerEs/' + this.props.offer.id;
        this.props.offer.deleted = true;
        fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.offer)
        })
            .then(window.location.reload())
            .catch(function (error) {
                console.log('Request failed', error)
            });
    };


    render() {
        let offer = this.props.offer;
        return (
            <div class="card mb-3" key={offer.id}>
                <div class="row no-gutters">
                    <div >
                        <img src={ require('../images/ni_small.jpg') }/>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{offer.title}</h5>

                            <p class="card-text">{offer.description}</p>

                            <p class="card-text">
                                <small class="text-muted">{offer.phoneNumber}</small>
                            </p>
                            <button class="btn btn-primary" onClick={this.handleDelete}>Delete</button>
                            <button class="btn btn-primary" onClick={this.handleEdit}>Edit</button>
                            <Link class="btn btn-primary" to={`/offer/${offer.title}`}>
                                <span >View The Offer</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default OfferElement;