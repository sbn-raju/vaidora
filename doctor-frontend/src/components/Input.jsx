import React from "react";
import { useId } from "react";

const Input = ({ childen, label, type = "text", className = "", style,  ...props },ref) => {
  const id = useId();
  return (
    <div className="">
      {label && (
        <label className="text-sm" style={style} htmlFor={id}>
          {label}
        </label>
      )}
      <br/>
      <input
        className={`rounded-lg p-2 ${className}`}
        type={type}
        id={id}
        {...props}
        ref={ref}
      />
    </div>
  );
};

export default React.forwardRef(Input);
