import { Col } from "antd";

export default function FormWrapper({ children }: any) {
    return (
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 16, offset: 4 }} lg={{ span: 16, offset: 4 }} style={{ border: "1px solid #d3d3d3", padding: 20, borderRadius: 10 }}>
            {children}
        </Col>
    );
}