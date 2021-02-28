import React from "react";

interface ButtonProps {
  color: string;
  children: string;
}

export function Button(props: ButtonProps) {
  const [conter, setConter] = React.useState(1);

  function Increment() {
    setConter(conter + 1);
  }

  return (
    <button
      type="button"
      onClick={() => Increment()}
      style={{ backgroundColor: props.color }}
    >
      {props.children}
      <strong>{conter}</strong>
    </button>
  );
}
