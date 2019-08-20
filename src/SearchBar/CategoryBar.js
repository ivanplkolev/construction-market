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
        this.props.handleCategoriesChange(event);
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

        const categorySelect = hasSubcategories ?
            <label>
                SubCategory:
                <select value={this.props.selectedSubCategory}
                        onChange={this.handleCategoriesChange}
                        id={'selectField_'+category.id}>
                    <option value="">All</option>
                    {optionList}
                </select>
            </label> : '';

        let parameterInputs = '';

        if (category.parameters && category.parameters.length > 0) {
            parameterInputs = category.parameters.map(p =>
                    <tr>
                        <td className="inpuCell">
                            <label>
                                Min {p.name}:
                                <input className="textInput"
                                       type="text"
                                       id={'min_'+p.id}
                                       value={this.props.searchInputValue}
                                       onChange={this.handleMinValueInputChange}/>
                            </label>
                        </td>
                        <td className="inpuCell">
                            <label>
                                Max {p.name}:
                                <input className="textInput"
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
                        <td columnSpan="2">
                            <label>
                                {p.name}:
                                <select onChange={this.handlePredefinedValueInputChange}
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
            <div className="categoryDiv">
                <p> {category.name}  </p>
                <table className="inpuTable">
                    <tr>
                        <td className="inpuCell">
                            {categorySelect}
                        </td>
                        <td className="inpuCell">
                            <table className="inpuTable">
                                {predefinedParameterInputs}
                                {parameterInputs}
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default CategoryBar;