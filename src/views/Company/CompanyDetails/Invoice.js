import React from 'react';
import Invoice from '../Invoicecomponents/reports/Invoice';
import {PDFViewer} from '@react-pdf/renderer'
import './Invoice.css';
import Axios from '../../../containers/Axios/config';
import Moment from 'react-moment';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Button, Card, CardBody, CardHeader, Popover, PopoverBody, Col, Row,Input,Label ,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Invoice2 extends React.Component {
    state = {
        payments: [],
        data : [],
        invoice : {},
        modal:  false,
        pdfDownloadData:[]     
    }
    componentDidMount() {
        let companyId = localStorage.getItem('companyId');
        let invoiceData = [];
        Axios.get('payment/getAll/' +companyId+ '/1/20').then(res => {
            //console.log("invoice",res);
            res.data.content.map((mapData,i)=>{
                invoiceData.push({"sno":i+1,"transactionId":mapData.transactionId,
                        "id": mapData.transactionId,
                        "invoice_no": mapData.transactionId,
                        "balance": mapData.subscriptionId.amount,
                        "company": mapData.companyId.companyName,
                        "email": mapData.companyId.email,
                        "phone": mapData.companyId.phone,
                        "address": "922 Campus Road, Drytown, Wisconsin, 1986",
                        "trans_date":  mapData.paidDate ,
                         "planName": mapData.subscriptionId.planName,
                        "qty": mapData.subscriptionId.emailsLimit,
                        "rate":  mapData.amount,
                        "paymentMode": mapData.paymentMode
                })
            })
            this.setState({
                payments:invoiceData
            })
        }).catch((e) => {
            //console.log(e);
        })
    }
    indexNum = (cell, row, enumObject, index) => {
        let row_index = (index + 1);
        return (<div>{row_index}</div>)
    }
    pdfDownload=(cell,row)=>{
       return <span    style={{ marginLeft: '10px', color: 'blue',fontSize:"15px",cursor:"pointer" }} onClick={() => { this.pdfDownloadClick(cell, row) }}>View</span>
    }
    toggle=()=> {
        this.setState({
          modal: !this.state.modal
        });
      }
    pdfDownloadClick=(cell,row)=>{
        this.setState({
            modal: !this.state.modal,
            pdfDownloadData:row
          });
    }
    dateFormat = (cell, row) => {
        return (<span><Moment format="D MMM YYYY">{cell}</Moment></span>)
    }
    render() {
        return (
            <>
            <Card>
                <CardHeader>
                    <b>List of Invoice</b>
                </CardHeader>
                <CardBody>
                    <BootstrapTable data={this.state.payments} search >
                            <TableHeaderColumn width="8" dataField="sno" isKey dataSort dataFormat={this.indexNum}>S.No.</TableHeaderColumn>
                             <TableHeaderColumn width="14" dataField="planName" >planName</TableHeaderColumn>
                              <TableHeaderColumn width="25" dataField="email"  >email </TableHeaderColumn>
                           <TableHeaderColumn width="14" dataField="phone" >Phone</TableHeaderColumn>
                            <TableHeaderColumn width="15" dataField="trans_date" dataFormat={this.dateFormat} dataSort>Created Date</TableHeaderColumn>
                             <TableHeaderColumn width="10" dataField="rate"  >amount</TableHeaderColumn>
                             <TableHeaderColumn width="15" dataField="qty"  >emailsLimit</TableHeaderColumn>
                            <TableHeaderColumn width="10" dataField="id" dataFormat={this.pdfDownload} >Action</TableHeaderColumn>
                    </BootstrapTable>
                </CardBody>
            </Card>
            <Modal isOpen={this.state.modal} toggle={this.toggle} style={{maxWidth: '80%', width: '77%'}}   >
          <ModalHeader toggle={this.toggle}>Download Invoice</ModalHeader>
          <ModalBody>
                <PDFViewer width="1000" height="600" className="app2" >
                    <Invoice 
                        invoice={{
                        "id": this.state.pdfDownloadData.transactionId,
                        "invoice_no": this.state.pdfDownloadData.transactionId,
                        "balance": this.state.pdfDownloadData.amount,
                        "company": this.state.pdfDownloadData.companyName,
                        "email":this.state.pdfDownloadData.email,
                        "phone": this.state.pdfDownloadData.phone,
                        "address": "922 Campus Road, Drytown, Wisconsin, 1986",
                        "trans_date": <Moment format="DD/MM/YYYY">{this.state.pdfDownloadData.paidDate}</Moment>,
                        "due_date": <Moment format="DD/MM/YYYY">{this.state.pdfDownloadData.paidDate}</Moment>,
                    
                        "items": [
                            {
                            "sno": this.state.pdfDownloadData.sno,
                            "desc": this.state.pdfDownloadData.planName,
                            "qty": this.state.pdfDownloadData.qty,
                            "rate":  this.state.pdfDownloadData.rate,
                            "paymentMode": this.state.pdfDownloadData.paymentMode
                        }

                    ]}} />
                    </PDFViewer>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </>
        )
    }
}

export default Invoice2;