var answer;
var lastCalc;
var toCalculate;
var helpText = "\n \n ------- \nF1 - Help! \n F2 - Last Calculation \n F4 - Last Answer \n F12 - Clear Screen \n";

const node = document.getElementById("calcField");
document.getElementById("calcTape").innerHTML = helpText;
node.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "Enter":  // pressing enter does the job
      lastCalc = document.getElementById("calcField").value;
      toCalculate = lastCalc;
      toCalculate = toCalculate.replace("^", "**");
      toCalculate = toCalculate.replace("sin(", "Math.sin((Math.PI/180)*");
      toCalculate = toCalculate.replace("cos(", "Math.cos((Math.PI/180)*");
      toCalculate = toCalculate.replace("pi", "Math.PI");
      try {
      answer = eval(toCalculate);
      document.getElementById("calcTape").innerHTML =
        document.getElementById("calcField").value +
        " = " +
        answer +
        "\n" +
        document.getElementById("calcTape").innerHTML;

      document.getElementById("calcField").value = "";      
      } catch (error) {
        document.getElementById("calcTape").innerHTML =
        document.getElementById("calcField").value+
        "\n"+ document.getElementById("calcTape").innerHTML ;
        
      } 
      break;
    case "F1": // help
      document.getElementById("calcTape").innerHTML = helpText + "\n ------- \n" + document.getElementById("calcTape").innerHTML;
      document.getElementById("calcField").value = "";
      break;
    case "F2": // callback last calculation
      document.getElementById("calcField").value = lastCalc;
      break;      
    case "F4": // return answer
      document.getElementById("calcField").value =
        document.getElementById("calcField").value.replace("F4", "") + answer;
      break;
    case "F12": // clear all
      document.getElementById("calcTape").innerHTML = "";
      document.getElementById("calcField").value = "";
      break;
    default:
      break;
  } 
});
