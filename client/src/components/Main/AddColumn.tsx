import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Modal from "../UtilsUI/Modal";
import Input from "../UtilsUI/Input";
import Loader from "../Loaders/Loader";
import { createColumn, updateColumn } from "../../api/column";
import toast from "react-hot-toast";

interface Prop {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  boardId?: string;
  refresh: Dispatch<SetStateAction<boolean>>;
  columnId?: string;
}

const AddColumn = ({ open, setOpen, boardId, refresh, columnId }: Prop) => {
  const [columnName, setColumnName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!columnName) {
        setError("Please give column name");
        return;
      }
      if (columnId) {
        await changeColumnName();
      } else {
        await newColumn();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const newColumn = async () => {
    try {
      const response = await createColumn(boardId!, columnName);

      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
        refresh(true);
        setColumnName("");
        setOpen(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't create column. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during creating column. Please try again later."
      );
    }
  };

  const changeColumnName = async () => {
    setIsLoading(true);
    try {
      const response = await updateColumn(columnId!, columnName);

      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
        setColumnName("");
        refresh(true);
        setOpen(false);
      } else {
        toast.error(
          response?.data?.message ||
            "Couldn't update column. Please try again later"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred during updating column. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold">
          {columnId ? "Edit column name" : "Add New Column"}
        </h1>
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
          {isLoading ? (
            <Loader height="24px" width="24px" />
          ) : columnId ? (
            "Update Column"
          ) : (
            "Add Column"
          )}
        </button>
      </form>
    </Modal>
  );
};

export default AddColumn;
