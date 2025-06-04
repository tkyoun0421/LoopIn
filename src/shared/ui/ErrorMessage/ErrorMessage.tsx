import { JSX } from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps): JSX.Element => {
  return <p className="text-md">{message}</p>;
};

export default ErrorMessage;
