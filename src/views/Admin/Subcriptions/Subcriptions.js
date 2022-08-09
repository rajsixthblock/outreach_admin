import React from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Button, Card, CardBody, CardHeader, Col } from 'reactstrap';
import Axios from '../../../containers/Axios/config';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import swal from 'sweetalert';
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";

class Subscriptions extends React.Component {
  state = {
    subscriptionsList: [],
    currentPage: 1,
    DataCount: '',
  }
  componentDidMount() {
    this.listTable();
  }
  listTable = () => {
    let allsubscriptions = [];
    Axios.get(`getAllPlans/${this.state.currentPage}/10`).then(response => {
       //console.log(response);
      let totalCount = response.data.totalElements;
      response.data.content.map((mapData, i) => {
        allsubscriptions.push({
          sNo: i + 1, planName: mapData.planName, amount: mapData.amount, emailsLimit: mapData.emailsLimit,
          status: mapData.status, createdAt: mapData.createdAt, updatedAt: mapData.updatedAt, id: mapData.id, planType: mapData.planType
        })
      });
      this.setState({
        subscriptionsList: allsubscriptions,
        DataCount: totalCount
      })
    }).catch((e) => {
      //console.log(e);
    })
  }
  indexNum = (cell, row, enumObject, index) => {
    let row_index = (index + 1);
    return (<div>{row_index}</div>)
  }
  dateFormat = (cell, row) => {
    return (<span><Moment format="D MMM YYYY">{cell}</Moment></span>)
  }
  toggleSwitch = (cell, row) => {
    return (
      <Switch className="custom-switch custom-switch-primary custom-switch-small"
        onChange={(e) => { this.toggleSwitchChange(e, row) }} checked={row.status}></Switch>
    )
  }
  toggleSwitchChange = (e, row) => {
    let data = row;
    data.status = !row.status;
    Axios.put('plan/update/' + row.id, data).then(res => {
      // console.log(res);
      if (res.status == 200) {
        if (row.status === true) {
          swal('Subscription enabled succefully!')
        }
        if (row.status == false) {
          swal('Subscription disabled succefully!')
        }
        this.listTable();
      }
      else {
        //console.log(res);
      }
    }).catch((e) => {
      //console.log(e);
      swal('OOPS!', e.response.data.message);
    })
  }
  actionsHandle = (cell, row) => {
    return (
      <span>
        <i className="fa fa-pencil" aria-hidden="true" style={{ cursor: 'pointer', color: 'green' }} onClick={() => { this.props.history.push("/subscriptions/createSubscriptions/" + row.id); }}></i>
        <i className="fa fa-trash" aria-hidden="true" style={{ marginLeft: '10px', color: 'red' }} onClick={() => { this.deleteSubscriptions(cell, row) }}></i>
      </span>
    )
  }
  deleteSubscriptions = (cell, row) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          Axios.delete('plan/delete/' + row.id).then(res => {
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
  render() {
    return (
      <>
        <Card>
          <CardHeader>
            <b>List of Subscriptions</b>
            <Link to='/subscriptions/createSubscriptions/new'>
              <Button color="primary" align="right" size="sm" className="float-right">Add Subscription</Button>
            </Link>
          </CardHeader>
          <CardBody>
            <BootstrapTable data={this.state.subscriptionsList} search>
              <TableHeaderColumn width="7" dataField="sNo" >S.No.</TableHeaderColumn>
              <TableHeaderColumn width="14" dataField="planName" isKey >Plan Name</TableHeaderColumn>
              <TableHeaderColumn width="8" dataField="planType" >Plan Type</TableHeaderColumn>
              <TableHeaderColumn width="12" dataField="emailsLimit" >Emails Limit</TableHeaderColumn>
              <TableHeaderColumn width="12" dataField="amount" >Amount(in $)</TableHeaderColumn>
              <TableHeaderColumn width="8" dataField="status" dataFormat={this.toggleSwitch}>Status</TableHeaderColumn>
              <TableHeaderColumn width="10" dataField="createdAt" dataFormat={this.dateFormat}>Created Date</TableHeaderColumn>
              <TableHeaderColumn width="10" dataField="updatedAt" dataFormat={this.dateFormat}>Updated Date</TableHeaderColumn>
              <TableHeaderColumn width="8" dataField="id" dataFormat={this.actionsHandle} >Action</TableHeaderColumn>
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
export default Subscriptions;