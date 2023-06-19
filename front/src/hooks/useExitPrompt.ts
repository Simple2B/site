import { useEffect } from "react";

/**This hook shows a prompt before closing a tab or refresh a page. */
export const useExitPrompt = (message = "Are you sure?") => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      // Note that some browsers may not display a custom message.
      event.returnValue = message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [message]);
}
