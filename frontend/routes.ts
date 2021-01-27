import { Flow } from '@vaadin/flow-frontend';

const { serverSideRoutes } = new Flow({
  imports: () => import('../target/frontend/generated-flow-imports'),
});

export const routes = [
  // for client-side, place routes below (more info https://vaadin.com/docs/v18/flow/typescript/creating-routes.html)
  {
    path: '',
    component: 'main-view',
    action: async () => {
      await import('./views/main/main-view');
    },
    children: [
      {
        path: '',
        component: 'empty-view',
        action: async () => {
          await import('./views/empty/empty-view');
        },
      },
      {
        path: 'empty',
        component: 'empty-view',
        action: async () => {
          await import('./views/empty/empty-view');
        },
      },
      {
        path: 'hello-world',
        component: 'hello-world-view',
        action: async () => {
          await import('./views/helloworld/hello-world-view');
        },
      },
      {
        path: 'dashboard',
        component: 'dashboard-view',
        action: async () => {
          await import('./views/dashboard/dashboard-view');
        },
      },
      {
        path: 'card-list',
        component: 'card-list-view',
        action: async () => {
          await import('./views/cardlist/card-list-view');
        },
      },
      {
        path: 'list',
        component: 'list-view',
        action: async () => {
          await import('./views/list/list-view');
        },
      },
      {
        path: 'master-detail',
        component: 'master-detail-view',
        action: async () => {
          await import('./views/masterdetail/master-detail-view');
        },
      },
      {
        path: 'masteraddress-detail',
        component: 'masteraddress-detail-view',
        action: async () => {
          await import('./views/master_addressdetail/masteraddress-detail-view');
        },
      },
      {
        path: 'masterbook-detail',
        component: 'masterbook-detail-view',
        action: async () => {
          await import('./views/master_bookdetail/masterbook-detail-view');
        },
      },
      {
        path: 'masterfoodproduct-detail',
        component: 'masterfoodproduct-detail-view',
        action: async () => {
          await import('./views/master_foodproductdetail/masterfoodproduct-detail-view');
        },
      },
      {
        path: 'person-form',
        component: 'person-form-view',
        action: async () => {
          await import('./views/personform/person-form-view');
        },
      },
      {
        path: 'address-form',
        component: 'address-form-view',
        action: async () => {
          await import('./views/addressform/address-form-view');
        },
      },
      {
        path: 'credit-card-form',
        component: 'credit-card-form-view',
        action: async () => {
          await import('./views/creditcardform/credit-card-form-view');
        },
      },
      // for server-side, the next magic line sends all unmatched routes:
      ...serverSideRoutes, // IMPORTANT: this must be the last entry in the array
    ],
  },
];
