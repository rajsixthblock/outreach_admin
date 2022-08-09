import React from 'react';
import { Bar } from 'react-chartjs-2';
import Axios from '../../../containers/Axios/CampaginConfig';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import CompanyDoughnutChart from './CompanyDoughnut';
class CompanyDashboard extends React.Component {
    state = {
        audienceLabels: [],
        audienceCount: []
    };
    componentDidMount() {
        let companyId = localStorage.getItem('companyId');
        let labelsArray = [];
        let dataArray = [];
        Axios.get('admin/company/dashboard/' + companyId).then(res => {
            // console.log(res);
            res.data.audienceCountByCampaign.map((mapData, i) => {
                return (labelsArray.push(mapData[1]), dataArray.push(mapData[0]));
            })
            this.setState({
                audienceLabels: labelsArray,
                audienceCount: dataArray
            })
        })
    };
    render() {
        return (
            <>
                <h1>Company Dashboard</h1>  
                    <Row>
                        <Col >
                            <Card>
                                <CardHeader><b> Contacts based on Campagines</b></CardHeader>
                            <CardBody style={{ overflow: 'scroll' }}>
                                <Bar data={{
                                    labels: this.state.audienceLabels,
                                    datasets: [
                                        {
                                            backgroundColor: 'lightpink',
                                            label: 'Contacts',
                                            borderColor: 'rgba(220, 220, 220, 0.8)',
                                            highlightFill: 'rgba(220, 220, 220, 0.75)',
                                            highlightStroke: 'rgba(220, 220, 220, 1)',
                                            data: this.state.audienceCount
                                        }
                                    ]
                                }} />
                                </CardBody>
                            </Card>
                        </Col>                   
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader><b>Total Count</b></CardHeader>
                                <CardBody> 
                                    <CompanyDoughnutChart />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
            </>
        )
    }
}
export default CompanyDashboard;