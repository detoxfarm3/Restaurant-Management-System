"use strict";

var Globalize = require("globalize");
var globalizeLocalizer = require('react-widgets/lib/localizers/globalize');

Globalize.load(
    require("cldr-data/main/en/ca-gregorian"),
    require("cldr-data/main/en/currencies"),
    require("cldr-data/main/en/dateFields"),
    require("cldr-data/main/en/numbers"),
    require("cldr-data/main/en/units"),
    require("cldr-data/supplemental/currencyData"),
    require("cldr-data/supplemental/likelySubtags"),
    require("cldr-data/supplemental/plurals"),
    require("cldr-data/supplemental/timeData"),
    require("cldr-data/supplemental/weekData")
);

// Set "en" as our default locale.
Globalize.locale("en");


globalizeLocalizer(Globalize);

// Use Globalize to format dates.
console.log(Globalize.formatDate(new Date(), {datetime: "medium"}));

// Use Globalize to format numbers.
console.log(Globalize.formatNumber(12345.6789));

// Use Globalize to format currencies.
console.log(Globalize.formatCurrency(69900, "USD"));

// Use Globalize to get the plural form of a numeric value.
console.log(Globalize.plural(12345.6789));

// Use Globalize to format relative time.
console.log(Globalize.formatRelativeTime(-35, "second"));

// Use Globalize to format unit.
console.log(Globalize.formatUnit(60, "mile/hour", {form: "short"}));

module.exports = Globalize;