import React from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Button, Card, CardBody, CardHeader, Label, Col, Row,Popover, PopoverBody ,Input} from 'reactstrap';
import "react-select/dist/react-select.min.css";
import Axios from '../../../containers/Axios/config';
import Moment from 'react-moment';
import swal from 'sweetalert';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";

class Users extends React.Component {
  state = {
    usersList: [],
    currentPage: 1,
    DataCount: '',
    name: '',
    email: '',
    phone: null,
    popoverOpen: false,
    paginationData : false
  };
  componentDidMount() {
    this.listTable();
  }
  listTable = () => {
    let companyId = localStorage.getItem('companyId');
    Axios.get('user/getUsers/' + companyId + '/' + this.state.currentPage + '/10').then(res => {
      // console.log('user/getUsers',res);
      this.setState({
        usersList: res.data.content,
        DataCount: res.data.totalElements,
        paginationData : false
      })
    }).catch((e) => {
      //console.log(e);
    })
  };
  indexNum = (cell, row, enumObject, index) => {
    let row_index = (index + 1);
    return (<div>{row_index}</div>)
  };
  dateFormat = (cell, row) => {
    return (<span><Moment format="D MMM YYYY">{cell}</Moment></span>)
  };
  actionsHandle = (cell, row) => {
    return (
      <span>
        <i className="fa fa-pencil" aria-hidden="true" style={{ cursor: 'pointer', color: 'green' }} onClick={() => { this.props.history.push("/users/edituser/" + row.userId); }}></i>
        <i className="fa fa-trash" aria-hidden="true" style={{ marginLeft: '10px', color: 'red' }} onClick={() => { this.deleteUsers(cell, row) }}></i>
      </span>
    )
  };
  toggleSwitch = (cell, row) => {
    return (
      <Switch className="custom-switch custom-switch-primary custom-switch-small"
        onChange={(e) => { this.toggleSwitchChange(e, row) }} checked={row.status}></Switch>
    )
  };
  toggleSwitchChange = (e, row) => {
    let data = row;
    data.status = !row.status;
    Axios.put('user/update/' + row.userId, data).then(res => {
      // console.log(res);
      if (res.status == 200) {
        if (row.status === true) {
          swal('User enabled succefully!')
        }
        if (row.status == false) {
          swal('User disabled succefully!')
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
  };
  deleteUsers = (cell, row) => {
    // console.log(row);
    swal({
      title: "Are you sure?",
      text: "Are you sure you want delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          Axios.delete('user/delete/' + row.userId).then(res => {
            this.listTable();
          }).catch((e) => {
            if (e.status == 500) {
              swal('OOPS!', e.response.data.message);
            }
          })
          swal("Deleted!", "Your imaginary file has been deleted!", "success");
        }
      });
  };
  filterCancelButton = () =>{
    this.listTable();
    this.clearData();
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
  };
  toggle = () => {
    this.setState({
        popoverOpen: !this.state.popoverOpen
    });
  };
  filterOnChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  };
  clearData = () => {
      this.setState({
          name: '',
          email: '',
          phone: null,
          popoverOpen: false
      });
  };
  filterSubmit = () => {
    let companyId = localStorage.getItem('companyId');
    let payload = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        companyId : companyId
      };
    Axios.post('user/filter/' + this.state.currentPage + '/10', payload).then(res => {
      // console.log('user/filter',res);
      let filterData = res.data.content;
      if (res.status == 200) {
          this.setState({
              usersList: filterData,
              DataCount: res.data.totalElements,
              paginationData : true,
              popoverOpen : false
          })
      }
    }).catch((e) => {
        //console.log(e);
    });
  };
  render() {
    return (
      <>
        <Card>
          <CardHeader>
            <b>List Of Company Users</b>
            <i class="fa fa-filter" aria-hidden="true" style={{ fontSize: '35px' ,float:'right',marginRight:'2%'}} id="Popover" onClick={this.toggle}></i>
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
                <Row><Label>Phone :</Label></Row>
                <Row><Input type='number' name='phone' placeholder='Phone' onChange={this.filterOnChange} value={this.state.phone} /></Row>
              </Col>
              <Button type="button" size="sm" color="primary" style={{ marginTop: '15px', marginLeft: '15px' }} onClick={this.filterSubmit}><i className="fa fa-dot-circle-o"></i> Apply </Button>
              <Button type="reset" size="sm" color="danger" style={{ marginLeft: '23px', marginTop: '10px' }}
                onClick={()=>this.filterCancelButton()}><i className="fa fa-ban"></i> Cancel</Button>
            </PopoverBody>
          </Popover>
          <CardBody>
            <BootstrapTable data={this.state.usersList} search>
              <TableHeaderColumn width="5" dataField="sno" dataFormat={this.indexNum} >S.No.</TableHeaderColumn>
              <TableHeaderColumn width="12" dataField="name" >Full Name</TableHeaderColumn>
              <TableHeaderColumn width="25" dataField="email" isKey >Email</TableHeaderColumn>
              <TableHeaderColumn width="14" dataField="phone"  >Phone</TableHeaderColumn>
              <TableHeaderColumn width="10" dataField="createdAt" dataFormat={this.dateFormat} dataSort>Created Date</TableHeaderColumn>
              <TableHeaderColumn width="10" dataField="status" dataFormat={this.toggleSwitch} >Status</TableHeaderColumn>
              <TableHeaderColumn width="10" dataField="id" dataFormat={this.actionsHandle} >Action</TableHeaderColumn>
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
export default Users;