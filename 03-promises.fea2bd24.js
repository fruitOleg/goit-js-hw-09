!function(){var e={firstDelay:document.querySelector("#delay"),step:document.querySelector("#step"),amount:document.querySelector("#amount"),createBtn:document.querySelector(".createBtn"),form:document.querySelector(".form")};function t(e,t){var n={position:e,delay:t},o=Math.random()>.3;return new Promise((function(e,t){setTimeout((function(){o?e(n):t(n)}),2e3)}))}e.form.addEventListener("submit",function(n){n.prevent.default();for(var o=parseInt(e.amount.value),r=Number(e.step.value),c=Number(e.firstDelay.value),u=o;u<=o;u+=1)t(u,c).then((function(e){var t=e.position,n=e.delay;Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;Notify.failure("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))})),c+=r}())}();
//# sourceMappingURL=03-promises.fea2bd24.js.map