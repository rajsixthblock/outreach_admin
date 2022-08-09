import React from "react";
import { Card, CardBody, CardHeader, Col, Row, Input, Label, Button, FormFeedback, CardFooter, FormGroup, InputGroup, InputGroupText } from "reactstrap"
import { Formik, Form } from "formik";
import Axios from '../../../containers/Axios/config';
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Select from 'react-select';
import "react-select/dist/react-select.min.css";

class CreateSubscriptions extends React.Component {
  state = {
    id: this.props.match.params.id,
    planName: "",
    amount: "",
    emailsLimit: "",
    plan: "",
    planType: [{ label: '1 Month', value: 'month' }, { label: '1 Year', value: 'year' }]
  };
  schema = () => {
    return (
      Yup.object().shape({
        planName: Yup.string().required("Plan Name is Required"),
        amount: Yup.string().required("Amount is Required").matches(/^[0-9]+$/, "Must be only digits"),
        emailsLimit: Yup.string().required("Emails Limit is Required"),
       // planType:Yup.string().required("Plan Name is Required")
      })
    )
  };
  componentDidMount() {
    if (this.state.id != 'new') {
      Axios.get('plan/getByID/' + this.state.id).then(response => {
        //console.log(response);
        if (response.status == 200) {
          this.setState({
            planName: response.data.planName,
            amount: response.data.amount,
            emailsLimit: response.data.emailsLimit,
            plan: response.data.planType
          })
        }
      }).catch((e) => {
        toast.error("Oops...," + e.response.data.message, {
          theme: "colored"
        })
      })
    }
  }
  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  };
  planChange = (e, values) => {
    this.setState({
      ...values,
      paln: e
    })
  };
  onSubmit = (e) => {
    let payload = {
      planName: e.planName,
      amount: parseInt(e.amount),
      emailsLimit: e.emailsLimit,
      currencyType: '$-US dollor',
      planType: e.plan.value,
      status: true
    };
    if (this.state.id != 'new') {
      Axios.put('plan/update/' + this.state.id, payload).then(response => {
        if (response.status == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Updated successfully',
            showConfirmButton: false,
            timer: 1000
          })
          setTimeout(() => {
            this.props.history.push('/subscriptions');
          }, 1000)
        }
      }).catch((e) => {
        //console.log(e);
      })
    }
    else {
      Axios.post('plan/create', payload).then(response => {
        //console.log(response);
        toast.success("Plain created successfully");
        this.props.history.push('/subscriptions');
      }).catch((e) => {
        //console.log(e);
      })
    }
  };
  routeChange = () => {
    this.props.history.push('/subscriptions');
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
                  <strong>{this.state.id == "new" ? "Create Subscription" : "Edit Subscription"} </strong>
                </CardHeader>
                <Form className="form-horizontal" onSubmit={handleSubmit} noValidate>
                  <CardBody>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Plan Name</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          className="form-control"
                          name="planName"
                          type="text"
                          value={values.planName}
                          onChange={(e) => setFieldValue("planName", e.target.value)}
                          placeholder="Enter Plan Name"
                          onBlur={handleBlur}
                          valid={!errors.planName && touched.planName}
                          invalid={errors.planName && touched.planName}
                        />
                        <FormFeedback>{errors.planName}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Amount</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <InputGroup>
                          <Input
                            className="form-control"
                            name="amount"
                            type="text"
                            value={values.amount}
                            onChange={(e) => setFieldValue("amount", e.target.value)}
                            placeholder="Enter amount"
                            onBlur={handleBlur}
                            valid={!errors.amount && touched.amount}
                            invalid={errors.amount && touched.amount}
                          />
                          <InputGroupText>
                            $
                          </InputGroupText>
                          <FormFeedback>{errors.amount}</FormFeedback>
                        </InputGroup>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Emails Limit</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          className="form-control"
                          name="emailsLimit"
                          type="number"
                          value={values.emailsLimit}
                          onChange={(e) => setFieldValue("emailsLimit", e.target.value)}
                          placeholder="Enter Emails Limit"
                          onBlur={handleBlur}
                          valid={!errors.emailsLimit && touched.emailsLimit}
                          invalid={errors.emailsLimit && touched.emailsLimit}
                        />
                        <FormFeedback>{errors.emailsLimit}</FormFeedback>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Plan Type</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Select name='plan'
                          options={this.state.planType}
                          value={values.plan}
                          onChange={(e) => setFieldValue("plan", e)}
                          valid={!errors.plan}
                          invalid={errors.plan && touched.plan}
                        />
                        <FormFeedback>{errors.plan}</FormFeedback>
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
export default CreateSubscriptions;
