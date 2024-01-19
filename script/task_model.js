class TaskModel {
  constructor(title, timelog, lane_id) {
    this.id = TaskModel.generateId();
    this.title = title;
    this.timelog = timelog;
    this.lane_id = lane_id;
  }

  static generateId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    return `${timestamp}-${randomNum}`;
  }
}