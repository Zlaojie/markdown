let inputFirst = "#"; // 初始标题号
let inputSecond = "*"; // 初始无序列表号
function mdSwitch(event) {
  console.log(inputFirst, inputSecond)
  let title = 0; // 拿到空格前的#符号数，实现标题效果
  let ulList = false; // 实现无序列表效果
  let olList = false; // 实现有序列表效果
  let space = 0; // 实现列表嵌套功能
  if (event.keyCode == "13") { // 如果回车了
    var mdValue = document.getElementById("md-area").value;
    mdValue = mdValue.replace(/[\n]/g, ")") // 把回车符替换成)
    mdValue = mdValue.substr(mdValue.lastIndexOf(')', mdValue.lastIndexOf(')') - 1) + 1); // 拿到倒数第二个)之后的字符串
    mdValue = mdValue.substring(0, mdValue.lastIndexOf(')')) // 删除最后一个)
    let mdArr = mdValue.split(' ')
    for (let char of mdArr[0]) {
      if (char == inputFirst) {
        title++; // 计算#号的数量
      } else if (char == inputSecond) {
        ulList = true;
      } else if (typeof parseInt(char) == 'number') {
        olList = true;
      }
    }
    for (let char of mdArr) {
      if (char == '') {
        space++; // 计算空格数目
      }
    }
    switch (title) { // 判断属于哪个标题
      case 1:
        mdValue = "<h1>" + mdArr[1] + "</h1>";
        break;
      case 2:
        mdValue = "<h2>" + mdArr[1] + "</h2>";
        break;
      case 3:
        mdValue = "<h3>" + mdArr[1] + "</h3>";
        break;
      case 4:
        mdValue = "<h4>" + mdArr[1] + "</h4>";
        break;
    }
    if (ulList) { // 判断是否开启了无序列表效果
      mdValue = "<li>" + mdArr[1] + "</li>"
    } else if (olList) { // 判断是否开启了有序列表效果
      mdValue = "<p>" + mdArr.join(' ') + "</p>"
    }
    if (space >= 3) { // 如果前面有3个空格，证明开启了嵌套列表效果
      if (mdArr[3] == inputSecond) {
        mdValue = "<li " + "class = 'innerList' " + ">" + mdArr.pop() + "</li>"
      } else if (typeof parseInt(mdArr[3]) == 'number') {
        mdValue = "<p " + "class = 'innerList' " + ">" + mdArr.join(' ') + "</p>"
      }
    }
    let showAreaText = document.getElementById("show-area").innerHTML; // 获取它上一次的内容
    showAreaText += mdValue; // 拼接当前新获取的内容
    document.getElementById("show-area").innerHTML = showAreaText; // 之后再把拼接了新字符串的内容设置到innerHTML上
  }

}
// 修改配置的语法
function mdChageFirst(event) {
  inputFirst = document.getElementById("inputFirst").value;
}

function mdChageSecond(event) {
  inputSecond = document.getElementById("inputSecond").value;

}