import "./OptionControls.css";

const OptionControls = ({ count, min = 2, max = 8, onDec, onInc, onReset }) => {
  return (
    <div>
      <button type="button" onClick={onDec} disabled={count <= min}>
        -
      </button>
      <span>{count}개</span>
      <button type="button" onClick={onInc} disabled={count >= max}>
        +
      </button>

      <button type="button" onClick={onReset}>
        재설정
      </button>
    </div>
  );
};

export default OptionControls;
