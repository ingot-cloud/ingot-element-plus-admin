import type { App } from "vue";
import { authDirective } from "./authDirective";

export function initDirective(app: App) {
  authDirective(app);
}
