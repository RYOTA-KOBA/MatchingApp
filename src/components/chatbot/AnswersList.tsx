import React from "react";
import Answer from "./Answer";

const AnswersList = (props: any) => {
  return (
    <div className="c-grid__answer">
      {props.answers.map((key: any, index: any) => {
        return (
          <Answer
            answer={props.answers[index]}
            key={index.toString()}
            select={props.select}
          />
        );
      })}
    </div>
  );
};

export default AnswersList;
