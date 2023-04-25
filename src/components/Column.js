import React, { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";


function Column(props) {
  const { moveNext, movePrev, deleteTask, prevIsDisabled, nextIsDisabled } =
    useContext(TasksContext);
  const { title, items, limit, id } = props;
  function renderItems() {
    return items.map((item) => {
      return (
        <div className="column__input">
          <div className="input__author"> Resposible: {item.author}</div>
          <div className="input__taskname">Task: {item.taskName}</div>
          <button
            className="input__button--remove"
            onClick={() => deleteTask(id, item)}
          >
            <div>X</div>
          </button>
          <button
            className="input__button--prev"
            disabled={prevIsDisabled}
            onClick={() => movePrev(id, item)}
          >
            Prev
          </button>
          <button
            className="input__button--next"
            disabled={nextIsDisabled}
            onClick={() => moveNext(id, item)}
          >
            Next
          </button>
        </div>
      );
    });
  }
  return (
    <div className="kanban__column">
      <div className="column__title">{title} </div>
      <div className="column__limit">
        {" "}
        ({items.length}/{limit})
      </div>
      <div className="column__items">{renderItems()}</div>
    </div>
  );
}

export default Column;
