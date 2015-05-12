module.exports = (runner) ->
  logJson = (toLog) -> console.log JSON.stringify toLog
  currentSuite = []
  runner.on "start", ->
    logJson {type: "start", total: runner.total}

  runner.on "suite", (suite) ->
    if suite.title
      currentSuite.push suite.title
  runner.on "suite end", () ->
    currentSuite.pop()
  runner.on "pending", (test) ->
    logJson {type: "pending",fullTitle: test.fullTitle(), title: test.title, suite: currentSuite}
  runner.on "pass", (test) ->
    logJson {type: "pass", title: test.title,fullTitle: test.fullTitle(), suite: currentSuite, duration: test.duration.toString()}
  runner.on "fail", (test, err) ->
    logJson {type: "fail", title: test.title,fullTitle: test.fullTitle(), suite: currentSuite, duration: test.duration, err: err.stack}
  runner.on "end", () ->
    logJson {type:"end"}
