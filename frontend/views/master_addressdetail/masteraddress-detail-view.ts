import '@polymer/iron-icon';
import { EndpointError } from '@vaadin/flow-frontend';
import { showNotification } from '@vaadin/flow-frontend/a-notification';
import { CSSModule } from '@vaadin/flow-frontend/css-utils';
import { Binder, field } from '@vaadin/form';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-grid';
import { GridDataProviderCallback, GridDataProviderParams, GridElement } from '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-icons';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-upload';
import { customElement, html, LitElement, property, query, unsafeCSS } from 'lit-element';
import * as AddressEndpoint from '../../generated/AddressEndpoint';
import Address from '../../generated/com/example/application/data/entity/Address';
import AddressModel from '../../generated/com/example/application/data/entity/AddressModel';
// @ts-ignore
import styles from './masteraddress-detail-view.css';

@customElement('masteraddress-detail-view')
export class Master_addressDetailView extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), unsafeCSS(styles)];
  }

  @query('#grid')
  private grid!: GridElement;

  @property({ type: Number })
  private gridSize = 0;

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder<Address, AddressModel>(this, AddressModel);

  render() {
    return html`
      <vaadin-split-layout class="full-size">
        <div class="grid-wrapper">
          <vaadin-grid
            id="grid"
            class="full-size"
            theme="no-border"
            .size="${this.gridSize}"
            .dataProvider="${this.gridDataProvider}"
            @active-item-changed=${this.itemSelected}
          >
            <vaadin-grid-sort-column auto-width path="street"></vaadin-grid-sort-column
            ><vaadin-grid-sort-column auto-width path="postalCode"></vaadin-grid-sort-column
            ><vaadin-grid-sort-column auto-width path="city"></vaadin-grid-sort-column
            ><vaadin-grid-sort-column auto-width path="state"></vaadin-grid-sort-column
            ><vaadin-grid-sort-column auto-width path="country"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
        <div id="editor-layout">
          <div id="editor">
            <vaadin-form-layout
              ><vaadin-text-field
                label="Street"
                id="street"
                ...="${field(this.binder.model.street)}"
              ></vaadin-text-field
              ><vaadin-text-field
                label="Postal code"
                id="postalCode"
                ...="${field(this.binder.model.postalCode)}"
              ></vaadin-text-field
              ><vaadin-text-field label="City" id="city" ...="${field(this.binder.model.city)}"></vaadin-text-field
              ><vaadin-text-field label="State" id="state" ...="${field(this.binder.model.state)}"></vaadin-text-field
              ><vaadin-text-field
                label="Country"
                id="country"
                ...="${field(this.binder.model.country)}"
              ></vaadin-text-field
            ></vaadin-form-layout>
          </div>
          <vaadin-horizontal-layout id="button-layout" theme="spacing">
            <vaadin-button theme="primary" @click="${this.save}">Save</vaadin-button>
            <vaadin-button theme="tertiary" @click="${this.cancel}">Cancel</vaadin-button>
          </vaadin-horizontal-layout>
        </div>
      </vaadin-split-layout>
    `;
  }

  private async getGridData(params: GridDataProviderParams, callback: GridDataProviderCallback) {
    const index = params.page * params.pageSize;
    const data = await AddressEndpoint.list(index, params.pageSize, params.sortOrders as any);
    callback(data);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.gridSize = await AddressEndpoint.count();
  }

  private async itemSelected(event: CustomEvent) {
    const item: Address = event.detail.value as Address;
    this.grid.selectedItems = item ? [item] : [];

    if (item) {
      const fromBackend = await AddressEndpoint.get(item.id!);
      fromBackend ? this.binder.read(fromBackend) : this.refreshGrid();
    } else {
      this.clearForm();
    }
  }

  private async save() {
    try {
      await this.binder.submitTo(AddressEndpoint.update);

      if (!this.binder.value.id) {
        // We added a new item
        this.gridSize++;
      }
      this.clearForm();
      this.refreshGrid();
      showNotification('Address details stored.', { position: 'bottom-start' });
    } catch (error) {
      if (error instanceof EndpointError) {
        showNotification('Server error. ' + error.message, { position: 'bottom-start' });
      } else {
        throw error;
      }
    }
  }

  private cancel() {
    this.grid.activeItem = undefined;
  }

  private clearForm() {
    this.binder.clear();
  }

  private refreshGrid() {
    this.grid.selectedItems = [];
    this.grid.clearCache();
  }
}
