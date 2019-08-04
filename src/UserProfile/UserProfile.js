import React from 'react';
import './UserProfile.css';
import OfferElement from '../OfferElement/OfferElement';
import OfferModal from '../OfferModal/OfferModal';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showOfferModal: false,
            offerForEdit: {}
        };
        this.openOfferModal = this.openOfferModal.bind(this);
        this.hideOfferModal = this.hideOfferModal.bind(this);
        this.saveOfferModal = this.saveOfferModal.bind(this);
    }


    openOfferModal = (offer) => {
        this.setState({showOfferModal: true});
        this.setState({offerForEdit: offer});
    };


    openNewOfferModal = () => {
        this.setState({showOfferModal: true});
        this.setState({offerForEdit: {}});
    };


    hideOfferModal = () => {
        this.setState({showOfferModal: false});
        this.setState({offerForEdit: {}});
    };

    saveOfferModal = () => {
        this.setState({showOfferModal: false});

        //alert("ofer Saved" + offer.name);


        this.setState({offerForEdit: {}});
    };

    deleteOffer = () => {
        //alert("ofer Deleted" + offer.name);
    };


    render() {
        let offerModal = '';
        if (this.state.showOfferModal) {
            offerModal = <OfferModal offer={this.state.offerForEdit}
                                     hideOfferModal={this.hideOfferModal}
                                     saveOfferModal={this.saveOfferModal}
                />
        }

        let loadedUser = this.props.loadedUser;

        const machinesList = loadedUser.machinesForRent.map((m) =>
                <li key={m.id}>
                    <OfferElement offer={m}
                                  openOfferModal={this.openOfferModal}
                                  deleteOffer={this.deleteOffer}/>
                </li>
        );
        const servicesList = loadedUser.offeringServices.map((s) =>
                <li key={s.id}>
                    <OfferElement offer={s}
                                  openOfferModal={this.openOfferModal}
                                  deleteOffer={this.deleteOffer}/>
                </li>
        );

        const projectRequestsList = loadedUser.projectRequests.map((p) =>
                <li key={p.id}>
                    <OfferElement offer={p}
                                  openOfferModal={this.openOfferModal}
                                  deleteOffer={this.deleteOffer}/>
                </li>
        );


        return (
            <div>
                <h1> This is your user profile </h1>

                <p>Name: {loadedUser.name}</p>

                <p>Surname: {loadedUser.surname}</p>
                <ul>{machinesList}</ul>
                <ul>{servicesList}</ul>
                <ul>{projectRequestsList}</ul>
                {offerModal}
            </div>
        );

    }
}

export default UserProfile;