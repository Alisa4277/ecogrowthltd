/* =========================================================
   ECOGROWTH LTD — Pricing Calculator
   NOTE: rates below are placeholder estimation figures only.
   In production, replace this client-side rate table with a
   PHP/MySQL endpoint (e.g. api/estimate.php) that reads from
   the `pricing` table so figures stay editable from the admin.
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('pricingCalculator');
  if (!form) return;

  const lengthInput = document.getElementById('calc-length');
  const widthInput = document.getElementById('calc-width');
  const typeSelect = document.getElementById('calc-type');
  const shadeSelect = document.getElementById('calc-shade');
  const installCheckbox = document.getElementById('calc-install');
  const output = document.getElementById('calc-output');
  const INSTALL_RATE_PER_SQM = 150;

  function formatKES(value) {
    return 'KSh ' + Math.round(value).toLocaleString('en-KE');
  }

  function calculate() {
    const length = parseFloat(lengthInput.value) || 0;
    const width = parseFloat(widthInput.value) || 0;
    const area = length * width;

    const typeRate = parseFloat(typeSelect.selectedOptions[0].dataset.rate) || 0;
    const shadeRate = parseFloat(shadeSelect.value) || 0;

    let total = area * (typeRate + shadeRate);
    if (installCheckbox.checked) {
      total += area * INSTALL_RATE_PER_SQM;
    }

    output.textContent = area > 0 ? formatKES(total) : 'KSh 0';
  }

  form.addEventListener('input', calculate);
  form.addEventListener('change', calculate);
  calculate();
});
