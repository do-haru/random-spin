import "./RouletteContainer.css";

import OptionControls from "./OptionControls";
import Roulette from "./Roulette";
import SpinControls from "./SpinControls";
import { ROULETTE_RESULT_MESSAGES } from "../constants/rouletteMessages";

import { useState } from "react";

// Option 최대/최소 개수
const MIN = 2;
const MAX = 8;

// 기본 Option
const DEFAULT_OPTIONS = Array.from({ length: MAX }, (_, i) => `${i + 1}`);

// 결과 랜덤 메세지
const RESULT_MESSAGES = [
  "운명이 이걸 골랐어요!",
  "오늘은 이 선택이 딱이에요 🙂",
  "고민 끝! 이걸로 가죠.",
  "랜덤의 신이 선택했어요.",
  "이건 꽤 괜찮은 결과예요!",
];

// 회전 각도 -> 결과 인덱스 계산
const getResultIndex = (rotationDeg, n) => {
  const step = 360 / n;
  const normalized = ((-rotationDeg % 360) + 360) % 360; // 0~359
  return Math.floor(normalized / step);
};

const RouletteContainer = () => {
  const [options, setOptions] = useState(DEFAULT_OPTIONS); // Option 배열
  const [optionCount, setOptionCount] = useState(6); // Option 개수
  const activeOptions = options.slice(0, optionCount); // 사용 중 Option 배열

  const [rotationDeg, setRotationDeg] = useState(0); // 룰렛 회전 각도
  const [isSpinning, setIsSpinning] = useState(false); // 회전 중 여부

  const [resultIndex, setResultIndex] = useState(null); // Result 인덱스
  const [result, setResult] = useState(null); // Roulette Result

  const [showResult, setShowResult] = useState(false); // 결과 창 표시 여부

  // OptionControls, SpinningControls 비활성화 조건 (회전 중이거나 결과창이 떠있을 경우)
  const isOptionChangeDisabled = isSpinning || showResult;

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

  // i번째 Option 변경
  const handleChangeOption = (index, value) => {
    setOptions((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  // Option 개수 감소
  const handleDecreaseOptionCount = () =>
    setOptionCount((c) => Math.max(MIN, c - 1));

  // Option 개수 증가

  const handleIncreaseOptionCount = () =>
    setOptionCount((c) => Math.min(MAX, c + 1));

  // Option 개수 초기화
  const handleResetOptionCount = () => {
    setOptionCount(6);
    setOptions(DEFAULT_OPTIONS);
    setRotationDeg(0);
  };

  // 회전 종료 시 결과 처리
  const handleSpinEnd = () => {
    setIsSpinning(false);
    if (resultIndex === null) return;

    const option = activeOptions[resultIndex] ?? "";
    const message =
      ROULETTE_RESULT_MESSAGES[
        Math.floor(Math.random() * ROULETTE_RESULT_MESSAGES.length)
      ];

    setResult({ option, message });
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
        disabled={isOptionChangeDisabled}
      />
      <Roulette
        rotationDeg={rotationDeg}
        options={activeOptions}
        onChangeOption={handleChangeOption}
        onSpinEnd={handleSpinEnd}
        isEditingDisabled={isOptionChangeDisabled}
      />
      <SpinControls onSpin={handleSpin} disabled={isSpinning} />

      {showResult && result && (
        <div className="resultToast">
          <div className="resultToastTitle">결과</div>

          {/* 결과 옵션 */}
          <div className="resultToastValue">{result.option}</div>

          {/* 랜덤 문구 */}
          <div className="resultToastMessage">{result.message}</div>

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
