import { nanoid } from "nanoid";
import "../App.css";

const Question = ({ quiz, id, handleClickAnswer }) => {
  let result = quiz.answers;

  const handleClick = (answer) =>
    !quiz.checked && handleClickAnswer(id, answer);

  return (
    <div className="mb-3 w-full text-left">
      <h3 className="text-base leading-[19px] font-bold mb-2  text-[#293264]">
        {atob(quiz.question)}
      </h3>
      {result.map((answer) => {
        let id = null;
        if (quiz.checked) {
          if (quiz.correct === answer) {
            id = "correct";
          } else if (quiz.selected === answer) {
            id = "incorrect";
          } else {
            id = "not-selected";
          }
        }
        return (
          <button
            key={nanoid()}
            id={id}
            className={`text-[#293264] bg-transparent border border-[#4d5b9e] font-medium  text-xs rounded-[10px] mr-[13px] mb-1 py-2 px-4 answer ${
              answer === quiz.selected ? "selected" : ""
            }  `}
            onClick={() => handleClick(answer)}
          >
            {atob(answer)}
          </button>
        );
      })}

      <div className="mt-2 w-full border-t border-t-[#c4c8e8]"></div>
    </div>
  );
};

export default Question;
