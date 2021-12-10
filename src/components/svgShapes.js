import SvgShape from "./svgShape";
import { store, useSnapshot } from "../state";

const SvgShapes = () => {
  const snapshot = useSnapshot(store);
  return (
    <g>
      {snapshot.shapes.map((shape, index) => (
        <SvgShape
          key={shape.id}
          id={shape.id}
          points={shape.points}
          colour={shape.colour}
        />
      ))}
    </g>
  );
};

export default SvgShapes;
