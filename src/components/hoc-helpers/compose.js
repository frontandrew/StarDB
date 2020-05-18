const compose = (...funcs) => (component) => {
  return funcs.reduceRight((prevRes, func) => func(prevRes), component);
}

export default compose;