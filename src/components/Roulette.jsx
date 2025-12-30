import "./Roulette.css";

const SIZE = 320;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 150;

const OFFSET_DEG = -90;

const COLORS = [
  "#C62828", // Option 1 - 레드
  "#FB8C00", // Option 2 - 오렌지
  "#FDD835", // Option 3 - 옐로우
  "#34C759", // Option 4 - 그린
  "#00BFC4", // Option 5 - 민트
  "#1E88E5", // Option 6 - 블루
  "#5E5CE6", // Option 7 - 퍼플블루
  "#FF375F", // Option 8 - 핑크레드
];

// 각도(deg) + 반지름을 (x,y)로 변환
const polarToCartesian = (cx, cy, r, deg) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

// 부채꼴(섹터) path 생성 (중심 -> 호 시작점 -> 호 끝점 -> 중심)
const getSectorPath = (cx, cy, r, startDeg, endDeg) => {
  const start = polarToCartesian(cx, cy, r, startDeg);
  const end = polarToCartesian(cx, cy, r, endDeg);

  const largeArcFlag = endDeg - startDeg > 180 ? 1 : 0;

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
};

const Roulette = () => {
  const n = COLORS.length;
  const step = 360 / n;

  return (
    <div>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <g>
          {COLORS.map((color, i) => {
            const startDeg = OFFSET_DEG + i * step;
            const endDeg = OFFSET_DEG + (i + 1) * step;

            return (
              <path
                key={i}
                d={getSectorPath(CX, CY, R, startDeg, endDeg)}
                fill={color}
              />
            );
          })}

          <circle
            cx="160"
            cy="160"
            r="150"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          <circle cx="160" cy="160" r="3" fill="black" />
        </g>
      </svg>
    </div>
  );
};

export default Roulette;
