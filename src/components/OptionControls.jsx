import "./OptionControls.css";

import { useTranslation } from "react-i18next";

const OptionControls = ({
  count,
  min = 2,
  max = 8,
  onDec,
  onInc,
  onReset,
  disabled = false,
}) => {
  const { t } = useTranslation();

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
        <span className="optionCountText">
          {t("optionCountLabel", { count: count })}
        </span>
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
        {t("reset")}
      </button>
    </div>
  );
};

export default OptionControls;
