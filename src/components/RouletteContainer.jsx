import "./RouletteContainer.css";

import OptionControls from "./OptionControls";
import Roulette from "./Roulette";
import SpinControls from "./SpinControls";

import { useState } from "react";

const MIN = 2;
const MAX = 8;

// 기본 Option 텍스트
const DEFAULT_OPTIONS = Array.from(
  { length: MAX },
  (_, i) => `Option ${i + 1}`
);

const RouletteContainer = () => {
  // 현재 룰렛의 회전 각도
  const [rotationDeg, setRotationDeg] = useState(0);

  // Option 텍스트 state
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  // Option의 갯수
  const [optionCount, setOptionCount] = useState(6);

  // 룰렛 회전
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

  // Option 갯수 감소
  const handleDecreaseOptionCount = () =>
    setOptionCount((c) => Math.max(MIN, c - 1));
  // Option 갯수 증가
  const handleIncreaseOptionCount = () =>
    setOptionCount((c) => Math.min(MAX, c + 1));
  // Option 갯수 초기화
  const handleResetOptionCount = () => {
    setOptionCount(6);
    setOptions(DEFAULT_OPTIONS);
    setRotationDeg(0);
  };

  // 사용중인 옵션
  const activeOptions = options.slice(0, optionCount);

  return (
    <div>
      <OptionControls
        count={optionCount}
        min={MIN}
        max={MAX}
        onDec={handleDecreaseOptionCount}
        onInc={handleIncreaseOptionCount}
        onReset={handleResetOptionCount}
      />
      <Roulette
        rotationDeg={rotationDeg}
        options={activeOptions}
        onChangeOption={handleChangeOption}
      />
      <SpinControls onSpin={handleSpin} />
    </div>
  );
};

export default RouletteContainer;
