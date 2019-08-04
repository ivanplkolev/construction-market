import React from 'react';
import './OfferInElement.css';

class OfferElement extends React.Component {


    handleEdit = () => {
        this.props.openOfferModal(this.props.offer);
    };

    handleDelete = () => {
        this.props.deleteOffer(this.props.offer);
    };

    handleMakeAgreement = () => {
        this.props.showAgreementModal(this.props.offer);
    };


    render() {
        let offer = this.props.offer;
        return (
            <div key={offer.id}>
                <table>
                    <tbody>
                    <tr>
                        <td rowSpan="2">
                            <img src={offer.image} alt="MyImage"/>

                        </td>
                        <td >
                            {offer.name}
                        </td>
                        <td >
                        </td>
                        <td>
                            <button onClick={this.handleMakeAgreement}>Agreement</button>
                        </td>
                        <td>
                            <button onClick={this.handleEdit}>Edit</button>
                        </td>
                        <td>
                            <button onClick={this.handleDelete}>Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            {offer.description}
                        </td>
                        <td >
                            {offer.price}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default OfferElement;