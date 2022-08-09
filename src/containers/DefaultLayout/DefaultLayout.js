import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
//import axios from 'axios';
import axios from '../../containers/Axios/config';
const DefaultAside = React.lazy(() => import('./DefaultAside'));

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  state = {
    navigations : {items : []},
    companyId : null,
    id : this.props.match.params.id
  }
  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  signOut(e) {
    e.preventDefault();
    localStorage.clear();
    if(!localStorage.getItem('token')){
      this.props.history.push('/login');
    }
  }
  componentDidMount(){
    this.setState({
      navigations : {items : navigation.homeItems},
    })
  }

  componentDidUpdate(props,state){
    let query = new URLSearchParams(this.props.location.search);
    let url = new URL(window.location.href);
    // console.log(url);
    let cid = query.get("id");
    // console.log(cid);
    if(url.href.includes('company')){
    if(cid != '' && query &&query !== "" && query != null && cid != null && cid != undefined){
      localStorage.setItem('companyId',cid);
      // console.log(cid);
      this.setState({
        companyId : cid,
        navigations : {items : navigation.companyItems}
      });
      this.props.history.push('/companydashboard');
    }
  }
if(url.href.includes('home')){
  localStorage.removeItem('companyId');
  this.setState({
    companyId : null,
     navigations : {items : navigation.homeItems}
   })
   this.props.history.push('/dashboard');
}
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={this.state.navigations} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  {/* <Redirect from="/" to="/dashboard" /> */}
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        {/* <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter> */}
      </div>
    );
  }
}

export default DefaultLayout;
