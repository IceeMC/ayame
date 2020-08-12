const { Inhibitor } = require("ayame");

class OwnerInhibitor extends Inhibitor {
  async run(msg, command) {
    if(command.ownerOnly && !this.client.isOwner(msg.author))
      return msg.locale.t("INHIBITOR_OWNER_ONLY");
  }
}

module.exports = OwnerInhibitor;
