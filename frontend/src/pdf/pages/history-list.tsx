/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import usePost from "../../hooks/use-post.hooks";
import { Button, Divider, Popconfirm, PopconfirmProps, Row, Table, TableProps } from "antd";
import { useParams, useSearchParams } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

export default function ChatHistory() {

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const fileName = searchParams.get("fileName") ?? "file.pdf";
    const { loading, data, post } = usePost<{}, string[][]>();
    const { loading: deleteLoading, post: deletePost, status: deleteStatus } = usePost<{}, string>();

    useEffect(() => {
        post(`/chat-history/?unique_id=${id}&activeTab=History`, {});

    }, [id]);

    useEffect(() => {

        if (deleteStatus) {
            window.location.href = `/pdf/${id}?activeTab=History&fileName=${fileName}`
        }

    }, [deleteStatus])

    const tableData = data?.map(([id, fileName, question, answer, score, context]) => ({ id, fileName, question, answer, score, context }));

    const confirm: PopconfirmProps['onConfirm'] = (chatId) => {
        deletePost(`/single-chat-info/?id=${chatId}`, {});
    };

    const columns: TableProps['columns'] = [
        {
            dataIndex: "question",
            key: "question",
            title: "Question",
        },
        {
            dataIndex: "answer",
            key: "answer",
            title: "Answer",
        },
        {
            dataIndex: "score",
            key: "score",
            title: "Score",
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
        <Table
            loading={loading || deleteLoading}
            dataSource={tableData}
            columns={columns}
            rowKey={"id"}
            pagination={false}
            size="small"
            expandable={{
                expandedRowRender: (record) => (<Row>
                    <Divider style={{ margin: 0, padding: 0 }} orientation="left">Context</Divider>
                    <p style={{ margin: 0 }}>{record.context}</p>
                </Row>),
            }}
        />
    );
}