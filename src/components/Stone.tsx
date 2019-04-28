import * as React from "react";
import { StoneType } from "../App";

interface StoneProps {
  boardNum: number;
  stoneNum: number;
  stone: StoneType;
  onClick: Function;
}

const Stone: React.FunctionComponent<StoneProps> = props => {
  const { boardNum, stoneNum, stone, onClick } = props;
  const stoneClasses = ["None", "Black", "White"];
  return (
    <div className="Stone">
      <div className={`Stone__Item Stone__Item_${stoneClasses[stone]}`} onClick={() => onClick(boardNum, stoneNum)} />
    </div>
  );
};

export default Stone;
