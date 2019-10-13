import React from 'react';
import './OfferModal.css';
import CategoryBar from '../SearchBar/CategoryBar';

import axios from 'axios'
import { Link } from 'react-router-dom'

class OfferModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categoriesTree: '',
            offerForEdit: null
        };

        this.loadOffer = this.loadOffer.bind(this)
        this.saveOffer = this.saveOffer.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeImpl = this.handleChangeImpl.bind(this)
        this.loadCategoriesFromServer = this.loadCategoriesFromServer.bind(this);
        this.handleCategoriesChange = this.handleCategoriesChange.bind(this);

    }

    loadCategoriesFromServer(type) {

        let url = 'http://localhost:8080/api/categoryEs/search/findRoot?type=' + type;

        axios.get(url)
            .then((jsonData) => {
                this.setState({categoriesTree: jsonData.data});
                console.log(jsonData);
            }).catch(function (error) {
                console.log('Request failed', error)
            });
    }


    handleCategoriesChange = (level, selectedVal) => {

        let offerForEditclone = JSON.parse(JSON.stringify(this.state.offerForEdit));

        let oldCategory = offerForEditclone.searchCategory;
        let newCategory = [];

        for (let i = 0; i < level; i++) {
            newCategory.push(oldCategory[i]);
        }

        newCategory.push(selectedVal);

        offerForEditclone.searchCategory = newCategory;


        this.setState({offerForEdit: offerForEditclone});
    };


    saveOffer = () => {
        const url = 'http://localhost:8080/api/saveHelper/offerEs';
        //const url = 'http://localhost:8080/api/offerEs';

        const offer = this.state.offerForEdit;

        offer.categoryE = {id: parseInt(offer.searchCategory[offer.searchCategory.length - 1])};

        //var postdata = new URLSearchParams();
        //postdata.append('offer', offer);

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

    componentDidMount() {
        //    this.loadLoggedUser();
        this.loadCategoriesFromServer(1);
    }

    handleChangeImpl(propertyName, propertyValue) {

        const offer = this.state.offerForEdit;

        offer[propertyName] = propertyValue;

        this.setState(
            {
                offerForEdit: offer
            }
        )
    }


    handleChange(event) {
        const propertyName = event.target.name;
        const propertyValue = event.target.value;

        this.handleChangeImpl(propertyName, propertyValue);
    }


    renderSubCategoriesFields(category, selectedSubCategory, level) {
        return <CategoryBar handleCategoriesChange={this.handleCategoriesChange}
                            handleMinValueInputChange={this.handleParamValueInputChange}
                            handleMaxValueInputChange={this.handleParamValueInputChange}
                            handlePredefinedValueInputChange={this.handlePredefinedValueInputChange}
                            selectedSubCategory={selectedSubCategory}
                            level={level}
                            category={category}/>;
    }

    getCategoriesFields() {
        if (!this.state.categoriesTree) {
            return [];
        }

        let renderedCategories = [];
        let selectedCategories = this.state.offerForEdit.searchCategory;
        let subCategoryToShow = this.state.categoriesTree;

        renderedCategories.push(this.renderSubCategoriesFields(subCategoryToShow, selectedCategories[0], 0));

        const selectedCategiresSize = selectedCategories.length;

        for (let i = 0; i < selectedCategiresSize; i++) {
            const hasSelectedSubCategory = selectedCategiresSize > i + 1;
            const selectedSubcategoryId = hasSelectedSubCategory ? selectedCategories[i + 1] : '';
            const selectedCategoryId = selectedCategories[i];
            const subcategoriesList = subCategoryToShow._embedded ?
                subCategoryToShow._embedded.subCategories : subCategoryToShow.subCategories;
            for (let j = 0; j < subcategoriesList.length; j++) {
                if (selectedCategoryId == subcategoriesList[j].id) {
                    subCategoryToShow = subcategoriesList[j];
                    break;
                }
            }

            renderedCategories.push(this.renderSubCategoriesFields(subCategoryToShow, selectedSubcategoryId, i + 1));
        }

        return renderedCategories;
    }


    setOffersType(event) {
        //console.log(event.target.value);

        this.state.offerForEdit.type = event.target.value;

        //this.setState({searchType: event.target.value});


        this.loadCategoriesFromServer(event.target.value);
    }

    handleParamValueInputChange = (id, value) => {
        let list = this.state.offerForEdit.offerParamEList;
        let paramId = id.substr(4);
        let found = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].reference.id == paramId) {
                list[i].value = value;
                found = true;
                break;
            }
        }

        if (!found) {
            let newOfferParam = {reference: {id: paramId}, value: value};
            list.push(newOfferParam);
        }
    };


    handlePredefinedValueInputChange = (id, value) => {
        let list = this.state.offerForEdit.predefinedOfferParamEList;
        let paramId = id.substr(4);
        let found = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].reference.id == paramId) {
                list[i].predefinedValuesE = {id: value};
                found = true;
                break;
            }
        }

        if (!found) {
            let newPredefinedOfferParam = {reference: {id: paramId}, predefinedValuesE: {id: value}};
            list.push(newPredefinedOfferParam);
        }
    };

    render() {

        const location = this.props.location.pathname;

        let offerForEdit = this.state.offerForEdit;


        if (location == '/createoffer') {
            if (!offerForEdit) {
                offerForEdit = {};
                offerForEdit.searchCategory = [];
                offerForEdit.predefinedOfferParamEList = [];
                offerForEdit.offerParamEList = [];
                //offerForEdit.searchType =1;

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

        const categoriesDiv = <div>
            {this.getCategoriesFields()}
        </div>;


        return (
            <div className="OfferModalStyleee display-block">
                <section className="modal-main">

                    <div onChange={this.setOffersType.bind(this)}>
                        <input type="radio" value="1" name="offeeTypeSearch"/> Services
                        <input type="radio" value="2" name="offeeTypeSearch"/> Machines
                        <input type="radio" value="3" name="offeeTypeSearch"/> Projects
                    </div>

                    <label>
                        Offer Name:
                        <input type="text"
                               name="title"
                               value={offerForEdit.name}
                               onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <br/>

                    {categoriesDiv}


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