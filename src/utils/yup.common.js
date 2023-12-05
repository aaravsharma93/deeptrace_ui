export function getValidationErrors({
  schema,
  state,
  abortEarly = false,
  ...otherParams
}) {
  try {
    schema.validateSync(state, { abortEarly, ...otherParams });
    return {};
  } catch (data) {
    let errorMap = {
        latest: "",
        details: {},
        total: 0
    };
    data &&
        data.inner &&
        data.inner.forEach(innerError => {
            errorMap.details[innerError.path] = innerError.message;
        });
    errorMap.total = data?.errors?.length;
    errorMap.latest = data?.errors?.[0];
    return errorMap;
  }
}
