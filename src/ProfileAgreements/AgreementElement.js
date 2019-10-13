import React from 'react';
import './ProfileAgreements.css';
import {Link} from 'react-router-dom'


class AgreementElement extends React.Component {

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
        let agreement = this.props.agreement;

        let details = agreement.agreementDetailEList.map((d) =>
                <tr>
                    <td >
                        {d.description}
                    </td>
                    <td >
                        {d.price}
                    </td>
                </tr>
        );


        return (
            <div key={agreement.id}>
                <table className="offerElement">
                    <tbody>
                    <tr>
                        <td >
                            Total Price
                        </td>

                        <td >
                            {agreement.totalPrice}

                        </td>
                    </tr>

                    {details}

                    </tbody>
                </table>
            </div>
        );
    }
}

export default AgreementElement;