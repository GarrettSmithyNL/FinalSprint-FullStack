const Log = require("../services/Mongo/M.log");
const getLogs = require("../services/Mongo/M.log").getLogs;
const getErrorLogs = require("../services/Mongo/M.errorLog").getErrorLogs;
const getSearchLogs = require("../services/Mongo/M.searchLog").getSearchLogs;
async function getMongoLogs() {
  return await getLogs();
}

async function getSearchLog() {
  return await getSearchLogs();
}

async function getErrorLog() {
  return await getErrorLogs();
}

module.exports = { getMongoLogs, getSearchLog, getErrorLog };
