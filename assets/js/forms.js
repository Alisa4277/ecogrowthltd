/* =========================================================
   ECOGROWTH LTD — Form handling
   Sends both quote and contact submissions to Web3Forms.
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {

  const ACCESS_KEY = 'f0cb8ca7-91a5-485c-93a0-07fdf917afdc';
  const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

  const submitToWeb3Forms = (form, successElement, formWrapElement, successText) => {
    const data = new FormData(form);
    data.set('access_key', ACCESS_KEY);

    // Web3Forms expects an email field named "email" and a message field named "message".
    // Quote form sends the same fields through FormData without changing the visible markup.
    if (!data.has('subject')) {
      data.set('subject', successText);
    }

    fetch(WEB3FORMS_URL, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        if (!result.success) {
          throw new Error(result.message || 'Unable to submit form.');
        }

        if (formWrapElement) formWrapElement.style.display = 'none';
        if (successElement) {
          successElement.style.display = 'block';
          window.scrollTo({ top: successElement.offsetTop - 120, behavior: 'smooth' });
        }
      })
      .catch(error => {
        console.error('Web3Forms submission failed:', error);
        alert('There was a problem sending your message. Please try again.');
      });
  };

  /* --- Quote form (quote.html) --- */
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!quoteForm.checkValidity()) {
        quoteForm.reportValidity();
        return;
      }

      const quoteFormWrap = document.getElementById('quoteFormWrap');
      const quoteSuccess = document.getElementById('quoteSuccess');
      submitToWeb3Forms(quoteForm, quoteSuccess, quoteFormWrap, 'Quote Request from ECOGROWTH LTD');
    });
  }

  /* --- Contact form (contact.html) --- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const contactFormWrap = document.getElementById('contactFormWrap');
      const contactSuccess = document.getElementById('contactSuccess');
      submitToWeb3Forms(contactForm, contactSuccess, contactFormWrap, 'Contact Message from ECOGROWTH LTD');
    });
  }

});
