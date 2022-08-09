import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Input, Label, Button, FormFeedback, CardFooter, FormGroup } from "reactstrap"
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Axios from "../../../containers/Axios/config";
import Swal from "sweetalert2";
import swal from 'sweetalert';

class createAdmin extends React.Component {
    state = {
        id: this.props.match.params.id,
        name: "",
        email: "",
        password: "",
        phone: '',
        confirmPassword : ''
    }
    componentDidMount(){
      if(this.state.id != 'new'){
        Axios.get('admin/user/getByID/'+this.state.id).then(response =>{
          //console.log(response);
          this.setState({
            name: response.data.name,
            email: response.data.email,
            password: response.data.password,
            confirmPassword : response.data.password,
            phone: response.data.phone,
          })
        }).catch((e)=>{
          ////console.log(e);
        })
      }
    }
    routeChange = () =>{
      this.props.history.push('/adminusers');
    }
    schema = () => {
        return (
            Yup.object().shape({
                name: Yup.string().required("Name is Required"),
                phone: Yup.string().min(10, 'Required min length 10').max(12, 'Only allowed length 12').required('Please enter your phone Number').matches(
                    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                    "Phone number is not valid"),
                email: Yup.string().required("Email is Required").email("Invalid mail address"),
                password: Yup.string().required("Password is Required"),
                confirmPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref('password'), null], 'Passwords must match'),
            })
        )
    }
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    };
    onSubmit = (values) =>{
        if(this.state.id == 'new'){
          let payload = {
            name : values.name,
            email: values.email,
            password: values.password,
            phone: values.phone,
            password : values.password,
            status : true
          }
          Axios.post('admin/user/creation',payload).then(response=>{
            //console.log(response);
            if (response.status == 201) {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Admin Added successfully',
                  showConfirmButton: false,
                  timer: 1000
                })
              setTimeout(() => {
                this.props.history.push('/adminusers');
              }, 1000)
          }
          }).catch((e)=>{
            //console.log(e);
            swal('OOPS!',e.response.data.message);
          })
        }
        else{
          let payload = {
            name : values.name,
            email: values.email,
            password: values.password,
            phone: values.phone,
            password : values.password,
            status:true
          }
          Axios.put('admin/user/update/'+this.state.id,payload).then(response=>{
            //console.log(response);
            if (response.status == 200) {
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Admin Updated successfully',
                  showConfirmButton: false,
                  timer: 1000
                })
              setTimeout(() => {
                this.props.history.push('/adminusers');
              }, 1000)
          }
          }).catch((e)=>{
            //console.log(e);
            swal('OOPS!',e.response.data.message);
          })
        }
    }
    render() {
        return (
            <Formik
              enableReinitialize={true}
              initialValues={this.state}
              validationSchema={this.schema}
              onSubmit={this.onSubmit}
              render={({
                setFieldValue,
                values,
                errors,
                touched,
                handleBlur,
                handleSubmit,
              }) => (
                  <Row>
                  <Col xs="12" md="6">
                  <Card>
                    <CardHeader>
                    <strong>{this.state.id == "new" ? "Create Admin" : "Edit Admin"} </strong>
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
                                onChange={(e) =>setFieldValue("name",e.target.value)}
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
                              onChange={(e) =>setFieldValue("phone",e.target.value)}
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
                              onChange={(e) =>setFieldValue("email",e.target.value)}
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
                              onChange={(e) =>setFieldValue("password",e.target.value)}
                              placeholder="Enter Password"
                              onBlur={handleBlur}
                              valid={!errors.password && touched.password}
                              invalid={errors.password && touched.password}
                            />
                            <FormFeedback>{errors.password}</FormFeedback>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="text-input">Confirm Password</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input
                              type="password"
                              className="form-control"
                              name="confirmPassword"
                              value={values.confirmPassword}
                              onChange={(e) =>setFieldValue("confirmPassword",e.target.value)}
                              placeholder="Enter Confirm Password"
                              onBlur={handleBlur}
                              valid={!errors.confirmPassword && touched.confirmPassword}
                              invalid={errors.confirmPassword && touched.confirmPassword}
                            />
                            <FormFeedback>{errors.confirmPassword}</FormFeedback>
                        </Col>
                        </FormGroup>
                      </CardBody>
                      <CardFooter>
                        <Button type="submit" size="sm" color="primary" style={{margin:"0% 2% 0% 34%"}} ><i className="fa fa-dot-circle-o"></i> Submit</Button>
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

export default createAdmin;