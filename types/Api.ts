export type ResponseData<T> = {
    message: string;
    data: Array<T> | null;
}

export type ResponseDatum<T> = {
    message: string;
    data: T | null;
}

export type FetchResponse<T> = {
    data: ResponseData<T> | ResponseDatum<T>;
    error: { status: number, message: string } | null;
    isLoading: boolean;
}