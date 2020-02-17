import React from 'react';
import './Offers.css';
import OfferElement from '../OfferElement/OfferElement';

class Offers extends React.Component {
    constructor(props) {
        super(props);

        //this.state = {
        //    //isAgreementModalVisible: false,
        //    offerForAgreement: {}
        //};
        //this.showAgreementModal = this.showAgreementModal.bind(this);
        //this.hideAgreementModal = this.hideAgreementModal.bind(this);
        //this.saveAgreemet = this.saveAgreemet.bind(this);

    }


    //showAgreementModal = (offer) => {
    //    this.setState({isAgreementModalVisible: true});
    //    this.setState({offerForAgreement: offer});
    //};


    //hideAgreementModal = () => {
    //    this.setState({isAgreementModalVisible: false});
    //    this.setState({offerForAgreement: {}});
    //};

    //saveAgreemet = () => {
    //    this.setState({isAgreementModalVisible: false});
    //
    //    //alert("ofer Saved" + offer.name);
    //
    //
    //    this.setState({offerForAgreement: {}});
    //};


    render() {


        let offersList = this.props.offerList;

        //let agreementModal = '';
        //if (this.state.isAgreementModalVisible) {
        //    agreementModal = <Agreement offer={this.state.offerForAgreement}
        //                                hideAgreementModal={this.hideAgreementModal}
        //                                saveAgreemet={this.saveAgreemet}/>
        //}


        const listItems = offersList.map((o) =><OfferElement  offer={o}/>);
        return (
            <div class="w-75 ">
                <div class="alert alert-primary" role="alert"> Here are the found offers</div>

                {listItems}
            </div>
        );

    }
}

export default Offers;