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
import * as BookEndpoint from '../../generated/BookEndpoint';
import Book from '../../generated/com/example/application/data/entity/Book';
import BookModel from '../../generated/com/example/application/data/entity/BookModel';
// @ts-ignore
import styles from './masterbook-detail-view.css';

@customElement('masterbook-detail-view')
export class Master_bookDetailView extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), unsafeCSS(styles)];
  }

  @query('#grid')
  private grid!: GridElement;

  @property({ type: Number })
  private gridSize = 0;

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder<Book, BookModel>(this, BookModel);

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
            <vaadin-grid-column width="68px" flex-grow="0" path="image"
              ><template><img style="height: 64px" src="[[item.image]]" /></template></vaadin-grid-column
            ><vaadin-grid-sort-column auto-width path="name"></vaadin-grid-sort-column
            ><vaadin-grid-sort-column auto-width path="author"></vaadin-grid-sort-column
            ><vaadin-grid-sort-column auto-width path="publicationDate"></vaadin-grid-sort-column
            ><vaadin-grid-sort-column auto-width path="pages"></vaadin-grid-sort-column
            ><vaadin-grid-sort-column auto-width path="isbn"></vaadin-grid-sort-column>
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
                label="Author"
                id="author"
                ...="${field(this.binder.model.author)}"
              ></vaadin-text-field
              ><vaadin-date-picker
                label="Publication date"
                id="publicationDate"
                ...="${field(this.binder.model.publicationDate)}"
              ></vaadin-date-picker
              ><vaadin-text-field label="Pages" id="pages" ...="${field(this.binder.model.pages)}"></vaadin-text-field
              ><vaadin-text-field label="Isbn" id="isbn" ...="${field(this.binder.model.isbn)}"></vaadin-text-field
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
    const data = await BookEndpoint.list(index, params.pageSize, params.sortOrders as any);
    callback(data);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.gridSize = await BookEndpoint.count();
  }

  private async itemSelected(event: CustomEvent) {
    const item: Book = event.detail.value as Book;
    this.grid.selectedItems = item ? [item] : [];

    if (item) {
      const fromBackend = await BookEndpoint.get(item.id!);
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
      await this.binder.submitTo(BookEndpoint.update);

      if (!this.binder.value.id) {
        // We added a new item
        this.gridSize++;
      }
      this.clearForm();
      this.refreshGrid();
      showNotification('Book details stored.', { position: 'bottom-start' });
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
