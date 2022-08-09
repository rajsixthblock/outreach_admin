import React from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Button, Card, CardBody, CardHeader, Popover, PopoverBody, Col, Label } from 'reactstrap';
import Axios from '../../../containers/Axios/config';
import Moment from 'react-moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";
import Select from 'react-select';
import "react-select/dist/react-select.min.css";

class Payments extends React.Component {
    state = {
        paymentsList: [],
        popoverOpen: false,
        currentPage: 1,
        DataCount: '',
        startDate: new Date(),
        paymentDate: '',
        company: null,
        plan: null,
        companyOptions: [],
        planOptions: [],
        paginationData : false
    };
    componentDidMount() {
        this.listTable();
    };
    listTable = () => {
        let listData = [];
        Axios.get('payment/getAllPayments/' + this.state.currentPage + '/10').then(response => {
            // console.log("response",response);
            let totalCount = response.data.totalElements;
            response.data.content.map((mapData, i) => {
                listData.push({
                    index: i + 1, paymentId: mapData.paymentId, companyId: mapData.companyId.companyId, CompanyName: mapData.companyId.companyName, subscriptionId: mapData.subscriptionId.id, planName: mapData.subscriptionId.planName,
                    amount: mapData.subscriptionId.amount, emailsLimit: mapData.subscriptionId.emailsLimit, paidDate: mapData.paidDate, createdAt: mapData.createdAt
                })
            });
            this.setState({
                paymentsList: listData,
                DataCount: totalCount,
                paginationData : false
            });
        }).catch((e) => {
            //console.log(e);
        })
        this.getSubscriptionPlans();
        this.getCompanyNames();
    };
    getCompanyNames = () => {
        let companiesList = [];
        Axios.get('company/getCompanies').then(res => {
            // console.log(res);
            res.data.map((mapData, i) => {
                companiesList.push({
                    label: mapData.companyName,
                    value: mapData.companyId
                });
                this.setState({
                    companyOptions: companiesList
                });
            })
        }).catch((e) => {
            //console.log(e);
        })
    };
    getSubscriptionPlans = () => {
        let plansList = [];
        Axios.get('getAllPlans/1/10').then(res => {
            // console.log(res);
            res.data.content.map((mapData, i) => {
                plansList.push({
                    label: mapData.planName,
                    value: mapData.id
                });
                this.setState({
                    planOptions: plansList
                });
            })
        }).catch((e) => {
            //console.log(e);
        })
    };
    dateFormat = (cell, row) => {
        return (<span><Moment format="D MMM YYYY">{cell}</Moment></span>)
    };
    onPaginationChange(page) {
        this.setState({ currentPage: page }, () => {
            if(this.state.paginationData == false){
                this.listTable();
              }
              else{
                this.filterSubmit();
              }
        });
    }
    toggle = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    };
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };
    companyHandlechange = (value) => {
        if(value != null && value != ''){
            this.setState({
                company: value.value
            });
        }
        else{
            this.setState({
                company: null
            });
        }
    };
    planHandleChange = (value) => {
        if(value != null && value != ''){
            this.setState({
                plan: value.value
            });
        }
        else{
            this.setState({
                plan: null
            });
        }
    };
    DateFilterOnChange = (date) => {
        this.setState({
            startDate: date
        })
    };
    clearData = () => {
        this.setState({
            company: '',
            plan: '',
            startDate: new Date()
        });
    };
    filterCancelButton = () =>{
        this.listTable();
        this.clearData();
    };
    filterSubmit = () => {
        let listData = [];
        let dateFormat = new Date(this.state.startDate).toISOString().slice(0, 10);
        var payload = {};
        if (this.state.paymentDate == '') {
            payload.companyId = this.state.company;
            payload.planId = this.state.plan;
        }
        else {
            payload.paidDate = dateFormat;
            payload.companyId = this.state.company;
            payload.planId = this.state.plan
        }
        if (this.state.company == '' && this.state.plan == '') {
            payload.paidDate = dateFormat;
        }
        Axios.post('payment/filter/' + this.state.currentPage + '/10', payload).then(res => {
            //console.log(res);
            res.data.content.map((mapData, i) => {
                listData.push({
                    index: i + 1, paymentId: mapData.paymentId, companyId: mapData.companyId.companyId, CompanyName: mapData.companyId.companyName, subscriptionId: mapData.subscriptionId.id, planName: mapData.subscriptionId.planName,
                    amount: mapData.subscriptionId.amount, emailsLimit: mapData.subscriptionId.emailsLimit, paidDate: mapData.paidDate, createdAt: mapData.createdAt
                });
            });
            this.setState({
                paymentsList: listData,
                paginationData : true,
                popoverOpen : false
            });
        }).catch((e) => {
            //console.log(e);
        })
    };
    render() {
        return (
            <>
                <Card>
                    <CardHeader>
                        <b>List of Payments</b>
                        <button class="btn" style={{ marginRight: '15px', width: '10%', float: 'right' }} id="Popover" onClick={this.toggle}>
                            <i class="fa fa-filter" aria-hidden="true" style={{ fontSize: '35px' }}></i>
                        </button>
                    </CardHeader>
                    <Popover placement="top" isOpen={this.state.popoverOpen} target="Popover" toggle={this.toggle}>
                        <PopoverBody>
                            <Col >
                                <Label>Paid Date</Label>
                                <DatePicker style={{ width: '120%' }} selected={this.state.startDate} onChange={this.DateFilterOnChange} value={this.state.datepick} />
                            </Col>
                            <Col style={{ marginTop: '10px' }}>
                                <Label>Company Name</Label>
                                <Select name='company' onChange={this.companyHandlechange} placeholder='select' options={this.state.companyOptions} value={this.state.company} />
                            </Col>
                            <Col style={{ marginTop: '10px' }}>
                                <Label>Plan Name</Label>
                                <Select name='plan' onChange={this.planHandleChange} placeholder='select' options={this.state.planOptions} value={this.state.plan} />
                            </Col>
                            <Button type="button" size="sm" color="primary" style={{ marginTop: '15px', marginLeft: '15px' }} onClick={this.filterSubmit}><i className="fa fa-dot-circle-o"></i> Apply </Button>
                            <Button type="reset" size="sm" color="danger" style={{ marginLeft: '23px', marginTop: '10px' }}
                                onClick={()=>{this.filterCancelButton()}}><i className="fa fa-ban"></i> Cancel</Button>
                        </PopoverBody>
                    </Popover>
                    <CardBody>
                        <BootstrapTable data={this.state.paymentsList} search>
                            <TableHeaderColumn width="8" dataField="index" dataSort>S.No.</TableHeaderColumn>
                            <TableHeaderColumn width="20" dataField="CompanyName" >Company Name</TableHeaderColumn>
                            <TableHeaderColumn width="12" dataField="planName" isKey >Plan Name</TableHeaderColumn>
                            <TableHeaderColumn width="14" dataField="emailsLimit" >Emails Limit</TableHeaderColumn>
                            <TableHeaderColumn width="10" dataField="amount" >Amount(in $)</TableHeaderColumn>
                            <TableHeaderColumn width="10" dataField="paidDate" dataFormat={this.dateFormat} >Paid Date</TableHeaderColumn>
                            <TableHeaderColumn width="10" dataField="createdAt" dataFormat={this.dateFormat} >Created Date</TableHeaderColumn>
                        </BootstrapTable>
                        <Col style={{ paddingTop: '2%' }}>
                            <Pagination
                                onChange={this.onPaginationChange.bind(this)}
                                showTotal={(total, range) =>
                                    `${range[0]} - ${range[1]} of ${total} items`
                                }
                                current={this.state.currentPage}
                                total={this.state.DataCount}
                                locale={localeInfo}
                            />
                        </Col>
                    </CardBody>
                </Card>
            </>
        )
    }
}
export default Payments;