import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Modal from "../UtilsUI/Modal";
import Input from "../UtilsUI/Input";
import Loader from "../Loaders/Loader";

interface Prop {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateBoard = ({ open, setOpen }: Prop) => {
  const [boardName, setBoardName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!boardName) {
        setError("Please give board name");
        return;
      }
      console.log("submitted");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">Create Board</h1>
        <Input
          name="boardName"
          label="Board Name"
          type="text"
          placeholder="Enter board name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />
        {!boardName && <p className="relative xs-error -top-3">{error}</p>}
        <button
          type="submit"
          className="!text-white bg-green-400 btn relative left-1/2 -translate-x-1/2"
        >
          {isLoading ? <Loader height="24px" width="24px" /> : "Create"}
        </button>
      </form>
    </Modal>
  );
};

export default CreateBoard;
