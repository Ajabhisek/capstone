import { useEffect } from "react";
import usePost from "../../hooks/use-post.hooks";
import useUserInfo from "../../hooks/use-user-info.hooks";
import AppLayout from "../../layouts/app-layout";
import { Button, Popconfirm, PopconfirmProps, Table, TableProps, Tooltip } from "antd";
import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function PDFList() {

    const { id } = useUserInfo();

    const { loading, data, post } = usePost<{}, string[][]>();
    const { loading: deleteLoading, post: deletePost, status: deleteStatus } = usePost<{}, string>();


    const navigate = useNavigate();

    if (!id) {
        navigate("/access-denined");
    }

    useEffect(() => {
        post("/pdfs/", {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {

        if (deleteStatus) {
            window.location.href = `/pdfs`
        }

    }, [deleteStatus])

    const tableData = data?.map(([id, fileName, uniqueId]) => ({ id, fileName, uniqueId }));

    const confirm: PopconfirmProps['onConfirm'] = (documentId) => {
        deletePost(`/delete-file-info/?id=${documentId}`, {});
    };

    const columns: TableProps['columns'] = [
        {
            dataIndex: "fileName",
            key: "fileName",
            title: "File Nmae"
        },
        {
            dataIndex: "uniqueId",
            key: "uniqueId",
            title: "Chat",
            render: (uniqueId, data) => <Tooltip title="Chat with this PDF"><Button icon={<SendOutlined />} shape="circle" href={`/pdf/${uniqueId}?fileName=${data.fileName}`} /></Tooltip>
        },
        {
            dataIndex: "id",
            key: "id",
            render: (id) => (<Popconfirm
                title="Delete"
                description="Are you sure to delete this history?"
                onConfirm={(e) => confirm(id)}
                okText="Yes"
                cancelText="No"
                placement="bottom"
            >
                <Button icon={<DeleteOutlined />} type="primary" danger shape="circle" />
            </Popconfirm>)
        }
    ];

    return (
        <AppLayout>
            <Table
                loading={loading || deleteLoading}
                dataSource={tableData}
                columns={columns}
                rowKey={"uniqueId"}
                pagination={false}
            />
        </AppLayout>
    );
}