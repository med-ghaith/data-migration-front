import React from "react";
import mysqlLogo from "../assets/mysql-170x115.png";
import mongoLogo from "../assets/mongodb-128x128.png";
import postgresLogo from "../assets/PostgreSQL-120x120.png";
import sqlServerLogo from "../assets/sql-server-144x144.png";
import placeholderLogo from "../assets/placeholder-120x120.png";
import { Brand } from "@patternfly/react-core";

interface ConnectorTypeLogoProps {
  type: string;
  size?: string;
}

export const ConnectorTypeLogo: React.FC<ConnectorTypeLogoProps> = ({
  type,
  size = "45px",
}) => {
  let logoSrc = "";

  switch (true) {
    case type.includes(".mysql"):
      logoSrc = mysqlLogo;
      break;
    case type.includes(".postgresql"):
      logoSrc = postgresLogo;
      break;
    case type.includes(".mongodb"):
      logoSrc = mongoLogo;
      break;
    case type.includes(".sqlserver"):
      logoSrc = sqlServerLogo;
      break;
    default:
      logoSrc = placeholderLogo;
      break;
  }

  return <Brand src={logoSrc} alt={`${type} logo`} style={{ width: size }} />;
};
