import "./Main.css";
import OptionControls from "./OptionControls";
import RouletteContainer from "./RouletteContainer";
import SpinControls from "./SpinControls";

const Main = () => {
  return (
    <div>
      <OptionControls />
      <RouletteContainer />
      <SpinControls />
    </div>
  );
};

export default Main;
