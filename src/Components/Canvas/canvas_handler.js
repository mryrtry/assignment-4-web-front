const BLOCK_SIZE = 50;
let CANVAS_CENTRED = false; 

export function central_canvas(canvas) {
  const transform = canvas.getTransform();
  if (transform.isIdentity) {
      canvas.translate(300, 300);
  }
}

export function clear_canvas(canvas) {
  canvas.clearRect(-300, -300, 600, 600);
}

function draw_line(canvas, start_coord_x, start_coord_y, finish_coord_x, finish_coord_y) {
  canvas.beginPath();
  canvas.moveTo(start_coord_x, start_coord_y);
  canvas.lineTo(finish_coord_x, finish_coord_y);
  canvas.closePath();
  canvas.stroke();
}

export function draw_point(canvas, x, y, inarea) {
  if (inarea == null) {
    canvas.fillStyle = "rgba(95, 95, 95, 1)"
    canvas.strokeStyle = "rgba(95, 95, 95, 0.3)"
  } else if (inarea) {
      canvas.fillStyle = "rgba(92, 92, 186, 1)";
      canvas.strokeStyle = "rgba(92, 92, 186, 0.3)";
  } else {
    canvas.fillStyle = "rgba(186, 92, 109, 1)";
    canvas.strokeStyle = "rgba(186, 92, 109, 0.3)";
  }

  canvas.setLineDash([12.5, 12.5]);
  canvas.beginPath();
  canvas.moveTo(x*BLOCK_SIZE, -y*BLOCK_SIZE);
  canvas.lineTo(x*BLOCK_SIZE, 0);
  canvas.moveTo(x*BLOCK_SIZE, -y*BLOCK_SIZE);
  canvas.lineTo(0, -y*BLOCK_SIZE);
  canvas.stroke();

  canvas.beginPath();
  canvas.arc(x*BLOCK_SIZE, -y*BLOCK_SIZE, 4, 0, 2 * Math.PI);
  canvas.closePath();
  canvas.fill();

  canvas.strokeStyle = "black";
  canvas.fillStyle = "black";
}

export function draw_coords(canvas) {
  draw_line(canvas, 0, -300, 0, 300);
  draw_line(canvas, -300, 0, 300, 0);

  canvas.beginPath();
  canvas.moveTo(-5, -295);
  canvas.lineTo(0, -300);
  canvas.lineTo(5, -295);
  canvas.closePath();
  canvas.fill();
  canvas.fillText("y", 14, -295)

  canvas.beginPath();
  canvas.moveTo(295, -5);
  canvas.lineTo(300, 0);
  canvas.lineTo(295, 5);
  canvas.closePath();
  canvas.fill();
  canvas.fillText("x", 295, 14)

  for (let x = -275; x <= 275; x+=25) {
    if (x != 0) {
      let rounded = (x/BLOCK_SIZE).toFixed(1);
      canvas.fillText(rounded, x-7, 14)
      canvas.fillText(rounded, 7, -x+2.5)
      draw_line(canvas, -5, x, 5, x);
      draw_line(canvas, x, -5, x, 5);
    }
  }
}

export function draw_graph(canvas, radius) {
  canvas.fillStyle = "rgba(92, 92, 186, 0.4)"

  canvas.fillRect(-radius*BLOCK_SIZE, 0, radius*BLOCK_SIZE, radius/2*BLOCK_SIZE)

  canvas.beginPath();
  canvas.moveTo(0, 0);
  canvas.lineTo(radius*BLOCK_SIZE, 0);
  canvas.lineTo(0, radius*BLOCK_SIZE);
  canvas.closePath();
  canvas.fill();

  canvas.beginPath();
  canvas.moveTo(0, 0)
  canvas.arc(0, 0, radius*BLOCK_SIZE, -Math.PI/2, 0);
  canvas.closePath();
  canvas.fill();

  canvas.fillStyle = "black";
}

export function draw_points(canvas, points) {
  for (let i = 0; i < points.length; i++) {
    if (i === points.length - 1) {
      draw_point(canvas, points[i].x, points[i].y, points[i].inArea);
    } else {
      draw_point(canvas, points[i].x, points[i].y, null);
    }
  }
}

export function graph_on_click(event, canvas) {
  const clientRect = canvas.canvas.getBoundingClientRect();
  const x = ((event.clientX - clientRect.left) / BLOCK_SIZE - 6).toFixed(2);
  const y = -(((event.clientY - clientRect.top) / BLOCK_SIZE) - 6).toFixed(2);

  return {x, y}
}