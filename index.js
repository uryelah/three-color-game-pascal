const generateArray = (n) => {
  const result = [];

  for (let i = 0; i < n; i++) {
    result.push(Math.floor(Math.random() * (4 - 1) + 1))
  }
  console.log(result)
  return result;
};

const makeTriangle = (arr) => {
  result = [];
  const inner = (arr) => {
    if (arr.length === 1) {
      return
    }

    const nextLevel = [];
    let child = null;

    arr.forEach((n, i, array) => {
      if (i !== arr.length - 1) {
        if (n === array[i + 1]) {
          child = n;
        } else if (n + array[i + 1] === 3) {
          child = 3;
        } else if (n + array[i + 1] === 4) {
          child = 2;
        } else if (n + array[i + 1] === 5) {
          child = 1;
        }
        nextLevel.push(child)
        child = null;
      }
    });

    result.push(nextLevel);
    inner(nextLevel);
  }

  inner(arr);
  return result;
};

const makePyramid = (ctx, canvas) => {
  ctx.clearRect(0,0, canvas.width, canvas.height)
  const base = generateArray(Math.floor(Math.random() * (100 - 3) + 3));
  const triangle = makeTriangle(base);

  const one = '#ff003399';
  const two = '#ffff4199';
  const three = '#1500ff99';

  let level = 10;
  let row = 20;
  let width = 10;

  const offset = (canvas.width - (row * 4) - (width * 2 * base.length))/2;

  triangle.forEach((tri, i, arr) => {
    setTimeout(() => {
      row = 10;
      tri.forEach((n, j) => {
        if (n === 1) {
          ctx.fillStyle = one;
        } else if (n === 2) {
          ctx.fillStyle = two;
        } else if (n === 3) {
          ctx.fillStyle = three;
        }

        ctx.beginPath();
        ctx.moveTo(offset + row + i + (level / 1) + 1, 10 + (level * (3 / 2)));
        ctx.lineTo(offset + row + i + (level / 1) + 12, 4 + (level * (3 / 2)));
        ctx.lineTo(offset + row + i + (level / 1) + 23, 10 + (level * (3 / 2)));
        ctx.lineTo(offset + row + i + (level / 1) + 23, 20 + (level * (3 / 2)));
        ctx.lineTo(offset + row + i + (level / 1) + 12, 26 + (level * (3 / 2)));
        ctx.lineTo(offset + row + i + (level / 1) + 1, 20 + (level * (3 / 2)));
        ctx.closePath();
        ctx.fill();

        row += 22;
      });
      level += 10;
    }, 30 * i);
  });
}

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  makePyramid(ctx, canvas);

  document.body.addEventListener('keydown', () => {
    makePyramid(ctx, canvas);
  });
};
