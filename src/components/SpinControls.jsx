import "./SpinControls.css";

const SpinControls = ({ onSpin, disabled }) => {
  return (
    <div>
      <button type="button" onClick={onSpin} disabled={disabled}>
        돌리기
      </button>
    </div>
  );
};

export default SpinControls;
