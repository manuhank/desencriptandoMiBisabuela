module.exports = function combineArrays([head, ...[headTail, ...tailTail]]) {
  if (!headTail) return head;

  const combined = headTail.reduce(
    (acc, x) =>
      acc.concat(
        head.map((h) => (Array.isArray(h) ? [...h, [x]] : [[h], [x]]))
      ),
    []
  );

  return combineArrays([combined, ...tailTail]);
};
