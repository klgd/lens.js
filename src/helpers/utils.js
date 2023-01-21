const flowRight = (...functions) => input => functions.reduceRight(
  (input, fn) => fn(input),
  input
)

const deepMerge = (obj1, obj2) => {
  let key;
  for (key in obj2) {
    // ���target(Ҳ����obj1[key])���ڣ����Ƕ���Ļ���ȥ����deepMerge���������obj1[key]����û���������Ҫ��obj2[key]�ϲ�
    // ���obj2[key]û��ֵ����ֵ���Ƕ��󣬴�ʱֱ���滻obj1[key]
    obj1[key] = 
      obj1[key] &&
      obj1[key].toString() === "[object Object]" &&
      (obj2[key] && obj2[key].toString() === "[object Object]")
        ? deepMerge(obj1[key], obj2[key])
        : (obj1[key] = obj2[key]);
  }
  return obj1;
}

module.exports = {
  flowRight,
  deepMerge
}