import FormWrapper from "../../layouts/form-wrapper";
import AppLayout from "../../layouts/app-layout";
import { message, Upload, UploadProps } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import useUserInfo from "../../hooks/use-user-info.hooks";
import { useNavigate } from "react-router-dom";
const { Dragger } = Upload;

const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: `${process.env.REACT_APP_BASE_URL}/upload/v2/`,
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log("Uploading file to the server!!!");
        }
        if (status === 'done') {
            message.success(`PDF uploaded successfully!!! Redirecting to chat 💬`);
            setTimeout(() => {
                window.location.href = `/pdf/${info.file.response?.data}?fileName=${info.file.name}`;
            }, 2000);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

export default function NewPDF() {

    const { id } = useUserInfo();

    const navigate = useNavigate();

    if (!id) {
        navigate("/access-denined");
    }

    return (
        <AppLayout>
            <FormWrapper>
                <Dragger {...props} headers={{ "userId": `${id}` }}>
                    <p className="ant-upload-drag-icon">
                        <FilePdfOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
            </FormWrapper>
        </AppLayout>
    );

}