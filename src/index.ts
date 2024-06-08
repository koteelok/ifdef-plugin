import type { UnpluginFactory } from "unplugin";
import { createUnplugin } from "unplugin";
import type { Options } from "./options";

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => ({
  name: "ifdef-plugin",
  transformInclude(id) {
    return id.endsWith("main.ts");
  },
  transform(code) {
    return code.replace("__UNPLUGIN__", `Hello Unplugin! ${options}`);
  },
});

export default createUnplugin(unpluginFactory);
