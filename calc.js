var answer;
var lastCalc;
var toCalculate;
var helpText =
  "<br><br> ------- <br> F1 - Help! <br> Up - Last Calculation <br> Down - Last Answer <br> F10 - Clear Screen <br>" +
  "Any key - Focus to Input <br>" +
  "------- <br>- * + / ^ <br> sin() cos() pi <br>" +
  "------- <br>& - AND <br> | - OR <br><br>";

const nodeInput = document.getElementById("calcField");
const nodeMemory = document.getElementById("calcMem");
const nodeInfoLine = document.getElementById("infoLine");

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
            nodeInput.value +
            " = " +
            answer +
            "<span class='copy material-icons textRed' style='margin-left:20px;' onclick='geriOku2(" +
            answer +
            ");'>copy_all</span><br>" +
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
    case "F1": // help
      nodeMemory.innerHTML = helpText + nodeMemory.innerHTML;
      break;
    case "Up": // callback last calculation
    case "ArrowUp": // callback last calculation
      nodeInput.value = lastCalc;
      break;
    case "Down": //  return answer
    case "ArrowDown": //  return answer
      nodeInput.value = nodeInput.value + answer;
      break;
    case "F10": // clear all
      nodeMemory.innerHTML = "";
      nodeInput.value = "";
      break;
    default:
      break;
  }
});

// document.querySelector("input").click();

function geriOku2(a) {
  document.getElementById("calcField").value = a;
}
