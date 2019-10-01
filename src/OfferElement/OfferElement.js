import React from 'react';
import './OfferInElement.css';

class OfferElement extends React.Component {


    handleEdit = () => {
        this.props.openOfferModal(this.props.offer);
    };

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

    handleMakeAgreement = () => {
        this.props.showAgreementModal(this.props.offer);
    };


    render() {
        let offer = this.props.offer;
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
                        <td >
                            <button className="buttonCool" onClick={this.handleEdit}>Edit</button>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            {offer.description}
                        </td>
                        <td >
                            <button className="buttonAgreement" onClick={this.handleMakeAgreement}>Agreement</button>
                        </td>
                        <td>
                            <button className="buttonCool" onClick={this.handleDelete}>Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default OfferElement;