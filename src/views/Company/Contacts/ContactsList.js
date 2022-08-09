import React from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Button, Card, CardBody, CardHeader,Col ,Popover, PopoverBody,Row,Label,Input} from 'reactstrap';
import Axios from '../../../containers/Axios/CampaginConfig';
import Moment from 'react-moment';
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";

class ContactsList extends React.Component{
    state = {
        campaignsList : [],
        currentPage : 1,
        DataCount : '',
        id : this.props.match.params.id,
        name: '',
        email: '',
        phone: null,
        popoverOpen: false,
        paginationData : false
    }
    componentDidMount(){
        this.listTable();
    }
    listTable = () =>{
        if(this.state.id == 'new'){
            let listData=[];
            let companyId = localStorage.getItem('companyId');
            Axios.get('audience/bycompany/'+companyId +'/'+this.state.currentPage+'/10').then(response=>{
                 //console.log("response",response);
                let totalCount = response.data.totalElements;
                 response.data.content.map((mapData,i)=>{
                     listData.push({index:i+1, name:mapData.name,email:mapData.email,phone : mapData.phone, createdAt : mapData.createdAt})
                 })
                this.setState({
                    campaignsList : listData,
                    DataCount :totalCount,
                    paginationData : false
                })
            }).catch((e)=>{
                //console.log(e);
            })
        }
        else{
            let listData=[];
            Axios.get('audience/bycampaign/'+this.state.id+'/1/20').then(res=>{
                // console.log(res);
                let totalCount = res.data.totalElements;
                res.data.content.map((mapData,i)=>{
                    listData.push({index:i+1, name:mapData.name,email:mapData.email,phone : mapData.phone, createdAt : mapData.createdAt})
                })
               this.setState({
                   campaignsList : listData,
                   DataCount :totalCount,
                   paginationData : false
               })
            }).catch((e)=>{
                //console.log(e);
            })
        }
    }
    dateFormat = (cell,row) =>{
        return(<span><Moment format="D MMM YYYY">{cell}</Moment></span>)
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
            phone: null,
            popoverOpen: false
        });
    }
    filterCancelButton = () =>{
        this.listTable();
        this.clearData();
    }
      filterSubmit = () => {
        if(this.state.id == 'new'){
        let companyId = localStorage.getItem('companyId');
        let payload = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            companyId : companyId
        }
        Axios.post('company/audience/filter/' + this.state.currentPage + '/10', payload).then(res => {
            // console.log(res);
            let listData=[];
            if (res.status == 200) {
               let totalCount = res.data.totalElements;
                res.data.content.map((mapData,i)=>{
                    listData.push({index:i+1, name:mapData.name,email:mapData.email,phone : mapData.phone, createdAt : mapData.createdAt})
                })
               this.setState({
                   campaignsList : listData,
                   DataCount :totalCount,
                   paginationData : true,
                   popoverOpen : false
               });
               
            }
        }).catch((e) => {
            //console.log(e);
        })
    }
    else{
        let payload = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            campaignId : this.state.id
        }
        Axios.post('campaign/audience/filter/' + this.state.currentPage + '/10', payload).then(res => {
            // console.log(res);
            let listData=[];
            if (res.status == 200) {
               let totalCount = res.data.totalElements;
                res.data.content.map((mapData,i)=>{
                    listData.push({index:i+1, name:mapData.name,email:mapData.email,phone : mapData.phone, createdAt : mapData.createdAt})
                })
               this.setState({
                   campaignsList : listData,
                   DataCount :totalCount,
                   paginationData : true,
                   popoverOpen : false
               });
            }
        }).catch((e) => {
          //  console.log(e);
        })
    }
    }
    render(){
        return(
            <>
                <Card>
                    <CardHeader>
                        <b>{this.state.id == 'new' ? 'Company All Contacts':'Campaign Contacts'}</b>
                        <button class="btn" style={{ marginRight: '15px', width: '10%', float: 'right' }} id="Popover" onClick={this.toggle}>
                            <i class="fa fa-filter" aria-hidden="true" style={{ fontSize: '35px' }}></i>
                        </button>
                    </CardHeader>
                    <Popover placement="top" isOpen={this.state.popoverOpen} target="Popover" toggle={this.toggle}>
                        <PopoverBody>
                            <Col xs='12'>
                                <Row><Label>Name:</Label></Row>
                                <Row><Input type='text' name='name' placeholder ='Name' onChange={this.filterOnChange} value={this.state.name} /></Row>
                            </Col>
                            <Col style={{ marginTop: '10px' }}>
                                <Row><Label>Email :</Label></Row>
                                <Row><Input type='email' name='email' placeholder = 'Email ID' onChange={this.filterOnChange} value={this.state.email} /></Row>
                            </Col>
                            <Col style={{ marginTop: '10px' }}>
                                <Row><Label>Phone :</Label></Row>
                                <Row><Input type='number' name='phone' placeholder = 'Phone' onChange={this.filterOnChange} value={this.state.phone} /></Row>
                            </Col>
                            <Button type="button" size="sm" color="primary" style={{ marginTop: '15px', marginLeft: '15px' }} onClick={this.filterSubmit}><i className="fa fa-dot-circle-o"></i> Apply </Button>
                            <Button type="reset" size="sm" color="danger" style={{ marginLeft: '23px', marginTop: '10px' }}
                                onClick={()=>this.filterCancelButton()}><i className="fa fa-ban"></i> Reset</Button>
                        </PopoverBody>
                    </Popover>
                    <CardBody>
                        <BootstrapTable data={this.state.campaignsList}>
                            <TableHeaderColumn  width="8" dataField="index" dataSort>S.No.</TableHeaderColumn>
                            <TableHeaderColumn width="12" dataField="name" >Name</TableHeaderColumn>
                            <TableHeaderColumn width="14" dataField="email" isKey >Email</TableHeaderColumn>
                            <TableHeaderColumn width="14" dataField="phone" >Phone</TableHeaderColumn>
                            <TableHeaderColumn width="10" dataField="createdAt"   dataFormat={this.dateFormat} >Created Date</TableHeaderColumn>
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

export default ContactsList;