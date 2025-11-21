var calcResult, lastCalc, lastAnswer, answer;
var justComputed = false; // when true, next digit input should replace the display

var helpText = "Calculator: buttons + keyboard. Press Enter to evaluate.";

$(function () {
   console.log('calc2.js: DOM ready, wiring buttons');
   // initial setup
   $('#calcMem').html('');
   $('#calcField').val('');
   $('#calcField').focus();

   // click handlers for buttons
   $('.buttons').on('click', 'button', function () {
      var $b = $(this);
      console.log('button clicked', $b.text(), $b.data());
      var val = $b.data('value');
      var action = $b.data('action');

      if (val !== undefined) {
         insertAtCursor(val);
         return;
      }
      if (!action) return;

      switch (action) {
         case 'clear':
            $('#calcField').val('');
            break;
         case 'back':
            backspace();
            break;
         case 'percent':
            percent();
            break;
         case 'sqrt':
            applyUnary(Math.sqrt);
            break;
         case 'pow':
            // insert power operator
            insertAtCursor('**');
            break;
         case 'recip':
            applyUnary(function (v) { return 1 / v; });
            break;
         case 'neg':
            toggleSign();
            break;
         case 'int':
            applyUnary(Math.trunc);
            break;
         case 'fix2':
            // format to 2 decimal places
            (function () {
               var $f = $('#calcField');
               var v = $f.val();
               if (!v) return;
               try {
                  var n = safeEval(v);
                  var r = Number(Number(n).toFixed(2));
                  $f.val(String(r));
                  justComputed = true; showComputedIndicator();
               } catch (err) {
                  showError('Invalid');
               }
            })();
            break;
         case 'abs':
            applyUnary(Math.abs);
            break;
         case 'round':
            applyUnary(Math.round);
            break;
         case 'equals':
         case 'ans':
            compute();
            break;
      }
   });

   // keyboard handling (simple)
   $(document).on('keydown', function (e) {
      var key = e.key;
      var targetIsInput = $(e.target).is('input') || $(e.target).is('textarea') || $(e.target).prop('isContentEditable');

      if (key === 'Enter' || key === '=') {
         // if the focused element is the input, let the input's handler run once
         if (targetIsInput) { return; }
         e.preventDefault();
         compute();
         return;
      }
      if (key === 'Escape') { e.preventDefault(); $('#calcField').val(''); return; }
      if (key === 'Backspace') {
         // if not focused on input, handle backspace ourselves
         if (!targetIsInput) { e.preventDefault(); backspace(); }
         return;
      }

      // allow quick typing when the input is not focused: digits, dot, operators and percent
      var allowed = '0123456789.+-*/()%^';
      if (!targetIsInput && allowed.indexOf(key) !== -1) {
         e.preventDefault();
         if (key === '^') insertAtCursor('^'); else insertAtCursor(key);
      }
   });

   // allow Enter inside input
   $('#calcField').on('keydown', function (e) {
      if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); compute(); return; }
      var k = e.key;
      // If the last action produced a result, typing a digit or '.' should start a new value
      if (justComputed) {
         if (/^[0-9]$/.test(k) || k === '.') {
            e.preventDefault();
            // replace content with the typed key
            $(this).val(k);
            justComputed = false;
            hideComputedIndicator();
            // place cursor after the char
            this.setSelectionRange(1,1);
            return;
         }
         // if user types an operator after a computed result, continue calculation
         if (/^[+\-*/^]$/.test(k)) {
            // let the operator be inserted normally, but clear computed flag
            justComputed = false;
            hideComputedIndicator();
            return;
         }
      }
   });

   // Use beforeinput to reliably intercept physical keyboard input (including IME/paste)
   var field = document.getElementById('calcField');
   if (field) {
      field.addEventListener('beforeinput', function (ev) {
         if (!justComputed) return;
         // ev.data may be null for some inputTypes (like deleteContent), only handle insertText
         if (ev.inputType === 'insertText' && ev.data && /^[0-9.]$/.test(ev.data)) {
            ev.preventDefault();
            this.value = ev.data;
            justComputed = false;
            hideComputedIndicator();
            this.setSelectionRange(this.value.length, this.value.length);
         }
      });
   }

});

function insertAtCursor(s) {
   var $f = $('#calcField');
   var val = $f.val();
   var selStart = $f[0].selectionStart || val.length;
   var selEnd = $f[0].selectionEnd || val.length;
   // If we just computed a result, and the user types a digit or dot, replace display
   if (justComputed && (/^[0-9\.]$/.test(s))) {
      $f.val(s);
      var pos = s.length;
      $f[0].setSelectionRange(pos, pos);
      $f.focus();
      justComputed = false;
      return;
   }
   var newVal = val.slice(0, selStart) + s + val.slice(selEnd);
   $f.val(newVal);
   // move cursor after inserted
   var pos = selStart + s.length;
   $f[0].setSelectionRange(pos, pos);
   $f.focus();
   justComputed = false;
}

function backspace() {
   var $f = $('#calcField');
   var val = $f.val();
   var selStart = $f[0].selectionStart || val.length;
   var selEnd = $f[0].selectionEnd || val.length;
   if (selStart !== selEnd) {
      insertAtCursor('');
      return;
   }
   if (selStart === 0) return;
   var newVal = val.slice(0, selStart - 1) + val.slice(selEnd);
   $f.val(newVal);
   var pos = selStart - 1;
   $f[0].setSelectionRange(pos, pos);
   $f.focus();
}

function percent() {
   var $f = $('#calcField');
   var v = $f.val();
   if (!v) return;
   try {
      // simple percent: evaluate current value and divide by 100
      var n = safeEval(v);
      var p = n / 100;
      $f.val(String(p));
         justComputed = true;
   } catch (err) {
      showError('Invalid percent');
   }
}

function toggleSign() {
   var $f = $('#calcField');
   var v = $f.val();
   if (!v) return;
   try {
      var n = safeEval(v);
      n = -1 * Number(n);
      $f.val(String(n));
    // toggling sign should not put the display into "just computed" replacement mode;
    // allow the user to continue editing the current value.
    justComputed = false;
    hideComputedIndicator();
   } catch (err) {
      showError('Invalid');
   }
}

function applyUnary(fn) {
   var $f = $('#calcField');
   var v = $f.val();
   if (!v) return;
   try {
      var n = safeEval(v);
      var r = fn(Number(n));
      if (!isFinite(r)) { showError('Result not finite'); return; }
      $f.val(String(r));
    justComputed = true;
    showComputedIndicator();
   } catch (err) {
      showError('Invalid');
   }
}

function compute() {
   var $f = $('#calcField');
   var expr = $f.val();
   if (!expr) return;
   lastCalc = expr;
   try {
      var cleaned = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/\^/g, '**');
      // expose Math functions: sin, cos, tan, PI etc.
      cleaned = cleaned.replace(/\bpi\b/ig, 'Math.PI');
      cleaned = cleaned.replace(/\bsin\(/ig, 'Math.sin(');
      cleaned = cleaned.replace(/\bcos\(/ig, 'Math.cos(');
      cleaned = cleaned.replace(/\btan\(/ig, 'Math.tan(');

      calcResult = safeEval(cleaned);
      answer = calcResult;
      lastAnswer = answer;
      appendHistory(lastCalc, calcResult);
      $f.val(String(calcResult));
         justComputed = true;
         showComputedIndicator();
   } catch (err) {
      showError('Error');
   }
}

   function showComputedIndicator() {
      $('.display-wrapper').addClass('computed');
   }

   function hideComputedIndicator() {
      $('.display-wrapper').removeClass('computed');
   }

function appendHistory(expr, res) {
   var out = "<div>" + escapeHtml(expr) + " = <span class='textBlue copy' onclick=geriOku('" + escapeAttr(expr) + "')>" + String(res) + "</span></div>";
   $('#calcMem').prepend(out);
}

function showError(msg) {
   var prev = $('#calcMem').html();
   $('#calcMem').html('<div class="textRed">' + msg + '</div>' + prev);
}

function safeEval(src) {
   // Very small wrapper around eval. We keep it simple for this demo.
   // Replace repeated ** occurrences for safety in older engines handled by browser.
   return Function('return (' + src + ')')();
}

function escapeHtml(s) {
   return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function escapeAttr(s) {
   return String(s).replace(/'/g,"\\'");
}

function geriOku(a) {
   $('#calcField').val(a);
   $('#calcField').focus();
}

