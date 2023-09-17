import { Question } from "@/openapi";

export interface Props {
  question: Question;
}

export const QuizQuestion: React.FC<Props> = ({ question }) => {
  return (
    <div className="flex flex-col">
      <h3 className="font-normal text-base mb-10 select-none">
        {question.text}
      </h3>

      {question.variants.map(({ id, text }) => (
        <div key={id} className="mb-5 select-none w-full">
          <input
            type="radio"
            id={`answer_${id}`}
            name={`question`}
            value={id}
            className="mr-2 cursor-pointer"
          />
          <label className="cursor-pointer" htmlFor={`answer_${id}`}>{text}</label>
        </div>
      ))}
    </div>
  );
};
