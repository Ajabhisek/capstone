import AppLayout from "../../layouts/app-layout";
import { Tabs } from "antd";
import Chat from "./components/chat";
import ChatHistory from "./history-list";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useUserInfo from "../../hooks/use-user-info.hooks";

export default function PDFChat() {


    const [searchParams] = useSearchParams();
    const { id } = useParams();
    const { id: userId } = useUserInfo();
    const fileName = searchParams.get("fileName") ?? "file.pdf";
    const activeTab = searchParams.get("activeTab") ?? "Chat";

    const navigate = useNavigate();

    if (!userId) {
        navigate("/access-denined");
    }

    return (
        <AppLayout>
            <Tabs
                onChange={activeKey => window.location.href = `/pdf/${id}?activeTab=${activeKey}&fileName=${fileName}`}
                activeKey={activeTab}
                type="card"
                items={[
                    {
                        key: "Chat",
                        label: "Chat",
                        children: <Chat />
                    },
                    {
                        key: "History",
                        label: "Chat History",
                        children: <ChatHistory />
                    }
                ]}
            />
        </AppLayout>
    );
}