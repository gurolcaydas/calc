var calcResult, lastCalc, toCalculate, lastAnswer, answer;
var helpText =
   "<table class='mini textRed'><tr><td>" +
   " ? - <b>Help!</b> <br> ↑ - Last Calculation <br> ↓ - Last Answer <br> esc - Clear Screen <br>" +
   " Any key - Focus to Input <br> Click on the Answer - Call back </td>" +
   "<td> - * + / <br> % - remain <br> sin() <br> cos() <br> pi </td>" +
   "<td> != == <br> & - AND <br> | - OR </td>" +
   "<td> int - Integer <br> fix2 - 2 digit decimal <br> sqr - Square Root <br> neg - negative <br> ** - power</td></tr></table>";

$("#calcMem").html(helpText);
$("#calcField").focus();
$(document).keyup(function (e) {
   lastAnswer = answer;
   $("#infoLine").html(e.key);
   if ($("#calcField").focus() == false) {
      $("#calcField").focus();
   }

   switch (e.key) {
      case "Enter":
         lastCalc = $("#calcField").val();
         toCalculate = lastCalc;
         toCalculate = toCalculate.replace("sin(", "Math.sin((Math.PI/180)*");
         toCalculate = toCalculate.replace("cos(", "Math.cos((Math.PI/180)*");
         toCalculate = toCalculate.replace("pi", "Math.PI");

         try {
            calcResult = eval(toCalculate);
            $("#calcField").val("");
            $("#calcMem").html(
               hesapYaz(lastCalc) + sonucYaz(calcResult) + $("#calcMem").html()
            );
            answer = calcResult;
         } catch (error) {
            calcResult = $("#calcField").val();
            switch (calcResult) {
               case "int":
                  calcResult = Math.trunc(lastAnswer);
                  lastCalc = answer = calcResult;
                  break;
               case "fix2":
                  calcResult = lastAnswer.toFixed(2);
                  lastCalc = answer = calcResult;
                  break;
               case "neg":
               case "negative":
               case "minus":
                  calcResult = -1 * lastAnswer;
                  lastCalc = answer = calcResult;
                  break;
               case "sqr":
                  if (answer > 0) {
                     calcResult = Math.sqrt(lastAnswer);
                     lastCalc = answer = calcResult;
                  } else {
                     $("#infoLine").html("no &Sqrt; for negative numbers");
                  }

                  break;
               default:
                  break;
            }
            $("#calcField").val("");
            $("#calcMem").html(sonucYaz(calcResult) + $("#calcMem").html());
         }
         break;

      case "Escape":
         $("#calcMem").html("");
         break;
      case "?": // help
         $("#calcMem").html(helpText + $("#calcMem").html());
         $("#calcField").val("");
         break;
      case "Up": // callback last calculation
      case "ArrowUp": // callback last calculation
         $("#calcField").val(lastCalc);
         break;
      case "Down": //  return answer
      case "ArrowDown": //  return answer
         $("#calcField").val(answer);
         break;

      case "-": // empty field call previous answer
         if ($("#calcField").val() == "-") {
            $("#calcField").val(lastAnswer + "-");
         }
      case "*":
         if ($("#calcField").val() == "*") {
            $("#calcField").val(lastAnswer + "*");
         }
      case "/":
         if ($("#calcField").val() == "/") {
            $("#calcField").val(lastAnswer + "/");
         }
      case "+":
         if ($("#calcField").val() == "+") {
            $("#calcField").val(lastAnswer + "+");
         }
         break;
      default:
         break;
   }
});

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
function geriOku(a) {
   $("#calcField").val(a);
   $("#calcField").focus();
}
