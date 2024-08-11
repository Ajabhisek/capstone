import { Col, Row } from "antd";
import useUserInfo from "../../hooks/use-user-info.hooks";
import AppLayout from "../../layouts/app-layout";
import HomeCard from "../components/home-card";
import { FilePdfOutlined, ThunderboltOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { id } = useUserInfo();

    const navigate = useNavigate();

    if (!id) {
        navigate("/access-denined");
    }

    return (
        <AppLayout>
            <Row gutter={[10, 10]}>
                <Col span={8}>
                    <HomeCard icon={<ThunderboltOutlined style={{ fontSize: 35 }} />} title="Chat with new PDF" href="/new-pdf" />
                </Col>
                <Col span={8}>
                    <HomeCard icon={<FilePdfOutlined style={{ fontSize: 35 }} />} title="Chat with PDF" href="/pdfs" />
                </Col>
                <Col span={8}>
                    <HomeCard icon={<UserOutlined style={{ fontSize: 35 }} />} title="Profile" href="/profile" />
                </Col>
            </Row>
        </AppLayout>
    );
}