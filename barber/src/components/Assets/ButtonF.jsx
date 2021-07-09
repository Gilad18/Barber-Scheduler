import React from "react";

export default function ButtonF({ onClick, text, loading }) {
  return (
    <>
      <button
        className={`ui primary button ${loading ? "loading" : ""}`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
