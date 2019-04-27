import * as React from "react";
import { StoneType } from "./Boards";

interface StoneProps {
  stone: StoneType;
}

const Stone: React.FunctionComponent<StoneProps> = props => {
  const { stone } = props;
  const stoneClasses = ["None", "Black", "White"];
  return (
    <div className="Stone">
      <div className={`Stone__Item Stone__Item_${stoneClasses[stone]}`} />
    </div>
  );
};

export default Stone;
