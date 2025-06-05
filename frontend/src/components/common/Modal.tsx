import { useEffect } from "react";

interface IModal {
  title: string;
  withControls?: boolean;
  onClose: () => void;
  action?: () => void;
  children: React.ReactNode;
}

export const Modal = ({
  title,
  withControls = true,
  onClose,
  action,
  children,
}: IModal) => {
  const closeModal = (e: any) => {
    if (e.code === "Escape" || e.currentTarget === e.target) onClose();
  };

  useEffect(() => {
    window.addEventListener("keydown", closeModal);

    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(46,47,66,0.4)]"
    >
      <div className="fixed py-[40px] px-[20px] w-[432px] sm:w-[260px] bg-white rounded-2xl">
        <button onClick={onClose} className="absolute top-[16px] right-[16px]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 5L5 19M5.00001 5L19 19"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h2 className="font-medium text-3xl sm:text-2xl mb-[16px]">{title}</h2>
        {children}

        {withControls && (
          <div className="flex justify-end gap-[16px] mt-[16px]">
            <button
              type="button"
              className="sm:px-[16px] px-[36px] py-[8px] rounded-lg text-emerald-500"
              onClick={onClose}
            >
              Cancel
            </button>
            {action && (
              <button
                type="button"
                className="sm:px-[16px] px-[36px] py-[8px] rounded-lg bg-emerald-500 text-white"
                onClick={action}
              >
                {title}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
