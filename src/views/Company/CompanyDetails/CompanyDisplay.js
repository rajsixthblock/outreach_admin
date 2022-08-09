import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Input, Label, Button, FormFeedback, CardFooter, FormGroup } from "reactstrap"
import { Formik, Form } from "formik";
import Axios from '../../../containers/Axios/config';

class CompanyDisplay extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    phone: '',
    companyName: ''
  };
  componentDidMount() {
    let companyId = localStorage.getItem('companyId');
    Axios.get('company/getByID/' + companyId).then(res => {
      // console.log(res);
      this.setState({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        companyName: res.data.companyName
      })
    }).catch((e) => {
      //console.log(e);
    });
  }
  onSubmit = (e) => {
    //console.log(e);
  }

  render() {
    return (
      <>
        <Formik
          enableReinitialize={true}
          initialValues={this.state}
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
                    <strong>Company Details </strong>
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
                            disabled
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
                            type="number"
                            value={values.phone}
                            onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                            placeholder="Enter Phone"
                            onBlur={handleBlur}
                            valid={!errors.phone && touched.phone}
                            invalid={errors.phone && touched.phone}
                            disabled
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
                            disabled
                          />
                          <FormFeedback>{errors.email}</FormFeedback>
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
                            onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                            placeholder="Company Name"
                            onBlur={handleBlur}
                            valid={!errors.companyName && touched.companyName}
                            invalid={errors.companyName && touched.companyName}
                            disabled
                          />
                          <FormFeedback>{errors.companyName}</FormFeedback>
                        </Col>
                      </FormGroup>
                    </CardBody>
                  </Form>
                </Card>
              </Col>
            </Row>
          )} />
      </>
    )
  }
}
export default CompanyDisplay;