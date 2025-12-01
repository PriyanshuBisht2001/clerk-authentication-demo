"use client";

import { useAuth, useUser } from "@clerk/clerk-react";
import { useState } from "react";

export const Counter = () => {
  const [counter, setCounter] = useState(0);
  //   const {isLoaded, userId, sessionId, getToken} = useAuth()
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded && !isSignedIn) {
    return null;
  }
  return (
    <>
      <button onClick={() => setCounter(counter - 1)}>-</button>
      <p>Count: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </>
  );
};
