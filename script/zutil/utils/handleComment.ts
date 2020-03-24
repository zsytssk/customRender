import * as fs from "fs";
import * as path from "path";
import { walk } from "../ls/walk";

function handleComment(folder: string, type: string) {
  return new Promise(async (resolve, reject) => {
    const files = await walk(folder);

    for (const file of files) {
      let coment_type = "uncomment";
      if (type === "clear_test") {
        coment_type = "comment";
      }

      let complete_num = 0;
      handleCommentFile(file, coment_type).then(() => {
        complete_num++;
        if (complete_num === files.length) {
          resolve();
        }
      });
    }
  });
}

function handleCommentFile(file: string, type = "comment") {
  return new Promise((resolve, reject) => {
    file = path.resolve(file);
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }

      const result_data = analysisTest(data, type);

      if (!result_data) {
        return resolve();
      }

      fs.writeFile(file, result_data, err2 => {
        if (err2) {
          return reject(err2);
        }
        resolve();
      });
    });
  });
}

function analysisTest(data: string, type: string) {
  const regx_use = /@test/gi;
  const match_list = data.match(regx_use);

  const match_list_pos = [];
  let test_str = data;
  if (!match_list) {
    return;
  }

  for (const match of match_list) {
    const begin_pos: number = match_list_pos.length
      ? match_list_pos[match_list_pos.length - 1] + match.length
      : 0;
    const match_pos = test_str.search(regx_use);
    match_list_pos.push(begin_pos + match_pos);
    test_str = test_str.slice(match_pos + match.length);
  }

  let result_data = data;
  for (let len = match_list_pos.length, i = len - 1; i >= 0; i--) {
    const { test_type, num } = getTestType(data, match_list_pos[i]);
    const line = getPos(data, match_list_pos[i]).line;
    if (test_type === "cur_line") {
      if (type === "comment") {
        result_data = commentLine(result_data, line);
      } else {
        result_data = unCommentLine(result_data, line);
      }
      continue;
    } else {
      if (type === "comment") {
        result_data = commentLine(result_data, line + 1, num);
      } else {
        result_data = unCommentLine(result_data, line + 1, num);
      }
    }
  }

  return result_data;
}

function getLineRange(data: string, line_num: number): [number, number] {
  const lines_arr = data.split("\n");
  let begin = 0;
  for (let i = 0; i < line_num; i++) {
    begin += lines_arr[i].length + 1;
  }
  const end = begin + lines_arr[line_num].length;
  return [begin, end];
}

function getPos(data: string, num: number) {
  const before_str = data.slice(0, num);
  const before_lines = before_str.split("\n");

  const line = before_lines.length - 1;
  const column = before_lines[before_lines.length - 1].length;

  return {
    column,
    line
  };
}

function getTestType(data: string, pos: number) {
  const line_range = getLineRange(data, getPos(data, pos).line);
  const line_str = getRangeStr(data, line_range);
  const cur_line_reg = /\/\/\s*@test\s*$/;

  const next_line_reg = /\/\*\*\s*@test(\d*)\s*\*\/$/;
  let test_type;
  let num: number | undefined;
  if (cur_line_reg.test(line_str)) {
    test_type = "cur_line";
  } else {
    const match = line_str.match(next_line_reg);
    if (match) {
      test_type = "next_line";
      num = Number(match[1]);
    }
  }
  return {
    num,
    test_type
  };
}
function getRangeStr(str: string, range: [number, number]) {
  return str.slice(range[0], range[1]);
}

function commentLine(data: string, line_num: number, mul?: number) {
  let result_data = data;
  mul = mul || 1;

  for (let i = mul - 1; i >= 0; i--) {
    const cur_line = line_num + i;
    const line_range = getLineRange(data, cur_line);
    const line_str = getRangeStr(data, line_range);
    if (isEmpty(line_str)) {
      continue;
    }
    if (hasComment(line_str)) {
      continue;
    }
    const space_len = findLineBeforeSpace(data, cur_line).length;
    const inject_pos = line_range[0] + space_len;
    result_data = [
      result_data.slice(0, inject_pos),
      "// ",
      result_data.slice(inject_pos)
    ].join("");
  }
  return result_data;
}

function unCommentLine(data: string, line_num: number, mul?: number) {
  let result_data = data;
  mul = mul || 1;
  for (let i = mul - 1; i >= 0; i--) {
    const cur_line = line_num + i;
    const line_range = getLineRange(data, cur_line);
    let line_str = getRangeStr(data, line_range);
    const space_str = findLineBeforeSpace(data, cur_line);
    line_str = line_str.replace(/^(\s*)(\/\/\s*)+/, space_str);
    result_data = [
      result_data.slice(0, line_range[0]),
      line_str,
      result_data.slice(line_range[1])
    ].join("");
  }
  return result_data;
}

function hasComment(str: string) {
  const match = str.match(/^(\s*)(\/\/\s*)+/);
  if (!match) {
    return false;
  }
  return true;
}

function findLineBeforeSpace(data: string, line_num: number) {
  const line_range = getLineRange(data, line_num);
  const line_str = getRangeStr(data, line_range);
  const space_reg = /\s*/;
  const space_match = line_str.match(space_reg);
  return space_match ? space_match[0] : "";
}
function isEmpty(str: string) {
  return /^\s*$/.test(str);
}

module.exports = handleComment;
