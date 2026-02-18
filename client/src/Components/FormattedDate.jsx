import React from "react";

const FormattedDate = ({ timestamp }) => {
  if (!timestamp) return null;

  const date = new Date(timestamp);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return <span>{formattedDate}</span>;
};

export default FormattedDate;
