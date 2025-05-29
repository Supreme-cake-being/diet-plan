"use client";

import { useState } from "react";
import { useLogout } from "src/hooks/pages/auth/useLogout";
import { Modal } from "src/components/common/Modal";

export const Logout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { loading, handleLogout } = useLogout();

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const onActionClick = () => {
    handleLogout();
    toggleIsOpen();
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleIsOpen}
        className="px-[36px] py-[8px] rounded-lg bg-rose-500 text-white"
      >
        Log out
      </button>
      {isOpen && (
        <Modal title="Log out" onClose={toggleIsOpen} action={onActionClick}>
          <p className="text-base">Are you sure you want to log out?</p>
        </Modal>
      )}
    </>
  );
};
