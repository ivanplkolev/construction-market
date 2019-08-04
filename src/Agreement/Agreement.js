import React from 'react';
import './Agreement.css';

class Agreement extends React.Component {
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

                    <label>
                        Description Of the Agreement:
                        <input type="text" value={this.props.offer.description}
                               onChange={this.handleOfferDescriptionChange}/>
                    </label>

                    <label>
                        Price Of the Agreement:
                        <input type="text" value={this.props.offer.description}
                               onChange={this.handleOfferDescriptionChange}/>
                    </label>


                    <h6> Subprices:  </h6>

                    <label>
                        Description Of the Agreement subpart 1:
                        <input type="text" value={this.props.offer.description}
                               onChange={this.handleOfferDescriptionChange}/>
                    </label>

                    <label>
                        Price Of the Agreement subpart 1:
                        <input type="text" value={this.props.offer.description}
                               onChange={this.handleOfferDescriptionChange}/>
                    </label>

                    <label>
                        Description Of the Agreement subpart 2:
                        <input type="text" value={this.props.offer.description}
                               onChange={this.handleOfferDescriptionChange}/>
                    </label>

                    <label>
                        Price Of the Agreement subpart 2:
                        <input type="text" value={this.props.offer.description}
                               onChange={this.handleOfferDescriptionChange}/>
                    </label>


                    <button onClick={this.props.hideOfferModal}>Close</button>
                    <button onClick={this.saveOffer}>Send Request</button>

                </section>
            </div>
        );

    }
}

export default Agreement;