import * as _ from 'lodash';

interface StackItem {
    line: number
    column: number
    filename: string
}

export interface ErrorMessage {
  message: string
  stack: StackItem[]
}

export function parseError(err: Error): ErrorMessage {
  // implement
  if (!_.isError(err)) {
      throw new Error('err is not an Error.');
  }
  const stack: StackItem[] = [];
  const stackRegExp: RegExp = /.*(http.+)\:(\d+)\:(\d+)$/;
  const stackToBeParsed: string[] = (err.stack || '').split('\n').slice(1);

  stackToBeParsed.forEach((info: string) => {
    const matches = info.match(stackRegExp);
    if (matches) {
      stack.push({
        line: parseInt(matches[2], 10),
        column: parseInt(matches[3], 10),
        filename: matches[1]
      });
    }
  });

  return {
    message: err.message,
    stack
  };
}
