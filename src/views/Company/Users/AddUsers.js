import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Input, Label, Button, FormFeedback, CardFooter, FormGroup } from "reactstrap"
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Axios from "../../../containers/Axios/config";
import Swal from "sweetalert2";

class AddUsers extends React.Component {
    state = {
        id: this.props.match.params.id,
        name: "",
        email: "",
        password: "",
        phone: "",
        company : ""
    };
    componentDidMount(){
      if(this.state.id != 'new'){
        Axios.get('user/getByID/'+this.state.id).then(response =>{
          // console.log(response);
          this.setState({
            name: response.data.name,
            email: response.data.email,
            password: response.data.password,
            phone: response.data.phone,
            company : response.data.companyId.className
          })
        }).catch((e)=>{
          //console.log(e);
        })
      }
    };
    routeChange = () =>{
      this.props.history.push('/users');
    };
    schema = () => {
      return (
          Yup.object().shape({
              name: Yup.string().required("Name is Required"),
              phone: Yup.string().min(10, 'required min length 10').max(12, 'Only allowed length 12').required('Please enter your phone Number').matches(
                  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                  "Phone number is not valid"),
              email: Yup.string().required("email is Required").email("Invalid mail address"),
              password: Yup.string().required("Password is Required"),
          })
      )
    }
    handleChange = (name, value) => {
      this.setState({
          [name]: value
      })
    };
    onSubmit = (values) =>{
      let companyId = localStorage.getItem('companyId');
      if(this.state.id == 'new'){
        let payload = {
          name : values.name,
          email: values.email,
          password: values.password,
          phone: values.phone,
          company : companyId,
          status : true
        }
        Axios.post('user/create/'+companyId,payload).then(response=>{
          // console.log(response);
          if (response.status == 201) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User Added successfully',
                showConfirmButton: false,
                timer: 1000
              })
            setTimeout(() => {
              this.props.history.push('/users');
            }, 1000)
        }
        }).catch((e)=>{
          //console.log(e);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: e.response.data.message,
          });
        })
      }
      else{
        let payload = {
          name : values.name,
          email: values.email,
          password: values.password,
          phone: values.phone,
          company : companyId,
          status : true
        };
        Axios.put('user/update/'+this.state.id,payload).then(response=>{
          // console.log(response);
          if (response.status == 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'User Updated successfully',
              showConfirmButton: false,
              timer: 1000
            })
            setTimeout(() => {
              this.props.history.push('/users');
            }, 1000)
        }
        }).catch((e)=>{
          //console.log(e);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: e.response.data.message,
          });
        })
      }
    };
    render() {
        return (
            <Formik
              enableReinitialize={true}
              initialValues={this.state}
              validationSchema={this.schema}
              onSubmit={this.onSubmit}
              render={({
                keepDirtyOnReinitialize,
                setFieldValue,
                values,
                errors,
                touched,
                status,
                dirty,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
                handleReset,
                setTouched
              }) => (
                  <Row>
                    <Col xs="12" md="6">
                      <Card>
                        <CardHeader>
                        <strong>{this.state.id == "new" ? "Create User" : "Edit User"} </strong>
                        </CardHeader>
                        <Form className="form-horizontal" onSubmit={handleSubmit} noValidate>
                          <CardBody>
                            <FormGroup row>
                              <Col md="3">
                                <Label htmlFor="text-input">Name</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input
                                  className="form-control"
                                  name="name"
                                  type="text"
                                  value={values.name}
                                  onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                                  placeholder="Enter Name"
                                  onBlur={handleBlur}
                                  valid={!errors.name && touched.name}
                                  invalid={errors.name && touched.name}
                                />
                                <FormFeedback>{errors.name}</FormFeedback>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3">
                                <Label htmlFor="text-input">Phone</Label>
                              </Col>
                              <Col xs="12" md="9">
                              <Input
                                className="form-control"
                                name="phone"
                                type="text"
                                value={values.phone}
                                onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                                placeholder="Enter Phone"
                                onBlur={handleBlur}
                                valid={!errors.phone && touched.phone}
                                invalid={errors.phone && touched.phone}
                              />
                              <FormFeedback>{errors.phone}</FormFeedback>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3">
                                <Label htmlFor="text-input">Email</Label>
                              </Col>
                              <Col xs="12" md="9">
                              <Input
                                className="form-control"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                                placeholder="Enter Email"
                                onBlur={handleBlur}
                                valid={!errors.email && touched.email}
                                invalid={errors.email && touched.email}
                              />
                              <FormFeedback>{errors.email}</FormFeedback>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="3">
                                <Label htmlFor="text-input">Password</Label>
                              </Col>
                              <Col xs="12" md="9">
                                <Input
                                  type="password"
                                  className="form-control"
                                  name="password"
                                  value={values.password}
                                  onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                                  placeholder="Enter Password"
                                  onBlur={handleBlur}
                                  valid={!errors.password && touched.password}
                                  invalid={errors.password && touched.password}
                                  />
                                <FormFeedback>{errors.password}</FormFeedback>
                              </Col>
                            </FormGroup>
                          </CardBody>
                          <CardFooter>
                            <Button type="submit" size="sm" color="primary" style={{margin:"0% 2% 0% 34%"}}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                            <Button type="reset" size="sm" color="danger" style={{ marginLeft: '3px' }} onClick={this.routeChange}><i className="fa fa-ban"></i> Cancel</Button>
                          </CardFooter>
                        </Form>
                      </Card>
                  </Col>
              </Row>
              )} />
          )
      }
}
export default AddUsers;