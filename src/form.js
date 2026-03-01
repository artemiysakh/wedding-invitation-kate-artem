import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './form.css';

export default function InvitationForm() {
  const formRef = useRef(); // Создаем ссылку на форму
  const [formData, setFormData] = useState({
    fullName: '',
    attendance: '',
    drinks: []
  });
  const [validated, setValidated] = useState(false);
  const [isSending, setIsSending] = useState(false); // Для индикации отправки
  const [sendStatus, setSendStatus] = useState(null); // 'success' | 'error' | null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      drinks: checked 
        ? [...prev.drinks, value]
        : prev.drinks.filter(drink => drink !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация
    if (!formData.fullName || !formData.attendance) {
      setValidated(true);
      return;
    }

    setIsSending(true);
    setSendStatus(null);

    try {
      // Преобразуем массив напитков в строку для отправки
      const drinksString = formData.drinks.length > 0 
        ? formData.drinks.map(drink => {
            const option = drinkOptions.find(opt => opt.value === drink);
            return option ? option.label : drink;
          }).join(', ')
        : 'Не указано';

      // Подготавливаем данные для шаблона
      const templateParams = {
        to_name: 'Организаторы', // Имя получателя
        from_name: formData.fullName, // Имя отправителя
        fullName: formData.fullName,
        attendance: getAttendanceLabel(formData.attendance),
        drinks: drinksString,
        reply_to: 'no-reply@invitation.com', // Можно добавить поле email если нужно
        date: new Date().toLocaleString('ru-RU')
      };

      // Отправка через EmailJS
      const result = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      console.log('Email успешно отправлен:', result.text);
      setSendStatus('success');
      
      // Очищаем форму
      setFormData({
        fullName: '',
        attendance: '',
        drinks: []
      });
      setValidated(false);
      
      // Показываем уведомление
      setTimeout(() => {
        alert('Спасибо за ответ! Мы получили вашу форму и будем ждать вас на торжестве!');
      }, 100);

    } catch (error) {
      console.error('Ошибка при отправке:', error);
      setSendStatus('error');
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.');
    } finally {
      setIsSending(false);
    }
  };

  // Функция для преобразования значения в читаемый текст
  const getAttendanceLabel = (value) => {
    const option = attendanceOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  const attendanceOptions = [
    { value: 'accept', label: 'Я с удовольствием приду' },
    { value: 'withPartner', label: 'Буду со своей парой' },
    { value: 'online', label: 'Буду online' },
    { value: 'decline', label: 'К сожалению, не смогу присутствовать' },
    { value: 'later', label: 'Сообщу позже' }
    
  ];

  const drinkOptions = [
    { value: 'redWine', label: 'Красное вино' },
    { value: 'whiteWine', label: 'Белое вино' },
    { value: 'champagne', label: 'Шампанское' },
    { value: 'vodka', label: 'Водка' },
    { value: 'whiskey', label: 'Виски' },
    { value: 'cognac', label: 'Коньяк' },
    { value: 'noAlcohol', label: 'Не пью алкоголь' }
  ];

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Ответ на приглашение</h2>
        
        <form ref={formRef} onSubmit={handleSubmit} className="form">
          {/* Поле для ФИО */}
          <div className="form-group">
            <label className="form-label">
              Ваши ФИО <span className="required-star">*</span>
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Введите ваши фамилию, имя и отчество"
                className={`form-input ${validated && !formData.fullName ? 'input-error' : ''}`}
                disabled={isSending}
              />
            </div>
            {validated && !formData.fullName && (
              <span className="error-message">Пожалуйста, введите ваши ФИО</span>
            )}
          </div>

          {/* Вопрос о присутствии */}
          <div className="form-group">
            <label className="form-label">
              Сможете ли присутствовать на нашем торжестве? <span className="required-star">*</span>
            </label>
            <div className="radio-group">
              {attendanceOptions.map((option, index) => (
                <label key={index} className={`radio-label ${option.value === 'decline' ? 'radio-decline' : ''}`}>
                  <input
                    type="radio"
                    name="attendance"
                    value={option.value}
                    checked={formData.attendance === option.value}
                    onChange={handleInputChange}
                    className="radio-input"
                    disabled={isSending}
                  />
                  <span className="radio-custom"></span>
                  {option.label}
                </label>
              ))}
            </div>
            {validated && !formData.attendance && (
              <span className="error-message">Пожалуйста, выберите вариант ответа</span>
            )}
          </div>

          {/* Вопрос о напитках */}
          <div className="form-group">
            <label className="form-label">
              Что предпочитаете из напитков?
            </label>
            <div className="checkbox-grid">
              {drinkOptions.map((option, index) => (
                <label key={index} className={`checkbox-label ${formData.drinks.includes(option.value) ? 'checkbox-checked' : ''}`}>
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={formData.drinks.includes(option.value)}
                    onChange={handleCheckboxChange}
                    className="checkbox-input"
                    disabled={isSending}
                  />
                  <span className="checkbox-custom"></span>
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Индикатор отправки */}
          {isSending && (
            <div className="sending-indicator">
              Отправка ответа...
            </div>
          )}

          {/* Кнопка отправки */}
          <div className="button-wrapper">
            <button 
              type="submit" 
              className={`submit-button ${isSending ? 'sending' : ''} ${sendStatus === 'success' ? 'success' : ''}`}
              disabled={isSending}
            >
              {isSending ? 'Отправка...' : 'Отправить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}