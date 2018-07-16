export type protocols = 'http' | 'https';
export type methods = 'DELETE' | 'GET' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT';

export interface AddServiceOptions {
    name: string;
    protocol?: string;
    host?: string;
    port?: string;
    path?: string;
    retries?: number;
    connect_timeout?: number;
    write_timeout?: number;
    read_timeout?: number;
    url?: string;
}

export interface AddRouteToServiceOptions {
    protocols: protocols[];
    methods?: methods[];
    hosts?: string[];
    paths?: string[];
    strip_path?: boolean;
    preserve_host?: boolean;
}

export interface AddRouteOptions extends AddRouteToServiceOptions {
    service: {
        id: string;
    };
}

export interface AddPluginOptions {
    name: string;
    consumer_id?: string;
    config?: any;
    enabled?: boolean;
}

export interface AddConsumerOptions {
    username?: string;
    custom_id?: string;
}

export type Algorithm = 'RS256' | 'HS256' | 'ES256';

export interface AddJWTToConsumerOptions {
    key?: string;
    algorithm?: Algorithm;
    rsa_public_key?: string;
    secret?: string;
}

export interface ServiceConfig {
    options: AddServiceOptions;
    routes: RouteConfig[];
    plugins: AddPluginOptions[];
}

export interface RouteConfig {
    options: AddRouteToServiceOptions;
    plugins: AddPluginOptions[];
}

export interface ConsumerConfig {
    options: AddConsumerOptions;
    jwts: AddJWTToConsumerOptions[];
}

export interface ClusterConfig {
    hostname: string;
    services: ServiceConfig[];
    plugins: AddPluginOptions[];
    consumers: ConsumerConfig[];
}