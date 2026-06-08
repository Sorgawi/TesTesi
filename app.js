// Fungsi memunculkan overlay video saat halaman termuat / hover
function toggleOverlay(el) {
    let overlay = el.querySelector('.video-overlay');
    if (!overlay) return;

    if (overlay.classList.contains('show')) {
        overlay.classList.remove('show');
        return;
    }

    document.querySelectorAll('.video-overlay').forEach(function(o) {
        o.classList.remove('show');
    });

    overlay.classList.add('show');
}

// LOGIKA FILTER DENGAN FITUR MULTI-TAG BERKOMA
function cariTag(event, kataKunci) {
    event.stopPropagation();
    event.preventDefault();

    let semuaItem = document.querySelectorAll('.grid-item');

    semuaItem.forEach(function(item) {
        let tagData = item.getAttribute('data-tag');
        
        if (tagData) {
            // Memecah tag berkoma ("kucing, macan" menjadi ["kucing", "macan"])
            let daftarTag = tagData.split(',').map(function(tag) {
                return tag.trim().toLowerCase();
            });

            // Periksa jika kata kunci yang dicari terdaftar di array
            if (daftarTag.includes(kataKunci.toLowerCase())) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// Fungsi mereset filter
function tampilkanSemuaItem() {
    let semuaItem = document.querySelectorAll('.grid-item');
    semuaItem.forEach(function(item) {
        item.style.display = 'block';
    });
}

// --- LOGIKA IKLAN ---
var iklanHitam = document.getElementById('modal-iklan-hitam');
var timerOtomatis;
var hitunganMundurInterval;

function tutupIklanHitam() {
    if (!iklanHitam) return; 
    iklanHitam.style.opacity = '0';
    clearInterval(hitunganMundurInterval);
    clearTimeout(timerOtomatis);
    setTimeout(function() {
        iklanHitam.style.display = 'none';
    }, 300); 
}

function mulaiHitunganMundur() {
    var detikSaatIni = 4;
    var timerDisplay = document.getElementById('countdown-timer');
    
    hitunganMundurInterval = setInterval(function() {
        detikSaatIni--;
        if (timerDisplay) {
            if (detikSaatIni > 0) {
                 timerDisplay.innerHTML = 'Iklan otomatis menutup dalam <strong>' + detikSaatIni + '</strong> detik.';
            } else {
                 timerDisplay.textContent = 'Iklan ditutup.';
            }
        }
        if (detikSaatIni <= 0) clearInterval(hitunganMundurInterval);
    }, 1000);
}

window.addEventListener('load', function() {
    if (iklanHitam) {
        iklanHitam.style.display = 'block';
        setTimeout(function() { iklanHitam.style.opacity = '1'; }, 10);
        mulaiHitunganMundur();
        timerOtomatis = setTimeout(tutupIklanHitam, 4000); 
    }
    setTimeout(function(){
        var popup = document.getElementById('adsPopup');
        if (popup) popup.style.display = 'flex';
    }, 2000);
});