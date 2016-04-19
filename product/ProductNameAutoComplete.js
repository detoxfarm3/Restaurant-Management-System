var React = require('react');
var lib = require('.././functions');
var Autosuggest = require('react-autosuggest');

class ProductNameAutoComplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            isLoading: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    }

    loadSuggestions(value) {
        this.setState({
            isLoading: true
        });

        const suggestions = getMatchingProducts(value, this.props.products || []);

        this.setState({
            isLoading: false,
            suggestions
        });
    }

    onChange(event, { newValue }) {
        var e = {target: {}};
        e.target.name = this.props.name;
        e.target.value = newValue;
        if (!!this.props.onChange) this.props.onChange(e);
    }

    onSuggestionsUpdateRequested({ value }) {
        this.loadSuggestions(value);
    }

    render() {
        const { suggestions, isLoading } = this.state;

        const value = this.props.value || "";

        const inputProps = {
            id: this.props.id || '',
            placeholder: this.props.placeholder || '',
            name: this.props.name || '',
            value: value,
            onChange: this.onChange,
            className: this.props.className,
        };
        const status = (isLoading
            ? <span className="text-info">Searching...</span>
            : (!suggestions.length && !!value)
            ? <span className="text-success">Not Found</span>
            : <span></span>);

        return (

            <Autosuggest suggestions={suggestions}
                         onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                         getSuggestionValue={getSuggestionValue}
                         renderSuggestion={renderSuggestion}
                         inputProps={inputProps}/>

        );
    }
}

ProductNameAutoComplete.defaultProps = {
    placeholder: 'Type inventory name',
    name: '',
    value: '',
    onChange: function () {
    },
    products: []
};

function getSuggestionValue(product) {
    return product.name;
}

function renderSuggestion(product) {
    return (
        <span>{product.name}</span>
    );
}

function getMatchingProducts(value, products) {
    const escapedValue = lib.escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return products.filter(product => regex.test(product.name));
}

module.exports = ProductNameAutoComplete;