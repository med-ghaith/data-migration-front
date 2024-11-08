import * as React from "react";
import { NotFound } from "./NotFound/NotFound";
import { ConnectorPage } from "./pages/connector";
import { CreateConnectorWizard } from "./pages/createConnector";
import { ConnectorDetails } from "./pages/connectorDetails";
import { ConnectorPlugins } from "./pages/connectorPlugins/ConnectorPlugins";
import { Routes, Route } from "react-router-dom";

export interface IAppRoute {
  label?: string;
  component: React.ComponentType<any>;
  exact?: boolean;
  path: string;
  title: string;
  routes?: undefined;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    component: ConnectorPage,
    exact: true,
    label: "Connector list",
    path: "/",
    title: "Connector List",
  },
  {
    component: CreateConnectorWizard,
    exact: true,
    label: "Create connector",
    path: "/create-connector",
    title: "Create connector",
  },
];

const AppRoutes = (): React.ReactElement => (
  <Routes>
    <Route path="*" element={<NotFound />} />

    <Route path="/" element={<ConnectorPage />} />
    <Route path="/plugins" element={<ConnectorPlugins />} />
    <Route path="/connector/:connectorName" element={<ConnectorDetails />} />
    <Route
      path="/config-connector/:connectorPlugin"
      element={<CreateConnectorWizard />}
    />
  </Routes>
);

export { AppRoutes, routes };
