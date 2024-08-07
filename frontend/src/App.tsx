import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import AppLayout from "./layouts/app-layout";
import HomeCard from "./users/components/home-card";
import { Col, Row } from "antd";
import useUserInfo from "./hooks/use-user-info.hooks";
import { useNavigate } from "react-router-dom";


function App() {

  const { id } = useUserInfo();

  const navigate = useNavigate();

  if (id) {
    navigate("/dashboard");
  }

  return (
    <AppLayout>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <HomeCard icon={<LoginOutlined style={{ fontSize: 35 }} />} title="Login" href="/login" />
        </Col>
        <Col span={12}>
          <HomeCard icon={<UserAddOutlined style={{ fontSize: 35 }} />} title="Register" href="/register" />
        </Col>
      </Row>
    </AppLayout>
  );
}

export default App;
