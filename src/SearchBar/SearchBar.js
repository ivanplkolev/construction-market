import React from 'react';
import './SearchBar.css';
import CategoryBar from './CategoryBar';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchType: '1',
            categoriesTree: '',
            category: [],
            searchInputValue: '',
            searchParamMinValues: {},
            searchParamMaxValues: {},
            searchParamPredefinedValues: {}
        };
        this.performSearch = this.performSearch.bind(this);
        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
        this.loadCategoriesFromServer = this.loadCategoriesFromServer.bind(this);
        this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
        this.handleMinValueInputChange = this.handleMinValueInputChange.bind(this);
        this.handleMaxValueInputChange = this.handleMaxValueInputChange.bind(this);
        this.handlePredefinedValueInputChange = this.handlePredefinedValueInputChange.bind(this);

    }

    loadCategoriesFromServer(type) {

        let url = 'http://localhost:8080/api/categoryEs/search/findRoot?type=' + type;

        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }).then(response => response.json())
            .then(jsonData => {

                this.setState({categoriesTree: jsonData});
                console.log(jsonData);
            }).catch(function (error) {
                console.log('Request failed', error)
            });
    }

    componentDidMount() {
        this.loadCategoriesFromServer(this.state.searchType);
    }

    handleSearchFieldChange = (event) => {
        const newSearchVal = event.target.value;
        this.setState({searchInputValue: newSearchVal});
    };

    handleCategoriesChange = (event) => {
        const selectedField = event.target;
        const selectedVal = selectedField.value;
        const inputId = selectedField.id.replace('selectField_', '');

        const oldCategory = this.state.category;

        const newCategory = [];

        for (let i = 0; i < oldCategory.length; i++) {
            if (oldCategory[i].key == inputId) {
                break;
            }
            newCategory.push(oldCategory[i]);
        }

        newCategory.push({"key": inputId, "value": selectedVal});

        this.setState({category: newCategory});
    };

    handleMinValueInputChange = (id, value) => {
        const oldSearchParamValues = this.state.searchParamMinValues;
        const newSearchParamValues = oldSearchParamValues;
        newSearchParamValues[id] = value;
        this.setState({searchParamMinValues: newSearchParamValues});
    };

    handleMaxValueInputChange = (id, value) => {
        const oldSearchParamValues = this.state.searchParamMaxValues;
        const newSearchParamValues = oldSearchParamValues;
        newSearchParamValues[id] = value;
        this.setState({searchParamMaxValues: newSearchParamValues});
    };


    handlePredefinedValueInputChange = (id, value) => {
        const oldSearchParamValues = this.state.searchParamPredefinedValues;
        const newSearchParamValues = oldSearchParamValues;
        newSearchParamValues[id] = value;
        this.setState({searchParamPredefinedValues: newSearchParamValues});
    };


    performSearch = () => {

        //construct search object

        const category = this.state.category;
        const searchInputValue = this.state.searchInputValue;
        const searchParamMinValues = this.state.searchParamMinValues;
        const searchParamMaxValues = this.state.searchParamMaxValues;
        const searchParamPredefinedValues = this.state.searchParamPredefinedValues;

        let reqString = '';


        reqString += 'searchInput=' + searchInputValue;

        if (category && category.length > 0) {
            const catLen = category.length;
            if (category[catLen - 1]) {
                reqString += ('&cat=' + category[catLen - 1].value);
            } else if (catLen > 1) {
                reqString += ('&cat=' + category[catLen - 2].value);
            }
        }

        for (var key in searchParamMinValues) {
            reqString += ('&' + key + '=' + searchParamMinValues[key]);
        }

        for (var key in searchParamMaxValues) {
            reqString += ('&' + key + '=' + searchParamMaxValues[key]);
        }

        for (var key in searchParamPredefinedValues) {
            reqString += ('&' + key + '=' + searchParamPredefinedValues[key]);
        }


        this.props.performSearch(reqString);
    };

    renderSubCategoriesFields(category, selectedSubCategory) {
        return <CategoryBar handleCategoriesChange={this.handleCategoriesChange}
                            handleMinValueInputChange={this.handleMinValueInputChange}
                            handleMaxValueInputChange={this.handleMaxValueInputChange}
                            handlePredefinedValueInputChange={this.handlePredefinedValueInputChange}
                            selectedSubCategory={selectedSubCategory}
                            category={category}/>;
    }

    getSubCategoriesFields() {
        if (!this.state.categoriesTree) {
            return [];
        }

        let renderedCategories = [];
        let selectedCategories = this.state.category;
        if (selectedCategories.length == 0) {
            selectedCategories = [{"key": 12, "value": ''}];
            this.setState({category: selectedCategories});
        }

        let catToDisplay = this.state.categoriesTree;
        let i = 1;
        while (catToDisplay) {

            let hasSelectedSubCat = selectedCategories.length <= i + 1 && selectedCategories[i];
            let selectedSubCat = hasSelectedSubCat ? selectedCategories[i].value : '';

            renderedCategories.push(this.renderSubCategoriesFields(catToDisplay, selectedSubCat));

            if (selectedSubCat) {
                let subCategories = catToDisplay._embedded ?
                    catToDisplay._embedded.subcategories : catToDisplay.subcategires;
                if (subCategories) {
                    for (let j = 0; j < subCategories.length; j++) {
                        if (subCategories[j].id == selectedSubCat) {
                            catToDisplay = subCategories[j];
                        }
                    }
                } else {
                    catToDisplay = '';
                }
            } else {
                catToDisplay = '';
            }
            i++;
        }
        return renderedCategories;
    }

    setOffersType(event) {
        //console.log(event.target.value);
        this.setState({searchType: event.target.value});
        this.loadCategoriesFromServer(event.target.value);
    }


    render() {
        const categoriesDiv = <div>
            {this.getSubCategoriesFields()}
        </div>;

        return (
            <div>

                <div onChange={this.setOffersType.bind(this)}>
                    <input type="radio" value="1" name="offeeTypeSearch"/> Services
                    <input type="radio" value="2" name="offeeTypeSearch"/> Machines
                    <input type="radio" value="3" name="offeeTypeSearch"/> Projects
                </div>

                <label>
                    Search for:
                    <input type="text"
                           value={this.state.searchInputValue}
                           onChange={this.handleSearchFieldChange}/>
                </label>
                <button onClick={this.performSearch}>Search</button>

                {categoriesDiv}
            </div>
        );

    }
}

export default SearchBar;