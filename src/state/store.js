import { proxy, useSnapshot } from "valtio";
import { devtools } from "valtio/utils";

const store = proxy({
  shapes: [],
  selected_shapes: [],
  shape_count: 0,
  dots: [],
  toolbar_mode: "sketch",
  current_colour: "black",
});

const unsub = devtools(store, "store");
export { store, useSnapshot, unsub };
