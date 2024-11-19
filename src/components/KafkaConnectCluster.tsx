import {
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
} from "@patternfly/react-core";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  updateCluster: (cluster: string) => void;
}

export const KafkaConnectCluster: React.FC<Props> = ({ updateCluster }) => {
  const [clusterUrls, setClusterUrls] = useState<string[]>([]);

  const [formValue, setFormValue] = useState<string>("");

  useEffect(() => {
    if (import.meta.env.NODE_ENV === "production") {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8083");
          const data = response.data;
          // Process the data as needed
          const value = data.KAFKA_CONNECT_CLUSTERS?.split(",")[0];
          setClusterUrls(data.KAFKA_CONNECT_CLUSTERS?.split(","));
          setFormValue(value);
          updateCluster(value || "");
          console.log("Fetched data:", data.KAFKA_CONNECT_CLUSTERS);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    } else {
      setClusterUrls(import.meta.env.KAFKA_CONNECT_CLUSTERS?.split(",") || []);
      const value = "http://localhost:8083/";
      setFormValue(value || "");
      updateCluster(value || "");
      console.log(value);
    }
  }, []);

  const onChange = (
    _event: React.FormEvent<HTMLSelectElement>,
    value: string
  ) => {
    setFormValue(value);
    updateCluster(value);
  };

  return (
    <Form isHorizontal className="pf-v5-theme-dark">
      <FormGroup
        label="Kafka connect cluster:"
        type="string"
        fieldId="kafka-connect-cluster"
      >
        <FormSelect
          id="kafka-connect-cluster"
          value={formValue}
          onChange={onChange}
          aria-label="Kafka connect cluster"
        >
          {clusterUrls.map((cluster) => (
            <FormSelectOption key={cluster} value={cluster} label={cluster} />
          ))}
        </FormSelect>
      </FormGroup>
    </Form>
  );
};
