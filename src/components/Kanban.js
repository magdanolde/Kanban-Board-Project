import { useState } from "react";
import React from "react";
import Column from "./Column";
import TaskForm from "./TaskForm";
import useLocalStorage from "../useLocalStorage";
import { v4 as uuid } from "uuid";
import { TasksContext } from "../contexts/TasksContext";

function Kanban() {
  const initState = [
    {
      id: 1,
      title: "Requested",
      items: [],
      limit: 1,
    },
    {
      id: 2,
      title: "Backlog",
      items: [],
      limit: 2,
    },
    {
      id: 3,
      title: "Working",
      items: [],
      limit: 2,
    },
    {
      id: 4,
      title: "Waiting",
      items: [],
      limit: 1,
    },
    {
      id: 5,
      title: "Review",
      items: [],
      limit: 1,
    },
    {
      id: 6,
      title: "Done",
      items: [],
      limit: 1,
    },
  ];

  const [storedData, setSavedData] = useLocalStorage("kanban-data", initState);

  const [prevIsDisabled, setPrevIsDisabled] = useState(false);
  const [nextIsDisabled, setNextIsDisabled] = useState(false);

  const moveNext = (idColumnCurrent, task) => {
    const currentIndex = storedData.findIndex(
      (item) => item.id === idColumnCurrent
    );

    const nextColumn = storedData.find(
      (column) => column.id === idColumnCurrent + 1
    );

    setPrevIsDisabled(false);
    if (nextColumn == null || nextColumn.limit === nextColumn.items.length) {
      alert(
        "You exceeded the limit of tasks in this column or there are no more columns to move to."
      );
      setNextIsDisabled(true);
      return null;
    } else {
      setNextIsDisabled(false);
    }

    const nextIndex = currentIndex + 1;

    const newState = storedData.map((column) => {
      if (column.id === idColumnCurrent) {
        const newItems = column.items.filter((item) => item.id !== task.id);
        return { ...column, items: newItems };
      }
      return column;
    });

    const newState2 = newState.map((column, index) => {
      if (nextIndex === index) {
        return { ...column, items: [...column.items, task] };
      }
      return column;
    });

    setSavedData(newState2);
  };

  const movePrev = (idColumnCurrent, task) => {
    const currentIndex = storedData.findIndex(
      (item) => item.id === idColumnCurrent
    );

    const nextIndex = currentIndex - 1;
    const prevColumn = storedData.find(
      (column) => column.id === idColumnCurrent - 1
    );
    setNextIsDisabled(false);
    if (prevColumn == null || prevColumn.limit === prevColumn.items.length) {
      alert(
        "You exceeded the limit of tasks in this column or there are no more columns to move to."
      );
      setPrevIsDisabled(true);
      return null;
    } else {
      setPrevIsDisabled(false);
    }

    const newState = storedData.map((column) => {
      if (column.id === idColumnCurrent) {
        const newItems = column.items.filter((item) => item.id !== task.id);
        return { ...column, items: newItems };
      }
      return column;
    });
    const newState2 = newState.map((column, index) => {
      if (nextIndex === index) {
        return { ...column, items: [...column.items, task] };
      }
      return column;
    });
    setSavedData(newState2);
  };

  const addTask = (author, taskName) => {
    const [firstColumn] = storedData;
    if (firstColumn.limit === firstColumn.items.length) {
      alert("You exedeed the limit of task in this column");
      return null;
    }
    const newState = storedData.map((column, index) => {
      if (index === 0) {
        return {
          ...column,
          items: [
            ...column.items,
            { author: author, taskName: taskName, id: uuid() },
          ],
        };
      }
      return column;
    });
    setSavedData(newState);
  };

  const deleteTask = (idColumnCurrent, task) => {
    const newState = storedData.map((column) => {
      if (column.id === idColumnCurrent) {
        const newItems = column.items.filter((item) => item.id !== task.id);
        return { ...column, items: newItems };
      }
      return column;
    });
    setSavedData(newState);
  };

  function renderColumns() {
    return storedData.map((column) => {
      return (
        <Column
          title={column.title}
          items={column.items}
          limit={column.limit}
          id={column.id}
        />
      );
    });
  }

  return (
    <>
      <TasksContext.Provider
        value={{
          storedData,
          addTask,
          moveNext,
          movePrev,
          deleteTask,
          nextIsDisabled,
          prevIsDisabled,
        }}
      >
        <div className="kanban__title">KANBAN BOARD</div>
        <div className="kanban">{renderColumns()}</div>
        <TaskForm />
      </TasksContext.Provider>
    </>
  );
}
export default Kanban;
