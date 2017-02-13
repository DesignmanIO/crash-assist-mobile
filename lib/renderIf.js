/**
 * Created by Julian on 2/13/17.
 */
const renderIf = (condition, ifCallback, elseCallback) => {
  return condition ? ifCallback() : (elseCallback && elseCallback());
};

export default renderIf;

