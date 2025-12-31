import "./RouletteContainer.css";

import Roulette from "./Roulette";
import SpinControls from "./SpinControls";

import { useState } from "react";

const RouletteContainer = () => {
  // 현재 룰렛의 회전 각도
  const [rotationDeg, setRotationDeg] = useState(0);

  const handleSpin = () => {
    const extraTurns = 4;
    const randomDeg = Math.random() * 360;
    setRotationDeg((prev) => prev + extraTurns * 360 + randomDeg);
  };

  return (
    <div>
      <Roulette rotationDeg={rotationDeg} />
      <SpinControls onSpin={handleSpin} />
    </div>
  );
};

export default RouletteContainer;
