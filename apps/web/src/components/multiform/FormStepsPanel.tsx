import { Check } from "@mui/icons-material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  MouseEvent
} from "react";
import * as z from "zod";

import { classNames } from "../../utils/strings";
import Button from "../Button";

const getStepsPanelStyle = (isCompleted: boolean, isActive: boolean) => {
  if (isActive) {
    return "bg-gradient-to-br from-purple-600 via-indigo-700 to-transparent";
  }

  if (isCompleted) {
    return "";
  }

  return "";
};

export type FormStep = {
  name: string;
  description: string;
  validation: z.ZodObject<{}>;
  component: React.ReactNode;
};

interface FormStepsPanelProps {
  formData: {};
  steps: FormStep[];
  handleSubmit?: () => void;
  submitButtonText?: string;
  showSubmitButton?: boolean;
}

const FormStepsPanel: React.FC<FormStepsPanelProps> = ({
  formData,
  steps,
  submitButtonText,
  handleSubmit,
  showSubmitButton = false
}) => {
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(steps.length).fill(false)
  );
  const [activeStep, setActiveStep] = useState(0);

  const isCompleted = (stepValidation: z.ZodObject<{}>) => {
    try {
      stepValidation.parse(formData);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const handleSetActiveStep = (newStep: number) => {
    const newCompletedSteps = completedSteps;

    const isStepCompleted = isCompleted(steps[activeStep].validation);
    newCompletedSteps[activeStep] = isStepCompleted;

    setCompletedSteps(newCompletedSteps);

    const isNewStepPossible = newCompletedSteps
      .slice(0, newStep)
      .reduce((all, curr) => all && curr, true);

    if (newStep <= activeStep) {
      setActiveStep(newStep);
      return;
    }

    if (isStepCompleted && isNewStepPossible) {
      setActiveStep(newStep);
    }
  };

  return (
    <div className="container flex flex-col mx-auto space-y-4 py-8">
      <div className="mx-auto overflow-hidden w-full lg:flex divide-x divide-gray-700">
        {steps.map(({ name, description }, index) => (
          <button
            key={index}
            className={`relative w-full py-[2px] flex items-start px-[2px] overflow-hidden text-sm font-medium group ${classNames(
              index === 0 && "rounded-l-lg",
              index === steps.length - 1 && "rounded-r-lg"
            )}`}
            onClick={() => handleSetActiveStep(index)}
          >
            <div
              className={`absolute top-0 left-0 w-full h-full ${
                activeStep === index
                  ? "bg-gradient-to-br"
                  : "group-hover:bg-gradient-to-br bg-gray-800"
              } transition-all duration-150 from-indigo-800 to-purple-800`}
            />
            <div
              className={`relative p-4 w-full flex transition-all duration-150 ${
                activeStep === index ? "bg-transparent" : "bg-gray-800"
              } ${classNames(
                index === 0 && "rounded-l-lg",
                index === steps.length - 1 && "rounded-r-lg"
              )}`}
            >
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150 ${classNames(
                  activeStep === index
                    ? "border border-gray-200 text-gray-200"
                    : "border border-indigo-500 text-indigo-500",
                  activeStep != index &&
                    completedSteps[index] &&
                    "bg-gradient-to-br from-indigo-800 to-purple-800 border-0"
                )}`}
              >
                {completedSteps[index] ? (
                  <Check className="text-gray-200" fontSize="small" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </span>
              <div className="ml-4 flex flex-col space-y-1">
                <p className="font-semibold text-gray-100 uppercase text-sm text-left">
                  {name}
                </p>
                <p className="text-gray-200 text-sm text-left">{description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col">{steps[activeStep].component}</div>
      <div className="flex justify-between">
        <div>
          {activeStep >= 1 && (
            <Button
              className="items-center space-x-2"
              // disabled={currentStep == 0}
              onClick={() => handleSetActiveStep(activeStep - 1)}
            >
              <ArrowBack />
              <p>Previous</p>
            </Button>
          )}
        </div>
        <div>
          {activeStep < steps.length - 1 ? (
            <Button
              className="items-center space-x-2"
              disabled={!isCompleted(steps[activeStep].validation)}
              onClick={() => handleSetActiveStep(activeStep + 1)}
            >
              <p>Next</p>
              <ArrowForward />
            </Button>
          ) : (
            showSubmitButton &&
            handleSubmit && (
              <Button
                color="indigo"
                size="lg"
                disabled={!isCompleted(steps[activeStep].validation)}
                onClick={handleSubmit}
              >
                {submitButtonText}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FormStepsPanel;
