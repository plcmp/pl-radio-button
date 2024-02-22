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
            height: var(--pl-base-size);
            align-items: center;
            box-sizing: border-box;
            gap: var(--pl-space-sm);
            user-select: none;
            font: var(--pl-text-font);
            cursor: pointer;
            background: var(--background-color);
            --pl-radio-border: var(--pl-grey-base);
            --pl-radio-background: var(--pl-background-color);
        }

        :host .radio {
            width: calc(var(--pl-base-size)/2 + 2px);
            height: calc(var(--pl-base-size)/2 + 2px);
            border-radius: 100%;
            border: 1px solid var(--pl-radio-border);
            background: var(--pl-radio-background);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .3s ease-in-out;
            flex-shrink: 0;
            box-sizing: border-box;
        }

        :host(:hover){
            --pl-radio-border: var(--pl-grey-dark);
        }

        :host([selected]) {
            --pl-radio-border: var(--pl-primary-base);
            --pl-radio-background: var(--pl-primary-base);
        }

        :host([selected]) .radio:hover {
            --pl-radio-border: var(--pl-primary-dark);
            --pl-radio-background: var(--pl-primary-dark);
        }

        :host([selected]) .radio::after {
            display: block;
            content: '';
            background: var(--pl-background-color);
            width: 8px;
            height: 8px;
            border-radius: 100%;
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
