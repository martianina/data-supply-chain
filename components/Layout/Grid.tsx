import React from "react";

type RowProps = {
  children: React.ReactNode;
  cols?: keyof typeof classes.gap;
  gap?: keyof typeof classes.cols;
};

const classes = {
  gap: {
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
  },
  cols: {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  },
};

const Row = ({ children, cols = 2, gap = 2 }: RowProps) => {
  return (
    <div className={`grid  ${classes.cols[cols]} ${classes.gap[gap]}`}>
      {children}
    </div>
  );
};

export default Row;
