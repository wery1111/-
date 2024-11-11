const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// 设置画布大小
canvas.width = 400;
canvas.height = 400;

// 游戏参数
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let score = 0;

// 蛇的初始位置和速度
let snake = [
    { x: 5, y: 5 }
];
let velocityX = 0;
let velocityY = 0;

// 食物位置
let foodX = 10;
let foodY = 10;

// 游戏状态
let gameRunning = false;

// 游戏主循环
function gameLoop() {
    if (!gameRunning) return;
    
    moveSnake();
    if (checkGameOver()) {
        gameRunning = false;
        alert('游戏结束！得分：' + score);
        return;
    }
    
    checkFoodCollision();
    drawGame();
    setTimeout(gameLoop, 100);
}

// 移动蛇
function moveSnake() {
    const head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };
    snake.unshift(head);
    if (!checkFoodCollision()) {
        snake.pop();
    }
}

// 检查是否吃到食物
function checkFoodCollision() {
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
        return true;
    }
    return false;
}

// 生成新的食物
function generateFood() {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
}

// 检查游戏是否结束
function checkGameOver() {
    const head = snake[0];
    
    // 撞墙
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }
    
    // 撞到自己
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    
    return false;
}

// 绘制游戏画面
function drawGame() {
    // 清空画布
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制蛇
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
    
    // 绘制食物
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
}

// 键盘控制
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
        case 'w':
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case 'ArrowDown':
        case 's':
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case 'ArrowLeft':
        case 'a':
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case 'ArrowRight':
        case 'd':
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
});

// 开始游戏
function startGame() {
    if (gameRunning) return;
    
    // 重置游戏状态
    snake = [{ x: 5, y: 5 }];
    velocityX = 1;
    velocityY = 0;
    score = 0;
    scoreElement.textContent = score;
    generateFood();
    gameRunning = true;
    
    // 开始游戏循环
    gameLoop();
} 