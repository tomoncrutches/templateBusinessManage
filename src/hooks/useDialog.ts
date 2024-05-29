import { useState } from 'react';

export const useDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const handleDialog = () => setShowDialog(!showDialog);

  return {
    showDialog,
    handleDialog,
  };
};
