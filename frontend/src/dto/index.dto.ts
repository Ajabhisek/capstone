export interface IAPIBaseResponse<Response> {
    status?: boolean;
    msg?: string;
    data?: Response
}

export interface IHooksResponse<Response> extends IAPIBaseResponse<Response> {
    loading: boolean;
}

export interface IPostHookResponse<Payload, Response> extends IHooksResponse<Response> {
    post: (url: string, payload: Payload) => void;
}