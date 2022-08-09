import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CompanyDisplay from './CompanyDisplay';
import CompanySubscription from './CompanySubscriptions';
import Invoice2 from './Invoice';

class CompanyDetails extends React.Component {
    state = {
        key: 'companydetails'
    }
    render() {
        return (
            <>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={this.state.key}
                    onSelect={(k) => this.setState({
                        key: k
                    })}
                    className="mb-3"
                >
                    <Tab eventKey="companydetails" title="Company Details">
                        <CompanyDisplay />
                    </Tab>
                    <Tab eventKey="subscriptions" title="Subscriptions">
                        <CompanySubscription />
                    </Tab>
                    <Tab eventKey="invoice" title="Invoice">
                        <Invoice2/>
                    </Tab>
                </Tabs>
            </>
        )
    }
}
export default CompanyDetails;