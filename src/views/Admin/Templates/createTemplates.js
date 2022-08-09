import React, {  useEffect, useState } from 'react';
import { BlockManager, BasicType, JsonToMjml } from 'easy-email-core';
import { EmailEditor, EmailEditorProvider, Stack } from 'easy-email-editor';
import { SimpleLayout } from 'easy-email-extensions';
import "antd/dist/antd.css";
import { Button, PageHeader } from 'antd';
import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import '@arco-themes/react-easy-email-theme-purple/css/arco.css';
import Axios from '../../../containers/Axios/config';
import mjml from 'mjml-browser';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Input, InputGroup, InputGroupText,Row,Col } from 'reactstrap';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fontList = [
    'Arial',
    'Tahoma',
    'Verdana',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Lato',
    'Montserrat',  
].map(item => ({ value: item, label: item }));
export default function App() {
    const [imgPath, setImagPath] = useState(null);
    const [name, setName] = useState({ name: '' });
    const [error, setError] = useState([]);
    const [initialValues, setInitialValues] = useState({
        subject: 'Welcome to Easy-email',
        subTitle: 'Nice to meet you!',
        content: BlockManager.getBlockByType(BasicType.PAGE).create({})
    })
    const history = useHistory();
    const params = useParams();
    let img_url = null;
    useEffect(() => {
        if (params.id != "new") {
            Axios.get('template/getByID/' + params.id).then(
                (response) => {
                    //console.log(response);
                    setName({ name: response.data.name })
                    setInitialValues({
                        subject: 'Welcome to Easy-email',
                        subTitle: 'Nice to meet you!',
                        content: response.data.templateData.jsonData,
                    })
                })
                .catch(
                    (error) => {
                        //console.log(error)
                    }
                )        
            }
    }, []);
    let handleChange = (name, value) => {
        setName({
            [name]: value
        })

    };
    let onSubmit =
        async (values, form) => {
            if (name.name === "") {
                error.push("name.name");
            }
            setError(error);
            const json = values.content;
            const html = mjml(JsonToMjml({
                data: values.content,
                mode: 'production',
                context: values.content,    
            }), {
                beautify: true,
                validationLevel: 'soft',
            }).html;            
            let adminId = localStorage.getItem('adminId');
            let payload = {
                adminId: { adminId: adminId },
                name: name.name,
                templateData: {
                    htmlData: html,
                    jsonData: json
                }
            }
            if (params.id != "new") {
                Axios.put('template/update/' + params.id, payload).then(
                    (response) => {
                        toast.success("Template Updated Successfully", {
                            theme: "colored"
                        });
                        setTimeout(() => {
                            history.push('/templates');
                        }, 2000);
                    }).catch((e) => {
                        toast.error("Oops...," + e, {
                            theme: "colored"
                        });
                    })
            }
            else {
                Axios.post('template/create', payload).then(
                    (response) => {
                        //console.log(response);
                        toast.success("Template Created Successfully", {
                            theme: "colored"
                        });
                        setTimeout(() => {
                            history.push('/templates');
                        }, 2000);
                    }
                ).catch(
                    (error) => {
                        //console.log(error)
                    }
                )
            }
        }
 
    return (
        <div style={{ overflow: "scroll" }}>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                style={{ zIndex: "1999" }}
            />
            <EmailEditorProvider
                data={initialValues}
                height={'calc(100vh - 72px)'}
                autoComplete={true}
                fontList={fontList}
                dashed={false}
                onAddCollection={(data) => { console.log(data, 1) }}                
                children={(props, helper) => { console.log(props) }}            
                onUploadImage={async (data) => {
                   let url = '';
                   const payload = new FormData();
                   payload.append('file', data);                 
                    await Axios.post("template/image", payload).then(res => {                                         
                        url = process.env.REACT_APP_BACKEND_COMPANY_SERVICE + "template/image/view/" + res.data;
                        //console.log(url);
                        img_url = url;
                        setImagPath(url);
                    })                    
                    return img_url;
                }}
                interactiveStyle              
                enabledLogic               
                onSubmit={onSubmit}
            >
                {({ values }, { submit }) => {
                    return (
                        <>
                        {params.id=="new" ?  <PageHeader title='Create Template' /> : <PageHeader title='Edit Template' />}
                       <Row>
                            <Col md={6}>
                                <InputGroup style={{ padding: "10px" }}>
                                    <InputGroupText>
                                        Template Name<span style={{ color: "red" }}>*</span>
                                    </InputGroupText>
                                    <Input type="text" name="name" value={name.name} placeholder="Enter Your Templatename " onChange={(e) => handleChange(e.target.name, e.target.value)} />
                                </InputGroup>
                                <div style={{ color: "red" ,marginLeft:"10px"}}>
                                    {error.includes("name.name") ? "Template name Required" : undefined}
                                </div>
                            </Col>
                            <Col md={5}> </Col>
                            <Col md={1}>
                            <Stack alignment="center">                              
                                <Button type='primary' onClick={() => submit(values)}>Save</Button>
                            </Stack>        
                            </Col>   
                       </Row>
                        <SimpleLayout>
                           <EmailEditor />
                            </SimpleLayout>
                        </>
                    );
                }}
            </EmailEditorProvider>
        </div >
    );
}
