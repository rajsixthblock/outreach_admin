import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

// const DropdownList = React.lazy(() => import('./views/Editors/DropdownList/DropdownList'));
// const ContactForm = React.lazy(() => import('./views/Editors/ContactForm/ContactForm'));
// // const UsersList = React.lazy(() => import('./views/ListOfUsers/UsersList/UsersList'));
// const AddCase = React.lazy(() => import('./views/Base/addCase/AddCase'));
// const SearchCase = React.lazy(() => import('./views/Base/searchCase/SearchCase'));
// const ViewCase = React.lazy(() => import('./views/Base/ViewCase/ViewCase'));
// const AddDropdown = React.lazy(() => import('./views/Editors/AddDropdown/AddDropdown'));
// const Register = React.lazy(() => import("./views/Pages/Register"));
const Dashboard = React.lazy(() => import('./views/Admin/Dashboard'));
const Login = React.lazy(() => import('./views/Pages/Login/Login'));
const Companies = React.lazy(() => import('./views/Admin/Companies/ListOfCompanies'));
const CreateCompany = React.lazy(() => import('./views/Admin/Companies/CreateCompany'));
const Users = React.lazy(() => import('./views/Company/Users/Users'));
const AddUsers = React.lazy(() => import('./views/Company/Users/AddUsers'));
const CompanyDashboard = React.lazy(() => import('./views/Company/CompanyDashboard/CompanyDashboard'));
const CompanyDetails = React.lazy(() => import('./views/Company/CompanyDetails/CompanyDetails'));
const Payments = React.lazy(() => import('./views/Admin/Payments/Payments'));
const Subscriptions = React.lazy(() => import('./views/Admin/Subcriptions/Subcriptions'));
const CreateSubscriptions = React.lazy(() => import('./views/Admin/Subcriptions/CreateSubscriptions'));
const CampaignsList = React.lazy(() => import('./views/Company/Campaigns/CampaginsTable'));
const ContactsList = React.lazy(() => import('./views/Company/Contacts/ContactsList'));
const AdminUsers = React.lazy(() => import('./views/Admin/AdminUsers/AdminUsers'));
const CreateAdminUsers = React.lazy(() => import('./views/Admin/AdminUsers/CreateAdminUsers'));
const TestingInvoice = React.lazy(() => import('./views/Company/CompanyDetails/Invoice'));
const AllTemplates = React.lazy(() => import('./views/Admin/Templates/allTemplates'))
const CreateTemplate = React.lazy(() => import('./views/Admin/Templates/createTemplates'))
const CompanyTemplates = React.lazy(() => import('./views/Company/CompanyTemplates/companyTemplates'))
const ViewTemplates = React.lazy(() => import('./views/Company/CompanyTemplates/viewTemplates'))

const routes = [
   { path: '/', name: 'Home', component: DefaultLayout, exact: true },
   { path: '/dashboard', name: 'Dashboard', component: Dashboard, exact: true },
  { path: '/companies', name: 'Companies', component: Companies, exact: true },
  { path: '/login', name: 'Login', component: Login, exact: true },
  { path: '/companies/createcompany/:id', name: 'Company', component: CreateCompany, exact: true },
  { path: '/companies/editcompany/:id', name: 'Company', component: CreateCompany, exact: true },
  { path: '/users', name: 'Users', component: Users, exact: true },
  { path: '/users/createuser/:id', name: 'User', component: AddUsers, exact: true },
  { path: '/users/edituser/:id', name: 'User', component: AddUsers, exact: true },
  { path: '/payments', name: 'Payments', component: Payments, exact: true },
  { path: '/subscriptions', name: 'Subscriptions', component: Subscriptions, exact: true },
  { path: '/subscriptions/createSubscriptions/:id', name: 'Subscription', component: CreateSubscriptions, exact: true },
  { path: '/campagins', name: 'Campaigns', component: CampaignsList, exact: true },
  { path: '/companyTemplates', name: 'Templates', component: CompanyTemplates, exact: true },
  { path: '/companyTemplates/viewTemplates/:id', name: 'View Template', component: ViewTemplates, exact: true },
  { path: '/contacts/:id', name: 'Contacts', component: ContactsList, exact: true },
  { path: '/adminusers', name: 'Admin Users', component: AdminUsers, exact: true },
  { path: '/adminusers/createadminuser/:id', name: 'Admin Users', component: CreateAdminUsers, exact: true },
  { path: '/adminusers/edituser/:id', name: 'Admin', component: CreateAdminUsers, exact: true },

  { path: '/company', name: 'CHome', component: DefaultLayout, exact: true },
  { path: '/home', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/companydashboard', name: 'Dashboard', component: CompanyDashboard, exact: true },
  { path: '/companydetails', name: 'Company Details', component: CompanyDetails, exact: true },

  { path: '/invoice', name: 'Invoice', component: TestingInvoice, exact: true },
  { path: '/templates/addtemplate/:id', name: 'AddTemplate', component: CreateTemplate, exact: true },
  // { path: '/templates/edittemplate/:id', name: 'AddTemplate', component: CreateTemplate, exact: true },

  { path: '/templates', name: 'All Templates', component: AllTemplates, exact: true },
  // { path: '/editors/addDropdown', name: 'Add Dropdown', component: AddDropdown},
  // { path: '/base/addCase', exact:true, name: 'Add Case', component: AddCase },
  // { path: '/base/addCase/:id', exact:true, name: 'Edit Case', component: AddCase },
  // { path: '/base/searchCase', exact:true,name: 'Search Case', component: SearchCase },
  //   { path: '/editors/DropdownList', name: 'Dropdown List', component: DropdownList },
  // { path: '/editors/ContactForm', name: 'Contact US', component: ContactForm },
  // // { path: '/ListOfUsers/UsersList', name: 'List of Users', component: UsersList },
  // {path: '/base/searchCase/:id', exact:true, name: 'Case Report', component: ViewCase},
  // { path: '/register', exact:true, name: 'Register', component: Register},
  // {path:'/register/:id',exact: true, name: 'Edit User', component: Register },


];

export default routes;
