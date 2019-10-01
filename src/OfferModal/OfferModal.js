import React from 'react';
import './OfferModal.css';
import axios from 'axios'
import { Link } from 'react-router-dom'

class OfferModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offerForEdit: null
        };

        this.loadOffer = this.loadOffer.bind(this)
        this.saveOffer = this.saveOffer.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }


    saveOffer = () => {
        const url = 'http://localhost:8080/api/offerEs';

        const offer = this.state.offerForEdit;
        var postdata = new URLSearchParams();
        postdata.append('offer', offer);

        if (this.props.location.pathname == '/createoffer') {
            return axios.post(url, offer);
        } else {
            return axios.put(url, JSON.stringify(this.props.offer));
        }
    };


    loadOffer(offerId) {
        const url = 'http://localhost:8080/api/offerEs/search/findbyId?id=' + offerId;

        axios.get(url)
            .then((jsonData) => {
                this.setState({offerForEdit: jsonData.data});
                //console.log(jsonStr);
            }).catch(function (error) {
                console.log('Request failed', error)
            });
    }

    //componentDidMount() {
    //    this.loadLoggedUser();
    //}

    handleChange(event) {
        const propertyName = event.target.name;
        const propertyValue = event.target.value;

        const offer = this.state.offerForEdit;

        offer[propertyName] = propertyValue;

        this.setState(
            {
                offerForEdit: offer
            }
        )
    }

    render() {

        const location = this.props.location.pathname;

        let offerForEdit = this.state.offerForEdit;


        if (location == '/createoffer') {
            if (!offerForEdit) {
                offerForEdit = {};

                this.setState(
                    {
                        offerForEdit: offerForEdit
                    }
                );
                return "";
            }
        } else {
            if (!offerForEdit) {
                offerForEdit = {};
                const offerId = location.subString('/editoffer/');
                this.loadOffer(offerId);
                return "";
            }
        }

        return (
            <div className="OfferModalStyleee display-block">
                <section className="modal-main">
                    <label>
                        Offer Name:
                        <input type="text"
                               name="title"
                               value={offerForEdit.name}
                               onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <br/>

                    <label>
                        Description:
                        <input type="text"
                               name="description"
                               value={offerForEdit.description}
                               onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <br/>

                    <label>
                        Phone Number:
                        <input type="text"
                               name="phoneNumber"
                               value={offerForEdit.phoneNumber}
                               onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <br/>


                    <label>
                        Price:
                        <input type="text"
                               name="price"
                               value={offerForEdit.price}
                               onChange={this.handleChange}/>
                    </label>

                    <br/>
                    <br/>


                    <Link to="/">Close</Link>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <Link to="/" onClick={this.saveOffer}>Save</Link>

                </section>
            </div>
        );

    }
}

export default OfferModal;