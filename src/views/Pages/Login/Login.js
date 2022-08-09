import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Axios from '../../../containers/Axios/config';
import Swal from "sweetalert2";

const Login = (props) => (
  <Formik
    initialValues={{ login: '', password: '' }}
    validate={values => {
      let errors = {};

      if (!values.login) {
        errors.login = 'Login Required';
      } if (!values.password) {
        errors.password = "Password Required";
      }
      return errors;
    }}
    onSubmit={(values) => {
      let payload = { email: values.login, password: values.password };
      Axios.post(process.env.REACT_APP_BACKEND_COMPANY_SERVICE + 'admin/user/login', payload).then(response => {
        //console.log(response);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('adminName', response.data.userDetails.name);
        localStorage.setItem('adminId', response.data.userDetails.adminId);
        localStorage.setItem('adminEmail', response.data.userDetails.email);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login successfully',
          showConfirmButton: false,
          timer: 1000
        });
        props.history.push('/dashboard');
      }).catch((e) => {
        //console.log(e);
        //Swal(e.response.data.message);
      })
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    }) => (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mt-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="login"
                          placeholder="Login"
                          autoComplete="login"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                        />
                      </InputGroup>
                      <span style={{ color: 'red' }}>{errors.login && touched.login && errors.login}</span>
                      <InputGroup className="mt-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                      </InputGroup>
                      <span style={{ color: 'red' }}>{errors.password && touched.password && errors.password}</span>
                      <Row style={{marginTop:"4%"}}>
                        <Col xs="6" >
                          <Button type="submit" diasbled={isSubmitting} color="primary" className="px-4">Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
    }
  </Formik>
);

export default Login;
