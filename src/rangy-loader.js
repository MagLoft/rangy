const core = require('./core/core')
const dom = require('./core/dom')
const domrange = require('./core/domrange')
const wrappedrange = require('./core/wrappedrange')
const wrappedselection = require('./core/wrappedselection')

module.exports = function(window, document, modules = []) {
  const rangy = core(window, document)
  dom(rangy, window, document)
  domrange(rangy, window, document)
  wrappedrange(rangy, window, document)
  wrappedselection(rangy, window, document)
  for (const module of modules) {
    module(rangy, window, document)
  }
  rangy.init()
  return rangy
}
