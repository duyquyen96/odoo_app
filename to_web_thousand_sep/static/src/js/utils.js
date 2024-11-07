/** @odoo-module **/

import { registry } from "@web/core/registry";
import core from 'web.core';


export function formatNumber(value) {
    var thousandsSep = core._t.database.parameters.thousands_sep || ',';
    var decimalSep = core._t.database.parameters.decimal_point || '.';
    var str = String(value).trim();
    var sign = str.startsWith('-') ? '-' : '';
    // remove all characters except number and decimal separator
    str = str.replace(new RegExp('[^' + decimalSep + '\\d]', 'g'), '');
    // if the string starts with decimal separators, remove them
    str = str.replace(new RegExp('^\\' + decimalSep + '*'), '')
    // insert thousand separators
    str = str.replace(/\B(?=((\d{3})+(?!\d)))/g, thousandsSep);
    // remove invalid characters after the first decimal separator
    var splits = str.split(decimalSep);
    if (splits.length > 1) {
        str = splits[0] + decimalSep + splits[1].replace(new RegExp('\\' + thousandsSep, 'g'), '');
    }
    // restore sign
    str = sign + str;
    return str
}

export function formatFormula(formula) {
    if (!formula.startsWith('=')) {
        return formatNumber(formula);
    }
    var str = '';
    for (let v of formula.split(new RegExp(/([-+*/()^=\s])/g))) {
        if (!['+', '-', '*', '/', '(', ')', '^', '='].includes(v) && v.trim()) {
            v = formatNumber(v);
        }
        str += v;
    }
    return str;
}

export function parseNumber(value) {
    /**
    * Get number value from its language-sensitive representation.
    * Example: 1,000,000 => 1000000
    *
    * @param {string} value: a string that represents a number
    * @return {number}
    */
    var thousandsSep = core._t.database.parameters.thousands_sep || ',';
    var decimalSep = core._t.database.parameters.decimal_point || '.';
    var str = value;
    // remove all thousands separators
    str = str.replace(new RegExp('\\' + thousandsSep, 'g'), '');
    // remove language-dependent decimal separator with the standard separator (.)
    str = str.replace(decimalSep, '.');
    return Number(str);
}

registry
    .add("formatNumber", formatNumber)
    .add("formatFormula", formatFormula)
    .add("parseNumber", parseNumber);
