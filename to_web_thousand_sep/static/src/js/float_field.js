/** @odoo-module */

import {patch} from "web.utils";
import { FloatField } from '@web/views/fields/float/float_field';
import { formatFormula } from './utils';
const { useRef, useEffect } = owl;

patch(FloatField.prototype, "to_web_thousand_sep", {
    setup() {
        this._super();
        const inputRef = useRef("numpadDecimal");
        useEffect(
            (inputEl) => {
                if (inputEl) {
                    inputEl.addEventListener("input", this.onInput.bind(this));
                    return () => {
                        inputEl.removeEventListener("input", this.onInput.bind(this));
                    };
                }
            },
            () => [inputRef.el]
        );
    },

    onInput(ev) {
        if (this.props.type === "float_time") {
            return;
        }
        $(ev.target).val(function (index, value) {
            return formatFormula(value)
        });
    }
});
