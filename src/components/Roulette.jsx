import "./Roulette.css";

// SVG 크기
const SIZE = 320;

// 원의 중심 좌표
const CX = SIZE / 2;
const CY = SIZE / 2;

// 룰렛 반지름
const R = 150;

// 시작 각도
const OFFSET_DEG = -90;

// 부채꼴 색상
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

// Option 텍스트
const OPTIONS = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
  "Option 8",
];

// 각도(deg) + 반지름을 (x,y)로 변환
const getPointOnCircle = (cx, cy, r, deg) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

// 부채꼴(섹터) path 생성 (중심 -> 호 시작점 -> 호 끝점 -> 중심)
const createSectorPath = (cx, cy, r, startDeg, endDeg) => {
  const start = getPointOnCircle(cx, cy, r, startDeg);
  const end = getPointOnCircle(cx, cy, r, endDeg);

  const largeArcFlag = endDeg - startDeg > 180 ? 1 : 0;

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
};

// 텍스트 위치 계산
const getTextPoint = (cx, cy, r, startDeg, endDeg) => {
  const midDeg = (startDeg + endDeg) / 2;
  const textR = r * 0.65; // 텍스트를 원 중심 쪽으로 당김

  return getPointOnCircle(cx, cy, textR, midDeg);
};

const Roulette = ({ rotationDeg }) => {
  const n = COLORS.length; // 부채꼴 갯수
  const step = 360 / n; // 한 칸의 각도

  return (
    <div>
      <svg width={SIZE} height={SIZE} viewBox={`0 -20 ${SIZE} ${SIZE + 20}`}>
        <g
          className="wheel"
          style={{
            transform: `rotate(${rotationDeg}deg)`,
            transformOrigin: `${CX}px ${CY}px`,
          }}
        >
          {COLORS.map((color, i) => {
            const startDeg = OFFSET_DEG + i * step; // 부채꼴 시작 각도
            const endDeg = OFFSET_DEG + (i + 1) * step; // 부채꼴 끝 각도
            const { x, y } = getTextPoint(CX, CY, R, startDeg, endDeg); // 텍스트 위치

            return (
              <g key={i}>
                <path
                  d={createSectorPath(CX, CY, R, startDeg, endDeg)}
                  fill={color}
                />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="14"
                  fill="#222"
                >
                  {OPTIONS[i]}
                </text>
              </g>
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
        <polygon
          points={`${CX},${CY - R - 4} ${CX - 8},${CY - R - 18} ${CX + 8},${
            CY - R - 18
          }`}
          fill="#B71C1C"
          stroke="#B71C1C"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default Roulette;
