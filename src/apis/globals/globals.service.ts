import { BaseService } from "../baseService";

/**
 * The globals service.  Used to get global/settings information from the back-end.
 */
export class GlobalsService extends BaseService {
  public getConnectorTypes(): Promise<any[]> {
    // "[GlobalsService] Getting the list of connector types.");
    const endpoint: string = this.endpoint("/connector-types", "");
    return this.httpGet<any[]>(endpoint);
  }

  public getConnectCluster(): Promise<string[]> {
    //  "[GlobalsService] Getting the list of connector cluster."

    const endpoint: string = this.endpoint("/connect-clusters", "");
    return this.httpGet<string[]>(endpoint);
  }

  /**
   * Get the enabled state for topic creation for the supplied clusterId
   */
  public getTopicCreationEnabled(clusterId: number): Promise<boolean> {
    //  "[GlobalsService] Getting the enabled state for topic creation."

    const endpoint: string = this.endpoint(
      "/:clusterId/topic-creation-enabled",
      "",
      { clusterId }
    );
    return this.httpGet<boolean>(endpoint);
  }
}
