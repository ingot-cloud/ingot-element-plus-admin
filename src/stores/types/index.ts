import type { ComponentSize } from "@/components/cmp-size/types";

/**
 * App Store
 */
export interface AppStore {
  /**
   * 标题
   */
  title: string;
  /**
   * 全局组件大小
   */
  componentSize: ComponentSize;
}
