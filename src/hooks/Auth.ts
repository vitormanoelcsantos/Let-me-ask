import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function Auth() {
  const value = useContext(AuthContext);

  return value;
}