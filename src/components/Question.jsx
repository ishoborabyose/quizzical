import { nanoid } from "nanoid";
import "../App.css";

const Question = ({ q, id, handleClickAnswer }) => {
  let result = q.answers;
  const handleClick = (answer) => {
    if (q.checked) {
      return;
    }
    handleClickAnswer(id, answer);
  };

  return (
    <div className="mb-3 w-full text-left">
      <h3 className="text-base leading-[19px] font-bold mb-2  text-[#293264]">
        {atob(q.question)}
      </h3>
      {result.map((answer) => {
        let id = null;
        if (q.checked) {
          if (q.correct === answer) {
            id = "correct";
          } else if (q.selected === answer) {
            id = "incorrect";
          } else {
            id = "not-selected";
          }
        }
        return (
          <button
            key={nanoid()}
            id={id}
            className={`text-[#293264] bg-transparent border border-[#4d5b9e] font-medium  text-xs rounded-[10px] mr-[13px] mb-1 py-[2px] px-[8px] answer ${
              answer === q.selected ? "selected" : ""
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
