import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Modal from "../UtilsUI/Modal";
import Input from "../UtilsUI/Input";
import Loader from "../Loaders/Loader";

interface Prop {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AddColumn = ({ open, setOpen }: Prop) => {
  const [columnName, setColumnName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!columnName) {
        setError("Please give column name");
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
        <h1 className="text-2xl font-semibold">Add New Column</h1>
        <Input
          name="columnName"
          label="Column Name"
          type="text"
          placeholder="Enter column name"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
        />
        {!columnName && <p className="relative xs-error -top-3">{error}</p>}
        <button
          type="submit"
          className="!text-white bg-green-400 btn relative left-1/2 -translate-x-1/2"
        >
          {isLoading ? <Loader height="24px" width="24px" /> : "Add Column"}
        </button>
      </form>
    </Modal>
  );
};

export default AddColumn;
