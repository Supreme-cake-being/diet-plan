import { Control, Controller, RegisterOptions } from "react-hook-form";

interface IInput {
  control: Control<any>;
  rules?: RegisterOptions;
  // error: FieldError;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

export const Input = ({
  control,
  rules,
  // error,
  name,
  label,
  placeholder,
  type = "text",
}: IInput) => {
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { value, onChange }, fieldState }) => (
        <div className="flex flex-col gap-[8px]">
          {label && (
            <label htmlFor={name} className="font-normal text-lg">
              {label}
            </label>
          )}
          <input
            id={name}
            name={name}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className={`px-[10px] py-[12px] border border-solid rounded-md font-normal text-base text-emerald-700 ${
              fieldState.invalid
                ? "text-red-500 border-red-500"
                : "text-emerald-700 border-emerald-700"
            } placeholder:text-green-400`}
          />
          {fieldState.error && (
            <span className="text-base text-red-500">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};
