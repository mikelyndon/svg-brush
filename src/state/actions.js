import { store } from "./store";

export const actions = {
  addShape(stroke) {
    const shape = {
      id: `stroke_${store.shape_count + 1}`,
      points: stroke,
      colour: store.current_colour,
    };
    store.shapes.push(shape);
    store.shape_count++;
  },
  updateSelectedShapesList(id) {
    if (id) {
      if (store.selected_shapes.includes(id)) {
        store.selected_shapes.splice(
          store.selected_shapes.findIndex((idx) => idx === id),
          1
        );
      } else {
        store.selected_shapes = [...store.selected_shapes, id];
      }
    }
  },
  updateToolbarMode(mode) {
    store.toolbar_mode = mode;
  },
  updateSelectedColour(colour) {
    store.current_colour = colour;
    if (store.selected_shapes.length > 0) {
      store.shapes.forEach((shape) => {
        if (store.selected_shapes.includes(shape.id)) {
          shape.colour = colour;
        }
      });
    }
  },
  deleteShape(id) {
    const deleteIndex = store.shapes.findIndex((shape) => shape.id === id);
    if (deleteIndex > -1) {
      store.shapes.splice(deleteIndex, 1);
    }
  },
  // undo() {
  //   if (storeHistory.canUndo) {
  //     storeHistory.undo();
  //     console.log("current history index:", storeHistory.history.index);
  //   }
  // },
  // redo() {
  //   if (storeHistory.canRedo) {
  //     storeHistory.redo();
  //   }
  // },
};
