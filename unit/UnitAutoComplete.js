var React = require('react');
var lib = require('../components/functions');
var Autosuggest = require('react-autosuggest');

class UnitAutoComplete extends React.Component {
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

        // Fake an AJAX call
        setTimeout(() => {
            const suggestions = getMatchingLanguages(value);

            if (value === this.props.value) {
                this.setState({
                    isLoading: false,
                    suggestions
                });
            } else { // Ignore suggestions if input value changed
                this.setState({
                    isLoading: false
                });
            }
        }, randomDelay());
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
            onChange: this.onChange
        };
        const status = (isLoading ? <span className="text-info">Searching...</span>
            : (!suggestions.length && !!value) ? <span className="text-success">Not Found</span> : '');

        return (
            <div className="row">
                <div className="col-md-10">

                    <Autosuggest suggestions={suggestions}
                                 onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                                 getSuggestionValue={getSuggestionValue}
                                 renderSuggestion={renderSuggestion}
                                 inputProps={inputProps}/>

                </div>

                <div className="col-md-2">
                    {status}
                </div>
            </div>
        );
    }
}

UnitAutoComplete.defaultProps = {
    placeholder: 'Type unit name',
    name: '',
    value: '',
    onChange: function () {
    }
};

function getSuggestionValue(unit) {
    return unit.name;
}

function renderSuggestion(unit) {
    return (
        <span>{unit.name}</span>
    );
}

function getMatchingLanguages(value) {
    const escapedValue = lib.escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages.filter(language => regex.test(language.name));
}

function randomDelay() {
    return 300 + Math.random() * 1000;
}

const languages = [
    {
        name: 'C',
        year: 1972
    },
    {
        name: 'C#',
        year: 2000
    },
    {
        name: 'C++',
        year: 1983
    },
    {
        name: 'Clojure',
        year: 2007
    },
    {
        name: 'Elm',
        year: 2012
    },
    {
        name: 'Go',
        year: 2009
    },
    {
        name: 'Haskell',
        year: 1990
    },
    {
        name: 'Java',
        year: 1995
    },
    {
        name: 'Javascript',
        year: 1995
    },
    {
        name: 'Perl',
        year: 1987
    },
    {
        name: 'PHP',
        year: 1995
    },
    {
        name: 'Python',
        year: 1991
    },
    {
        name: 'Ruby',
        year: 1995
    },
    {
        name: 'Scala',
        year: 2003
    }
];

module.exports = UnitAutoComplete;