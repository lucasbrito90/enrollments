const menu = [
  { header: 'Customers' },
  {
    title: 'Customer',
    icon: 'custom-users',
    to: '/customer/',
    children: [
      {
        title: 'Add Customer',
        to: '/customer/addcustomer',
        permission: 'create_user',
      },
      {
        title: 'Customer List',
        to: '/customer/customerlist',
      },
      {
        title: 'Create Invoice',
        to: '/app/customer/create-invoice',
      },
    ],
  },
  {
    title: 'Projects',
    icon: 'custom-document',
    to: '/projects/',
    children: [
      {
        title: 'Add Project',
        to: '/projects/addproject',
        permission: 'edit_user',
      },
      {
        title: 'Project List',
        to: '/projects/projectlist',
      },
      {
        title: 'Project Details',
        to: '/projects/projectdetails',
      },
    ],
  },
  {
    title: 'Users',
    icon: 'custom-user-square',
    to: '/app/user',
    role: 'enrollment',
    children: [
      {
        title: 'Social Profile',
        to: '/app/user/social/posts',
      },
      {
        title: 'Account Profile',
        to: '/app/user/account-profile',
        children: [
          {
            title: 'Profile 01',
            to: '/app/user/account-profile/profile1',
            permission: 'edit_user',
          },
          {
            title: 'Profile 02',
            to: '/app/user/account-profile/profile2',
          },
          {
            title: 'Profile 03',
            to: '/app/user/account-profile/profile3',
          },
        ],
      },
      {
        title: 'Create User Profile',
        to: '/app/user/userprofile',
        permission: 'create user',
      },
      {
        title: 'Cards',
        to: '/app/user/card',
        children: [
          {
            title: 'Style 01',
            to: '/app/user/card/card1',
          },
          {
            title: 'Style 02',
            to: '/app/user/card/card2',
          },
          {
            title: 'Style 03',
            to: '/app/user/card/card3',
          },
        ],
      },
      {
        title: 'List',
        to: '/app/user/list',
        children: [
          {
            title: 'Style 01',
            to: '/app/user/list1',
          },
          {
            title: 'Style 02',
            to: '/app/user/list2',
          },
        ],
      },
    ],
  },
  { header: 'Dashboard' },
  {
    title: 'Dashboard',
    icon: 'custom-home-trend',
    to: '/dashboard/default',
    children: [
      {
        title: 'Default',
        to: '/dashboard/default',
      },
      {
        title: 'Analytics',
        to: '/dashboard/analytics',
        permission: 'edit user',
      },
    ],
  },
  {
    title: 'Components',
    icon: 'custom-box-1',
    to: 'components/buttons',
    getURL: true,
    type: 'external',
    chip: 'new',
    chipColor: 'primary',
    chipVariant: 'tonal',
  },
  { header: 'Widget' },
  {
    title: 'Statistics',
    icon: 'custom-story',
    to: '/widget/statistics',
  },
  {
    title: 'Data',
    icon: 'custom-fatrows',
    to: '/widget/data',
  },
  {
    title: 'Chart',
    icon: 'custom-presentation-chart',
    to: '/widget/chart',
  },
  { header: 'Applications' },
  {
    title: 'Chat',
    icon: 'custom-chat',
    to: '/app/chats',
    permission: 'create project',
  },
  {
    title: 'Calendar',
    icon: 'custom-calendar-1',
    to: '/app/calendar',
  },
  {
    title: 'Kanban',
    icon: 'custom-kanban',
    to: '/app/kanban',
  },
  {
    title: 'Customer',
    icon: 'custom-users',
    to: '/customer/',
    children: [
      {
        title: 'Customer List',
        to: '/customer/customerlist',
      },
      {
        title: 'Create Invoice',
        to: '/app/customer/create-invoice',
      },
      {
        title: 'Order Details',
        to: '/app/customer/order-details',
      },
      {
        title: 'Order List',
        to: '/customer/orderlist',
      },
      {
        title: 'Product List',
        to: '/customer/productlist',
      },
      {
        title: 'Product Review',
        to: '/customer/productreview',
      },
    ],
  },
  {
    title: 'Invoice',
    icon: 'custom-invoice',
    to: '/',
    children: [
      {
        title: 'Dashboard',
        to: '/app/invoice/dashboard',
      },
      {
        title: 'Create',
        to: '/app/invoice/create',
      },
      {
        title: 'Details',
        to: '/app/invoice/details',
      },
      {
        title: 'List',
        to: '/app/invoice/list',
      },
      {
        title: 'Edit',
        to: '/app/invoice/edit',
      },
    ],
  },
  { header: 'Orders' },
  {
    title: 'Orders',
    icon: 'custom-document',
    children: [
      {
        title: 'Order Details',
        to: '/app/customer/order-details',
      },
      {
        title: 'Order List',
        to: '/customer/orderlist',
      },
      {
        title: 'Product List',
        to: '/customer/productlist',
      },
      {
        title: 'Product Review',
        to: '/customer/productreview',
      },
    ],
  },
  {
    title: 'Mail',
    icon: 'custom-direct-inbox',
    to: '/app/mail',
  },
  {
    title: 'Contact',
    icon: 'custom-user-circle-add',
    to: '/app/contacts',
    children: [
      {
        title: 'Card',
        to: '/app/contact/c-card',
      },
      {
        title: 'List',
        to: '/app/contact/c-list',
      },
    ],
  },
  {
    title: 'E-Commerce',
    icon: 'custom-shopping-bag',
    to: '/ecommerce/',
    children: [
      {
        title: 'Products',
        to: '/ecommerce/products',
      },
      {
        title: 'Product Detail',
        to: '/ecommerce/product/detail/1',
      },
      {
        title: 'Product List',
        to: '/ecommerce/productlist',
      },
      {
        title: 'Add New Product',
        to: '/ecommerce/add-product',
      },
      {
        title: 'Checkout',
        to: '/ecommerce/checkout',
      },
    ],
  },
  { header: 'Forms & Tables' },
  {
    title: 'Form Validation',
    icon: 'custom-password-check',
    to: '/forms/formvalidation',
  },
  {
    title: 'Layouts',
    icon: 'custom-row-vertical',
    to: '/forms/layouts',
    children: [
      {
        title: 'Layouts',
        to: '/forms/layouts/layouts',
      },
      {
        title: 'Multi Columns',
        to: '/forms/layouts/multi-column-forms',
      },
      {
        title: 'Action Bar',
        to: '/forms/layouts/action-bar',
      },
      {
        title: 'Sticky Bar',
        to: '/forms/layouts/sticky-action-bar',
      },
    ],
  },
  {
    title: 'Plugins',
    icon: 'custom-cpu-charge',
    to: '/forms/radio',
    children: [
      {
        title: 'Mask',
        to: '/forms/plugins/mask',
      },
      {
        title: 'Clipboard',
        to: '/forms/plugins/clipboard',
      },
      {
        title: 'reCaptcha',
        to: '/auth/login1',
      },
      {
        title: 'Editor',
        to: '/forms/plugins/editor',
      },
    ],
  },
  {
    title: 'Tables',
    icon: 'custom-table',
    to: '/forms/tables',
    children: [
      {
        title: 'Basic Table',
        to: '/tables/tbl-basic',
      },
      {
        title: 'Dark Table',
        to: '/tables/tbl-dark',
      },
      {
        title: 'Density Table',
        to: '/tables/tbl-density',
      },
      {
        title: 'Height Table',
        to: '/tables/tbl-height',
      },
      {
        title: 'Fixed Header Table',
        to: '/tables/tbl-fixed-header',
      },
    ],
  },
];

export default menu;
