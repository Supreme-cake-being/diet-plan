interface IOrderPlcement {
  address: string;
  phoneNumber: string;
}

import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

export const useOrderPlacement = (
  onSuccess: Dispatch<SetStateAction<boolean | null>>
) => {
  const {
    control,
    formState: { errors, isValid, isLoading },
    handleSubmit,
    setError,
  } = useForm<IOrderPlcement>({
    defaultValues: {
      address: "",
      phoneNumber: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: IOrderPlcement) => {
    const { address, phoneNumber } = values;

    console.log(address, phoneNumber);

    onSuccess(true);
  };

  return {
    control,
    isValid,
    isLoading,
    errors,
    handleSubmit: handleSubmit(onSubmit),
  };
};
