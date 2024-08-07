import { Button, Form, message, Spin, Input } from "antd";
import AppLayout from "../../layouts/app-layout";
import { IRegisterUserCreateDTO } from "../dto/index.dto";
import FormWrapper from "../../layouts/form-wrapper";
import usePost from "../../hooks/use-post.hooks";
import { useEffect } from "react";

export default function Register() {

    const [form] = Form.useForm<IRegisterUserCreateDTO>();
    const { loading, post, status, msg } = usePost<IRegisterUserCreateDTO, string>();

    useEffect(() => {
        if (status) {
            message.success("user regisreted successfully!!!Redirecting.....");
            form.resetFields();
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        }
        else if (status === false) {
            message.error(msg);
        }
    }, [form, msg, status]);


    return (
        <AppLayout>
            <FormWrapper>
                <Spin spinning={loading}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={(values) => post("/user", values)}
                        autoComplete="false"
                    >
                        <Form.Item<IRegisterUserCreateDTO>
                            label="Full Name"
                            name={"fullName"}
                            hasFeedback
                            rules={[{ required: true, message: "Please provide your full name!!!" }]}
                        >
                            <Input placeholder="full name" size="large" />
                        </Form.Item>
                        <Form.Item<IRegisterUserCreateDTO>
                            label="Username"
                            name={"username"}
                            hasFeedback
                            rules={[{ required: true, message: "Please provide your username!!!" }]}
                        >
                            <Input placeholder="username" size="large" />
                        </Form.Item>
                        <Form.Item<IRegisterUserCreateDTO>
                            label="Password"
                            name={"password"}
                            hasFeedback
                            rules={[{ required: true, message: "Please provide your password!!!" }]}
                        >
                            <Input.Password placeholder="********" size="large" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" size="large" htmlType="submit">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </FormWrapper>
        </AppLayout >
    );
}