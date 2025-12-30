import "./Roulette.css";

const Roulette = () => {
  return (
    <div>
      <svg width="320" height="320" viewBox="0 0 320 320">
        <g>
          <circle
            cx="160"
            cy="160"
            r="150"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />

          <circle cx="160" cy="160" r="3" fill="black" />
        </g>
      </svg>
    </div>
  );
};

export default Roulette;
