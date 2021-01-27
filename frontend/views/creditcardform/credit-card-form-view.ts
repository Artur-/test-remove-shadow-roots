import { CSSModule } from '@vaadin/flow-frontend/css-utils';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-custom-field/vaadin-custom-field';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-item/vaadin-item';
import '@vaadin/vaadin-list-box/vaadin-list-box';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-select/vaadin-select';
import '@vaadin/vaadin-text-field/vaadin-password-field';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import { css, customElement, html, LitElement } from 'lit-element';

@customElement('credit-card-form-view')
export class CreditCardFormView extends LitElement {
  static get styles() {
    return [
      CSSModule('lumo-badge'),
      CSSModule('lumo-color'),
      CSSModule('lumo-typography'),
      css`
        :host {
          display: block;
          margin: 0 auto;
          max-width: 1024px;
          padding: 0 var(--lumo-space-l);
        }
        .button-layout {
          margin-bottom: var(--lumo-space-l);
          margin-top: var(--lumo-space-m);
        }
      `,
    ];
  }

  render() {
    return html`
      <h3>Credit Card</h3>
      <vaadin-form-layout>
        <vaadin-text-field
          error-message="Please enter a valid credit card number"
          label="Credit card number"
          placeholder="1234 5678 9123 4567"
          pattern="[\\d ]*"
          prevent-invalid-input
          required
        >
        </vaadin-text-field>
        <vaadin-text-field label="Cardholder name"></vaadin-text-field>
        <vaadin-custom-field label="Expiration date">
          <vaadin-horizontal-layout theme="spacing">
            <vaadin-select placeholder="Month" style="flex-grow: 1; width: 100px;">
              <template>
                <vaadin-list-box>
                  <vaadin-item>1</vaadin-item>
                  <vaadin-item>2</vaadin-item>
                  <vaadin-item>3</vaadin-item>
                  <vaadin-item>4</vaadin-item>
                  <vaadin-item>5</vaadin-item>
                  <vaadin-item>6</vaadin-item>
                  <vaadin-item>7</vaadin-item>
                  <vaadin-item>8</vaadin-item>
                  <vaadin-item>9</vaadin-item>
                  <vaadin-item>10</vaadin-item>
                  <vaadin-item>11</vaadin-item>
                  <vaadin-item>12</vaadin-item>
                </vaadin-list-box>
              </template>
            </vaadin-select>
            <vaadin-select placeholder="Year" style="flex-grow: 1; width: 100px;">
              <template>
                <vaadin-list-box>
                  <vaadin-item>20</vaadin-item>
                  <vaadin-item>21</vaadin-item>
                  <vaadin-item>22</vaadin-item>
                  <vaadin-item>23</vaadin-item>
                  <vaadin-item>24</vaadin-item>
                  <vaadin-item>25</vaadin-item>
                </vaadin-list-box>
              </template>
            </vaadin-select>
          </vaadin-custom-field>
        </vaadin-horizontal-layout>
        <vaadin-password-field
          error-message="Please enter a valid security code"
          label="CSC"
          maxlength="4"
          minlength="3"
        >
        </vaadin-password-field>
      </vaadin-form-layout>
      <vaadin-horizontal-layout class="button-layout" theme="spacing">
        <vaadin-button theme="primary">Submit</vaadin-button>
        <vaadin-button>Cancel</vaadin-button>
      </vaadin-horizontal-layout>
    `;
  }
}
