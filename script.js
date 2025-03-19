let startTime;
let interval;
let salaryPerSecond;

document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            const salary = parseFloat(document.getElementById('salary').value);
            const workDays = parseFloat(document.getElementById('workDays').value);
            const workHours = parseFloat(document.getElementById('workHours').value);

            if (isNaN(salary) || isNaN(workDays) || isNaN(workHours)) {
                alert('请输入有效数值');
                return;
            }

            const totalWorkSeconds = workDays * workHours * 3600;
            salaryPerSecond = salary / totalWorkSeconds;

            startTime = Date.now();
            // 启动定时器，定期更新金额
            clearInterval(interval); // 清除之前的定时器
            interval = setInterval(updateEarnings, 100);
        });
    }
});

function updateEarnings() {
    const earnedAmountElement = document.getElementById('earnedAmount');
    if (!earnedAmountElement) {
        console.error('未找到ID为"earnedAmount"的元素');
        return;
    }
    
    const elapsed = Date.now() - startTime;
    const earned = elapsed * salaryPerSecond / 1000; // 计算已赚金额
    earnedAmountElement.textContent = earned.toFixed(2);
}

    function createCoin() {
        const coin = document.createElement('div');
        coin.classList.add('coin');
        coin.style.left = `${Math.random() * window.innerWidth}px`;
        coin.style.top = `${Math.random() * window.innerHeight}px`;
        coin.style.animationDuration = `${Math.random() * 2 + 1}s`;
        document.getElementById('coinContainer').appendChild(coin);
    
        // 添加闪烁效果
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        coin.appendChild(sparkle);
    
        setTimeout(() => {
            coin.remove();
        }, 3000);
    }

    // 初始化金币流动
    function startCoinFlow() {
        setInterval(() => {
            for (let i = 0; i < 5; i++) {
                createCoin();
            }
        }, 1000);
    }

    // 页面加载后启动金币流动
    window.addEventListener('load', startCoinFlow);
});