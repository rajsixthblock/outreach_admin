import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Input, Label, Button, FormFeedback, CardFooter, FormGroup } from "reactstrap"
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Axios from '../../../containers/Axios/config';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CreateCompany extends React.Component {
  state = {
    id: this.props.match.params.id,
    name: "",
    email: "",
    password: "",
    phone: '',
    companyName: '',
    status: false,
    address: ''
  };
  componentDidMount() {
    if (this.state.id != 'new') {
      Axios.get('company/getByID/' + this.state.id).then(res => {
        // console.log(res);
        this.setState({
          name: res.data.name,
          email: res.data.email,
          password: res.data.password,
          phone: res.data.phone,
          companyName: res.data.companyName,
          address: res.data.address
        })
      }).catch((e) => {
        console.log(e);
      })
    }
  }
  schema = () => {
    return (
      Yup.object().shape({
        name: Yup.string().required("Name is Required"),
        phone: Yup.string().min(10, 'required min length 10').max(12, 'Only allowed length 12').required('Please enter your phone Number').matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"),
        email: Yup.string().required("email is Required").email("Invalid mail address"),
        password: Yup.string().required("Password is Required"),
        companyName: Yup.string().required("company name is Required"),
        address: Yup.string().required("address is Required"),
      })
    )
  };
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  onSubmit = (values) => {
    const payload = {
      companyName: values.companyName,
      email: values.email,
      name: values.name,
      password: values.password,
      phone: values.phone,
      address: values.address
    };
    if (this.state.id == 'new') {
      Axios.post('company/register', payload).then(res => {
        toast.success("Company Added Successfully", {
          theme: "colored"
        });
        setTimeout(() => {
          this.props.history.push('/companies');
        }, 3000);
      }).catch((e) => {
        toast.error("Oops...," + e.response.data.message, {
          theme: "colored"
        });
      })
    }
    else {
      Axios.put('company/update/' + this.state.id, payload).then(res => {
        // console.log(res);
        toast.success("Company Updated Successfully", {
          theme: "colored"
        });
        setTimeout(() => {
          this.props.history.push('/companies');
        }, 3000);
      }).catch((e) => {
        toast.error("Oops...," + e.response.data.message, {
          theme: "colored"
        });
      })
    }
  }
  routeChange = () => {
    this.props.history.push('/companies');
  };
  render() {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          style={{ zIndex: "1999" }}
        />
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
                    <strong>{this.state.id == "new" ? "Create Company" : "Edit Company"} </strong>                   </CardHeader>
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
                            //onChange={(e) => this.handleChange(e.target.name, e.target.value)}
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
                            type="tel"
                            value={values.phone}
                           // onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                           onChange={(e) =>setFieldValue("phone",e.target.value)}
                            placeholder="Enter Phone Number"
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
                            //onChange={(e) => this.handleChange(e.target.name, e.target.value)}
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
                           // onChange={(e) => this.handleChange(e.target.name, e.target.value)}
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
                          <Label htmlFor="text-input">Company Name</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="text"
                            className="form-control"
                            name="companyName"
                            value={values.companyName}
                            //onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                            onChange={(e) =>setFieldValue("companyName",e.target.value)}
                            placeholder="Company Name"
                            onBlur={handleBlur}
                            valid={!errors.companyName && touched.companyName}
                            invalid={errors.companyName && touched.companyName}
                          />
                          <FormFeedback>{errors.companyName}</FormFeedback>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="text-input">Address</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            className="form-control"
                            name="address"
                            type="textarea"
                            value={values.address}
                            //onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                            onChange={(e) =>setFieldValue("address",e.target.value)}
                            placeholder="Enter Address"
                            onBlur={handleBlur}
                            valid={!errors.address && touched.address}
                            invalid={errors.address && touched.address}
                          />
                          <FormFeedback>{errors.address}</FormFeedback>
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
      </>
    )
  }
}
export default CreateCompany;