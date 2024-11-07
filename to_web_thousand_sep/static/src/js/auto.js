/** @odoo-module **/

import { formatNumber, parseNumber } from './utils';

/**
* Auto format number inputs with attribute "data-twts" while typing.
*
* If "data-twts" value is id of another input element, that input element will be
* updated with parsed number value automatically, example:
*
* <input type="text" id="amount1" data-twts="amount2" />
* <input type="text" id="amount2" hidden="" />
*
* If "amount1" has value 1,000,000, then "amount2" will has value 1000000
*
* References:
* https://learn.jquery.com/events/event-delegation
*/

$(document).on("input", "input[data-twts]", function (e) {
    e.preventDefault();
    this.value = formatNumber(this.value);
    var target = document.getElementById(this.dataset.twts);
    if (target) {
        target.value = parseNumber(this.value);
    }
})
