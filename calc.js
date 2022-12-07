var answer;
var lastCalc;
var toCalculate;
var helpText =
  "<br><br> ------- <br> F1 - Help! <br> F2 - Last Calculation <br> F3 - Memory <br> F4 - Last Answer <br> F10 - Clear Screen <br>" +
  "------- <br>- * + / ^ <br> sin() cos() pi <br>" +
  "------- <br>& - AND <br> | - OR <br><br>";

const nodeInput = document.getElementById("calcField");
const nodeMemory = document.getElementById("calcMem");

// document.getElementById("calcDiv").style.height = screen.availHeight + "px";
// document.getElementById("calcDiv").style.width = screen.availWidth + "px";
// version 0.1 - 6 Dec 2022
nodeMemory.innerHTML = helpText;
nodeInput.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "Enter": // pressing enter does the job
      lastCalc = nodeInput.value;
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
          "<span class='copy material-icons' onclick='geriOku2(" +
          answer +
          ");'>copy_all</span><br>" +
          nodeMemory.innerHTML;
        nodeInput.value = "";
      } catch (error) {
        nodeMemory.innerHTML = nodeInput.value + "<br>" + nodeMemory.innerHTML;
      }
      break;
    case "F1": // help
      nodeMemory.innerHTML = helpText + nodeMemory.innerHTML;
      break;
    case "F2": // callback last calculation
      nodeInput.value = lastCalc;
      break;
    case "ArrowUp": // memory
      nodeInput.value = nodeInput.value + answer;
      break;
    case "F4": // return answer
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

function popUp(a) {
  document.getElementById(a).innerHTML = answer;
  // document.querySelector("input").click();
}
function geriOku(a) {
  document.getElementById("calcField").value =
    document.getElementById(a).innerHTML;
}
function geriOku2(a) {
  document.getElementById("calcField").value = a;
}
