import React from 'react';
import './SearchBar.css';
import CategoryBar from './CategoryBar';
import axios from 'axios'


class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchType: '1',
            categoriesTree: '',
            searchCategory: [],
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

        axios.get(url)
            .then((jsonData) => {
                this.setState({categoriesTree: jsonData.data});
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

    handleCategoriesChange = (level, selectedVal) => {
        const oldCategory = this.state.searchCategory;
        const newCategory = [];

        for (let i = 0; i < level; i++) {
            newCategory.push(oldCategory[i]);
        }

        newCategory.push(selectedVal);

        this.setState({searchCategory: newCategory});
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

        const searchCategory = this.state.searchCategory;
        const searchInputValue = this.state.searchInputValue;
        const searchParamMinValues = this.state.searchParamMinValues;
        const searchParamMaxValues = this.state.searchParamMaxValues;
        const searchParamPredefinedValues = this.state.searchParamPredefinedValues;

        let reqString = '';


        reqString += 'searchInput=' + searchInputValue;

        if (searchCategory && searchCategory.length > 0) {
            const catLen = searchCategory.length;
            if (searchCategory[catLen - 1]) {
                reqString += ('&cat=' + searchCategory[catLen - 1]);
            } else if (catLen > 1) {
                reqString += ('&cat=' + searchCategory[catLen - 2]);
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

    renderSubCategoriesFields(category, selectedSubCategory, level) {
        return <CategoryBar handleCategoriesChange={this.handleCategoriesChange}
                            handleMinValueInputChange={this.handleMinValueInputChange}
                            handleMaxValueInputChange={this.handleMaxValueInputChange}
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
        let selectedCategories = this.state.searchCategory;
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
        this.setState({searchType: event.target.value});
        this.loadCategoriesFromServer(event.target.value);
    }


    render() {
        const categoriesDiv = <div>
            {this.getCategoriesFields()}
        </div>;

        let servicesClass = this.state.searchType == 1 ? "btn btn-primary btn-sm active" : "btn btn-primary btn-sm notActive";
        let machinesClass = this.state.searchType == 2 ? "btn btn-primary btn-sm active" : "btn btn-primary btn-sm notActive";
        let projectsClass = this.state.searchType == 3 ? "btn btn-primary btn-sm active" : "btn btn-primary btn-sm notActive";

        return (
            <div class="p-3 mb-2 bg-light text-dark">

                <div id="radioBtn" class="btn-group">
                    <button class={servicesClass} value="1" onClick={this.setOffersType.bind(this)}>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        Услуги
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </button>
                    <button class={machinesClass} value="2" onClick={this.setOffersType.bind(this)}>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        Машини
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </button>
                    <button class={projectsClass} value="3" onClick={this.setOffersType.bind(this)}>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        Проекти
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </button>
                </div>


                {categoriesDiv}

                <div class="col-md-3 mb-3 w-75">
                    <label for="validationTooltip05">Keyword:</label>
                    <input type="text" class="form-control" id="validationTooltip05"
                           value={this.state.searchInputValue}
                           onChange={this.handleSearchFieldChange}/>
                </div>

                <button class="btn btn-primary mb-2" onClick={this.performSearch}>Search</button>

            </div>
        );

    }
}

export default SearchBar;