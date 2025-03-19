let startTime = Date.now();
let timerInterval;

function updateDisplay() {
    const now = Date.now();
    const elapsed = now - startTime;
    
    // 更新时间显示
    const timerElement = document.getElementById('timer');
    if (!timerElement) {
        console.error('未找到ID为"timer"的元素');
        return;
    }
    
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const milliseconds = elapsed % 1000;
    timerElement.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
    
    // 更新已赚金额
    const earnedAmountElement = document.getElementById('earnedAmount');
    if (!earnedAmountElement) {
        console.error('未找到ID为"earnedAmount"的元素');
        return;
    }
    
    const salary = parseFloat(localStorage.getItem('salary'));
    const workDays = parseFloat(localStorage.getItem('workDays'));
    const workHours = parseFloat(localStorage.getItem('workHours'));
    const hourlyRate = salary / (workDays * workHours);
    const earned = (elapsed / 3600000) * hourlyRate;
    earnedAmountElement.textContent = earned.toFixed(2);

    // 检查是否触发奖励效果
    checkBonus(earned);
}

function stopWorking() {
    clearInterval(timerInterval);
    alert('下班啦！');
    window.location.href = 'index.html';
}

// 初始化
timerInterval = setInterval(updateDisplay, 10);