import { useState, useEffect } from "react";

const unsavedChanges = () => {
  const [isDirty, setDirty] = useState(false);

  function confirmNavigation(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = "Are you sure you want to leave? Your changes will be lost."; // eslint-disable-line no-param-reassign
  }

  let unblock: (() => void) | undefined;

  if (isDirty) {
    window.addEventListener("beforeunload", confirmNavigation);
  }

  useEffect(
    () => () => {
      window.removeEventListener("beforeunload", confirmNavigation);
      if (typeof unblock === "function") {
        unblock();
      }
    },
    [isDirty]
  );

  const onDirty = () => setDirty(true);
  const onPristine = () => setDirty(false);

  return { onDirty, onPristine };
};

export default unsavedChanges;
