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
    <div>
      <button type="button" onClick={onDec} disabled={disabled || count <= min}>
        -
      </button>
      <span>{count}개</span>
      <button type="button" onClick={onInc} disabled={disabled || count >= max}>
        +
      </button>

      <button type="button" onClick={onReset} disabled={disabled}>
        재설정
      </button>
    </div>
  );
};

export default OptionControls;
