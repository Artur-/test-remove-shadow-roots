import { CSSModule } from '@vaadin/flow-frontend/css-utils';
// web components used in the view
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import '@vaadin/vaadin-date-picker/vaadin-date-picker';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro';
import '@vaadin/vaadin-grid-pro/vaadin-grid-pro-edit-column';
import '@vaadin/vaadin-grid/all-imports';
import '@vaadin/vaadin-lumo-styles/all-imports';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-text-field/vaadin-number-field';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import { customElement, html, LitElement, property, query, unsafeCSS } from 'lit-element';
import { parts, render } from 'lit-html';
// import the remote endpoint
import * as viewEndpoint from '../../generated/ListEndpoint';
import styles from './list-view.css';

@customElement('list-view')
export class ListView extends LitElement {
  @query('#grid') private grid: any;

  @property()
  statusOptions: String[] = ['Pending', 'Success', 'Error'];

  currencyFormatter: any = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  dateFormatter: any = new Intl.DateTimeFormat('en-US');

  protected _boundRenderAmount = this.renderAmount.bind(this);

  protected _boundRenderDate = this.renderDate.bind(this);

  static get styles() {
    return [CSSModule('lumo-typography'), CSSModule('lumo-badge'), unsafeCSS(styles)];
  }

  render() {
    return html`
      <vaadin-grid-pro id="grid" theme="no-border column-borders">
        <vaadin-grid-selection-column auto-select></vaadin-grid-selection-column>

        <vaadin-grid-column-group id="id-column-group" .headerRenderer="${this.renderIdGroupHeader}">
          <vaadin-grid-column
            id="id-column"
            path="id"
            flex-grow="0"
            width="120px"
            .headerRenderer="${this.renderIdHeader}"
          >
          </vaadin-grid-column>
        </vaadin-grid-column-group>

        <vaadin-grid-column-group id="client-column-group" .headerRenderer="${this.renderClientGroupHeader}">
          <vaadin-grid-column
            id="client-column"
            path="client"
            .headerRenderer="${this.renderClientHeader}"
            .renderer="${this.renderClient}"
          >
          </vaadin-grid-column>
        </vaadin-grid-column-group>

        <vaadin-grid-column-group id="amount-column-group" .headerRenderer="${this.renderAmountGroupHeader}">
          <vaadin-grid-pro-edit-column
            id="amount-column"
            path="amount"
            .headerRenderer=${this.renderAmountHeader}
            .renderer="${this._boundRenderAmount}"
          >
          </vaadin-grid-pro-edit-column>
        </vaadin-grid-column-group>

        <vaadin-grid-column-group id="status-column-group" .headerRenderer="${this.renderStatusGroupHeader}">
          <vaadin-grid-pro-edit-column
            id="status-column"
            path="status"
            editor-type="select"
            .editorOptions="${this.statusOptions}"
            .headerRenderer=${this.renderStatusHeader}
            .renderer=${this.renderStatus}
          >
          </vaadin-grid-pro-edit-column>
        </vaadin-grid-column-group>

        <vaadin-grid-column-group id="date-column-group" .headerRenderer="${this.renderDateGroupHeader}">
          <vaadin-grid-column
            id="date-column"
            path="date"
            flex-grow="0"
            width="180px"
            .headerRenderer=${this.renderDateHeader}
            .renderer=${this._boundRenderDate}
          >
          </vaadin-grid-column>
        </vaadin-grid-column-group>
      </vaadin-grid-pro>
    `;
  }

  firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);

    // Retrieve data from the server-side endpoint.
    viewEndpoint.clients().then((items) => {
      this.grid.items = items;
    });
  }

  renderIdGroupHeader(root: Element) {
    root.innerHTML = '<vaadin-grid-sorter path="id">ID</vaadin-grid-sorter>';
  }

  renderIdHeader(root: Element) {
    render(
      html`
        <vaadin-grid-filter path="id">
          <vaadin-number-field
            @value-changed="${(e: any) => {
              e.currentTarget.parentElement.value = e.detail.value;
            }}"
            clear-button-visible
            placeholder="Filter"
            slot="filter"
          ></vaadin-number-field>
        </vaadin-grid-filter>
      `,
      root
    );
  }

  renderClientGroupHeader(root: Element) {
    root.innerHTML = '<vaadin-grid-sorter path="client">Client</vaadin-grid-sorter>';
  }

  renderClientHeader(root: Element) {
    render(
      html`
        <vaadin-grid-filter path="client">
          <vaadin-text-field
            @value-changed="${(e: any) => {
              e.currentTarget.parentElement.value = e.detail.value;
            }}"
            clear-button-visible
            placeholder="Filter"
            slot="filter"
          ></vaadin-text-field>
        </vaadin-grid-filter>
      `,
      root
    );
  }

  renderClient(root: Element, _column: any, rowData: any) {
    if (parts.has(root) && root.childElementCount == 0) {
      parts.delete(root);
    }
    render(
      html`
        <vaadin-horizontal-layout theme="spacing">
          <img src="${rowData.item.img}" />
          <span class="name">${rowData.item.client}</span>
        </vaadin-horizontal-layout>
      `,
      root
    );
  }

  renderAmountGroupHeader(root: Element) {
    root.innerHTML = '<vaadin-grid-sorter path="amount">Amount</vaadin-grid-sorter>';
  }

  renderAmountHeader(root: Element) {
    render(
      html`
        <vaadin-grid-filter path="amount">
          <vaadin-text-field
            @value-changed="${(e: any) => {
              e.currentTarget.parentElement.value = e.detail.value;
            }}"
            clear-button-visible
            placeholder="Filter"
            slot="filter"
          ></vaadin-text-field>
        </vaadin-grid-filter>
      `,
      root
    );
  }

  renderAmount(root: Element, _column: any, rowData: any) {
    if (parts.has(root) && root.childElementCount == 0) {
      parts.delete(root);
    }
    render(html`<span>${this.currencyFormatter.format(rowData.item.amount)}</span>`, root);
  }

  renderStatusGroupHeader(root: Element) {
    root.innerHTML = '<vaadin-grid-sorter path="status">Status</vaadin-grid-sorter>';
  }

  renderStatusHeader(root: Element) {
    render(
      html`
        <vaadin-grid-filter path="status">
          <vaadin-combo-box
            @value-changed="${(e: any) => {
              e.currentTarget.parentElement.value = e.detail.value;
            }}"
            clear-button-visible
            placeholder="Filter"
            slot="filter"
            .items="${this.statusOptions}"
          ></vaadin-combo-box>
        </vaadin-grid-filter>
      `,
      root
    );
    (root.querySelector('vaadin-combo-box') as any).items = ['Pending', 'Success', 'Error'];
  }

  renderStatus(root: Element, _column: any, rowData: any) {
    if (parts.has(root) && root.childElementCount == 0) {
      parts.delete(root);
    }
    render(html` <span theme="badge ${rowData.item.status.toLowerCase()}"> ${rowData.item.status} </span> `, root);
  }

  renderDateGroupHeader(root: Element) {
    root.innerHTML = '<vaadin-grid-sorter path="date">Date</vaadin-grid-sorter>';
  }

  renderDateHeader(root: Element) {
    render(
      html`
        <vaadin-grid-filter path="date">
          <vaadin-date-picker
            @value-changed="${(e: any) => {
              e.currentTarget.parentElement.value = e.detail.value;
            }}"
            clear-button-visible
            placeholder="Filter"
            slot="filter"
          ></vaadin-date-picker>
        </vaadin-grid-filter>
      `,
      root
    );
  }

  renderDate(root: Element, _column: any, rowData: any) {
    if (parts.has(root) && root.childElementCount == 0) {
      parts.delete(root);
    }
    render(html` <span>${this.dateFormatter.format(Date.parse(rowData.item.date))}</span> `, root);
  }
}
