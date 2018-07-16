import * as request from 'superagent';
import { join } from 'path';
import { AddServiceOptions, AddRouteOptions, AddPluginOptions, AddRouteToServiceOptions, AddConsumerOptions, AddJWTToConsumerOptions } from './requests';
import { AddServiceResponse, AddConsumerResponse } from './responses';

export class Client {
    private hostname: string;

    constructor(hostname: string) {
        this.hostname = hostname;

        this.addService = this.addService.bind(this);
    }

    // Services
    addService(opt: AddServiceOptions): Promise<AddServiceResponse> {
        return this.post('/services/')
            .send(opt)
            .then(getResponseBody);
    }

    retrieveService(nameOrID: string) {
        return this.get(`/services/${nameOrID}`)
            .then(getResponseBody);
    }

    listServices(size?: number, offset?: string) {
        return this.get('/services')
            .query({ offset, size })
            .then(getResponseBody);
    }

    updateService(nameOrID: string, opt: AddServiceOptions) {
        return this.patch(`/services/${nameOrID}`)
            .send(opt)
            .then(getResponseBody);
    }

    updateOrCreateService(name: string, opt: AddServiceOptions) {
        return this.put(`/services/${name}`)
            .send(opt)
            .then(getResponseBody);
    }

    deleteService(nameOrID: string) {
        return this.delete(`/services/${nameOrID}`)
            .then(getResponseBody);
    }

    addRouteToSevice(serviceNameOrID: string, opt: AddRouteToServiceOptions) {
        return this.post(`/services/${serviceNameOrID}/routes`)
            .send(opt)
            .then(getResponseBody);
    }

    addPluginToService(serviceNameOrID: string, opt: AddPluginOptions) {
        return this.post(`/services/${serviceNameOrID}/plugins`)
            .send(opt)
            .then(getResponseBody);
    }

    // Routes
    addRoute(opt: AddRouteOptions) {
        return this.post('/routes')
            .send(opt)
            .then(getResponseBody);
    }

    retrieveRoute(id: string) {
        return this.get(`/routes/${id}`)
            .then(getResponseBody);
    }

    updateRoute(id: string, opt: AddRouteOptions) {
        return this.patch(`/routes/${id}`)
            .send(opt)
            .then(getResponseBody);
    }

    deleteRoute(id: string) {
        return this.delete(`/routes/${id}`)
            .then(getResponseBody);
    }

    addPluginToRoute(routeID: string, opt: AddPluginOptions) {
        return this.post(`/routes/${routeID}/plugins`)
            .send(opt)
            .then(getResponseBody);
    }

    // Plugins
    addPlugin(opt: AddPluginOptions) {
        return this.put(`/plugins/`)
            .then(getResponseBody);
    }

    retrievePlugin(id: string) {
        return this.get(`/plugins/${id}`)
            .then(getResponseBody);
    }

    updatePlugin(id: string, opt: AddPluginOptions) {
        return this.patch(`/plugins/${id}`)
            .send(opt)
            .then(getResponseBody);
    }

    // Consumers
    addConsumer(opt: AddConsumerOptions): Promise<AddConsumerResponse> {
        return this.post('/consumers/')
            .send(opt)
            .then(getResponseBody);
    }

    addJWTToConsumer(consumerID: string, opt: AddJWTToConsumerOptions) {
        return this.post(`/consumers/${consumerID}/jwt`)
            .send(opt)
            .then(getResponseBody);
    }

    // Class Utilities
    private url(path: string): string {
        return join(this.hostname, path);
    }

    private get(path: string): request.SuperAgentRequest {
        console.log('GET', path);
        return request.get(this.url(path))
            .set('User-Agent', 'kongii');
    }

    private post(path: string): request.SuperAgentRequest {
        console.log('POST', path);
        return request.post(this.url(path))
            .set('User-Agent', 'kongii');
    }

    private put(path: string): request.SuperAgentRequest {
        console.log('PUT', path);
        return request.put(this.url(path))
            .set('User-Agent', 'kongii');
    }

    private patch(path: string): request.SuperAgentRequest {
        console.log('PATCH', path);
        return request.patch(this.url(path))
            .set('User-Agent', 'kongii');
    }

    private delete(path: string): request.SuperAgentRequest {
        console.log('DELETE', path);
        return request.delete(this.url(path))
            .set('User-Agent', 'kongii');
    }
}

function getResponseBody(res: request.Response): any {
    return res.body;
}