import { useRef, useEffect, useState } from "react";
import { clear_canvas, draw_coords, central_canvas, draw_graph, draw_points, graph_on_click } from "./canvas_handler";
import style from "./canvas.module.css"
import Loader from "../Loader/Loader";

export default function Canvas({ radius, points, handleClick }) {
	const canvasRef = useRef(null);

  const CANVAS_SIZE = 600;

  async function canvasClick(event) {
    setLoading(true)
    const {x, y} = graph_on_click(event, canvasRef.current.getContext("2d"));
    const data = {
      x: x,
      y: y,
      r: radius
    }
    await handleClick(data);
    setLoading(false)
  }

  useEffect(() => {
    if (canvasRef.current) {
      const canvasElement = canvasRef.current;
      const canvas = canvasElement.getContext("2d");
      if (!canvas) return;

      central_canvas(canvas)
      clear_canvas(canvas, CANVAS_SIZE);
      draw_graph(canvas, radius)
      draw_coords(canvas);
      if (points != null) {
        draw_points(canvas, points)
      }
    }
  }, [radius, points]);

  const [loading, setLoading] = useState(false);


	return (
    <>
      <Loader isVisible={loading}/>
			<canvas
				className={style.canvas}
				id="canvas"
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        ref={canvasRef}
        onClick={async event => {
          await canvasClick(event);
        }}
      />
    </>
	)
}