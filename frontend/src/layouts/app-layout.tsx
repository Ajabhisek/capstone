import { HomeOutlined, LoginOutlined, LogoutOutlined, PlusCircleOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Affix, Button, Col, Divider, message, Row, Space, Tooltip } from "antd";
import useUserInfo from "../hooks/use-user-info.hooks";

export default function AppLayout({ children }: any) {

    const colProps = { xs: { span: 22, offset: 1 }, sm: { span: 22, offset: 1 }, md: { span: 18, offset: 3 }, lg: { span: 16, offset: 4 }, style: { paddingTop: 10, paddingBottom: 10 } }

    const { id } = useUserInfo();

    const logOut = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        message.success("Log out succesful!!! Redirecting.....");

        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    }

    return (
        <>
            <Affix>
                <Row style={{ borderBottom: "1px solid #d7d7d7", backgroundColor: "#1677ff" }}>
                    <Col {...colProps}>
                        <Row justify={"space-between"}>
                            <Tooltip title="Home"><Button shape="circle" icon={<HomeOutlined />} href="/" ghost />
                            </Tooltip>
                            {
                                (id) ? (

                                    <Space>
                                        <Tooltip title="Dashboard"><Button ghost shape="circle" icon={<UnorderedListOutlined />} href="/dashboard" /></Tooltip>
                                        <Tooltip title="Logout"><Button ghost shape="circle" icon={<LogoutOutlined />} onClick={logOut} /></Tooltip>
                                    </Space>

                                ) : (<Space>
                                    <Tooltip title="Login"><Button shape="circle" icon={<LoginOutlined />} href="/login" ghost /></Tooltip>
                                    <Tooltip title="Register new user"><Button ghost icon={<PlusCircleOutlined />} href="/register">Register</Button></Tooltip>
                                </Space>)
                            }
                        </Row>
                    </Col>
                </Row>
            </Affix>
            <Row>
                <Col {...colProps} style={{ paddingTop: 20, paddingBottom: 20, minHeight: 500 }}>
                    {children}
                </Col>
            </Row>
            <Row style={{ minHeight: 500, backgroundColor: "#f0f3fa" }}>
                <Col {...colProps}>
                    <Row gutter={20}>
                        <Col span={12} style={{ textAlign: "center" }}>
                            <h3 style={{ fontWeight: 400 }}>Navigation</h3>
                            <Divider />
                            <Space><Button shape="circle" type="link" href="/" style={{ fontSize: 18 }}>Home</Button></Space>
                            <div></div>
                            <Space><Button shape="circle" type="link" href="/login" style={{ fontSize: 18 }}>Login</Button></Space>
                            <div></div>
                            <Space><Button shape="circle" type="link" href="/Regiser" style={{ fontSize: 18 }}>Register</Button></Space>
                        </Col>
                        <Col span={12} style={{ textAlign: "center" }}>
                            <h3 style={{ fontWeight: 400 }}>Group Members</h3>
                            <Divider />
                            <ul style={{ listStyle: "none" }}>
                                <p >Anish </p>
                                <p>Abhishek</p>
                                <p>Nishant</p>
                                <p>Prashant</p>
                                <p>Sujan</p>
                                <p>Ujjawol</p>
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ >
    );
}