import { useCallback } from "react";

export default function useValidatePlayer(dataPlayer) {
  const validate = useCallback(() => {
    if (dataPlayer.length === 0) {
      alert("Please enter your name before starting!");
      return false;
    }
    return true;
  }, [dataPlayer]);

  return { validate };
}