import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const activeClass = (num) => (step >= num ? "active" : "");

  const handlePrevious = () => {
    setStep((currentStep) => currentStep - ((currentStep > 1) & 1));
    console.log(step);
  };

  const handleNext = () => {
    step < 3 && setStep((currentStep) => currentStep + 1);
    console.log(step);
  };

  return (
    <>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={activeClass(1)}>1</div>
            <div className={activeClass(2)}>2</div>
            <div className={activeClass(3)}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
