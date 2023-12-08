type InstructionsProps = {
  steps: { step: string }[];
};

const Instructions = ({ steps }: InstructionsProps) => {
  return <ul>
     {steps.map((step) => (
        <li>
          <p>{step.step}</p>
        </li>
      ))}
  </ul>;
};

export default Instructions;
