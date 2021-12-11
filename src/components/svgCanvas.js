import { useState } from "react";
import SvgShape from "./svgShape";
import SvgShapes from "./svgShapes";
import Toolbar from "./toolbar";

import { actions, store, useSnapshot } from "../state";

export default function SvgCanvas({ width, height }) {
  const snapshot = useSnapshot(store);
  const [allowSketching, setAllowSketching] = useState(false);
  const [allowSelecting, setAllowSelecting] = useState(false);
  const [allowErasing, setAllowErasing] = useState(false);
  const [stroke, setStroke] = useState([]);

  const getPointerPosition = (evt) => {
    let CTM = evt.target.getScreenCTM();
    return [(evt.clientX - CTM.e) / CTM.a, (evt.clientY - CTM.f) / CTM.d];
  };

  const handlePointerDown = (e) => {
    // eslint-disable-next-line default-case
    switch (snapshot.toolbar_mode) {
      case "sketch":
        setAllowSketching(true);
        setStroke([]);
        break;
      case "select":
        setAllowSelecting(true);
        break;
      case "erase":
        setAllowErasing(true);
        break;
    }
  };

  const handlePointerUp = (e) => {
    // eslint-disable-next-line default-case
    switch (snapshot.toolbar_mode) {
      case "sketch":
        if (stroke.length) {
          actions.addShape(stroke);
          setStroke([]);
        }
        // state.shapes.push(stroke);
        setAllowSketching(false);
        break;
      case "select":
        setAllowSelecting(false);
        break;
      case "erase":
        setAllowErasing(false);
        break;
    }
  };

  const handlePointerMove = (e) => {
    // eslint-disable-next-line default-case
    switch (snapshot.toolbar_mode) {
      case "sketch":
        if (allowSketching) {
          const p = getPointerPosition(e);
          setStroke([...stroke, p]);
        }
        break;
      case "select":
        if (allowSelecting) {
          actions.updateSelectedShapesList(e.target.id);
        }
        break;
      case "erase":
        if (allowErasing) {
          actions.deleteShape(e.target.id);
        }
        break;
    }
  };

  return (
    <>
      <Toolbar />
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <rect width={width} height={height} fill="#eee" />
        <SvgShapes />
        <SvgShape
          key="current_stroke"
          id="current_stroke"
          points={stroke}
          colour={snapshot.current_colour}
        />
      </svg>
    </>
  );
}
