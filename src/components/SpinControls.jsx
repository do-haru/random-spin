import "./SpinControls.css";

const SpinControls = ({ onSpin }) => {
  return (
    <div>
      <button type="button" onClick={onSpin}>
        돌리기
      </button>
    </div>
  );
};

export default SpinControls;
