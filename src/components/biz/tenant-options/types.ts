export interface TenantOptionsAPI {
  getCurrentValue: () => string;
  refreshOptions: () => void;
}
