import '@polymer/iron-icon/iron-icon.js';
import '@vaadin/vaadin-grid/all-imports.js';
import '@vaadin/vaadin-icons/vaadin-icons.js';
import '@vaadin/vaadin-lumo-styles/all-imports.js';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout.js';
import '@vaadin/vaadin-ordered-layout/vaadin-vertical-layout.js';
import { css, customElement, html, LitElement, property } from 'lit-element';

@customElement('card-list-view')
export class CardListView extends LitElement {
  @property({ type: Array })
  items: any[] = [];

  static get styles() {
    return [
      css`
        :host {
          display: block;
          height: 100%;
        }

        vaadin-grid {
          height: 100%;
          line-height: var(--lumo-line-height-m);
        }

        vaadin-grid,
        vaadin-grid-cell-content {
          background-color: var(--lumo-contrast-10pct);
        }

        .card {
          background-color: var(--lumo-base-color);
          border-radius: var(--lumo-border-radius);
          box-shadow: var(--lumo-box-shadow-xs);
          padding: calc(var(--lumo-space-s) * 1.5) var(--lumo-space-m);
        }

        img {
          border-radius: 50%;
          flex-shrink: 0;
          height: var(--lumo-size-m);
          width: var(--lumo-size-m);
        }

        .header {
          align-items: baseline;
        }

        .name {
          font-size: var(--lumo-font-size-s);
          font-weight: bold;
        }

        .date {
          color: var(--lumo-tertiary-text-color);
          font-size: var(--lumo-font-size-xs);
        }

        .post {
          color: var(--lumo-secondary-text-color);
          font-size: var(--lumo-font-size-s);
          margin-bottom: var(--lumo-space-s);
          white-space: normal;
        }

        .actions {
          align-items: center;
        }

        iron-icon {
          color: var(--lumo-tertiary-text-color);
          height: calc(var(--lumo-icon-size-s) * 0.8);
          width: calc(var(--lumo-icon-size-s) * 0.8);
        }

        .likes,
        .comments,
        .shares {
          color: var(--lumo-tertiary-text-color);
          font-size: var(--lumo-font-size-xs);
          margin-right: var(--lumo-space-l);
        }
      `,
    ];
  }

  render() {
    return html`
      <vaadin-grid id="grid" theme="no-border no-row-borders" .items="${this.items}">
        <vaadin-grid-column>
          <template>
            <vaadin-horizontal-layout theme="spacing-s" class="card">
              <img src="[[item.img]]"></img>
              <vaadin-vertical-layout>
                <vaadin-horizontal-layout theme="spacing-s" class="header">
                  <span class="name">[[item.name]]</span>
                  <span class="date">[[item.date]]</span>
                </vaadin-horizontal-layout>
                <span class="post">[[item.post]]</span>
                <vaadin-horizontal-layout theme="spacing-s" class="actions">
                  <iron-icon icon="vaadin:heart"></iron-icon>
                  <span class="likes">[[item.likes]]</span>
                  <iron-icon icon="vaadin:comment"></iron-icon>
                  <span class="comments">[[item.comments]]</span>
                  <iron-icon icon="vaadin:connect"></iron-icon>
                  <span class="shares">[[item.shares]]</span>
                </vaadin-horizontal-layout>
              </vaadin-vertical-layout>
            </vaadin-horizontal-layout>
          </template>
        </vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.items = [
      {
        img: 'https://randomuser.me/api/portraits/men/42.jpg',
        name: 'John Smith',
        date: 'May 8',
        post:
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).',
        likes: '1K',
        comments: '500',
        shares: '20',
      },
      {
        img: 'https://randomuser.me/api/portraits/women/42.jpg',
        name: 'Abagail Libbie',
        date: 'May 3',
        post:
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).',
        likes: '1K',
        comments: '500',
        shares: '20',
      },
      {
        img: 'https://randomuser.me/api/portraits/men/24.jpg',
        name: 'Alberto Raya',
        date: 'May 3',
        post:
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).',
        likes: '1K',
        comments: '500',
        shares: '20',
      },
      {
        img: 'https://randomuser.me/api/portraits/women/24.jpg',
        name: 'Emmy Elsner',
        date: 'Apr 22',
        post:
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).',
        likes: '1K',
        comments: '500',
        shares: '20',
      },
      {
        img: 'https://randomuser.me/api/portraits/men/76.jpg',
        name: 'Alf Huncoot',
        date: 'Apr 21',
        post:
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).',
        likes: '1K',
        comments: '500',
        shares: '20',
      },
      {
        img: 'https://randomuser.me/api/portraits/women/76.jpg',
        name: 'Lidmila Vilensky',
        date: 'Apr 17',
        post:
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).',
        likes: '1K',
        comments: '500',
        shares: '20',
      },
      {
        img: 'https://randomuser.me/api/portraits/men/94.jpg',
        name: 'Jarrett Cawsey',
        date: 'Apr 17',
        post:
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).',
        likes: '1K',
        comments: '500',
        shares: '20',
      },
      {
        img: 'https://randomuser.me/api/portraits/women/94.jpg',
        name: 'Tania Perfilyeva',
        date: 'Mar 8',
        post:
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).',
        likes: '1K',
        comments: '500',
        shares: '20',
      },
      {
        img: 'https://randomuser.me/api/portraits/men/16.jpg',
        name: 'Ivan Polo',
        date: 'Mar 5',
        post:
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).',
        likes: '1K',
        comments: '500',
        shares: '20',
      },
      {
        img: 'https://randomuser.me/api/portraits/women/16.jpg',
        name: 'Emelda Scandroot',
        date: 'Mar 5',
        post:
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).',
        likes: '1K',
        comments: '500',
        shares: '20',
      },
      {
        img: 'https://randomuser.me/api/portraits/men/67.jpg',
        name: 'Marcos Sá',
        date: 'Mar 4',
        post:
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).',
        likes: '1K',
        comments: '500',
        shares: '20',
      },
      {
        img: 'https://randomuser.me/api/portraits/women/67.jpg',
        name: 'Jacqueline Asong',
        date: 'Mar 2',
        post:
          'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking).',
        likes: '1K',
        comments: '500',
        shares: '20',
      },
    ];
  }
}
