$(document).ready(function () {
  $(".task").each(function () {
    $(this).on("dragstart", function () {
      $(this).addClass("is-dragging");
    });
    $(this).on("dragend", function () {
      $(this).removeClass("is-dragging");
    });
  });

  $(".lane").on("dragover", function (e) {
    e.preventDefault();

    const mouseY = e.clientY;
    const bottomTask = insertAboveTask($(this), mouseY);
    const curTask = $(".is-dragging")[0];

    if (!bottomTask) {
      $(this).append(curTask);
      const taskId = $(curTask).attr("id");
      const laneId = $(this).attr("id");
      updateLocalStorage(taskId, laneId);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.find(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.each(function () {
    const { top } = this.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = this;
    }
  });

  return closestTask;
};

const updateLocalStorage = (taskId, laneId) => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const index = tasks.findIndex((t) => t.id === taskId);
  const task = tasks[index];
  task.lane_id = convertLaneId(laneId);
  tasks[index] = task;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const convertLaneId = (laneId) => {
  switch (laneId) {
    case "todo-lane":
      return "1";
    case "in-progress-lane":
      return "2";
    case "in-review-lane":
      return "3";
    case "done-lane":
      return "4";
    default:
      return "1";
  }
}