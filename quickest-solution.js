function resolve(string) {
  try {
    result = eval(string);
    return typeof result == 'number' ? result : 'Error';
  }
  catch {return 'Error'}
}