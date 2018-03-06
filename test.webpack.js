function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
var modules = requireAll(require.context("./test", true, /.+\.spec\.jsx?$/));
module.exports = modules