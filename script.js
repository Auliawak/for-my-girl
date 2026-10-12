const actionBtn = document.getElementById('actionBtn');
const bgMusic = document.getElementById('bgMusic');
const flowersGroup = document.getElementById('flowersGroup');
const stemsGroup = document.getElementById('stemsGroup');
const mainText = document.getElementById('mainText');
const subText = document.getElementById('subText');
const bouquet = document.getElementById('bouquet');

let clickCount = 0;
const maxFlowers = 10; 

const flowerPositions = [
    { x: 50, y: 120, color: '#f43f5e' }, 
    { x: 150, y: 120, color: '#e879f9' }, 
    { x: 70, y: 90, color: '#38bdf8' },  
    { x: 130, y: 90, color: '#fb923c' }, 
    { x: 100, y: 70, color: '#f472b6' }, 
    { x: 40, y: 145, color: '#c084fc' }, 
    { x: 160, y: 145, color: '#fb7185' }, 
    { x: 75, y: 135, color: '#60a5fa' }, 
    { x: 125, y: 135, color: '#a78bfa' } 
];

function createFlower(x, y, color) {
    const stem = document.createElementNS("http://www.w3.org/2000/svg", "line");
    stem.setAttribute("x1", x);
    stem.setAttribute("y1", y);
    stem.setAttribute("x2", 100); 
    stem.setAttribute("y2", 180); 
    stem.setAttribute("stroke", "#4ade80");
    stem.setAttribute("stroke-width", "3");
    stemsGroup.appendChild(stem);

    // 1. Grup Luar (Khusus Posisi)
    const flowerPos = document.createElementNS("http://www.w3.org/2000/svg", "g");
    flowerPos.setAttribute("transform", `translate(${x}, ${y})`);
    
    // 2. Grup Dalam (Khusus Animasi)
    const innerG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    innerG.classList.add("flower");

    const petalCoords = [
        {cx: 0, cy: -15}, {cx: 15, cy: -5}, {cx: 10, cy: 12}, 
        {cx: -10, cy: 12}, {cx: -15, cy: -5}
    ];

    petalCoords.forEach(p => {
        const petal = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        petal.setAttribute("cx", p.cx);
        petal.setAttribute("cy", p.cy);
        petal.setAttribute("r", 10);
        petal.setAttribute("fill", color);
        petal.setAttribute("class", "petal");
        innerG.appendChild(petal);
    });

    const center = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    center.setAttribute("cx", 0);
    center.setAttribute("cy", 0);
    center.setAttribute("r", 8);
    center.setAttribute("fill", "#fbbf24");
    innerG.appendChild(center);

    flowerPos.appendChild(innerG);
    flowersGroup.appendChild(flowerPos);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

bouquet.classList.add('sway');

actionBtn.addEventListener('click', () => {
    if (clickCount === 0) {
        bgMusic.play();
        mainText.innerText = "Yeyyy! I Love You! ❤️";
        subText.innerText = "Ini bunga buat kamu...";
        actionBtn.innerText = "Lagi dong bunganya!";
        setInterval(createHeart, 300); 
        clickCount++;

    } else if (clickCount > 0 && clickCount < maxFlowers) {
        const pos = flowerPositions[clickCount - 1];
        createFlower(pos.x, pos.y, pos.color);
        clickCount++;
        
        if (clickCount === maxFlowers) {
            actionBtn.innerText = "Sudah penuh sayangg, I Love You! 💕";
            actionBtn.classList.remove('hover:bg-pink-500');
            actionBtn.classList.add('bg-pink-300', 'cursor-not-allowed', 'transform-none');
            actionBtn.disabled = true;
        }
    }
});