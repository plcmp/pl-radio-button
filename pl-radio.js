import { PlElement, html, css } from "polylib";

class PlRadioButton extends PlElement {
    static get properties() {
        return {
            name: { type: String },
            selected: { type: Boolean, reflectToAttribute: true },
            label: { type: String }
        }
    }

    static get css() {
        return css`
            :host {
                display: flex;
                flex-direction: row;
                width: 100%;
                min-height: var(--base-size-md);
                align-items: center;
                box-sizing: border-box;
                gap: var(--space-sm);
                user-select: none;
                font: var(--text-font);
                cursor: pointer;
                margin: 0 8px;
            }

            :host .radio {
                width: var(--base-size-xxs);
                height: var(--base-size-xxs);
                border-radius: var(--base-size-xxs);
                border: 1px solid var(--grey-light);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all .3s ease-in-out;
            }

            :host(:hover) .radio{
                border: 1px solid var(--grey-dark);
            }

            :host([selected]) .radio {
                background: var(--primary-base);
                border: 1px solid var(--primary-base);
            }

            :host([selected]) .radio:hover {
                border: 1px solid var(--primary-dark);
                background: var(--primary-dark);
            }

            :host([selected]) .radio::after {
                display: block;
                content: '';
                background: white;
                width: 8px;
                height: 8px;
                border-radius: 8px;
            }
		`;
    }

    static get template() {
        return html`
            <span class="radio"></span> [[label]]
		`;
    }

    connectedCallback(){
        super.connectedCallback();
        this.addEventListener('click', this._onClick.bind(this));
    }

    _onClick() {
        this.dispatchEvent(new CustomEvent('radio-selected', { bubbles: true, composed: true, detail: this }));
    }
}

customElements.define('pl-radio', PlRadioButton);
