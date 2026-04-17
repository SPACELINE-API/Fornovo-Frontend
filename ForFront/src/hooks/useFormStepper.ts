import { useState } from 'react';
import type { UseFormReturnType } from '@mantine/form';

interface UseFormStepperProps<T> {
  form: UseFormReturnType<T>;
  stepFields: (keyof T)[][];
  onComplete: (values: T) => void;
}

interface UseFormStepperReturn {
  active: number;
  setActive: (step: number) => void;
  handleNext: () => void;
  handleBack: () => void;
  isLastStep: boolean;
}

export const useFormStepper = <T extends Record<string, any>>({
  form,
  stepFields,
  onComplete,
}: UseFormStepperProps<T>): UseFormStepperReturn => {
  const [active, setActive] = useState(0);

  const isLastStep = active === stepFields.length - 1;

  const handleNext = () => {
    const fields = stepFields[active];
    const hasError = fields.some((field) => form.validateField(field as string).hasError);

    if (hasError) return;

    if (isLastStep) {
      onComplete(form.values);
    } else {
      stepFields[active + 1].forEach((field) => form.clearFieldError(field as string));
      setActive((s) => s + 1);
    }
  };

  const handleBack = () => setActive((s) => Math.max(0, s - 1));

  return { active, setActive, handleNext, handleBack, isLastStep };
};
