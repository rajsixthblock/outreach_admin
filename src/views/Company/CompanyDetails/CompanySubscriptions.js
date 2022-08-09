import React from "react";
import { Row, Col, Card, Container, CardHeader, CardBody } from 'reactstrap';
import Axios from '../../../containers/Axios/config';
import Moment from 'react-moment';

class CompanySubscription extends React.Component {
    state = {
        planName: '',
        amount: '',
        emailsLimit: '',
        payments: [],
    }
    componentDidMount() {
        let companyId = localStorage.getItem('companyId');
        Axios.get('company/getByID/' + companyId).then(res => {
            // console.log(res);
            this.setState({
                planName: res.data.subscriptionId.planName,
                amount: res.data.subscriptionId.amount,
                emailsLimit: res.data.subscriptionId.emailsLimit,
            })
        }).catch((e) => {
           // console.log(e);
        })
        Axios.get('payment/getAll/' + companyId + '/1/20').then(res => {
            // console.log(res);
            this.setState({
                payments: res.data.content
            })
        }).catch((e) => {
            //console.log(e);
        })
    }
    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col>
                            {this.state.planName ?
                                <Card>
                                    <CardHeader>
                                        <span style={{ color: 'green' }}>*</span> Current Subscription Plan
                                    </CardHeader>
                                    <CardBody>
                                        <Row><Col sm={3}><h6><b>Plan Name :</b></h6></Col> <Col sm={5}>{this.state.planName != '' ? this.state.planName : null}</Col></Row>
                                        <Row><Col sm={3}><h6><b>Amount :</b></h6></Col> <Col sm={3}>{this.state.amount != '' ? this.state.amount : null}</Col></Row>
                                        <Row><Col sm={3}><h6><b>Emails List :</b></h6></Col> <Col sm={3}>{this.state.emailsLimit != '' ? this.state.emailsLimit : null}</Col></Row>
                                    </CardBody>
                                </Card>
                                : <h3>No Subscriptions Plans Found With this Company</h3>}
                        </Col>
                        <Col>
                            {this.state.payments.map((data) => {
                                return (
                                    <Card >
                                        <CardHeader>
                                            <span style={{ color: 'red' }}>*</span>Previous Plan
                                        </CardHeader>
                                        <CardBody>
                                            <Row><Col sm={3}><h6><b>Plan Name :</b></h6></Col> <Col sm={5}>{data.subscriptionId.planName != '' ? data.subscriptionId.planName : null}</Col></Row>
                                            <Row><Col sm={3}><h6><b>Amount :</b></h6></Col> <Col sm={3}>{data.subscriptionId.amount != '' ? data.subscriptionId.amount : null}</Col></Row>
                                            <Row><Col sm={3}><h6><b>Emails List :</b></h6></Col> <Col sm={3}>{data.subscriptionId.emailsLimit != '' ? data.subscriptionId.emailsLimit : null}</Col></Row>
                                            <Row><Col sm={3}><h6><b>Paid Date :</b></h6></Col> <Col sm={3}><Moment format="D MMM YYYY">{data.paidDate != '' ? data.paidDate : null}</Moment></Col></Row>
                                        </CardBody>
                                    </Card>
                                )
                            })}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
export default CompanySubscription;