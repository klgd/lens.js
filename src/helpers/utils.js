const flowRight = (...functions) => input => functions.reduceRight(
  (input, fn) => fn(input),
  input
)

module.exports = {
  flowRight
}