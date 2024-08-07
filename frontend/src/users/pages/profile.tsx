import { useNavigate } from "react-router-dom";
import useUserInfo from "../../hooks/use-user-info.hooks";
import { IChangePasswordDTO } from "../dto/index.dto";
import usePost from "../../hooks/use-post.hooks";
import { Button, Divider, Form, Input, message, Spin } from "antd";
import { useEffect } from "react";
import AppLayout from "../../layouts/app-layout";
import FormWrapper from "../../layouts/form-wrapper";

export default function Profile() {

    const { id } = useUserInfo();

    const navigate = useNavigate();

    if (!id) {
        navigate("/access-denied");
    }

    const [form] = Form.useForm<IChangePasswordDTO>();
    const { loading, post, status, msg } = usePost<IChangePasswordDTO, string>();

    useEffect(() => {
        if (status) {
            message.success("Password updated successfully!!!Redirecting to login page .....");
            localStorage.removeItem("user");
            localStorage.removeItem("userId");
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
                <Divider>Change Password</Divider>
                <Spin spinning={loading}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={(values) => post("/change-password", { ...values, id })}
                        autoComplete="false"
                    >
                        <Form.Item<IChangePasswordDTO>
                            label="Old Password"
                            name={"oldPassword"}
                            hasFeedback
                            rules={[{ required: true, message: "Please provide your old password!!!" }]}
                        >
                            <Input.Password placeholder="********" size="large" />
                        </Form.Item>


                        <Form.Item<IChangePasswordDTO>
                            label="New Password"
                            name={"newPassword"}
                            hasFeedback
                            rules={[{ required: true, message: "Please provide your new password!!!" }]}
                        >
                            <Input.Password placeholder="********" size="large" />
                        </Form.Item>


                        <Form.Item<IChangePasswordDTO>
                            label="Confirm Password"
                            name={"confirmPassword"}
                            dependencies={["newPassword"]}
                            hasFeedback
                            rules={[
                                { required: true, message: "Please provide your confirm password!!!" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="********" size="large" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" size="large" htmlType="submit">
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </FormWrapper>
        </AppLayout >
    );


}