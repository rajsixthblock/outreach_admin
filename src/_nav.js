export default {
  homeItems: [
    {
      name: 'Home',
      url: '/dashboard',
      icon: 'icon-home',
      badge: {
        variant: 'info',  
      },
    },
    {
      name : 'Companies',
      url : '/companies',
      icon: 'icon-puzzle'
    },
    {
      name : 'Subscriptions',
      url : '/subscriptions',
      icon: 'fa fa-handshake-o'
    },
    {
      name : 'Payments',
      url : '/payments',
      icon: 'fa fa-money'
    },
    {
      name : 'Templates',
      url : '/templates',
      icon: 'fa fa-square'
    },
    {
      name : 'Admin Users',
      url : '/adminusers',
      icon: 'fa fa-users'
    }
   
    // {
    //   name: 'Case',
    //   url: '/base',
    //   icon: 'icon-puzzle',
    //   children: [
    //     {
    //       name: 'Add Case',
    //       url: '/base/addCase',
    //       icon: 'icon-puzzle',
    //     },
    //     {
    //       name: 'Search Case',
    //       url: '/base/searchCase',
    //       icon: 'icon-puzzle',
    //     },
       
    //   ],
    // },
    // {
    //   name: 'Management',
    //   url: '/buttons',
    //   icon: 'icon-cursor',
    //   children: [
    //     {
    //       name: 'Users',
    //       url: '/ListOfUsers/UsersList',
    //       icon: 'icon-cursor',
    //     },
       
    
    //   ],
    // },
  
    // {
    //   name: 'Extras',
    //   url: '/editors',
    //   icon: 'fa fa-code',
    //   children: [
    //     {
    //       name: 'Dropdown',
    //       url: '/editors/DropdownList',
    //       icon: 'fa fa-code',
         
    //     },
    //     {
    //       name: 'Contact Us!',
    //       url: '/editors/ContactForm',
    //       icon: 'icon-note',
        
    //     }
    //   ]
    // },
    
  ],
  companyItems : [
    {
      name: 'Home',
      url: '/home',
      icon: 'icon-home',
      badge: {
        variant: 'info',
       
      },
    },
    {
      name : 'Dashboard',
      url : '/companydashboard',
      icon: 'fa fa-tachometer'
    },
    {
      name : 'Campaigns',
      url : '/campagins',
      icon: 'fa fa-share-square'
    },
    {
      name : 'Contacts',
      url : '/contacts/new',
      icon: '	fa fa-address-book'
    },
    {
      name : 'Templates',
      url : '/companyTemplates',
      icon: '	fa fa-list'
    },
    {
      name : 'Users',
      url : '/users',
      icon: 'fa fa-users'
    },
    {
      name : 'Company Details',
      url : '/companydetails',
      icon: 'icon-puzzle'
    },
  ]
};
