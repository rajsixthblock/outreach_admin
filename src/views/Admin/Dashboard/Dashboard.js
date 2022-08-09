import React, { Component } from 'react';
import BarChart from '../../Charts/BarChat';
import Line from '../../Charts/Line';
import { Card, CardBody, CardHeader, Col, Row} from 'reactstrap';
import DoughnutChart from '../../Charts/Doughnut';

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
          <Row>
            <Col xs="6" >
              <Card>
                <CardHeader><b>Total Count</b></CardHeader>
                <CardBody>
                  <DoughnutChart />
                </CardBody>
              </Card>
            </Col>
            <Col xs="6">
              <Card>
              <CardHeader><b>Campagins & Contacts based on Comapny</b></CardHeader>
                <CardBody>
              <div style={{ overflow: 'scroll' }}>
                <BarChart />
              </div>
              </CardBody>
              </Card>
            </Col>
          </Row>     
          <Card>
            <CardHeader><b>Users Based On Companies</b></CardHeader>
            <CardBody>
              <Row style={{ overflow: 'scroll' }}>
              <Line/>
              </Row>
            </CardBody>
          </Card>
      </div>
    );
  }
}
export default Dashboard;
