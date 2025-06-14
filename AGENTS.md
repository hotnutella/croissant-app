Хочу создать кроссплатформенное приложение (мобильное и веб) для оценки и поиска круассанов по всему миру. Используй React + React Native, TailwindCSS, Supabase для базы данных, хранения изображений, авторизации и функций бэкенда.

Обязательные требования:

🗺 Главный экран:

Карта с локациями круассанов
Вместо стандартных пинов использовать эмодзи 🥐
При клике — карточка с:
названием места
фото круассана
рейтинг (масло, хруст, цена, вайб)
кнопка “Поехали” → переход на Google Maps / Waze / другое
комменты и лайки
➕ Добавление круассана пользователем:

Форма: фото, геолокация (авто), название места, рейтинг, коммент
Отправка в очередь на модерацию (админ-панель)
🛠 Модерация админом:

Просмотр заявок
Принять / отклонить / отредактировать
💬 Отзывы и лайки:

Комментарии
Лайки на каждый круассан
Рейтинг “Топ круассаны недели”
📍 Геолокация и пуш-уведомления:

Определять, если пользователь рядом с точкой
Показывать предложение оставить отзыв
Push-уведомления: умные, по таймеру, активности, близости к точке
Настраиваемый режим уведомлений
👤 Авторизация и профиль:

Через Google, Apple, GitHub + анонимный доступ
Профиль с историей, лайками, званиями (“Булочный разведчик”, и т.п.)
🌍 Многоязычность:

Полная i18n-поддержка через react-i18next
Автоопределение языка устройства
Переключатель языка вручную
Сгенерируй и вложи JSON-файлы переводов UI для следующих языков:
🇬🇧 Английский
🇫🇷 Французский
🇩🇪 Немецкий
🇮🇹 Итальянский
🇪🇸 Испанский
🇵🇱 Польский
🇺🇦 Украинский
🇷🇺 Русский
🇳🇱 Нидерландский
🇸🇪 Шведский
🇫🇮 Финский
🇬🇷 Греческий
🇩🇰 Датский
🇳🇴 Норвежский
🇨🇿 Чешский
🇸🇰 Словацкий
🇷🇴 Румынский
🇧🇬 Болгарский
🇭🇷 Хорватский
🇸🇮 Словенский
fallback на английский
Все тексты, кнопки, названия, подписи, плейсхолдеры и уведомления должны использовать i18n с ключами.
Сгенерируй примеры JSON-файлов переводов (как минимум для английского, русского, украинского, французского) и положи в отдельные файлы типа locales/en/translation.json
🎯 Цель — быстрое, стильное, локализованное приложение с минимумом гемора. UI должен быть простым, современным, адаптированным под мобилки и десктоп. Всё должно быть вкусно, как круассан на утро.
