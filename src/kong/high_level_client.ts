import { Client } from "./client";
import { ClusterConfig, ServiceConfig, RouteConfig, AddRouteOptions, AddPluginOptions, AddJWTToConsumerOptions, ConsumerConfig } from "./requests";
import { AddServiceResponse, AddRouteResponse, AddConsumerResponse } from "./responses";

export function updateConfigs(config: ClusterConfig) {
    const client = new Client(config.hostname);

    function updateService(serviceConfig: ServiceConfig) {
        return client.addService(serviceConfig.options)
            .then(res => updateServicePlugins(client, serviceConfig, res)
                .then(() => updateServiceRoutes(client, serviceConfig, res))
            );
    }

    function updateConsumer(consumerConfig: ConsumerConfig) {
        return client.addConsumer(consumerConfig.options)
            .then(res => updateConsumerJWTS(client, consumerConfig, res))
    }

    return Promise.all(config.services.map(updateService))
        .then(() => Promise.all(config.consumers.map(updateConsumer)));
}

function updateConsumerJWTS(client: Client, consumerConfig: ConsumerConfig, res: AddConsumerResponse) {
    function updateJWT(jwtOpts: AddJWTToConsumerOptions) {
        return client.addJWTToConsumer(res.id, jwtOpts);
    }
    return Promise.all(consumerConfig.jwts.map(updateJWT));
}

function updateServicePlugins(client: Client, serviceConfig: ServiceConfig, res: AddServiceResponse) {
    function updatePlugin(pluginOpts: AddPluginOptions) {
        return client.addPluginToService(res.id, pluginOpts);
    }
    return Promise.all(serviceConfig.plugins.map(updatePlugin));
}

function updateServiceRoutes(client: Client, serviceConfig: ServiceConfig, res: AddServiceResponse) {
    function updateRoute(routeConfig: RouteConfig) {
        const r: AddRouteOptions = { ...routeConfig.options, service: { id: res.id }};
        return client.addRoute(r)
            .then(res => updateRoutePlugins(client, routeConfig, res));
    }
    return Promise.all(serviceConfig.routes.map(updateRoute));
}

function updateRoutePlugins(client: Client, routeConfig: RouteConfig, res: AddRouteResponse) {
    function updatePlugin(pluginOpts: AddPluginOptions) {
        return client.addPluginToRoute(res.id, pluginOpts);
    }
    return Promise.all(routeConfig.plugins.map(updatePlugin));
}