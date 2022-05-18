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
                align-items: center;
                justify-content: center;
                padding: var(--space-xs) var(--space-sm);
                height: var(--base-size-md);
                min-width: fit-content;
                box-sizing: border-box;
                color: var(--text-color);
                user-select: none;
                cursor: pointer;
                outline:none;
                transition: all .3s ease-in-out;
                flex-shrink: 0;
                font: var(--text-font);
                border-left: 1px solid var(--grey-base);
                border-right:none;
                gap: 8px;
            }

            :host([selected]),  :host(:hover) {
                background: var(--primary-base);
                border: 1px solid var(--primary-base);
                color: white;
            }

		`;
    }

    static get template() {
        return html`
            <slot name="prefix"></slot>
            [[label]]
            <slot name="suffix"></slot>
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

customElements.define('pl-radio-button', PlRadioButton);
