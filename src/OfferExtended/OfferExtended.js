import React from 'react';
import './OfferExtended.css';

import axios from 'axios'
import { Link } from 'react-router-dom'

class OfferExtended extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            theOffer: null
        };

        this.loadOffer = this.loadOffer.bind(this)
    }

    loadOffer(offerTitle) {
        const url = 'http://localhost:8080/api/offerEs/search/findByTitle?title=' + offerTitle;

        axios.get(url)
            .then((jsonData) => {
                this.setState({theOffer: jsonData.data});
                //console.log(jsonStr);
            }).catch(function (error) {
                console.log('Request failed', error)
            });
    }


    render() {
        const location = this.props.location.pathname;
        let offer = this.state.theOffer;
        if (!offer) {
            const offerTitle = location.substr(location.indexOf('offer/') + 'offer/'.length);
            this.loadOffer(offerTitle);
            return "";//todo or some loading animation !
        }



        //const params = offer.offerParamEList.map((p) =>{return {p.reference.name} : {p.value} </br>;});


        return (
            <div key={offer.id}>
                <table className="offerElement">
                    <tbody>
                    <tr>
                        <td rowSpan="2">
                            <img src={ require('../images/ni_small.jpg') }/>
                        </td>
                        <td >
                            {offer.title}
                        </td>
                        <td >
                            {offer.phoneNumber}
                        </td>
                    </tr>
                    <tr>
                        <td >
                            {offer.description}
                        </td>
                        <td >
                            <Link to={`/createEvent/${offer.id}`}>
                                <button className="buttonEvent">Event</button>
                            </Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );

    }
}

export default OfferExtended;