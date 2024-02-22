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
                padding: 0 var(--pl-space-md);
                height: var(--pl-base-size);
                min-width: fit-content;
                box-sizing: border-box;
                color: var(--pl-text-color);
                user-select: none;
                cursor: pointer;
                outline:none;
                transition: background, color .3s ease-in-out;
                flex-shrink: 0;
                font: var(--pl-text-font);
                border: 1px solid var(--pl-grey-base);
                border-right: 1px solid transparent;
                gap: 8px;
                background: var(--pl-background-color);
            }

            :host([selected]),  :host(:hover) {
                background: var(--pl-primary-base);
                border: 1px solid var(--pl-primary-base);
                color: white;
                --pl-icon-fill-color: white;
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

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._onClick.bind(this));
    }

    _onClick() {
        this.dispatchEvent(new CustomEvent('radio-selected', { bubbles: true, composed: true, detail: this }));
    }
}

customElements.define('pl-radio-button', PlRadioButton);
