$(document).ready(function () {
  retrieveFromLocalStorage();
  
  $("#add-task-form").on("submit", function (e) {
    e.preventDefault();
    const value = $("#add-item").val();
    const timeLog = $("#add-time-log").val();
    const boardId = $("#lane-id").val();

    const task = new TaskModel(value, timeLog, boardId);
    createUI(task);
    saveToLocalStorage(task);

    $("#add-item").val("");
    $("#add-time-log").val("");
    $("#lane-id").val(1)
  });
});

const createUI = (task) => {
  const newTask = $("<div>")
    .addClass("task shadow-sm d-flex py-3 px-3 bg-dark bg-opacity-10 rounded-2 justify-content-between align-items-center")
    .attr("id", task.id)
    .attr("draggable", "true")
    .append(
      $("<h5>")
        .addClass("task-content m-0")
        .text(task.title),
      $("<p>")
        .addClass("badge rounded-pill bg-info m-0")
        .text(task.timelog + "d")
    );

  newTask.on("dragstart", function () {
    $(this).addClass("is-dragging");
  });

  newTask.on("dragend", function () {
    $(this).removeClass("is-dragging");
  });

  switch (task.lane_id) {
    case "1":
      $("#todo-lane").append(newTask);
      break;
    case "2":
      $("#in-progress-lane").append(newTask);
      break;
    case "3":
      $("#in-review-lane").append(newTask);
      break;
    case "4":
      $("#done-lane").append(newTask);
    default:
      break;
  }
}

const saveToLocalStorage = (task) => {
  let tasks = [];
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const retrieveFromLocalStorage = () => {
  if (localStorage.getItem("tasks")) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task) => {
      createUI(task);
    });
  }
}