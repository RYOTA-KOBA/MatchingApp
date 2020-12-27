import React, { useState } from "react";

export const Sample = () => {
  return (
    <>
      <p data-testid="text">Learn React</p>
      <p data-testid="text2">Learn JS</p>
    </>
  );
};

export const multiple = (x, y) => x * y;
export const add = (x, y) => x + y;
