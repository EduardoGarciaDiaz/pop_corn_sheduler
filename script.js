const UI = {
    scheduleStatusText: document.getElementById('schedule-text'),
    scheduleButton: document.getElementById('schedule-button'),
    scheduledTimeInput: document.getElementById('scheduled-time'),
  };

  UI.scheduleButton.addEventListener('click', handleScheduleButtonClick);

function handleScheduleButtonClick(event) {
    event.preventDefault();

    const scheduledTime = UI.scheduledTimeInput.value.trim();
    if (!isValidTime(scheduledTime)) {
        alert('Hora no válida. Por favor ingresa una hora válida en formato HH:MM.');
        return;
    }
    turnOnMachineAtScheduledTime(scheduledTime);
}

function turnOnMachineAtScheduledTime(scheduledTime) {
    const [hour, minute] = scheduledTime.split(':').map(Number);
    const delay = calculateDelay(hour, minute);
    if (delay === 0) {
        alert('La máquina de palomitas se encenderá ahora.');
        UI.scheduleStatusText.textContent = `La máquina de palomitas se encenderá ahora.`;
        return;
    }
    if (delay < 0) {
        alert('La hora programada ya pasó. Por favor ingresa una hora futura.');
        UI.scheduleStatusText.textContent = `La hora programada ya pasó. Por favor ingresa una hora futura.`;
        return;
    }
    console.log('Machine turned on!');
    console.log(scheduledTime);
    UI.scheduleStatusText.textContent = `La máquina de palomitas se encenderá a las ${scheduledTime} horas.`;
    alert(`La máquina de palomitas se encenderá a las ${scheduledTime} horas.`);
}


  function calculateDelay(hour, minute) {
    const now = new Date();
    const scheduledDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
    return scheduledDate.getTime() - now.getTime() ;
  }

  function isValidTime(time) {
    const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
    return timeRegex.test(time);
  }