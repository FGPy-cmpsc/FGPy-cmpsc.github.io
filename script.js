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
