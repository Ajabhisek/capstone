import { Button, Form, message, Spin, Input } from "antd";
import AppLayout from "../../layouts/app-layout";
import { ILoginDTO, IUser } from "../dto/index.dto";
import FormWrapper from "../../layouts/form-wrapper";
import usePost from "../../hooks/use-post.hooks";
import { useEffect } from "react";
import useUserInfo from "../../hooks/use-user-info.hooks";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [form] = Form.useForm<ILoginDTO>();
    const { loading, post, status, msg, data } = usePost<ILoginDTO, IUser>();
    const navigate = useNavigate();
    const { id } = useUserInfo();

    if (id) {
        navigate("/dashboard");
    }


    useEffect(() => {
        if (status) {
            localStorage.setItem("user", JSON.stringify(data))
            localStorage.setItem("userId", `${data?.id}`)
            message.success("User logged in successful!!!Redirecting.....");
            form.resetFields();
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1000);
        }
        else if (status === false) {
            message.error(msg);
        }
    }, [data, form, msg, status]);


    return (
        <AppLayout>
            <FormWrapper>
                <Spin spinning={loading}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={(values) => post("/login", values)}
                    >
                        <Form.Item<ILoginDTO>
                            label="Username"
                            name={"username"}
                            hasFeedback
                            rules={[{ required: true, message: "Please provide your username!!!" }]}
                        >
                            <Input placeholder="username" size="large" />
                        </Form.Item>
                        <Form.Item<ILoginDTO>
                            label="Password"
                            name={"password"}
                            hasFeedback
                            rules={[{ required: true, message: "Please provide your password!!!" }]}
                        >
                            <Input.Password placeholder="********" size="large" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" size="large" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </FormWrapper>
        </AppLayout >
    );
}