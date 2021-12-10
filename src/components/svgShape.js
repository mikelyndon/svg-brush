import { useState } from "react";
import { store, useSnapshot, actions } from "../../src/state";

const pointsToPath = (points) => {
  let d = "";
  points.forEach((point) => {
    if (d) {
      d += ` L ${point[0]} ${point[1]}`;
    } else {
      d = `M ${point[0]} ${point[1]}`;
    }
  });
  return d;
};

const SvgShape = ({ id, points, colour }) => {
  const [selected, setSelected] = useState(false);
  // const [allowSelecting, setAllowSelecting] = useState(false);
  // const [allowErasing, setAllowErasing] = useState(false);
  const shape = pointsToPath(points);
  const snapshot = useSnapshot(store);

  const handleClick = (e) => {
    // eslint-disable-next-line default-case
    switch (snapshot.toolbar_mode) {
      case "select":
        setSelected(!selected);
        actions.updateSelectedShapesList(id);
        break;
      case "erase":
        actions.deleteShape(id);
        break;
    }
  };

  // const handleMouseDown = (e) => {
  //   // eslint-disable-next-line default-case
  //   switch (snapshot.toolbar_mode) {
  //     case "select":
  //       setAllowSelecting(true);
  //       break;
  //     case "erase":
  //       setAllowErasing(true);
  //       break;
  //   }
  // };

  // const handleMouseUp = (e) => {
  //   // eslint-disable-next-line default-case
  //   switch (snapshot.toolbar_mode) {
  //     case "select":
  //       setAllowSelecting(false);
  //       break;
  //     case "erase":
  //       setAllowErasing(false);
  //       break;
  //   }
  // };

  // const handleMouseMove = (e) => {
  //   // eslint-disable-next-line default-case
  //   switch (snapshot.toolbar_mode) {
  //     case "select":
  //       if (allowSelecting) {
  //         setSelected(!selected);
  //       }
  //       break;
  //     case "erase":
  //       if (allowErasing) {
  //         actions.deleteShape(id);
  //       }
  //       break;
  //   }
  // };

  return (
    <g onClick={handleClick}>
      <path
        d={shape}
        fill="none"
        opacity={selected ? "0.3" : "0"}
        stroke="red"
        strokeWidth="12"
      />
      <path id={id} d={shape} fill="none" stroke={colour} strokeWidth="3" />
    </g>
  );
};

export default SvgShape;
