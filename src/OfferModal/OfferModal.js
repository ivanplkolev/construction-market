import React from 'react';
import './OfferModal.css';

class OfferModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offerForEdit: {}
        };
    }


    saveOffer = () => {
        this.props.saveOfferModal(this.state.offer);
    };


    handleOfferNameChange = (event) => {
        const userName = this.state.loggedUser.name;
        const email = event.target.value;
        const pass = this.state.loggedUser.password;
        this.setState({
            loggedUser: {
                name: userName,
                email: email,
                password: pass
            }
        });
    };


    render() {


        const offer = this.props.offer;


        //const userName = this.props.showModalSignUp ? <label>
        //    User Name:
        //    <input type="text" value={this.props.loggedUser.name}
        //           onChange={this.props.handleUserNameChange}/>
        //</label> : "";

        return (
            <div className="OfferModalStyleee display-block">
                <section className="modal-main">
                    <p> This is paragraph in the modal</p>


                    <label>
                        Offer Name:
                        <input type="text" value={this.props.offer.name}
                               onChange={this.handleOfferNameChange}/>
                    </label>

                    <label>
                        Description:
                        <input type="text" value={this.props.offer.description}
                               onChange={this.handleOfferDescriptionChange}/>
                    </label>

                    <label>
                        Location:
                        <input type="text" value={this.props.offer.location}
                               onChange={this.handleOfferLocationChange}/>
                    </label>


                    <label>
                        Price:
                        <input type="text" value={this.props.offer.price}
                               onChange={this.handleOfferPriceChange}/>
                    </label>


                    <button onClick={this.props.hideOfferModal}>Close</button>
                    <button onClick={this.saveOffer}>Save</button>

                </section>
            </div>
        );

    }
}

export default OfferModal;