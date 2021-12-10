import SvgCanvas from "./components/svgCanvas";
import { useMeasure } from "react-use";

function App() {
  const [ref, { width, height }] = useMeasure();
  return (
    <div id="wrapper" ref={ref}>
      <SvgCanvas width={width} height={height} />
    </div>
  );
}

export default App;
