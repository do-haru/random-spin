import "./RouletteContainer.css";

import Roulette from "./Roulette";
import SpinControls from "./SpinControls";

import { useState } from "react";

// 기본 Option 텍스트
const DEFAULT_OPTIONS = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
  "Option 8",
];

const RouletteContainer = () => {
  // 현재 룰렛의 회전 각도
  const [rotationDeg, setRotationDeg] = useState(0);

  // Option 텍스트 state
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const handleSpin = () => {
    const extraTurns = 4;
    const randomDeg = Math.random() * 360;
    setRotationDeg((prev) => prev + extraTurns * 360 + randomDeg);
  };

  // i번째 옵션 변경
  const handleChangeOption = (index, value) => {
    setOptions((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  return (
    <div>
      <Roulette
        rotationDeg={rotationDeg}
        options={options}
        onChangeOption={handleChangeOption}
      />
      <SpinControls onSpin={handleSpin} />
    </div>
  );
};

export default RouletteContainer;
