import "./OptionControls.css";

const OptionControls = ({
  count,
  min = 2,
  max = 8,
  onDec,
  onInc,
  onReset,
  disabled = false,
}) => {
  return (
    <div className="OptionControls">
      <div className="optionCountControls">
        <button
          className="optionBtn"
          type="button"
          onClick={onDec}
          disabled={disabled || count <= min}
        >
          -
        </button>
        <span className="optionCountText">{count}개</span>
        <button
          className="optionBtn"
          type="button"
          onClick={onInc}
          disabled={disabled || count >= max}
        >
          +
        </button>
      </div>

      <button
        className="optionResetBtn"
        type="button"
        onClick={onReset}
        disabled={disabled}
      >
        재설정
      </button>
    </div>
  );
};

export default OptionControls;
