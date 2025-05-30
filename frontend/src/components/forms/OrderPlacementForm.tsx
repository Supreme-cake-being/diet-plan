"use client";

import { useState } from "react";
import { Input } from "src/components/common/Input";
import { useOrderPlacement } from "src/hooks/pages/diet/useOrderPlacement";
import { Modal } from "../common/Modal";
import { useRouter } from "next/navigation";

export const OrderPlacementForm = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const router = useRouter();

  const { control, isValid, handleSubmit } = useOrderPlacement(setOrderPlaced);

  const onClose = () => router.push("/");

  return (
    <section className="py-[32px] mx-auto w-[480px] sm:w-full">
      <h1 className="mb-[16px] font-medium text-2xl">Order</h1>

      <form
        className="mb-[16px] flex flex-col gap-[16px]"
        onSubmit={handleSubmit}
      >
        <Input
          name="address"
          label="Address"
          control={control}
          rules={{ required: true }}
          type="text"
          placeholder="Address"
        />

        <Input
          name="phoneNumber"
          label="Phone number"
          control={control}
          rules={{ required: true }}
          type="text"
          placeholder="Phone number"
        />

        <button
          type="submit"
          disabled={!isValid}
          className="px-[30px] py-[8px] rounded-lg text-base md:text-lg bg-emerald-500 text-white"
        >
          Order
        </button>
      </form>

      {orderPlaced && (
        <Modal
          title="Yout order is placed"
          withControls={false}
          onClose={onClose}
        >
          <p className="text-base">Our manager will soon contact you</p>
        </Modal>
      )}
    </section>
  );
};
