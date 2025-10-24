document.addEventListener('DOMContentLoaded', function () {
    // === ПОИСК ===
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.getElementById('search-video');
    const videoBlocks = document.querySelectorAll('.block-video .video'); // Все .video внутри .block-video
    const noneVideoMsg = document.querySelector('.none-video'); // Контейнер "Ничего не найдено"

    // Функция поиска (только по h1)
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        let visibleCount = 0; // Счётчик видимых видео

        videoBlocks.forEach(block => {
            const textContainer = block.querySelector('.text-container');
            if (textContainer) {
                const h1Text = textContainer.querySelector('h1').textContent.toLowerCase();
                const isMatch = query === '' || h1Text.includes(query);

                if (isMatch) {
                    block.classList.remove('hidden');
                    visibleCount++;
                } else {
                    block.classList.add('hidden');
                }
            }
        });

        // Управление сообщением "Ничего не найдено"
        if (noneVideoMsg) {
            if (visibleCount === 0 && query !== '') {
                noneVideoMsg.classList.add('active');
            } else {
                noneVideoMsg.classList.remove('active');
            }
        }

        // Никаких манипуляций с фокусом — по умолчанию
    }

    // Триггеры поиска
    if (searchIcon) {
        searchIcon.addEventListener('click', performSearch);
    }
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Изначально все видимы, сообщение скрыто
    videoBlocks.forEach(block => block.classList.remove('hidden'));
    if (noneVideoMsg) {
        noneVideoMsg.classList.remove('active');
    }

    // === КНОПКА "ВВЕРХ" ===
    const buttonUp = document.getElementById('button-up');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            buttonUp.classList.add('active');
        } else {
            buttonUp.classList.remove('active');
        }
    });

    buttonUp.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});