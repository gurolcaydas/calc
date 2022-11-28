var answer;
var lastCalc;
var toCalculate;
var helpText =
  "\n \n ------- \nF1 - Help! \n F2 - Last Calculation \n F4 - Last Answer \n F12 - Clear Screen \n";

const nodeInput = document.getElementById("calcField");
const nodeTape = document.getElementById("calcTape");

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
      nodeTape.innerHTML = helpText + "\n ------- \n" + nodeTape.innerHTML;
      nodeInput.value = "";
      break;
    case "F2": // callback last calculation
      nodeInput.value = lastCalc;
      break;
    case "F4": // return answer
      nodeInput.value = answer;
      break;
    case "F12": // clear all
      nodeTape.innerHTML = "";
      nodeInput.value = "";
      break;
    default:
      break;
  }
});
