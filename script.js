const popupOverlay = document.getElementById('popupOverlay');
const popupCloseButton = document.getElementById('popupClose');
const popupImage = document.getElementById('popupImage');
const popupPrevButton = document.getElementById('popupPrev');
const popupNextButton = document.getElementById('popupNext');

let images = ["work1.png", "work2.png", "work3.png", "work2.png", "work3.png", "work1.png"];
let currentImageIndex = 0;

for (let i = 1; i <= 6; ++i) {
    console.log('pict_' + i);
    document.getElementById('pict_' + i).addEventListener('click', () => {
        popupOverlay.style.display = 'block';
        currentImageIndex = i - 1;
        showImage(currentImageIndex);
        popupNextButton.style.visibility = 'visible';
        popupPrevButton.style.visibility = 'visible';
        if (currentImageIndex === 0) {
            popupPrevButton.style.visibility = 'hidden';
        } else if (currentImageIndex === 5) {
            popupNextButton.style.visibility = 'hidden';
        }
    });
}

popupCloseButton.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
});

popupPrevButton.addEventListener('click', () => {
    currentImageIndex = currentImageIndex - 1;
    showImage(currentImageIndex);
    if (currentImageIndex === 0) {
        popupPrevButton.style.visibility = 'hidden';
    } else {
        popupNextButton.style.visibility = 'visible';
    }
});

popupNextButton.addEventListener('click', () => {
    currentImageIndex = currentImageIndex + 1;
    showImage(currentImageIndex);
    if (currentImageIndex === 5) {
        popupNextButton.style.visibility = 'hidden';
    } else {
        popupPrevButton.style.visibility = 'visible';
    }
});

function showImage(index) {
    popupImage.src = images[index];
}

const header = document.getElementById('header');

window.addEventListener('scroll', function () {
    if (window.scrollY >= window.innerHeight) {
        header.style.position = 'fixed';
        header.style.margin = '0';
        header.style.backgroundColor = 'black';
        header.style.width = "100%";
        header.style.justifyContent = "space-evenly";
        header.style.position = "fixed";
        header.style.zIndex = "3";
        header.style.paddingBottom = "20px";
    } else {
        header.style.position = 'absolute';
        if (window.innerWidth > 1440) {
            header.style.display = "flex";
            header.style.justifyContent = "space-between";
            header.style.width = "500px";
            header.style.height = "46px";
            header.style.paddingTop = "20px";
            header.style.marginRight = "10vw";
            header.style.position = "absolute";
            header.style.right = "0";
        }
    }
});

const form_popup = document.getElementById("formPopup");
const form = document.getElementById("popupFormOverlay");
const form_close = document.getElementById("popupFormClose");

function showForm() {
    form.style.display = "block";
    form.animate(
        [{opacity: 0}, {opacity: 1}],
        {duration: 200, fill: 'forwards'}
    );
}

form_popup.addEventListener('click', () => {
    showForm();
});
const LS_KEY = 'popupDismissed';
form_close.addEventListener('click', () => {
    form.querySelectorAll('input, textarea').forEach(el => el.value = '');
    const animation = form.animate([
            {opacity: 1},
            {opacity: 0}],
        {
            duration: 200,
            fill: 'forwards'
        });

    animation.finished.then(() => {
        form.style.display = 'none';
    });
    localStorage.setItem(LS_KEY, 'true');
});
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem(LS_KEY)) {
        setTimeout(showForm, 3000);
    }
});

const target = new Date('2025-06-01T00:00:00');

const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    min: document.getElementById('cd-min'),
    sec: document.getElementById('cd-sec'),
};

function pad(n) {
    return String(n).padStart(2, '0');
}

function updateCountdown() {
    const now = new Date();
    let diffSec = Math.floor((target - now) / 1000);

    if (diffSec <= 0) {
        clearInterval(timerId);
        return;
    }

    const days = Math.floor(diffSec / 86400);
    diffSec %= 86400;
    const hours = Math.floor(diffSec / 3600);
    diffSec %= 3600;
    const min = Math.floor(diffSec / 60);
    const sec = diffSec % 60;

    els.days.textContent = pad(days);
    els.hours.textContent = pad(hours);
    els.min.textContent = pad(min);
    els.sec.textContent = pad(sec);
}

updateCountdown();
const timerId = setInterval(updateCountdown, 1000);

function clearErrors() {
    form.querySelectorAll('.is-invalid').forEach(
        el => el.classList.remove('is-invalid')
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const form      = document.getElementById('my-form');
    const submitBtn = document.getElementById('submitBtn');

    const nameInput    = document.getElementById('name');
    const emailInput   = document.getElementById('email');
    const phoneInput   = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    const nameError    = document.getElementById('name-error');
    const emailError   = document.getElementById('email-error');
    const phoneError   = document.getElementById('phone-error');
    const messageError = document.getElementById('message-error');

    const EMAIL_REGEX   = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const PHONE_REGEX   = /^\+?[\d\s\-()]{7,15}$/;
    const RUS_REGEX     = /^[а-яА-ЯёЁ\s-]+$/;

    function validateField(input, regex, errorEl, msg, allowEmpty = false) {
        const v = input.value.trim();
        let ok = true, err = '';

        if (!allowEmpty && v === '') { ok = false; err = 'Это поле обязательно.'; }
        else if (v !== '' && regex && !regex.test(v)) { ok = false; err = msg || 'Неверный формат.'; }

        errorEl.textContent = err;
        input.classList.toggle('invalid', !ok);
        return ok;
    }
    function validateTextLang(input, errorEl, msg) {
        const v = input.value.trim();
        let ok = true, err = '';

        if (v === '') { ok = false; err = 'Это поле обязательно.'; }
        else if (!(RUS_REGEX.test(v))) {
            ok = false; err = msg || 'Только русские буквы.';
        }
        errorEl.textContent = err;
        input.classList.toggle('invalid', !ok);
        return ok;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        [nameError, emailError, phoneError, messageError].forEach(el => el.textContent = '');
        [nameInput, emailInput, phoneInput, messageInput].forEach(el => el.classList.remove('invalid'));

        submitBtn.classList.remove('success','sending');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить';
        submitBtn.style.cursor = 'pointer';
        submitBtn.style.backgroundColor = '';
        submitBtn.style.color = '';
        submitBtn.style.borderColor = '';

        const okName    = validateTextLang(nameInput,    nameError,    'Имя: только русские буквы');
        const okEmail   = validateField   (emailInput,   EMAIL_REGEX,  emailError,  'Введите корректный email');
        const okPhone   = phoneInput.value.trim()==='' ? true
            : validateField   (phoneInput,   PHONE_REGEX,  phoneError,  'Неверный номер телефона', true);
        const okMessage = validateTextLang(messageInput, messageError, 'Сообщение: только русские буквы');

        if (!(okName && okEmail && okPhone && okMessage)) return;

        submitBtn.textContent = 'Отправляем...';
        submitBtn.classList.add('sending');
        submitBtn.disabled = true;
        submitBtn.style.cursor = 'wait';

        try {
            await emailjs.sendForm('default_service', 'template_74m1eif', form);
            submitBtn.textContent = 'Успешно отправлено!';
            submitBtn.classList.remove('sending');
            submitBtn.classList.add('success');
            submitBtn.style.cursor = 'default';

        } catch (err) {
            console.error('EmailJS error:', err);
            submitBtn.textContent = 'Ошибка отправки';
            submitBtn.classList.remove('sending');
            submitBtn.style.backgroundColor = 'red';
            submitBtn.style.color           = 'white';
            submitBtn.style.borderColor     = 'red';
            submitBtn.disabled = false;
            submitBtn.style.cursor = 'pointer';

            const msg = document.createElement('p');
            msg.classList.add('general-form-error');
            msg.style.color = 'red';
            msg.style.textAlign = 'center';
            msg.textContent = `Не удалось отправить письмо: ${err?.text || err}. Попробуйте ещё раз.`;

            form.querySelector('.general-form-error')?.remove();
            form.appendChild(msg);
        }
    });

    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            document.getElementById(`${input.id}-error`).textContent = '';
            input.classList.remove('invalid');
            form.querySelector('.general-form-error')?.remove();

            if (submitBtn.classList.contains('success') || submitBtn.style.backgroundColor === 'red') {
                submitBtn.textContent = 'Отправить';
                submitBtn.classList.remove('success','sending');
                submitBtn.disabled = false;
                submitBtn.style.cursor = 'pointer';
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color           = '';
                submitBtn.style.borderColor     = '';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form2      = document.getElementById('my-popup-form');
    const submitBtn2 = document.getElementById('popup_submit');

    const nameInput2    = document.getElementById('popup_name');
    const emailInput2   = document.getElementById('popup_email');
    const phoneInput2   = document.getElementById('popup_phone');
    const messageInput2 = document.getElementById('popup_message');

    const nameError2    = document.getElementById('popup-name-error');
    const emailError2   = document.getElementById('popup-email-error');
    const phoneError2   = document.getElementById('popup-phone-error');
    const messageError2 = document.getElementById('popup-message-error');

    const EMAIL_REGEX   = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const PHONE_REGEX   = /^\+?[\d\s\-()]{7,15}$/;
    const RUS_REGEX     = /^[а-яА-ЯёЁ\s-]+$/;

    function validateField(input, regex, errorEl, msg, allowEmpty = false) {
        const v = input.value.trim();
        let ok = true, err = '';

        if (!allowEmpty && v === '') { ok = false; err = 'Это поле обязательно.'; }
        else if (v !== '' && regex && !regex.test(v)) { ok = false; err = msg || 'Неверный формат.'; }

        errorEl.textContent = err;
        input.classList.toggle('invalid', !ok);
        return ok;
    }
    function validateTextLang(input, errorEl, msg) {
        const v = input.value.trim();
        let ok = true, err = '';

        if (v === '') { ok = false; err = 'Это поле обязательно.'; }
        else if (!(RUS_REGEX.test(v))) {
            ok = false; err = msg || 'Только русские буквы.';
        }
        errorEl.textContent = err;
        input.classList.toggle('invalid', !ok);
        return ok;
    }

    form2.addEventListener('submit', async (e) => {
        e.preventDefault();

        [nameError2, emailError2, phoneError2, messageError2].forEach(el => el.textContent = '');
        [nameInput2, emailInput2, phoneInput2, messageInput2].forEach(el => el.classList.remove('invalid'));

        submitBtn2.classList.remove('success','sending');
        submitBtn2.disabled = false;
        submitBtn2.textContent = 'Отправить';
        submitBtn2.style.cursor = 'pointer';
        submitBtn2.style.backgroundColor = '';
        submitBtn2.style.color = '';
        submitBtn2.style.borderColor = '';

        const okName    = validateTextLang(nameInput2,    nameError2,    'Имя: только русские буквы');
        const okEmail   = validateField   (emailInput2,   EMAIL_REGEX,  emailError2,  'Введите корректный email');
        const okPhone   = phoneInput2.value.trim()==='' ? true
            : validateField   (phoneInput2,   PHONE_REGEX,  phoneError2,  'Неверный номер телефона', true);
        const okMessage = validateTextLang(messageInput2, messageError2, 'Сообщение: только русские буквы');

        if (!(okName && okEmail && okPhone && okMessage)) return;

        submitBtn2.textContent = 'Отправляем...';
        submitBtn2.classList.add('sending');
        submitBtn2.disabled = true;
        submitBtn2.style.cursor = 'wait';

        try {
            await emailjs.sendForm('default_service', 'template_74m1eif', form2);
            submitBtn2.textContent = 'Успешно отправлено!';
            submitBtn2.classList.remove('sending');
            submitBtn2.classList.add('success');
            submitBtn2.style.cursor = 'default';

        } catch (err) {
            console.error('EmailJS error:', err);
            submitBtn2.textContent = 'Ошибка отправки';
            submitBtn2.classList.remove('sending');
            submitBtn2.style.backgroundColor = 'red';
            submitBtn2.style.color           = 'white';
            submitBtn2.style.borderColor     = 'red';
            submitBtn2.disabled = false;
            submitBtn2.style.cursor = 'pointer';

            const msg = document.createElement('p');
            msg.classList.add('general-form-error');
            msg.style.color = 'red';
            msg.style.textAlign = 'center';
            msg.textContent = `Не удалось отправить письмо: ${err?.text || err}. Попробуйте ещё раз.`;

            form2.querySelector('.general-form-error')?.remove();
            form2.appendChild(msg);
        }
    });

    [nameInput2, emailInput2, phoneInput2, messageInput2].forEach(input => {
        input.addEventListener('input', () => {
            document.getElementById(`${input.id}-error`).textContent = '';
            input.classList.remove('invalid');
            form2.querySelector('.general-form-error')?.remove();

            if (submitBtn2.classList.contains('success') || submitBtn2.style.backgroundColor === 'red') {
                submitBtn2.textContent = 'Отправить';
                submitBtn2.classList.remove('success','sending');
                submitBtn2.disabled = false;
                submitBtn2.style.cursor = 'pointer';
                submitBtn2.style.backgroundColor = '';
                submitBtn2.style.color           = '';
                submitBtn2.style.borderColor     = '';
            }
        });
    });
});
