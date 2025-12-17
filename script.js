// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('智能虚拟电厂网站已加载');
    
    // 添加卡片悬停效果
    initCardHoverEffects();
    
    // 初始化统计数字动画
    initNumberAnimation();
    
    // 添加点击效果
    initClickEffects();
    
    // 模拟实时数据更新
    initRealTimeUpdates();
});

// 卡片悬停效果
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.role-card, .stat-item, .step');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('role-card') 
                ? 'translateY(-10px)' 
                : 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 统计数字动画
function initNumberAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseFloat(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            stat.textContent = currentValue.toFixed(1);
        }, stepTime);
    });
}

// 点击效果
function initClickEffects() {
    const buttons = document.querySelectorAll('.btn-enter, button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // 如果是进入按钮，显示加载提示
            if (this.classList.contains('btn-enter')) {
                console.log('进入系统:', this.closest('.role-card').querySelector('h3').textContent);
                
                // 模拟加载效果
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 加载中...';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.opacity = '1';
                }, 1000);
            }
        });
    });
}

// 模拟实时数据更新
function initRealTimeUpdates() {
    // 更新状态数据
    setInterval(() => {
        const statItems = document.querySelectorAll('.stat-item');
        
        statItems.forEach(item => {
            const numberElement = item.querySelector('.stat-number');
            if (numberElement) {
                const currentValue = parseFloat(numberElement.textContent);
                const randomChange = (Math.random() - 0.5) * 0.1; // ±5%变化
                const newValue = Math.max(0, currentValue * (1 + randomChange));
                
                // 只更新小数位
                numberElement.textContent = newValue.toFixed(1);
                
                // 添加颜色变化提示
                if (randomChange > 0) {
                    numberElement.style.color = '#2ecc71';
                    setTimeout(() => {
                        numberElement.style.color = '';
                    }, 500);
                } else if (randomChange < 0) {
                    numberElement.style.color = '#e74c3c';
                    setTimeout(() => {
                        numberElement.style.color = '';
                    }, 500);
                }
            }
        });
    }, 5000); // 每5秒更新一次
}

// 添加页面切换动画
function navigateTo(url) {
    const mainContent = document.querySelector('.container');
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// 滚动效果
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // 按1键进入VPP调度中心
    if (e.key === '1') {
        document.querySelector('.vpp-operator .btn-enter').click();
    }
    // 按2键进入聚合商平台
    else if (e.key === '2') {
        document.querySelector('.aggregator .btn-enter').click();
    }
    // 按3键进入用户平台
    else if (e.key === '3') {
        document.querySelector('.end-user .btn-enter').click();
    }
    // 按ESC返回主页
    else if (e.key === 'Escape') {
        if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
            navigateTo('index.html');
        }
    }
});

// 移动端菜单
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        // 创建汉堡菜单按钮
        if (!document.querySelector('.menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            navbar.appendChild(menuToggle);
            
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('show');
                menuToggle.innerHTML = navLinks.classList.contains('show') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        }
    }
}

// 初始化移动端菜单
initMobileMenu();
window.addEventListener('resize', initMobileMenu);

// 添加通知系统
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 3秒后自动隐藏
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 模拟实时通知
setTimeout(() => {
    const messages = [
        "VPP系统已成功接入15台新设备",
        "今日已完成3次削峰调度",
        "用户满意度评分：4.8/5.0",
        "累计减少碳排放：852吨"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showNotification(randomMessage, 'success');
}, 5000);