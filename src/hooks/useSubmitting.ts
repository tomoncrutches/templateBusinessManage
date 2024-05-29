import { useState } from 'react';

export const useSubmitting = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitting = () => setSubmitting(!submitting);

  return {
    submitting,
    handleSubmitting,
  };
};
