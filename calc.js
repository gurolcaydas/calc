var answer;
var lastCalc;
var toCalculate;
const node = document.getElementById("calcField");
node.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    toCalculate = document.getElementById("calcField").value;
    toCalculate = toCalculate.replace("^", "**");
    toCalculate = toCalculate.replace("sin(", "Math.sin((Math.PI/180)*");
    toCalculate = toCalculate.replace("cos(", "Math.cos((Math.PI/180)*");
    toCalculate = toCalculate.replace("pi", "Math.PI");
    answer = eval(toCalculate);
    document.getElementById("calcTape").innerHTML =
      document.getElementById("calcField").value +
      " = " +
      answer +
      "\n" +
      document.getElementById("calcTape").innerHTML;
    lastCalc = document.getElementById("calcField").value;
    document.getElementById("calcField").value = "";
  }
  switch (event.key) {
    case "w":
      document.getElementById("calcField").value =
        document.getElementById("calcField").value.replace("w", "") + answer;
      break;
    case "q":
      document.getElementById("calcField").value = toCalculate;
      break;
    case "C":
      document.getElementById("calcTape").innerHTML = "";
      document.getElementById("calcField").value = "";
      break;
    case "?":
      document.getElementById("calcTape").innerHTML = "Help!";
      document.getElementById("calcField").value = "";
      break;
    default:
      break;
  }
  //   if (event.key === "a") {
  //     document.getElementById("calcField").value =
  //       document.getElementById("calcField").value.replace("a", "") + answer;
  //   }
  //   if (event.key === "q") {
  //     document.getElementById("calcField").value = toCalculate;
  //   }
});
