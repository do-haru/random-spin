import "./SpinControls.css";

import { useTranslation } from "react-i18next";

const SpinControls = ({ onSpin, disabled }) => {
  const { t } = useTranslation();

  return (
    <div className="SpinControls">
      <button
        className="spinBtn"
        type="button"
        onClick={onSpin}
        disabled={disabled}
      >
        {t("spin")}
      </button>
    </div>
  );
};

export default SpinControls;
