import React from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Button, Card, CardBody, CardHeader,Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import "react-select/dist/react-select.min.css";
import Axios from '../../../containers/Axios/config';
import Moment from 'react-moment';
import swal from 'sweetalert';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";

class AdminUsers extends React.Component{
    state = {
        adminList : [],
        currentPage : 1,
        DataCount : '',
    };
    componentDidMount(){
        this.listTable();
    };
    listTable = ()=>{
        Axios.get('user/getallusers/'+this.state.currentPage +'/10').then(res=>{
            //console.log(res);
            this.setState({
              adminList : res.data.content,
                DataCount : res.data.totalElements
            })
        }).catch((e)=>{
            //console.log(e);
        })
    };
    indexNum = (cell, row, enumObject, index) => {
        let row_index = (index+1);
        return (<div>{row_index}</div>) 
    };
    dateFormat = (cell,row) =>{
        return(<span><Moment format="D MMM YYYY">{cell}</Moment></span>)
    };
    actionsHandle = (cell, row) => {
       return (
         <span>
           <i className="fa fa-pencil" aria-hidden="true" style={{ cursor: 'pointer', color: 'green' }} onClick={() => { this.props.history.push("/adminusers/edituser/" + row.adminId); }}></i>
           <i className="fa fa-trash" aria-hidden="true" style={{ marginLeft: '10px', color: 'red' }} onClick={() => { this.deleteUsers(cell, row) }}></i>
         </span>
       );
     }
     toggleSwitch = (cell,row) => {
        return(
            <Switch className="custom-switch custom-switch-primary custom-switch-small"
            onChange ={(e)=>{this.toggleSwitchChange(e,row)}} checked={row.status}></Switch>
        )
      };
      toggleSwitchChange = (e,row) => {
        let data = row;
        data.status = !row.status;
        Axios.put('admin/user/update/'+row.adminId,data).then(res=>{
          // console.log(res);
          if(res.status == 200){
           if(row.status === true){
             swal('admin enabled succefully!')
           }
           if(row.status == false){
             swal('admin disabled succefully!')
           }
           this.listTable();
          }
          else{
            //console.log(res);
          }
        }).catch((e)=>{
          //console.log(e);
          swal('OOPS!',e.response.data.message);
        })
     };
     deleteUsers=(cell,row)=>{
        swal({
            title: "Are you sure?",
            text: "Are you sure you want delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
            .then(willDelete => {
              if (willDelete) {
                Axios.delete('admin/user/delete/' + row.adminId).then(res => {
                  this.listTable();
                }).catch((e) => {
                  if (e.status == 500) {
                    swal('OOPS!', e.response.data.message);
                  }
                })
                swal("Deleted!", "Your imaginary file has been deleted!", "success");
              }
            });
      }
      onPaginationChange(page) {
        this.setState({ currentPage: page }, () => {
          this.listTable();
        });
      }  
    render(){
      return(
          <>
           <Card>
            <CardHeader>
             <b> Admin Users</b>
              <Link to ='/adminusers/createadminuser/new'>
                <Button color="primary" align="right" size="sm" className="float-right">Add Admin</Button>
              </Link>
            </CardHeader>
              <CardBody>
                <BootstrapTable data={this.state.adminList} search>
                  <TableHeaderColumn width="5" dataField="sno" dataFormat={this.indexNum} >S.No.</TableHeaderColumn>
                  <TableHeaderColumn width="12" dataField="name" >Full Name</TableHeaderColumn>
                  <TableHeaderColumn width="25" dataField="email" isKey >Email</TableHeaderColumn>
                  <TableHeaderColumn width="14" dataField="phone"  >Phone</TableHeaderColumn>
                  <TableHeaderColumn width="10" dataField="createdAt" dataFormat={this.dateFormat}  dataSort>Created Date</TableHeaderColumn>
                  <TableHeaderColumn width="10" dataField="status" dataFormat={this.toggleSwitch} >Status</TableHeaderColumn>
                  <TableHeaderColumn width="10" dataField="id" dataFormat={this.actionsHandle} >Action</TableHeaderColumn>
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

export default AdminUsers;