var answer;
var lastCalc;
var toCalculate;
var helpText =
  "<br><br> ------- <br> ? - Help! <br> Up - Last Calculation <br> Down - Last Answer <br> ESC - Clear Screen <br>" +
  "Any key - Focus to Input <br>" +
  "Click on any number - Call back <br>" +
  "------- <br>- * + / ^ <br> sin() cos() pi <br>" +
  "------- <br>& - AND <br> | - OR <br><br>";

const nodeInput = document.getElementById("calcField");
const nodeMemory = document.getElementById("calcMem");
const nodeInfoLine = document.getElementById("infoLine");
nodeInput.focus();
// document.getElementById("calcDiv").style.height = screen.availHeight + "px";
// document.getElementById("calcDiv").style.width = screen.availWidth + "px";
// version 0.1 - 6 Dec 2022
nodeMemory.innerHTML = helpText;
window.addEventListener("keyup", function (event) {
  if (nodeInput.focus() == false) {
    nodeInput.focus();
  }

  switch (event.key) {
    case "Enter": // pressing enter does the job
      // case "=":
      lastCalc = nodeInput.value;
      if (lastCalc !== "") {
        toCalculate = lastCalc;
        toCalculate = toCalculate.replace("^", "**");
        toCalculate = toCalculate.replace("sin(", "Math.sin((Math.PI/180)*");
        toCalculate = toCalculate.replace("cos(", "Math.cos((Math.PI/180)*");
        toCalculate = toCalculate.replace("pi", "Math.PI");
        try {
          answer = eval(toCalculate);
          nodeMemory.innerHTML =
            "<span class='copy textGrey' style='margin-left:20px;' onclick='geriOku(`" +
            lastCalc +
            "`);'>" +
            lastCalc +
            " = " +
            "</span> " +
            "<span class='copy textBrown' style='margin-left:10px; font-size:1.2em;' onclick='geriOku(" +
            answer +
            ");'> " +
            answer +
            "</span><br>" +
            nodeMemory.innerHTML;
        } catch (error) {
          nodeMemory.innerHTML =
            nodeInput.value + "<br>" + nodeMemory.innerHTML;
          switch (lastCalc.toLowerCase()) {
            case "komut":
              nodeInfoLine.innerHTML = "Komut";
              break;

            default:
              break;
          }
        }
        nodeInput.value = "";
      }
      break;
    case "?": // help
      nodeMemory.innerHTML = helpText + nodeMemory.innerHTML;
      nodeInput.value = "";
      break;
    case "Up": // callback last calculation
    case "ArrowUp": // callback last calculation
      nodeInput.value = lastCalc;
      break;
    case "Down": //  return answer
    case "ArrowDown": //  return answer
      nodeInput.value = nodeInput.value + answer;
      break;
    case "Escape": // clear all
      nodeMemory.innerHTML = "";
      nodeInput.value = "";
      break;
    default:
      break;
  }
});

// document.querySelector("input").click();

function geriOku(a) {
  nodeInput.value = a;
  nodeInput.focus();
}
