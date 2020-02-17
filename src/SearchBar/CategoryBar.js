import React from 'react';
import './SearchBar.css';

class CategoryBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //categoriesTree: '',
            //category: [],
        };
        //this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
    }


    handleMinValueInputChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;

        this.props.handleMinValueInputChange(id, value);
    };

    handleMaxValueInputChange = (event) => {

        const id = event.target.id;
        const value = event.target.value;

        this.props.handleMaxValueInputChange(id, value);
    };


    handleCategoriesChange = (event) => {

        const selectedVal = event.target.value;
        const level = event.target.id.replace('category_level_', '');

        this.props.handleCategoriesChange(level, selectedVal);
    };

    handlePredefinedValueInputChange = (event) => {

        const id = event.target.id;
        const value = event.target.value;

        this.props.handlePredefinedValueInputChange(id, value);
    };


    render() {

        const category = this.props.category;

        const subcategories = category._embedded ? category._embedded.subCategories : category.subCategories;

        const hasSubcategories = subcategories && subcategories.length > 0;

        if ((!subcategories || subcategories.length == 0)
            && (!category.parameters || category.parameters.length) == 0
            && (!category.parameters || category.parameters.length) == 0) {
            return '';
        }


        const optionList = hasSubcategories ? subcategories.map((c) =><option value={c.id}>{c.name}</option>) : '';

        const categoryTitle = hasSubcategories ? 'SubCategory :' : '';
        const categorySelect = hasSubcategories ?
            <select class="custom-select"
                    value={this.props.selectedSubCategory}
                    onChange={this.handleCategoriesChange}
                    id={'category_level_'+this.props.level}>
                <option value="">All</option>
                {optionList}
            </select>
            : '';


        let parameterInputs = '';

        if (category.parameters && category.parameters.length > 0) {
            parameterInputs = category.parameters.map(p =>
                    <tr>
                        <td>
                            {p.name}
                        </td>
                        <td>
                            <label>
                                Min:
                                <input class="form-control"
                                       type="text"
                                       id={'min_'+p.id}
                                       value={this.props.searchInputValue}
                                       onChange={this.handleMinValueInputChange}/>
                            </label>
                        </td>
                        <td >
                            <label>
                                Max:
                                <input class="form-control"
                                       type="text"
                                       id={'max_'+p.id}
                                       value={this.props.searchInputValue}
                                       onChange={this.handleMaxValueInputChange}/>
                            </label>
                        </td>
                    </tr>
            );
        }

        let predefinedParameterInputs = '';
        if (category.predefinedParameters && category.predefinedParameters.length > 0) {
            predefinedParameterInputs = category.predefinedParameters.map(p =>
                    <tr>
                        <td>
                            {p.name}:
                        </td>
                        <td >
                            <label>

                                <select  class="custom-select"
                                         onChange={this.handlePredefinedValueInputChange}
                                        id={'pre_'+p.id}>
                                    <option value="">All</option>
                                    {p.predefinedValuesEList.map(v =><option value={v.id}>{v.value}</option>) }
                                </select>
                            </label>
                        </td>
                    </tr>
            );
        }


        return (
            <div class="alert alert-primary">
                <table class="table">
                    <tr>
                        <td width="40%"> <h5>{category.name}</h5></td>
                        <td width="30%" align="right">{categoryTitle}</td>
                        <td width="30%">{categorySelect}</td>
                    </tr>
                    {predefinedParameterInputs}
                    {parameterInputs}
                </table>
            </div>
        );
    }
}

export default CategoryBar;