import '@polymer/iron-icon';
import { EndpointError } from '@vaadin/flow-frontend';
import { showNotification } from '@vaadin/flow-frontend/a-notification';
import { CSSModule } from '@vaadin/flow-frontend/css-utils';
import { Binder, field, StringModel } from '@vaadin/form';
import { BinderNode } from '@vaadin/form/BinderNode';
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
import { UploadElement, UploadFile } from '@vaadin/vaadin-upload';
import { customElement, html, LitElement, property, query, unsafeCSS } from 'lit-element';
import FoodProduct from '../../generated/com/example/application/data/entity/FoodProduct';
import FoodProductModel from '../../generated/com/example/application/data/entity/FoodProductModel';
import * as FoodProductEndpoint from '../../generated/FoodProductEndpoint';
// @ts-ignore
import styles from './masterfoodproduct-detail-view.css';

@customElement('masterfoodproduct-detail-view')
export class Master_foodproductDetailView extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), unsafeCSS(styles)];
  }

  @query('#grid')
  private grid!: GridElement;

  @property({ type: Number })
  private gridSize = 0;

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder<FoodProduct, FoodProductModel>(this, FoodProductModel);

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
            <vaadin-grid-column width="96px" flex-grow="0" path="image"
              ><template
                ><span
                  style="border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center; width: 64px; height: 64px"
                  ><img style="max-width: 100%" src="[[item.image]]" /></span></template></vaadin-grid-column
            ><vaadin-grid-sort-column auto-width path="name"></vaadin-grid-sort-column
            ><vaadin-grid-sort-column auto-width path="eanCode"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
        <div id="editor-layout">
          <div id="editor">
            <vaadin-form-layout
              ><label>Image</label>
              <vaadin-upload
                accept="image/*"
                max-files="1"
                style="box-sizing: border-box"
                id="image"
                @upload-request="${(e: CustomEvent) =>
                  this.handleImageUpload(e, this.binder.for(this.binder.model.image))}"
                ><img
                  style="width: 100%"
                  ?hidden="${!this.binder.value.image}"
                  src="${this.binder.value.image}"
                /> </vaadin-upload
              ><vaadin-text-field label="Name" id="name" ...="${field(this.binder.model.name)}"></vaadin-text-field
              ><vaadin-text-field
                label="Ean code"
                id="eanCode"
                ...="${field(this.binder.model.eanCode)}"
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
    const data = await FoodProductEndpoint.list(index, params.pageSize, params.sortOrders as any);
    callback(data);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.gridSize = await FoodProductEndpoint.count();
  }

  private async itemSelected(event: CustomEvent) {
    const item: FoodProduct = event.detail.value as FoodProduct;
    this.grid.selectedItems = item ? [item] : [];

    if (item) {
      const fromBackend = await FoodProductEndpoint.get(item.id!);
      fromBackend ? this.binder.read(fromBackend) : this.refreshGrid();
    } else {
      this.clearForm();
    }
  }

  private async handleImageUpload(e: CustomEvent, binderNode: BinderNode<string, StringModel>) {
    e.preventDefault();
    const upload: UploadElement = e.target as UploadElement;
    const file: UploadFile = e.detail.file;
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const result: string = event.target!.result as string;
      binderNode.value = result;
      this.requestUpdate('binder');
      upload.files = [];
    });
    reader.readAsDataURL(file);
  }

  private async save() {
    try {
      await this.binder.submitTo(FoodProductEndpoint.update);

      if (!this.binder.value.id) {
        // We added a new item
        this.gridSize++;
      }
      this.clearForm();
      this.refreshGrid();
      showNotification('FoodProduct details stored.', { position: 'bottom-start' });
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
