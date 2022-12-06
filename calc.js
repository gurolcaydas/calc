var answer;
var lastCalc;
var toCalculate;
var helpText =
  "\n\n ------- \n F1 - Help! \n F2 - Last Calculation \n F4 - Last Answer \n F10 - Clear Screen \n" +
  "------- \n- * + / ^ \n sin() cos() pi \n" +
  "------- \n& - AND \n | - OR \n\n";

const nodeInput = document.getElementById("calcField");
const nodeTape = document.getElementById("calcTape");

// document.getElementById("calcDiv").style.height = screen.availHeight + "px";
// document.getElementById("calcDiv").style.width = screen.availWidth + "px";
// version 0.1 - 30 Nov 2022 OK!!
nodeTape.innerHTML = helpText;
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
        nodeTape.innerHTML =
          nodeInput.value + " = " + answer + "\n" + nodeTape.innerHTML;
        nodeInput.value = "";
      } catch (error) {
        nodeTape.innerHTML = nodeInput.value + "\n" + nodeTape.innerHTML;
      }
      break;
    case "F1": // help
      nodeTape.innerHTML = helpText + nodeTape.innerHTML;
      break;
    case "F2": // callback last calculation
      nodeInput.value = lastCalc;
      break;
    case "F4": // return answer
      nodeInput.value = nodeInput.value + answer;
      break;
    case "F10": // clear all
      nodeTape.innerHTML = "";
      nodeInput.value = "";
      break;
    default:
      break;
  }
});

function popUp() {
  document.getElementById("calcNotes").innerHTML="Oh!";
}
