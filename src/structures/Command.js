const { Permissions } = require("discord.js");
const Piece = require("./Piece.js");
const path = require("path");
const Utils = require("../utils/Utils.js");

/**
 * Command represents a runnable command.
 */
class Command extends Piece {
  constructor(client, store, file, options = {}) {
    super(client, store, file, options);

    this.description = options.description || "No Description Provided.";
    this.extendedHelp = options.extendedHelp || "No extended help provided.";
    this.ownerOnly = options.ownerOnly || false;
    this.aliases = options.aliases || [];
    this.cooldown = options.cooldown || 0;
    this.nsfw = options.nsfw || false;
    // File path is like general/ping.js we split by / and take general title-cased if not provided.
    this.category = options.category || Utils.toProperCase(file.path.split(path.sep)[0]) || "General";
    this.guildOnly = options.guildOnly || false;
    this.hidden = options.hidden || false;
    this.usage = options.usage || this.name;

    // Permissions
    this.botPermissions = new Permissions(options.botPermissions || []).freeze();
    this.userPermissions = new Permissions(options.userPermissions || []).freeze();
  }

  async _run(ctx, args) {
    try {
      // Run the check function first.
      const check = await this.check(ctx, args);

      // If the value is falsy, silently fail.
      if(!check) return;

      // If the value is a string reply it to the user.
      if(typeof check === "string") return ctx.reply(check);

      // Run the command.
      const results = await this.run(ctx, args);

      // If the results is a string reply it to the user.
      if(typeof results === "string") return ctx.reply(results);
    } catch(err) {
      if(typeof err === "string") return ctx.reply(err);

      // Forward errors to commandError event.
      this.client.emit("commandError", ctx, err);
    }
  }
 
  /**
   * Executed before the command is ran.
   * The return value can be either true/false or a string.
   * Incase of false the command won't run.
   * Incase of string the command won't run but the string is sent to the channel.
   * Incase of true the command is ran as normal.
   */
  async check(ctx, args) { // eslint-disable-line no-unused-vars
    return true;
  }

  /**
   * The actual command implementation, must be implemented in a subclass.
   * @abstract
   */
  async run(ctx, args) { // eslint-disable-line no-unused-vars
    return ctx.reply(`${this.constructor.name} does not provide a \`run()\` implementation.`);
  } 
}

module.exports = Command;
