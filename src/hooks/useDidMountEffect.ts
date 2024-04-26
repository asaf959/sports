import { useEffect, useRef } from "react";

/**
 * Used as a `useEffect` with the exception that it doesn't run on first render
 *
 * func — the effect function to run
 *
 * deps — the optional array of dependencies for the effect
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDidMountEffect = (func: () => any, deps?: any[]) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

export default useDidMountEffect;
