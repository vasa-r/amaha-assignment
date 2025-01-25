import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import DarkClose from "../../assets/dark/dark-close.svg";
import LightClose from "../../assets/light/light-close.svg";
import { useTheme } from "../../context/ThemeContext";

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const AutoCompleteModal = ({ open, setOpen, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, setOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center  z-[1000] overflow-y-auto">
      <div
        ref={modalRef}
        className={`w-96 max-h-fit py-5 px-5 rounded-[4px] font-semibold flex flex-col justify-between items-center relative top-24 ${
          !isDarkMode ? "bg-light-col" : "bg-main-bg"
        }`}
      >
        <div
          className={`absolute cursor-pointer size-8 rounded-md top-4 right-4 center ${
            isDarkMode ? "hover:bg-dark-hover" : "hover:bg-light-hover"
          }`}
          onClick={() => setOpen(false)}
        >
          <img
            className="size-5"
            src={isDarkMode ? LightClose : DarkClose}
            alt="close modal"
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default AutoCompleteModal;
