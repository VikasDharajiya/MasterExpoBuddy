import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },

  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'exhibition-management',
        title: 'Exhibition Management',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/exhibition-management/pages/exhibition/exhibition-management').then(
                (m) => m.ExhibitionManagement,
              ),
          },
          {
            path: 'add-exhibition',
            title: 'Add Exhibition',
            loadComponent: () =>
              import('./features/exhibition-management/pages/add-exhibition/add-exhibition').then(
                (m) => m.AddExhibition,
              ),
          },
          // edit
          {
            path: 'edit-exhibition/:id',
            title: 'Edit Exhibition',
            loadComponent: () =>
              import('./features/exhibition-management/pages/add-exhibition/add-exhibition').then(
                (m) => m.AddExhibition,
              ),
          },
        ],
      },
      {
        path: 'exhibitor-management',
        title: 'Exhibitor Management',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/exhibitor-management/pages/exhibitor/exhibitor-management').then(
                (m) => m.ExhibitorManagement,
              ),
          },
          {
            path: 'add-exhibitor',
            title: 'Add Exhibitor',
            loadComponent: () =>
              import('./features/exhibitor-management/pages/add-exhibitor/add-exhibitor').then(
                (m) => m.AddExhibitor,
              ),
          },
          // edit
          {
            path: 'edit-exhibitor/:id',
            title: 'Edit Exhibitor',

            loadComponent: () =>
              import('./features/exhibitor-management/pages/add-exhibitor/add-exhibitor').then(
                (m) => m.AddExhibitor,
              ),
          },
        ],
      },
      {
        path: 'category-management',
        title: 'Category Management',
        loadComponent: () =>
          import('./features/category/category').then((m) => m.CategoryManagement),
      },
      // {
      //   path: 'product-management',
      //   title: 'Product Management',
      //   loadComponent: () =>
      //     import('./features/product-management/product-management').then(
      //       (m) => m.ProductManagement,
      //     ),
      // },
      // {
      //   path: 'exhibition',
      //   title: 'Exhibition',
      //   loadComponent: () =>
      //     import('./features/exhibition/exhibition').then((m) => m.ExhibitionManagement),
      // },
      // {
      //   path: 'lead-management',
      //   title: 'Lead Management',
      //   loadComponent: () =>
      //     import('./features/lead-management/lead-management').then((m) => m.LeadManagement),
      // },
      // {
      //   path: 'visitors',
      //   title: 'Visitors',
      //   loadComponent: () => import('./features/visitors/visitors').then((m) => m.Visitors),
      // },
      {
        path: 'settings',
        title: 'Settings',
        loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          {
            path: 'profile',
            title: 'Profile',
            loadComponent: () =>
              import('./features/settings/pages/profile/profile').then((m) => m.Profile),
          },
          // {
          //   path: 'company-profile',
          //   title: 'Company Profile',
          //   loadComponent: () =>
          //     import('./features/settings/pages/company-profile/company-profile').then(
          //       (m) => m.CompanyProfile,
          //     ),
          // },
          // {
          //   path: 'email',
          //   title: 'Email Configuration',
          //   loadComponent: () =>
          //     import('./features/settings/pages/email/email').then((m) => m.Email),
          // },
        ],
      },
    ],
  },
];
