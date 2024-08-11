/* eslint-disable react-hooks/exhaustive-deps */
import { QuestionCircleOutlined, QuestionCircleTwoTone } from "@ant-design/icons";
import { Button, Collapse, Divider, Form, Input, List, Row, Spin } from "antd";
import { useParams, useSearchParams } from "react-router-dom";
import usePost from "../../../hooks/use-post.hooks";
import { IAnswer } from "../../dto/index.dto";
import { useEffect, useState } from "react";

export default function Chat() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const fileName = searchParams.get("fileName") ?? "file.pdf";
    const { loading, post, data } = usePost<{}, IAnswer>();
    const [answers, setAnswers] = useState<IAnswer[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            setAnswers([data].concat(answers));
            form.resetFields();
        }
        return () => setAnswers([]);
    }, [data]);

    const askQuestionToModel = (values: any) => {
        const { question } = values;
        post(`/question-answer/?question=${question}&unique_id=${id}`, {});
    }


    return (
        <>
            <Row>
                Chat with {fileName}
            </Row>
            <Spin spinning={loading}>
                <Form
                    layout="vertical"
                    onFinish={askQuestionToModel}
                    form={form}
                >
                    <Form.Item
                        hasFeedback
                        name={"question"}
                        rules={[{ required: true, message: "This field is required!!!" }]}
                    >
                        <Input placeholder="Ask me a question?" size="large" style={{ height: 60 }}>
                        </Input>
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit" icon={<QuestionCircleOutlined />}>
                            Ask me
                        </Button>
                    </Form.Item>
                </Form>
                {
                    (answers.length > 0) && <Divider>Answers</Divider>
                }
                {
                    (answers.length > 0) && (<List
                        itemLayout="horizontal"
                        dataSource={answers}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<QuestionCircleTwoTone style={{ fontSize: 25 }} />}
                                    title={item.question}
                                    description={<div>
                                        <Row justify={"space-between"}>
                                            <div>{item.answer}</div>
                                            <div>Score:{item.score}</div>
                                        </Row>
                                        <Collapse style={{ marginTop: 5 }}>
                                            <Collapse.Panel header={"Context"} key={`${item.id}`}>
                                                <p>{item.context}</p>
                                            </Collapse.Panel>
                                        </Collapse>
                                    </div>}
                                />
                            </List.Item>
                        )}
                    />)
                }
            </Spin>
        </>
    );
}