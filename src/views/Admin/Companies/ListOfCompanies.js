import React from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Button, Card, CardBody, CardHeader, Popover, PopoverBody, Col, Row,Input,Label } from 'reactstrap';
import Axios from '../../../containers/Axios/config';
import { Link } from 'react-router-dom';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import swal from 'sweetalert';
import Moment from 'react-moment';
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";

class ListOfCompanies extends React.Component {
    state = {
        companiesList: [],
        companyName: '',
        email: '',
        phone: null,
        currentPage: 1,
        DataCount: '',
        popoverOpen: false,
        paginationData : false
    }
    componentDidMount() {
        this.listTable();
    }
    listTable = () => {
        Axios.get('company/getCompanies/' + this.state.currentPage + '/10').then(response => {
            // console.log("res",response);
             let arr = response.data.companyDetails.content;
           this.setState({
                companiesList: response.data.companyDetails.content,
                DataCount: response.data.companyDetails.totalElements,
                paginationData : false
            })
        }).catch((e) => {
            //console.log(e.response);
        })
    }
    company = (cell, row) => {
        return (
            <span>
                <Link to={`/companies/editcompany/${row.companyId}`}>
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </Link>
                <i className="fa fa-list-alt" aria-hidden="true" style={{ cursor: 'pointer', color: 'green', marginLeft: '10px' }}
                    onClick={() => { window.location = '/#/company?id=' + row.companyId }}></i>
            </span>
        )
    }
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
    indexNum = (cell, row, enumObject, index) => {
        let row_index = (index + 1);
        return (<div>{row_index}</div>)
    }
    toggleSwitch = (cell, row) => {
        return (
            <Switch className="custom-switch custom-switch-primary custom-switch-small"
                onChange={(e) => { this.onChange(e, row) }} checked={row.status}></Switch>
        )
    }
    onChange = (e, row) => {
        let data = row;
        data.status = !row.status;
        Axios.put('company/update/' + row.companyId, data).then(res => {
            //console.log(res);
            if (res.status == 200) {
                if (row.status === true) {
                    swal('company enabled succefully!', row.companyName)
                }
                if (row.status == false) {
                    swal('company disabled succefully!', row.companyName)
                }
                this.listTable();
            }
            else {
               // console.log(res);
            }
        }).catch((e) => {
            //console.log(e);
            swal('OOPS!', e.response.data.message);
        })
    }
    dateFormat = (cell, row) => {
        return (<span><Moment format="D MMM YYYY">{cell}</Moment></span>)
    }
    toggle = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }
    filterOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    clearData = () => {
        this.setState({
            companyName: '',
            email: '',
            phone: null,
            popoverOpen: false
        });
    }
    filterCancelButton = () =>{
        this.listTable();
        this.clearData();
    }
    filterSubmit = () => {
        let payload = {
            companyName: this.state.companyName,
            email: this.state.email,
            phone: this.state.phone
        }
        Axios.post('company/filter/' + this.state.currentPage + '/10', payload).then(res => {
            //console.log(res);
            if (res.status == 200) {
                this.setState({
                    companiesList: res.data.content,
                    DataCount: res.data.totalElements,
                    paginationData : true,
                    popoverOpen : false
                });               
            }          
        }).catch((e) => {
            //console.log(e);
        })
    }

    render() {
        return (
            <>
                <Card>
                    <CardHeader>                       
                        <b>List Of Companies</b>
                        <Link to='/companies/createcompany/new'>
                            <Button color="primary"size='sm' align="right" className="float-right">Add company</Button>
                        </Link>
                            <i class="fa fa-filter" aria-hidden="true" style={{ fontSize: '35px' ,float:'right',marginRight:'2%'}} id="Popover" onClick={this.toggle}></i>
                    </CardHeader>
                    <Popover placement="top" isOpen={this.state.popoverOpen} target="Popover" toggle={this.toggle}>
                        <PopoverBody>
                            <Col xs='12'>
                                <Row><Label>Company Name:</Label></Row>
                                <Row><Input type='text' name='companyName' placeholder='Company Name' onChange={this.filterOnChange} value={this.state.companyName} /></Row>
                            </Col>
                            <Col style={{ marginTop: '10px' }}>
                                <Row><Label>Email :</Label></Row>
                                <Row><Input type='email' name='email' placeholder='Email ID' onChange={this.filterOnChange} value={this.state.email} /></Row>
                            </Col>
                            <Col style={{ marginTop: '10px' }}>
                                <Row><Label>Phone :</Label></Row>
                                <Row><Input type='number' name='phone' placeholder='Phone' onChange={this.filterOnChange} value={this.state.phone} /></Row>
                            </Col>
                            <Button type="button" size="sm" color="primary" style={{ marginTop: '15px', marginLeft: '15px' }} onClick={this.filterSubmit}><i className="fa fa-dot-circle-o"></i> Apply </Button>
                            <Button type="reset" size="sm" color="danger" style={{ marginLeft: '23px', marginTop: '10px' }}
                                onClick={()=>{this.filterCancelButton()}}><i className="fa fa-ban"></i> Cancel</Button>
                        </PopoverBody>
                    </Popover>
                    <CardBody>
                        <BootstrapTable data={this.state.companiesList} search >
                            <TableHeaderColumn width="8" dataField="sno" dataSort dataFormat={this.indexNum}>S.No.</TableHeaderColumn>
                            <TableHeaderColumn width="20" dataField="companyName" dataSort>Company Name</TableHeaderColumn>
                            <TableHeaderColumn width="25" dataField="email" isKey >Email</TableHeaderColumn>
                            <TableHeaderColumn width="14" dataField="phone" >Phone</TableHeaderColumn>
                            <TableHeaderColumn width="15" dataField="createdAt" dataFormat={this.dateFormat} dataSort>Created Date</TableHeaderColumn>
                            <TableHeaderColumn width="10" dataField="status" dataFormat={this.toggleSwitch}>Status</TableHeaderColumn>
                            <TableHeaderColumn width="10" dataField="id" dataFormat={this.company} >Action</TableHeaderColumn>
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

export default ListOfCompanies;