import { PlElement, html, css } from "polylib";

class PlRadioButton extends PlElement {
    static properties = {
        name: { type: String },
        selected: { type: Boolean, reflectToAttribute: true },
        label: { type: String }
    }

    static css = css`
        :host {
            display: flex;
            flex-direction: row;
            min-height: var(--base-size-md);
            align-items: center;
            box-sizing: border-box;
            gap: var(--space-sm);
            user-select: none;
            font: var(--text-font);
            cursor: pointer;
            margin: 0 8px;
            background: var(--background-color);
            --pl-radio-border: var(--grey-base);
            --pl-radio-background: var(--background-color);
        }

        :host .radio {
            width: var(--base-size-xxs);
            height: var(--base-size-xxs);
            border-radius: var(--base-size-xxs);
            border: 1px solid var(--pl-radio-border);
            background: var(--pl-radio-background);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .3s ease-in-out;
            flex-shrink: 0;
        }

        :host(:hover){
            --pl-radio-border: var(--grey-dark);
        }

        :host([selected]) {
            --pl-radio-border: var(--primary-base);
            --pl-radio-background: var(--primary-base);
        }

        :host([selected]) .radio:hover {
            --pl-radio-border: var(--primary-dark);
            --pl-radio-background: var(--primary-dark);
        }

        :host([selected]) .radio::after {
            display: block;
            content: '';
            background: var(--background-color);
            width: 8px;
            height: 8px;
            border-radius: 8px;
        }
    `;

    static template = html`
        <div part="radio" class="radio"></div> [[label]]
    `;

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._onClick.bind(this));
    }

    _onClick() {
        this.dispatchEvent(new CustomEvent('radio-selected', { bubbles: true, composed: true, detail: this }));
    }
}

customElements.define('pl-radio', PlRadioButton);
