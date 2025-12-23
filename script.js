document.addEventListener('DOMContentLoaded', () => {
    const CHRISTMAS_TARGET = new Date("December 25, 2025 00:00:00").getTime();
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = CHRISTMAS_TARGET - now;
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const timerContainer = document.querySelector('.christmas-countdown__timer');
        if (!timerContainer) return;
        if (distance <= 0) {
    const timerContainer = document.querySelector('.christmas-countdown__timer');
    if (timerContainer) {
        timerContainer.style.display = 'none';
    }
    const greetingSection = document.getElementById('christmas-greeting');
    if (greetingSection) {
        greetingSection.style.display = 'block';
        greetingSection.style.opacity = '1'; 
    }
    const bellSound = document.getElementById('bell-sound');
    const santaLaugh = document.getElementById('santa-laugh');
    if (bellSound && !bellSound.dataset.played) {
        bellSound.currentTime = 0; 
        bellSound.play().catch(err => console.log("Không phát được tiếng chuông:", err));
        bellSound.dataset.played = "true";
    }
    if (santaLaugh && !santaLaugh.dataset.played) {
        setTimeout(() => {
            santaLaugh.currentTime = 0;
            santaLaugh.play().catch(err => console.log("Không phát được tiếng cười:", err));
            santaLaugh.dataset.played = "true";
        }, 1000);
    }
    return; 
}
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
    async function loadWishes() {
        const list = document.getElementById('wishes-list');
        if (!list) return;
        try {
            const response = await fetch('/api/wishes');
            if (!response.ok) throw new Error('Server lỗi');
            const data = await response.json();
            list.innerHTML = '';

            if (!data || data.length === 0) {
                list.innerHTML = '<div class="no-wish">Chưa có lời chúc nào. Hãy là người đầu tiên gửi điều ước nhé! 🎄</div>';
                return;
            }
            data.forEach(wish => {
                const item = document.createElement('div');
                item.className = 'christmas-wishes__item';
                item.style.cursor = 'pointer';
                item.innerHTML = `
                    <strong>${wish.name}</strong>
                    <p>${wish.message.substring(0, 80)}${wish.message.length > 80 ? '...' : ''}</p>
                    <small>${new Date(wish.created_at).toLocaleString('vi-VN')}</small>
                `;
                item.onclick = () => showModal(wish);
                list.appendChild(item);
            });
        } catch (err) {
            console.error(err);
            list.innerHTML = '<p style="color: var(--gold);">⚠️ Không tải được lời chúc (offline mode)</p>';
        }
    }
    function showModal(wish) {
    document.getElementById('modal-name').textContent = wish.name || 'Ẩn danh';
    document.getElementById('modal-text').textContent = wish.message;
    document.getElementById('modal-date').textContent = new Date(wish.created_at).toLocaleString('vi-VN');
    let senderName = (wish.name || '').trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
    const nameToImage = {
        "hmmmm": "IMG_1746028995033_1766462893938.jpg",
        "hmmm": "1.jpg",
        "hmmmmm": "12.jpg",
        "day": "12.jpg",
        "gia dinh": "6c100b7f-824c-494c-8d61-fea115a4a079.jpg",
        "bo": "6e3a0e9c-cf03-4e96-82c1-f10bddd7be32.jpg",
        "ch": "59fa8137-b627-40ed-8557-a62c2cafcc5e.jpg",
        "van": "fb4aeb6a-0446-4d7a-902d-477efaca8633.jpg",
        "thay": "eedd7886-6a6e-440c-8a9a-00e23ff7056a.jpg",
        "giang": "c100c0b7-cf20-4e3a-add2-742d87031f74.jpg",
        "me": "6b6d8dff-92de-4e38-b52f-6907a5a6dd4d.jpg",
        "duc": "duc.jpg",
    };

    let imageSrc = "default-christmas.jpg"; 
    for (let key in nameToImage) {
        if (senderName.includes(key)) {
            imageSrc = nameToImage[key];
            break;
        }
    }
    document.getElementById('modal-img').src = imageSrc;
    document.getElementById('wish-modal').style.display = 'flex';
}
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = document.getElementById('music-icon');
    if (musicToggle && bgMusic) {
        musicToggle.onclick = () => {
            if (bgMusic.paused) {
                bgMusic.play().catch(() => {});
                musicIcon.classList.replace('fa-volume-xmark', 'fa-volume-high');
                musicToggle.classList.add('music-on');
            } else {
                bgMusic.pause();
                musicIcon.classList.replace('fa-volume-high', 'fa-volume-xmark');
                musicToggle.classList.remove('music-on');
            }
        };
    }
    const images = document.querySelectorAll('.gallery-img');
    const nextBtn = document.getElementById('btn-next');
    const prevBtn = document.getElementById('btn-prev');
    const currentNum = document.getElementById('current-num');
    const totalNum = document.getElementById('total-num');
    let currentIndex = 0;
    if (images.length > 0) {
        totalNum.textContent = images.length;
        currentNum.textContent = 1;
        const showSlide = (newIndex) => {
            images[currentIndex].classList.remove('active');
            currentIndex = (newIndex + images.length) % images.length;
            images[currentIndex].classList.add('active');
            currentNum.textContent = currentIndex + 1;
        };
        nextBtn.onclick = () => showSlide(currentIndex + 1);
        prevBtn.onclick = () => showSlide(currentIndex - 1);
        setInterval(() => showSlide(currentIndex + 1), 5000);
    }
    document.querySelector('.btn-send-wish').addEventListener('click', async function () {
        const name = document.getElementById('sender-name').value.trim();
        const message = document.getElementById('wish-text').value.trim();

        if (!message) {
            alert('🎄 Hãy viết điều ước chân thành trước khi gửi nhé!');
            return;
        }
        const card = document.querySelector('.wish-form-card');
        card.style.transition = 'all 1.2s cubic-bezier(0.2, 0.8, 0.4, 1)';
        card.style.transform = 'translateY(-120vh) rotate(20deg) scale(0)';
        card.style.opacity = '0';
        try {
            const response = await fetch('/api/wishes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name || 'Ẩn danh', message })
            });
            setTimeout(() => {
                if (response.ok) {
                    alert('🎅 Ho Ho Ho! Điều ước đã bay đến Bắc Cực thành công! ✨');
                    document.getElementById('sender-name').value = '';
                    document.getElementById('wish-text').value = '';
                    loadWishes();
                } else {
                    alert('❄️ Gửi thất bại, nhưng ông già Noel vẫn nghe thấy ước của bạn 💫');
                }
                card.style.transition = 'none';
                card.style.transform = 'none';
                card.style.opacity = '1';
            }, 1200);
        } catch (err) {
            setTimeout(() => {
                alert('🌟 Phép màu vẫn đang xảy ra! Điều ước đã được ghi nhận ❤️');
                card.style.transition = 'none';
                card.style.transform = 'none';
                card.style.opacity = '1';
            }, 1200);
        }
    });
    const santaTrigger = document.getElementById('santa-trigger');
    if (santaTrigger) {
        santaTrigger.onclick = () => {
            document.querySelector('.wish-section').scrollIntoView({ behavior: 'smooth' });
            document.getElementById('sender-name').focus();
            document.getElementById('santa-laugh')?.play().catch(() => {});
            document.getElementById('christmas-bell')?.play().catch(() => {});
        };
    }
    const modal = document.getElementById('wish-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                modal.style.display = 'none';
            }
        });
    }
    function createSnowflake() {
        const snow = document.createElement('div');
        snow.classList.add('snow');
        const size = Math.random() * 5 + 2 + 'px';
        const left = Math.random() * 100 + 'vw';
        const duration = Math.random() * 5 + 5 + 's';
        const opacity = Math.random() * 0.8 + 0.2;
        snow.style.width = size;
        snow.style.height = size;
        snow.style.left = left;
        snow.style.animationDuration = duration;
        snow.style.opacity = opacity;
        document.body.appendChild(snow);
        setTimeout(() => snow.remove(), parseFloat(duration) * 1000 + 1000);
    }
    setInterval(createSnowflake, 80);
    loadWishes();
});