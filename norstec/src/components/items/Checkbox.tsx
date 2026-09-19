"use client";

import type { ReactNode } from "react";

type CheckboxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  required?: boolean;
  children: ReactNode;
};

// Same markup and classes as the newsletter opt-in checkbox (styled by the global Brevo stylesheet).
export default function Checkbox({ checked, onChange, required, children }: CheckboxProps) {
  return (
    <label className="sib-form relative flex items-start gap-2 p-0! m-0! font-barlow! text-sm text-moody cursor-pointer">
      <input
        type="checkbox"
        className="input_replaced"
        checked={checked}
        onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
        required={required}
      />
      <span className="checkbox checkbox_tick_positive shrink-0 mt-[0.35em]"></span>
      <span>{children}</span>
    </label>
  );
}
