import { useParams, useSearchParams } from "react-router-dom";

export default function ChatHistory() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();

    const fileName = searchParams.get("fileName") ?? "file.pdf";
    return (
        <div>
            Chat History
        </div>
    );
}