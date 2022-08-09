import React from "react";
import { Card, CardHeader, CardBody, Col, Container, Row } from "reactstrap";
import Axios from "../../../containers/Axios/config";
import Moment from 'react-moment';

class CompanyInvoice extends React.Component {
    state = {
        payments: []
    }
    componentDidMount() {
        let companyId = localStorage.getItem('companyId');
        Axios.get('payment/getAll/' + companyId + '/1/20').then(res => {
             //console.log("invoice",res);
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
                            {this.state.payments.map((data) => {
                                return (
                                    <Card >
                                        <CardHeader>
                                            Invoice
                                        </CardHeader>
                                        <CardBody>
                                            <Row><Col sm={3}><h6><b>Transaction ID </b></h6></Col> : <Col sm={3}>{data.transactionId != '' ? data.transactionId : null}</Col></Row>
                                            <Row><Col sm={3}><h6><b>Plan Name </b></h6></Col> :<Col sm={3}>{data.subscriptionId.planName != '' ? data.subscriptionId.planName : null}</Col></Row>
                                            <Row><Col sm={3}><h6><b>Amount </b></h6></Col> :<Col sm={3}>{`$${data.amount}` != '' ? `$${data.amount}` : null}</Col></Row>
                                            <Row><Col sm={3}><h6><b>Payment Mode </b></h6></Col> : <Col sm={3}>{data.paymentMode != '' ? data.paymentMode : null}</Col></Row>
                                            <Row><Col sm={3}><h6><b>Paid Date </b></h6></Col> :<Col sm={3}><Moment format="D MMM YYYY">{data.paidDate != '' ? data.paidDate : null}</Moment></Col></Row>
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
export default CompanyInvoice;