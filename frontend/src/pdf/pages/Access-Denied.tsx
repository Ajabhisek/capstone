import { Button, Divider, Row } from "antd";
import AppLayout from "../../layouts/app-layout";
import Card from "antd/es/card/Card";
import { UserOutlined } from "@ant-design/icons";

export default function AccessDenied() {

    return (
        <AppLayout>
            <Row style={{ minHeight: 300 }} justify={"center"} align={"middle"}>
                <Card style={{ textAlign: "center", paddingLeft: 20, paddingRight: 20 }}>
                    <Button icon={<UserOutlined style={{ fontSize: 40 }} />} shape="circle" style={{ height: 65, width: 65 }} />
                    <p style={{ color: 'red' }}>Access Denied</p>
                    <Divider />
                    <Button danger href="/login">Go To Login</Button>
                </Card>
            </Row>
        </AppLayout>
    );

}