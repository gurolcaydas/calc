var answer;
var lastAnswer;
var lastCalc;
var toCalculate;
var renk;
var helpText =
  "<table class='mini textRed'><tr><td>" +
  " ? - <b>Help!</b> <br> ↑ - Last Calculation <br> ↓ - Last Answer <br> esc - Clear Screen <br>" +
  " Any key - Focus to Input <br> Click on the Answer - Call back </td>" +
  "<td> - * + / <br> % - remain <br> sin() <br> cos() <br> pi </td>" +
  "<td> != == <br> & - AND <br> | - OR </td>" +
  "<td> int - Integer <br> fix2 - 2 digit decimal <br> sqr - Square Root <br> minus <br> ** - power</td></tr></table>";

const nodeInput = document.getElementById("calcField");
const nodeMemory = document.getElementById("calcMem");
const nodeInfoLine = document.getElementById("infoLine");

nodeInput.focus();
// document.getElementById("calcDiv").style.height = screen.availHeight + "px";
// document.getElementById("calcDiv").style.width = screen.availWidth + "px";
// version 0.1 - 8 Dec 2022
nodeMemory.innerHTML = helpText;
window.addEventListener("keyup", function (event) {
  if (nodeInput.focus() == false) {
    nodeInput.focus();
  }

  switch (event.key) {
    case "Enter": // pressing enter does the job
      // case "=":
      lastAnswer = answer;
      lastCalc = nodeInput.value;
      if (lastCalc !== "") {
        toCalculate = lastCalc;
        // toCalculate = toCalculate.replace("^", "**");
        toCalculate = toCalculate.replace("sin(", "Math.sin((Math.PI/180)*");
        toCalculate = toCalculate.replace("cos(", "Math.cos((Math.PI/180)*");
        toCalculate = toCalculate.replace("pi", "Math.PI");
        try {
          answer = eval(toCalculate);
          nodeMemory.innerHTML =
            hesapYaz(lastCalc) + sonucYaz(answer) + nodeMemory.innerHTML;
        } catch (error) {
          switch (lastCalc.toLowerCase()) {
            case "komut":
              nodeInfoLine.innerHTML = "Komut";
              break;

            case "int":
              // nodeInfoLine.innerHTML = lastAnswer;

              answer = Math.trunc(lastAnswer);

              nodeMemory.innerHTML =
                "int " +
                hesapYaz(lastAnswer) +
                sonucYaz(answer) +
                nodeMemory.innerHTML;
              break;
            case "sqr":
              answer = Math.sqrt(lastAnswer);
              nodeMemory.innerHTML =
                "&Sqrt; " +
                hesapYaz(lastAnswer) +
                sonucYaz(answer) +
                nodeMemory.innerHTML;
              break;
            case "fix2":
              answer = lastAnswer.toFixed(2);
              nodeMemory.innerHTML =
                "2 digit decimal " +
                hesapYaz(lastAnswer) +
                sonucYaz(answer) +
                nodeMemory.innerHTML;
              break;
            case "minus":
              answer = -1 * lastAnswer;
              nodeMemory.innerHTML = sonucYaz(answer) + nodeMemory.innerHTML;
              break;

            default:
              nodeMemory.innerHTML =
                nodeInput.value + "<br>" + nodeMemory.innerHTML;
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
    case "/":
      if (nodeInput.value === "/" && answer !== undefined) {
        nodeInput.value = answer + "/";
      }
      break;
    case "*":
      if (nodeInput.value === "*" && answer !== undefined) {
        nodeInput.value = answer + "*";
      }
      break;
    case "+":
      if (nodeInput.value === "+" && answer !== undefined) {
        nodeInput.value = answer + "+";
      }
      break;
    case "-":
      if (nodeInput.value === "-" && answer !== undefined) {
        nodeInput.value = answer + "-";
      }
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
function sonucYaz(a) {
  if (a < 0) {
    renk = "textBrown";
  } else {
    renk = "textBlue";
  }
  return (
    "<span class='copy " +
    renk +
    "' style='margin-left:10px; font-size:1.2em;' onclick='geriOku(" +
    a +
    ");'> " +
    a +
    "</span><br>"
  );
}

function hesapYaz(a) {
  return (
    "<span class='copy textGrey' style='margin-left:10px; font-size:1em;' onclick='geriOku(`" +
    a +
    "`);'> " +
    a +
    " = </span>"
  );
}
