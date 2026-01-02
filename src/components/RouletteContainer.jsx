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

const RESULT_MESSAGES = [
  "운명이 이걸 골랐어요!",
  "오늘은 이 선택이 딱이에요 🙂",
  "고민 끝! 이걸로 가죠.",
  "랜덤의 신이 선택했어요.",
  "이건 꽤 괜찮은 결과예요!",
];

// 회전 각도로 결과 인덱스 계산
const getResultIndex = (rotationDeg, n) => {
  const step = 360 / n;
  const normalized = ((-rotationDeg % 360) + 360) % 360; // 0~359
  return Math.floor(normalized / step);
};

const RouletteContainer = () => {
  // 현재 룰렛의 회전 각도
  const [rotationDeg, setRotationDeg] = useState(0);

  // Option 텍스트 state
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  // Option의 갯수
  const [optionCount, setOptionCount] = useState(6);

  // 회전 여부
  const [isSpinning, setIsSpinning] = useState(false);
  // 결과 인덱스
  const [resultIndex, setResultIndex] = useState(null);
  // 결과 텍스트
  const [resultText, setResultText] = useState(null);
  // 결과 창 표시
  const [showResult, setShowResult] = useState(false);

  // 결과창을 닫기 전까지 input 숨김
  const isEditingDisabled = isSpinning || showResult;

  // 룰렛 회전
  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setShowResult(false);

    const extraTurns = 4;
    const randomDeg = Math.random() * 360;
    setRotationDeg((prev) => {
      const next = prev + extraTurns * 360 + randomDeg;
      const n = activeOptions.length;
      const idx = getResultIndex(next, n);
      setResultIndex(idx);
      return next;
    });
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

  // 회전 종료 시점에 결과 창 띄우기
  const handleSpinEnd = () => {
    setIsSpinning(false);
    if (resultIndex === null) return;

    const option = activeOptions[resultIndex] ?? "";
    const message =
      RESULT_MESSAGES[Math.floor(Math.random() * RESULT_MESSAGES.length)];

    setResultText({ option, message });
    setShowResult(true);
    setResultIndex(null);
  };

  return (
    <div>
      <OptionControls
        count={optionCount}
        min={MIN}
        max={MAX}
        onDec={handleDecreaseOptionCount}
        onInc={handleIncreaseOptionCount}
        onReset={handleResetOptionCount}
        disabled={isEditingDisabled}
      />
      <Roulette
        rotationDeg={rotationDeg}
        options={activeOptions}
        onChangeOption={handleChangeOption}
        onSpinEnd={handleSpinEnd}
        isEditingDisabled={isEditingDisabled}
      />
      <SpinControls onSpin={handleSpin} disabled={isSpinning} />

      {showResult && resultText && (
        <div className="resultToast">
          <div className="resultToastTitle">결과</div>

          {/* 결과 옵션 */}
          <div className="resultToastValue">{resultText.option}</div>

          {/* 랜덤 문구 */}
          <div className="resultToastMessage">{resultText.message}</div>

          <button
            type="button"
            className="resultToastClose"
            onClick={() => setShowResult(false)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default RouletteContainer;
