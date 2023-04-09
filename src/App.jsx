import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Menu from "./components/Menu";
import Question from "./components/Question";

const App = () => {
  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState([]);
  const [count, setCount] = useState(false);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  useEffect(() => {
    async function getQuestion() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=18&encode=base64"
      );
      const data = await res.json();
      let quiz = [];
      data.results.forEach((question) => {
        quiz.push({
          id: nanoid(),
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
          question: question.question,
          correct: question.correct_answer,
          selected: null,
          checked: false,
        });
      });
      setQuestion(quiz);
    }
    getQuestion();
  }, [count]);

  const handleCheck = () => {
    let selected = true;
    question.forEach((question) => {
      if (question.selected === null) {
        selected = false;
        return;
      }
    });
    if (!selected) {
      return;
    }

    setQuestion((questions) =>
      questions.map((question) => ({
        ...question,
        checked: true,
      }))
    );
    setChecked(true);
    let correct = 0;
    question.forEach((question) => {
      if (question.correct === question.selected) {
        correct += 1;
      }
    });
    setCorrect(correct);
  };

  const handleClickAnswer = (id, answer) => {
    setQuestion((questions) =>
      questions.map((question) =>
        question.id === id ? { ...question, selected: answer } : question
      )
    );
  };

  const handlePlayAgain = () => {
    setCount((count) => count + 1);
    setChecked(false);
  };

  const questionElement = question
    ? question.map((question) => {
        return (
          <Question
            key={question.id}
            quiz={question}
            handleClickAnswer={handleClickAnswer}
            id={question.id}
          />
        );
      })
    : [];

  const start = () => setStarted(!started);

  return (
    <div className="max-w-5xl mx-auto mt-36  flex items-center justify-center">
      <div className="px-4">
        {started ? (
          <div>
            {questionElement}
            <div className="flex flex-row items-center justify-center gap-4 mt-1">
              {checked && (
                <span className="font-bold text-base text-[#293264]">
                  {" "}
                  You scored {correct}/5 correct answers{" "}
                </span>
              )}
              <button
                className="text-white bg-[#4d5b9e] rounded-[10px] mt-5 py-[14px] px-6 justify-self-center"
                onClick={checked ? handlePlayAgain : handleCheck}
              >
                {checked ? "Play Again" : "Check Answer"}
              </button>
            </div>
          </div>
        ) : (
          <Menu start={start} />
        )}
      </div>
    </div>
  );
};

export default App;
