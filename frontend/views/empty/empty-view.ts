import { css, customElement, html, LitElement } from 'lit-element';

@customElement('empty-view')
export class EmptyView extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<div>Content placeholder</div>`;
  }
}
