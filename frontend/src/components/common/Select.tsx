import { Control, Controller, RegisterOptions } from "react-hook-form";

interface ISelect {
  control: Control<any>;
  rules?: RegisterOptions;
  // error: FieldError;
  name: string;
  label?: string;
  options: Record<string, any>;
  optionValue?: string;
}

export const Select = ({
  control,
  rules,
  // error,
  name,
  label,
  options,
  optionValue = "id",
}: ISelect) => {
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
          <select
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`px-[10px] py-[12px] border border-solid rounded-md font-normal text-base text-emerald-700`}
          >
            {options.map((option: any) => (
              <option key={option.id} value={option[optionValue]}>
                {option[optionValue]}
              </option>
            ))}
          </select>
        </div>
      )}
    />
  );
};
