"use client";

import { Input } from "src/components/common/Input";
import { Select } from "src/components/common/Select";
import { useUserParameters } from "src/hooks/pages/diet/useUserParameters";
import { Logout } from "../Logout";

interface IUserForm {
  user: Record<string, any>;
}

const genders = [
  { id: 1, value: "male" },
  { id: 2, value: "female" },
];

export const UserForm = ({ user }: IUserForm) => {
  const { control, isValid, handleSubmit } = useUserParameters({ user });

  return (
    <section className="py-[32px] mx-auto w-[480px] sm:w-full">
      <h1 className="mb-[16px] font-medium text-2xl">User Parameters</h1>

      <form
        className="mb-[16px] flex flex-col gap-[16px]"
        onSubmit={handleSubmit}
      >
        <Input
          name="name"
          label="Enter your name"
          control={control}
          rules={{ required: true }}
          type="text"
          placeholder="Name"
        />

        <Input
          name="age"
          label="Enter your age"
          control={control}
          rules={{ required: true }}
          type="text"
          placeholder="Age"
        />

        <Select
          name="gender"
          label="Gender"
          control={control}
          rules={{ required: true }}
          options={genders}
          optionValue="value"
        />

        <Input
          name="weight"
          label="Enter your weight (kg)"
          control={control}
          rules={{ required: true }}
          type="text"
          placeholder="Weight"
        />

        <Input
          name="height"
          label="Enter your height (cm)"
          control={control}
          rules={{ required: true }}
          type="text"
          placeholder="Height"
        />

        <button
          type="submit"
          disabled={!isValid}
          className="px-[30px] py-[8px] rounded-lg text-base md:text-lg bg-emerald-500 text-white"
        >
          Save
        </button>

        <Logout />
      </form>
    </section>
  );
};
