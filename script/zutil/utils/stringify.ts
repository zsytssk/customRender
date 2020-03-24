export function stringify(obj: any, deep: number = 0, indent = 1) {
  if (deep === 0 || deep < 0) {
    return jsonStringify(obj);
  }

  if (obj instanceof Array) {
    return stringifyArray(obj, deep, indent);
  } else if (typeof obj === "object") {
    return stringifyObject(obj, deep, indent);
  } else {
    return jsonStringify(obj);
  }
}

function stringifyArray(array: any[], deep: number, indent = 1) {
  if (deep === 0) {
    return jsonStringify(array);
  }

  let result = `[\n`;
  const tab = `  `;
  for (let i = 0; i < array.length; i++) {
    result += tab.repeat(indent);
    result += stringify(array[i], deep - 1, indent + 1);

    if (i !== array.length - 1) {
      result += `,`;
    }
    result += `\n`;
  }
  result += tab.repeat(indent - 1);
  result += `]`;
  return result;
}

function stringifyObject(obj: AnyObj, deep: number, indent = 1) {
  if (deep === 0) {
    return jsonStringify(obj);
  }
  let result = `{\n`;
  const tab = `  `;
  indent = indent || 1;

  let keys = Object.keys(obj);
  keys = keys.filter(key => {
    return obj[key] !== undefined;
  });
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const item = obj[key];
    result += tab.repeat(indent);
    result += `"${key}": ${stringify(item, deep - 1, indent + 1)}`;

    if (i !== keys.length - 1) {
      result += `,`;
    }
    result += `\n`;
  }
  result += tab.repeat(indent - 1);
  result += `}`;

  return result;
}

function jsonStringify(o: Object | null) {
  if (o === undefined) {
    o = null;
  }
  return JSON.stringify(o);
}
