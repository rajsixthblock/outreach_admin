import React from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Button, Card, CardBody, CardHeader,Col ,Popover,Row,PopoverBody,Input,Label} from 'reactstrap';
import Axios from '../../../containers/Axios/CampaginConfig';
import Moment from 'react-moment';
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";

class SubscriptionsTable extends React.Component{
    state = {
        currentPage : 1,
        DataCount : '',
        campaginsList : [],
        name: '',
        email: '',
        title: '',
        paginationData : false
    };
    componentDidMount(){
       this.listTable();
    };
    listTable = () =>{
        let companyId = localStorage.getItem('companyId');
        Axios.get('campaign/getCampaignes/' + companyId +'/'+this.state.currentPage+'/10').then(response=>{
            // console.log("response",response);
            this.setState({
                campaginsList : response.data.content,
                DataCount :response.data.totalElements,
                paginationData : false
            });
        }).catch((e)=>{
            //console.log(e);
        })
    };
    dateFormat = (cell,row) =>{
        return(<span><Moment format="D MMM YYYY">{cell}</Moment></span>)
    };
    indexNum = (cell, row, enumObject, index) => {
        let row_index = (index+1);
        return (<div>{row_index}</div>) 
    };
    campaignContacts = (cell,row) =>{
        // console.log(row);
        return(
            <i className="fa fa-users" aria-hidden="true" style={{ cursor: 'pointer', color: 'green' }} onClick={() => { this.props.history.push("/contacts/" + row.campaignId); }}></i>
        )
    };
    filterCancelButton = () =>{
        this.clearData();
        this.listTable();
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
            name: '',
            email: '',
            title: '',
            popoverOpen: false
        });
    };
    filterSubmit = () => {
        let companyId = localStorage.getItem('companyId');
        let payload = {
            name: this.state.name,
            email: this.state.email,
            title: this.state.title,
            companyId : companyId
        };
        Axios.post('campaign/filter/' + this.state.currentPage + '/10', payload).then(response => {
            // console.log(response);
            if (response.status == 200) {
                this.setState({
                    campaginsList : response.data.content,
                    DataCount :response.data.totalElements,
                    paginationData : true,
                    popoverOpen : false
                });
            }
        }).catch((e) => {
            //console.log(e);
        })
    };
    render(){
        return(
            <>
                <Card>
                    <CardHeader>
                        <b>List of Campagins</b>
                        <button class="btn" style={{ marginRight: '15px', width: '10%', float: 'right' }} id="Popover" onClick={this.toggle}>
                            <i class="fa fa-filter" aria-hidden="true" style={{ fontSize: '35px' }}></i>
                        </button>
                    </CardHeader>
                    <Popover placement="top" isOpen={this.state.popoverOpen} target="Popover" toggle={this.toggle}>
                        <PopoverBody>
                            <Col xs='12'>
                                <Row><Label>Name:</Label></Row>
                                <Row><Input type='text' name='name' placeholder='Name' onChange={this.filterOnChange} value={this.state.name} /></Row>
                            </Col>
                            <Col style={{ marginTop: '10px' }}>
                                <Row><Label>Email :</Label></Row>
                                <Row><Input type='email' name='email' placeholder='Email ID' onChange={this.filterOnChange} value={this.state.email} /></Row>
                            </Col>
                            <Col style={{ marginTop: '10px' }}>
                                <Row><Label>Title :</Label></Row>
                                <Row><Input type='text' name='title' placeholder='Title' onChange={this.filterOnChange} value={this.state.title} /></Row>
                            </Col>
                            <Button type="button" size="sm" color="primary" style={{ marginTop: '15px', marginLeft: '15px' }} onClick={this.filterSubmit}><i className="fa fa-dot-circle-o"></i> Apply </Button>
                            <Button type="reset" size="sm" color="danger" style={{ marginLeft: '23px', marginTop: '10px' }}
                                onClick={()=>{this.filterCancelButton()}}><i className="fa fa-ban"></i> Cancel</Button>
                        </PopoverBody>
                    </Popover>
                    <CardBody>
                        <BootstrapTable data={this.state.campaginsList} search>
                            <TableHeaderColumn  width="8" dataField="index" dataFormat={this.indexNum} dataSort>S.No.</TableHeaderColumn>
                            <TableHeaderColumn width="12" dataField="name" >Name</TableHeaderColumn>
                            <TableHeaderColumn width="14" dataField="title" isKey >Title</TableHeaderColumn>
                            <TableHeaderColumn width="30" dataField="email" >Email</TableHeaderColumn>
                            <TableHeaderColumn width="10" dataField="createdAt"  dataFormat={this.dateFormat} >Created Date</TableHeaderColumn>
                            <TableHeaderColumn width="10" dataField="createdAt"  dataFormat={this.campaignContacts} >Contacts</TableHeaderColumn>
                        </BootstrapTable>
                        <Col style={{paddingTop : '2%'}}>
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
export default SubscriptionsTable;