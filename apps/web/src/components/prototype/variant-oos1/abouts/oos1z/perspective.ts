export type Point = readonly [number, number];

const round = (value: number) => Math.round(value * 100) / 100;

function projector(vanishing: Point, depth: number) {
  return (x: number, y: number, fraction: number): Point => {
    const scale = 1 / (1 + depth * fraction);
    return [vanishing[0] + (x - vanishing[0]) * scale, vanishing[1] + (y - vanishing[1]) * scale];
  };
}

function segment(from: Point, to: Point): string {
  return `M${round(from[0])} ${round(from[1])}L${round(to[0])} ${round(to[1])}`;
}

function polygon(points: readonly Point[]): string {
  return `${points.map((point, index) => `${index === 0 ? "M" : "L"}${round(point[0])} ${round(point[1])}`).join("")}Z`;
}

export type Drawing = { edges: string; fine: string; works: string };

export function corridorDrawing(
  farWallInset: number,
  withWorks: boolean,
  vanishing: Point = [50, 50],
): Drawing {
  const farScale = (100 - farWallInset * 2) / 100;
  const at = projector(vanishing, 1 / farScale - 1);

  const edges = [
    segment(at(0, 0, 0), at(0, 0, 1)),
    segment(at(100, 0, 0), at(100, 0, 1)),
    segment(at(0, 100, 0), at(0, 100, 1)),
    segment(at(100, 100, 0), at(100, 100, 1)),
    polygon([at(0, 0, 1), at(100, 0, 1), at(100, 100, 1), at(0, 100, 1)]),
  ];

  const fine: string[] = [];
  for (let step = 1; step < 6; step += 1) {
    fine.push(segment(at(0, 100, step / 6), at(100, 100, step / 6)));
  }
  for (let step = 0; step < 6; step += 1) {
    const fraction = (step + 0.5) / 6;
    fine.push(segment(at(40, 0, fraction), at(60, 0, fraction)));
  }
  for (const x of [100 / 3, 200 / 3]) fine.push(segment(at(x, 100, 0), at(x, 100, 1)));
  for (const x of [0, 100]) {
    fine.push(segment(at(x, 12, 0), at(x, 12, 1)));
    fine.push(segment(at(x, 95, 0), at(x, 95, 1)));
  }

  const works: string[] = [];
  if (withWorks) {
    const hangs: readonly [number, number, number][] = [
      [0, 0.1, 0.3],
      [0, 0.46, 0.6],
      [100, 0.2, 0.4],
      [100, 0.64, 0.76],
    ];
    for (const [x, near, far] of hangs) {
      works.push(polygon([at(x, 30, near), at(x, 30, far), at(x, 64, far), at(x, 64, near)]));
      for (const share of [0.25, 0.75]) {
        const fraction = near + (far - near) * share;
        works.push(segment(at(x, 12, fraction), at(x, 30, fraction)));
      }
      const labelNear = far + 0.03;
      const labelFar = far + 0.07;
      works.push(
        polygon([
          at(x, 58, labelNear),
          at(x, 58, labelFar),
          at(x, 64, labelFar),
          at(x, 64, labelNear),
        ]),
      );
    }
  }

  return { edges: edges.join(""), fine: fine.join(""), works: works.join("") };
}

export const ROOM_BOX = { width: 100, height: 112 } as const;

export type RoomDrawing = Drawing & {
  glyphSize: number;
  glyphBottom: number;
};

export function roomDrawing(): RoomDrawing {
  const { width, height } = ROOM_BOX;
  const backScale = 0.5;
  const depth = 1 / backScale - 1;
  const at = projector([width / 2, 60], depth);

  const edges = [
    segment(at(0, 0, 0), at(0, 0, 1)),
    segment(at(width, 0, 0), at(width, 0, 1)),
    segment(at(0, height, 0), at(0, height, 1)),
    segment(at(width, height, 0), at(width, height, 1)),
    polygon([at(0, 0, 1), at(width, 0, 1), at(width, height, 1), at(0, height, 1)]),
  ];

  const fine = [
    segment(at(0, height, 0.38), at(width, height, 0.38)),
    segment(at(0, height, 0.74), at(width, height, 0.74)),
    segment(at(38, 0, 0.5), at(62, 0, 0.5)),
    segment(at(0, 14, 0), at(0, 14, 1)),
    segment(at(width, 14, 0), at(width, 14, 1)),
  ];

  const plinthTop = 84;
  const front = 0.42;
  const back = 0.64;
  const works = [
    polygon([
      at(31, plinthTop, front),
      at(69, plinthTop, front),
      at(69, height, front),
      at(31, height, front),
    ]),
    polygon([
      at(31, plinthTop, front),
      at(31, plinthTop, back),
      at(69, plinthTop, back),
      at(69, plinthTop, front),
    ]),
  ];

  const stand = (front + back) / 2;
  const standScale = 1 / (1 + depth * stand);
  const baseline = at(width / 2, plinthTop, stand)[1];

  return {
    edges: edges.join(""),
    fine: fine.join(""),
    works: works.join(""),
    glyphSize: 30 * standScale,
    glyphBottom: ((height - baseline) / height) * 100,
  };
}
