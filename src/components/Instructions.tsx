type InstructionsProps = {
  steps: { step: string }[];
};

const Instructions = ({ steps }: InstructionsProps) => {
  return <ul className="flex flex-col gap-2">
     {steps.map((step, index) => (
        <li key={index}>
          <p>{step.step}</p>
          <div className="divider divider-accent my-1"></div>
        </li>
      ))}
  </ul>;
};

export default Instructions;
