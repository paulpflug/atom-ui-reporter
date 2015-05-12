// Generated by CoffeeScript 1.9.2
(function() {
  module.exports = function(runner) {
    var currentSuite, logJson;
    logJson = function(toLog) {
      return console.log(JSON.stringify(toLog));
    };
    currentSuite = [];
    runner.on("start", function() {
      return logJson({
        type: "start",
        total: runner.total
      });
    });
    runner.on("suite", function(suite) {
      if (suite.title) {
        return currentSuite.push(suite.title);
      }
    });
    runner.on("suite end", function() {
      return currentSuite.pop();
    });
    runner.on("pending", function(test) {
      return logJson({
        type: "pending",
        fullTitle: test.fullTitle(),
        title: test.title,
        suite: currentSuite
      });
    });
    runner.on("pass", function(test) {
      return logJson({
        type: "pass",
        title: test.title,
        fullTitle: test.fullTitle(),
        suite: currentSuite,
        duration: test.duration.toString()
      });
    });
    runner.on("fail", function(test, err) {
      return logJson({
        type: "fail",
        title: test.title,
        fullTitle: test.fullTitle(),
        suite: currentSuite,
        duration: test.duration,
        err: err.stack
      });
    });
    return runner.on("end", function() {
      return logJson({
        type: "end"
      });
    });
  };

}).call(this);
