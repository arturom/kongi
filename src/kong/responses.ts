import { protocols, methods } from "./requests";

export interface AddServiceResponse {
    id: string,
    created_at: number,
    updated_at: number,
    connect_timeout: number,
    protocol: protocols,
    host: string,
    port: number,
    path: string | null,
    name: string,
    retries: number,
    read_timeout: number,
    write_timeout: number
}

export interface AddRouteResponse {
    created_at: number,
    strip_path: boolean,
    hosts: string[],
    preserve_host: boolean,
    regex_priority: number,
    updated_at: number,
    paths: string[] | null,
    service: {
        id: string
    },
    methods: methods[],
    protocols: protocols[],
    id: string
}

export interface AddConsumerResponse {
    username?: string,
    custom_id?: number,
    created_at: number,
    id: string
}