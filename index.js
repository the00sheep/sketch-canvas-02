const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  //animate: true,
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    let pos = 0.5;
    const cx = width * pos;
    const cy = height * pos;

    const w = width * 0.01;
    const h = height * 0.1;

    let x, y;

    const num = 40;
    let radius = width * 0.15;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cx + radius * Math.cos(angle);

      let rgbR = random.range(200, 255);
      let rgbG = random.range(40, 150);
      let rgbB = random.range(40, 150);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.5, 1), random.range(1, 2));

      context.beginPath();
      context.rect(-w * 0.5, random.range(0, -h * 0.1), w, h);
      context.shadowColor =
        'rgb(' +
        rgbR +
        ',' +
        rgbG +
        ',' +
        rgbB +
        ',' +
        random.range(0.7, 1) +
        ')';
      context.shadowOffsetX = 1;
      context.shadowOffsetY = 11;
      context.fillStyle = 'rgb(' + rgbR + ',' + rgbG + ',' + rgbB + ')';
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.7, 1.3),
        slice * random.range(1, -8),
        slice * random.range(0, 5)
      );
      context.strokeStyle = context.fillStyle =
        'rgb(' + rgbR + ',' + rgbG + ',' + rgbB + ')';
      context.stroke();

      context.restore();
    }

    for (let i = 0; i < 60; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cx + radius * Math.cos(angle);

      context.save();
      context.translate(cx, cy);
      //context.rotate (-angle);
      context.rotate(random.range(0.9 * -angle, -angle));
      //context.rotate (-angle);

      context.beginPath();
      context.rect(1, 1, w * 4, h * 8);
      context.fillStyle = 'rgb(255,255,255,' + random.range(0.1, 0, 3) + ')';
      context.fill();
      context.strokeStyle = 'rgb(255,255,255,' + random.range(0.2, 0, 5) + ')';
      context.stroke();
      context.restore();
    }

    for (let i = 0; i < 200; i++) {
      context.beginPath();
      context.arc(
        random.range(w * 5, w * 95),
        random.range(h * 0.2, h * 9),
        random.range(5, 20),
        0,
        2 * Math.PI,
        false
      );
      context.lineWidth = 3;
      let rgbR = random.range(200, 255);
      let rgbG = random.range(150, 0);
      let rgbB = random.range(150, 0);
      context.fillStyle =
        'rgb(' +
        rgbR +
        ',' +
        rgbG +
        ',' +
        rgbB +
        ', ' +
        random.range(0.2, 1) +
        ')';
      context.fill();
      //context.strokeStyle = 'black';
      //context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
