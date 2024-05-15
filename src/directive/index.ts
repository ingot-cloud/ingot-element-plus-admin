import type { App } from "vue";
import { authDirective } from "./authDirective";
import { wavesDirective } from "./wavesDirective";

export function initDirective(app: App) {
  authDirective(app);
  wavesDirective(app);
}
