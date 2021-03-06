const Store = require("./Store.js");

class MonitorStore extends Store {
  constructor(client) {
    super(client, "monitors");
  }

  run(msg) {
    return Promise.all(this.map((monitor) => monitor._run(msg)));
  }
}

module.exports = MonitorStore;
