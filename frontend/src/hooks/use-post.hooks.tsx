import { useState } from "react";
import { IAPIBaseResponse, IPostHookResponse } from "../dto/index.dto";
import AXIOS from "../axios";

export default function usePost<Payload, Response>(): IPostHookResponse<Payload, Response> {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<IAPIBaseResponse<Response>>({});

    const post = (url: string, payload: Payload) => {
        setLoading(true);
        AXIOS().post(url, payload)
            .then(response => setResponse(response.data))
            .catch(console.log)
            .finally(() => setLoading(false));

        return () => {
            setLoading(false);
            setResponse({});
        }
    }

    return { ...response, loading, post };

}