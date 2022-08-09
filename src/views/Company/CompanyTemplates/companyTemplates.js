import React, { Component } from 'react'
import { Button, Card, CardGroup, CardHeader, Container, Row, Col, CardFooter, ButtonGroup, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
//import Axios from '../../../containers/Axios/config';
import Axios from '../../../containers/Axios/config';
import swal from 'sweetalert';
import '../../Admin/Templates/style.css';
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";
export default class companyTemplates extends Component {
    state = {
        allTemplates: [],
        id: this.props.match.params.id,
        templateName: '',
        currentPage: 1,
        DataCount: '',
        paginationData : false
    };
    componentDidMount() {
        this.wholeTemplates();
    };
    wholeTemplates = () => {
        let companyId = localStorage.getItem('companyId');
        Axios.get('template/companytemplates/'+companyId+"/"+ this.state.currentPage + '/10').then(res => {
            //console.log(res);
            this.setState({ allTemplates: res.data.content,DataCount: res.data.totalElements,
                paginationData : false })
        }).catch((e) => {
           // console.log(e);
        })
    };
    onPaginationChange(page) {
        this.setState({ currentPage: page }, () => {
            if(this.state.paginationData == false){
                this.wholeTemplates();                
              }          
        });
    }
    handleView = (id) => {
        this.props.history.push("/companyTemplates/viewTemplates/" + id)
    }
    handleDelete = (id) => {
       swal({
            title: "Are you sure?",
            text: "Are you sure you want delete?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(willDelete => {
                if (willDelete) {
                    Axios.delete('template/delete/' + id).then(res => {
                        this.wholeTemplates();
                    }).catch((e) => {
                        if (e.status == 500) {
                            swal('OOPS!', e);
                        }
                    })
                    swal("Deleted!", "Template deleted!", "success");
                }
            });
    }
    render() {
        return (
            <Card>
                <CardHeader>
                    <Row>
                        <Col sm={6}><h4><b>List Of Company Templates</b></h4></Col>
                        <Col sm={6}></Col>
                    </Row>    
                </CardHeader>
                   <div style={{marginTop:'50px',padding:'0px 110px 0px 110px '}}>                                  
                     <div>
                     <section class="cards">
                       {this.state.allTemplates.map((data,i) => {                    
                        return (
                                <Card  className="div1" key={i}>
                                    <CardBody dangerouslySetInnerHTML={{ __html: data.templateData.htmlData }}  className='bodycard'>
                                            </CardBody>                                                                                                               
                                        <div class='container'>                       
                                            <div class="overlay">
                                                <div class = "temp"></div> 
                                                    <div class = "temp head"> 
                                                    <hr/>
                                                    </div>  
                                                <div class="temp cart">
                                                <i class="fa fa-list" style={{color:"green"}} onClick={() => this.handleView(data.templateId)}> <span style={{color:"#fffefa"}}>Preview</span></i>
                                                {/* <i class="fa fa-trash" style={{color:"red"}} onClick={() => this.handleDelete(data.templateId)}><span style={{color:"#fffefa"}}>delete</span> </i>      */}
                                                </div>  
                                            </div>
                                        </div>                           
                                    <CardFooter style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>{data.name}</CardFooter>
                                </Card>                                              
                                )
                          })}
                      </section>
                    </div>
                    <div style={{ margin:'30px' ,textAlign:'right'}}>
                            <Pagination
                                onChange={this.onPaginationChange.bind(this)}
                                showTotal={(total, range) =>
                                    `${range[0]} - ${range[1]} of ${total} items`
                                }
                                current={this.state.currentPage}
                                total={this.state.DataCount}
                                locale={localeInfo}
                            />
                    </div>                                       
                </div>
            </Card >
        )
    }
}

