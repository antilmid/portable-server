// @dependence: features/handleCondig
const chalk = require("chalk");

module.exports = (normalizeConfig) => {
  return {
    trace: (msg, title = "") => {
      if(normalizeConfig.dontInfo) return ;
      console.log(
        `${chalk.blue(`[trace${title ? `|${title}` : ""}]`)}\t${chalk.gray(
          ` ${msg}`
        )}`
      );
    },
    info: (msg, title = "") => {
      if(normalizeConfig.dontInfo) return ;
      console.log(
        `${chalk.blue(`[info${title ? `|${title}` : ""}]`)}\t${chalk.yellow(
          ` ${msg}`
        )}`
      );
    },
    success: (msg, title = "") => {
      if(normalizeConfig.dontInfo) return ;
      console.log(
        `${chalk.blue(`[succ${title ? `|${title}` : ""}]`)}\t${chalk.green(
          ` ${msg}`
        )}`
      );
    },
    warning: (msg, title = "") => {
      if(normalizeConfig.dontInfo) return ;
      console.log(
        `${chalk.blue(`[warn${title ? `|${title}` : ""}]`)}\t${chalk.red(
          ` ${msg}`
        )}`
      );
    },
    error: (msg, title = "") => {
      if(normalizeConfig.dontInfo) return ;
      console.log(
        `${chalk.blue(`[error${title ? `|${title}` : ""}]`)}\t${chalk.bgRed(chalk.white(
          ` ${msg}`
        ))}`
      );
    },
  };
}
