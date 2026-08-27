/**
 * PyQuest: Motor Principal de Plataformas, Desafíos y Batalla con el Jefe Final
 */

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // UI Elements
    const hudLives = document.getElementById('lives-display');
    const hudCoins = document.getElementById('coins-display');
    const hudScore = document.getElementById('score-display');
    const hudLevelTitle = document.getElementById('level-title');
    const hudPlayerName = document.getElementById('hud-player-name');
    const promptInteraction = document.getElementById('interaction-prompt');
    const soundBtn = document.getElementById('sound-btn');
    const menuBtn = document.getElementById('menu-btn');

    // Boss UI Elements
    const bossHud = document.getElementById('boss-hud');
    const bossHpFill = document.getElementById('boss-hp-fill');
    const bossHpText = document.getElementById('boss-hp-text');

    // Speedrun Timer Elements & State
    const speedrunBox = document.getElementById('speedrun-timer');
    const timerDisplay = document.getElementById('timer-display');
    const speedrunToggle = document.getElementById('speedrun-toggle');
    let isSpeedrunActive = false;
    let speedrunStartTime = 0;
    let speedrunElapsedTime = 0;
    let speedrunInterval = null;

    // Virtual Touch Controls Elements & State
    const virtualControls = document.getElementById('virtual-controls');
    const touchToggle = document.getElementById('touch-controls-toggle');
    const btnTouchLeft = document.getElementById('btn-touch-left');
    const btnTouchRight = document.getElementById('btn-touch-right');
    const btnTouchJump = document.getElementById('btn-touch-jump');
    const btnTouchInteract = document.getElementById('btn-touch-interact');

    // PyDex Modal Elements & Content
    const pydexBtn = document.getElementById('pydex-btn');
    const menuPydexBtn = document.getElementById('menu-pydex-btn');
    const pydexModal = document.getElementById('pydex-modal');
    const closePydexBtn = document.getElementById('close-pydex-btn');
    const pydexTabContent = document.getElementById('pydex-tab-content');
    const pydexTabs = document.querySelectorAll('.pydex-tab');

    const PYDEX_DATA = {
        algoritmos: {
            title: "🧠 1. Algoritmos & Google Colab",
            content: `
                <p>Un <b>algoritmo</b> es un conjunto de pasos ordenados y finitos para resolver un problema o completar una tarea de principio a fin.</p>
                <pre># Ejemplo: Algoritmo para preparar té
1. Hervir agua en la pava
2. Poner saquito de té en la taza
3. Servir el agua caliente
4. Endulzar y mezclar</pre>
                <p>💻 <b>Google Colab:</b> Entorno gratuito en la nube de Google que permite escribir y ejecutar código Python en celdas interactivas con el botón ▶.</p>
            `
        },
        variables: {
            title: "📦 2. Variables, Print & Input",
            content: `
                <p>Las <b>variables</b> son contenedores o cajas en memoria para guardar datos (números, texto, etc.).</p>
                <pre>nombre = "Alex"      # Guarda texto (String)
edad = 15            # Guarda número entero (Int)
precio = 99.5        # Guarda decimal (Float)</pre>
                <p>📢 <b>print():</b> Muestra texto o resultados en la pantalla entre comillas.</p>
                <pre>print("Hola Mundo!")</pre>
                <p>⌨️ <b>input():</b> Pide que el usuario escriba un dato por teclado.</p>
                <pre>usuario = input("Tu nombre: ")</pre>
            `
        },
        condicionales: {
            title: "🔀 3. Condicionales If / Else",
            content: `
                <p>Permiten tomar decisiones según si una condición es <b>Verdadera (True)</b> o <b>Falsa (False)</b>.</p>
                <pre>if puntos >= 100:
    print("¡Pasas al siguiente nivel!")
else:
    print("Sigue intentando...")</pre>
                <p>⚠️ <b>Reglas de Oro:</b></p>
                <ul>
                    <li>Siempre poner dos puntos <code>:</code> al final de <code>if</code> y <code>else:</code>.</li>
                    <li>Usar doble igual <code>==</code> para comparar igualdad (un solo <code>=</code> es para guardar valores).</li>
                    <li>Todo lo que va dentro debe tener <b>sangría (indentación de 4 espacios)</b>.</li>
                </ul>
            `
        },
        listas: {
            title: "📑 4. Listas & Colecciones []",
            content: `
                <p>Una <b>lista</b> permite almacenar múltiples elementos ordenados en una sola variable, usando corchetes <code>[]</code>.</p>
                <pre>frutas = ["manzana", "banana", "naranja"]</pre>
                <p>🔢 <b>Índices (empiezan en 0):</b></p>
                <pre>print(frutas[0])  # Imprime "manzana" (el primero)
print(frutas[1])  # Imprime "banana"</pre>
                <p>➕ <b>.append():</b> Agrega un nuevo elemento al final de la lista.</p>
                <pre>frutas.append("frutilla")</pre>
            `
        },
        bucles: {
            title: "🔁 5. Bucles (For/While) & Funciones (Def)",
            content: `
                <p>🔁 <b>Bucle For:</b> Repite una acción para cada elemento de una lista o secuencia.</p>
                <pre>for i in range(3):
    print("Repetición:", i)</pre>
                <p>⚙️ <b>Funciones (def):</b> Bloques de código reutilizables con un nombre propio.</p>
                <pre>def saludar(nombre):
    print("¡Hola " + nombre + "!")

saludar("Alex")  # Llama a la función</pre>
            `
        }
    };

    // Customizer Elements
    const playerNameInput = document.getElementById('player-name-input');
    const colorButtons = document.querySelectorAll('.color-btn');
    let chosenColor = '#3776ab';
    let chosenName = 'Nombre';

    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            chosenColor = btn.getAttribute('data-color');
            if (player) player.color = chosenColor;
        });
    });

    // Overlay Screen
    const overlayScreen = document.getElementById('overlay-screen');
    const screenTitle = document.getElementById('screen-title');
    const screenSubtitle = document.getElementById('screen-subtitle');
    const screenContent = document.getElementById('screen-content');
    const startBtn = document.getElementById('start-btn');

    // Challenge Modal
    const challengeModal = document.getElementById('challenge-modal');
    const challengeBadge = document.getElementById('challenge-type-badge');
    const challengeTitle = document.getElementById('challenge-title');
    const challengeDesc = document.getElementById('challenge-desc');
    const challengeArea = document.getElementById('challenge-content-area');
    const hintBtn = document.getElementById('hint-btn');
    const hintText = document.getElementById('hint-text');
    const feedbackBox = document.getElementById('challenge-feedback');
    const submitBtn = document.getElementById('submit-challenge-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Cheats Modal & Elements
    const cheatsBtn = document.getElementById('cheats-btn');
    const cheatsModal = document.getElementById('cheats-modal');
    const closeCheatsBtn = document.getElementById('close-cheats-btn');
    const cheatInput = document.getElementById('cheat-command-input');
    const runCheatBtn = document.getElementById('run-cheat-btn');
    const cheatOutput = document.getElementById('cheat-output');
    const quickCheatButtons = document.querySelectorAll('.quick-cheat-btn');
    // Buffs & Cheat Flags
    let godMode = false;
    let speedBuff = false;
    let jumpBuff = false;
    let magnetBuff = false;
    let giantBuff = false;

    // Lista de Códigos Secretos para premiar al ganar el juego
    const SECRET_CHEAT_REWARDS = [
        { code: "SPEED", title: "⚡ SÚPER VELOCIDAD", desc: "Corre el doble de rápido por los mapas." },
        { code: "JUMP", title: "🦘 MEGA SALTO", desc: "Alcanza las plataformas más altas fácilmente." },
        { code: "MAGNET", title: "🧲 IMÁN DE BITS", desc: "Atrae automáticamente todas las monedas hacia ti." },
        { code: "GIANT", title: "🤖 ROBOT GIGANTE", desc: "Duplica el tamaño de tu avatar con presencia imponente." },
        { code: "GODMODE", title: "🛡️ MODO DIOS", desc: "Invulnerabilidad absoluta a todo daño y caídas." },
        { code: "COINS 999", title: "🪙 FORTUNA DE CÓDIGO", desc: "Suma 999 monedas y miles de puntos." }
    ];

    // Game States
    let gameState = 'START'; // START, PLAYING, MODAL, GAMEOVER, WIN
    let currentLevelIndex = 0;
    let score = 0;
    let coins = 0;
    let lives = 3;
    let activeInteractable = null;
    let activeChallengeId = null;
    let selectedOptionId = null;
    let currentStepsOrder = [];

    // Boss Projectiles & State
    let bossProjectiles = [];
    let bossAttackTimer = 0;

    // Efecto de Ataque Láser Especial del Jugador
    let playerLaser = null; // { startX, startY, targetX, targetY, timer, maxTimer: 30 }

    // Catálogo de Skins
    const SKINS_CATALOG = [
        { id: 'classic', name: 'PyBot Clásico', desc: 'El autómata original de código Python.', price: 0, icon: '🤖', type: 'classic' },
        { id: 'cyber_ninja', name: 'Ciber Ninja', desc: 'Máscara oscura y visor carmesí de sigilo.', price: 15, icon: '🥷', type: 'ninja' },
        { id: 'py_snake', name: 'Serpiente Python', desc: 'Skin legendaria con escamas esmeralda y ojos dorados.', price: 30, icon: '🐍', type: 'snake' },
        { id: 'gold_master', name: 'Master Hacker', desc: 'Armadura de oro puro con procesadores cuánticos.', price: 50, icon: '👑', type: 'gold' },
        { id: 'matrix_neo', name: 'Glitch Runner', desc: 'Emanación de código binario verde fluorescente.', price: 40, icon: '⚡', type: 'matrix' }
    ];
    let unlockedSkins = ['classic'];
    let equippedSkin = 'classic';

    // Catálogo de Mascotas Acompañantes (Pets)
    const PETS_CATALOG = [
        { id: 'none', name: 'Sin Mascota', desc: 'Jugar sin compañero.', price: 0, icon: '🚫' },
        { id: 'bit_drone', name: 'Bit Drone', desc: 'Mini dron flotante con luz cian pulsante.', price: 20, icon: '🛸' },
        { id: 'py_snake_pet', name: 'Víbora Python', desc: 'Pequeña serpiente verde que serpentea en el aire.', price: 25, icon: '🐍' },
        { id: 'rubber_duck', name: 'Rubber Duck', desc: 'El patito de goma clásico para depurar código.', price: 35, icon: '🦆' },
        { id: 'ghost_byte', name: 'Ghost Byte', desc: 'Espíritu de bits flotante que emite destellos.', price: 45, icon: '👻' }
    ];
    let unlockedPets = ['none'];
    let equippedPet = 'none';
    let currentShopTab = 'skins'; // 'skins' o 'pets'

    // Carga de Persistencia (LocalStorage)
    function loadSavedData() {
        try {
            const savedCoins = localStorage.getItem('pyquest_coins');
            if (savedCoins !== null) coins = parseInt(savedCoins) || 0;

            const savedSkins = localStorage.getItem('pyquest_skins');
            if (savedSkins) unlockedSkins = JSON.parse(savedSkins);

            const savedEquippedSkin = localStorage.getItem('pyquest_equipped_skin');
            if (savedEquippedSkin) equippedSkin = savedEquippedSkin;

            const savedPets = localStorage.getItem('pyquest_pets');
            if (savedPets) unlockedPets = JSON.parse(savedPets);

            const savedEquippedPet = localStorage.getItem('pyquest_equipped_pet');
            if (savedEquippedPet) equippedPet = savedEquippedPet;
        } catch (e) {
            console.warn("LocalStorage no disponible:", e);
        }
    }

    function saveUserData() {
        try {
            localStorage.setItem('pyquest_coins', coins);
            localStorage.setItem('pyquest_skins', JSON.stringify(unlockedSkins));
            localStorage.setItem('pyquest_equipped_skin', equippedSkin);
            localStorage.setItem('pyquest_pets', JSON.stringify(unlockedPets));
            localStorage.setItem('pyquest_equipped_pet', equippedPet);
        } catch (e) {}
    }

    loadSavedData();
    if (hudCoins) hudCoins.textContent = coins;

    // Estado dinámico de la Mascota
    const petState = {
        x: 50,
        y: 400,
        animTimer: 0,
        update(player) {
            if (equippedPet === 'none') return;
            this.animTimer++;
            // Suavizado de seguimiento (Lerp) detrás del hombro del jugador
            const targetX = player.facing === 'right' ? player.x - 22 : player.x + player.w + 10;
            const targetY = player.y - 14 + Math.sin(this.animTimer * 0.08) * 6;
            this.x += (targetX - this.x) * 0.12;
            this.y += (targetY - this.y) * 0.12;
        },
        draw(ctx) {
            if (equippedPet === 'none') return;
            ctx.save();
            ctx.translate(this.x, this.y);

            if (equippedPet === 'bit_drone') {
                // Dron flotante
                ctx.fillStyle = '#1e272e';
                ctx.fillRect(-8, -6, 16, 12);
                ctx.fillStyle = '#00d2d3';
                ctx.fillRect(-4, -2, 8, 4); // Ojo cian
                // Hélices
                ctx.fillStyle = '#d2dae2';
                const propW = Math.sin(this.animTimer * 0.4) * 8;
                ctx.fillRect(-8 - propW, -8, 6, 2);
                ctx.fillRect(2 + propW, -8, 6, 2);
            } else if (equippedPet === 'py_snake_pet') {
                // Serpiente Python
                ctx.fillStyle = '#10ac84';
                ctx.beginPath();
                ctx.arc(0, 0, 7, 0, Math.PI * 2);
                ctx.fill();
                // Ojos
                ctx.fillStyle = '#ffd32a';
                ctx.fillRect(-2, -3, 3, 3);
                // Cola ondulante
                const tailWiggle = Math.sin(this.animTimer * 0.15) * 4;
                ctx.fillStyle = '#1dd1a1';
                ctx.fillRect(-10 + tailWiggle, 2, 5, 4);
                ctx.fillRect(-14 + tailWiggle * 1.5, 3, 4, 3);
            } else if (equippedPet === 'rubber_duck') {
                // Patito de Goma
                ctx.fillStyle = '#ffd32a';
                ctx.beginPath();
                ctx.arc(0, 0, 8, 0, Math.PI * 2);
                ctx.fill();
                // Pico naranja
                ctx.fillStyle = '#ff7675';
                ctx.fillRect(4, -1, 5, 3);
                // Ojo
                ctx.fillStyle = '#000000';
                ctx.fillRect(1, -4, 2, 2);
            } else if (equippedPet === 'ghost_byte') {
                // Fantasmita de código
                ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
                ctx.beginPath();
                ctx.arc(0, -2, 7, Math.PI, 0);
                ctx.lineTo(7, 6);
                ctx.lineTo(3, 3);
                ctx.lineTo(0, 6);
                ctx.lineTo(-4, 3);
                ctx.lineTo(-7, 6);
                ctx.closePath();
                ctx.fill();
                // Ojos celestes
                ctx.fillStyle = '#0984e3';
                ctx.fillRect(-4, -3, 2, 3);
                ctx.fillRect(2, -3, 2, 3);
            }

            ctx.restore();
        }
    };

    // Boss UI Elements
    const bossNameLabel = document.getElementById('boss-name-label');

    // Boss Object Definition
    const boss = {
        x: 420,
        y: 200,
        w: 120,
        h: 120,
        maxHp: 3,
        hp: 3,
        type: 'ultimate_bug', // 'byte_golem', 'glitch_titan' o 'ultimate_bug'
        name: 'JEFE',
        animTimer: 0,
        isHurt: false,
        hurtTimer: 0,
        isEnraged: false,
        reset(type = 'ultimate_bug', maxHp = 3, name = 'JEFE') {
            this.type = type;
            this.maxHp = maxHp;
            this.hp = maxHp;
            this.name = name;
            this.isHurt = false;
            this.hurtTimer = 0;
            this.isEnraged = false;
            bossProjectiles = [];
            bossAttackTimer = 0;
            if (bossNameLabel) bossNameLabel.textContent = name;
            updateBossHpUI();
        },
        takeDamage() {
            this.hp--;
            this.isHurt = true;
            this.hurtTimer = 30;
            if (this.hp === 1) {
                this.isEnraged = true; // Activar FASE DE FURIA en 1 HP
            }
            window.soundSystem.playBossHit();
            updateBossHpUI();
        },
        update(player) {
            this.animTimer++;
            if (this.hurtTimer > 0) this.hurtTimer--;
            else this.isHurt = false;

            const speedMult = this.isEnraged ? 1.5 : 1.0;

            // Movimiento dinámico lateral oscilatorio
            if (this.type === 'byte_golem') {
                // Byte Golem salta y flota en arcos rítmicos
                this.x = 420 + Math.sin(this.animTimer * 0.04 * speedMult) * 160;
                this.y = 190 + Math.abs(Math.sin(this.animTimer * 0.06 * speedMult)) * -45;
            } else if (this.type === 'glitch_titan') {
                // El Glitch Titan se mueve de izquierda a derecha patrullando el centro
                this.x = 420 + Math.sin(this.animTimer * 0.035 * speedMult) * 190;
                this.y = 190 + Math.cos(this.animTimer * 0.045 * speedMult) * 30;
            } else {
                // UltimateBug se mueve en forma de 8 más rápido y agresivo
                this.x = 420 + Math.sin(this.animTimer * 0.05 * speedMult) * 240;
                this.y = 180 + Math.sin(this.animTimer * 0.1 * speedMult) * 45;
            }

            // Disparo periódico de orbes (mucho más rápido en Furia)
            bossAttackTimer++;
            let baseInterval = this.type === 'byte_golem' ? 110 : (this.type === 'glitch_titan' ? 100 : 85);
            if (this.isEnraged) baseInterval = Math.round(baseInterval * 0.65); // 35% más rápido en Furia
            if (bossAttackTimer > baseInterval) {
                bossAttackTimer = 0;
                this.shoot(player);
            }
        },
        shoot(player) {
            window.soundSystem.playBossShoot();
            if (this.type === 'byte_golem') {
                // Byte Golem dispara cubos de datos dorados/verdes
                bossProjectiles.push({
                    x: this.x + this.w / 2,
                    y: this.y + this.h / 2,
                    vx: -3.2,
                    vy: 0,
                    radius: 11,
                    color: '#ffd438'
                });
                bossProjectiles.push({
                    x: this.x + this.w / 2,
                    y: this.y + this.h / 2,
                    vx: 3.2,
                    vy: 0,
                    radius: 11,
                    color: '#ffd438'
                });
                const angle = Math.atan2(player.y - this.y, player.x - this.x);
                bossProjectiles.push({
                    x: this.x + this.w / 2,
                    y: this.y + this.h / 2,
                    vx: Math.cos(angle) * 3.0,
                    vy: Math.sin(angle) * 3.0,
                    radius: 12,
                    color: '#2ed573'
                });
            } else if (this.type === 'glitch_titan') {
                // Glitch Titan dispara ráfagas triples púrpuras y hacia abajo
                bossProjectiles.push({
                    x: this.x + this.w / 2,
                    y: this.y + this.h / 2,
                    vx: -3.8,
                    vy: -1.0,
                    radius: 12,
                    color: '#e056fd'
                });
                bossProjectiles.push({
                    x: this.x + this.w / 2,
                    y: this.y + this.h / 2,
                    vx: 3.8,
                    vy: -1.0,
                    radius: 12,
                    color: '#e056fd'
                });
                const angle = Math.atan2(player.y - this.y, player.x - this.x);
                bossProjectiles.push({
                    x: this.x + this.w / 2,
                    y: this.y + this.h / 2,
                    vx: Math.cos(angle) * 3.4,
                    vy: Math.sin(angle) * 3.4,
                    radius: 14,
                    color: '#00d2d3'
                });
            } else {
                // UltimateBug dispara abanico cuádruple y ráfaga teledirigida rápida
                bossProjectiles.push({
                    x: this.x + this.w / 2,
                    y: this.y + this.h / 2,
                    vx: -4.2,
                    vy: 0,
                    radius: 11,
                    color: '#ff4757'
                });
                bossProjectiles.push({
                    x: this.x + this.w / 2,
                    y: this.y + this.h / 2,
                    vx: 4.2,
                    vy: 0,
                    radius: 11,
                    color: '#ff4757'
                });
                bossProjectiles.push({
                    x: this.x + this.w / 2,
                    y: this.y + this.h / 2,
                    vx: -3.0,
                    vy: 3.0,
                    radius: 11,
                    color: '#ffd438'
                });
                bossProjectiles.push({
                    x: this.x + this.w / 2,
                    y: this.y + this.h / 2,
                    vx: 3.0,
                    vy: 3.0,
                    radius: 11,
                    color: '#ffd438'
                });
                const angle = Math.atan2(player.y - this.y, player.x - this.x);
                bossProjectiles.push({
                    x: this.x + this.w / 2,
                    y: this.y + this.h / 2,
                    vx: Math.cos(angle) * 4.0,
                    vy: Math.sin(angle) * 4.0,
                    radius: 12,
                    color: '#ff4757'
                });
            }
        },
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
            
            // Flotación
            const floatOffset = Math.sin(this.animTimer * 0.05) * 8;
            ctx.translate(0, floatOffset);

            if (this.isHurt && Math.floor(this.animTimer / 4) % 2 === 0) {
                ctx.fillStyle = '#ffffff';
            } else {
                ctx.fillStyle = this.type === 'byte_golem' ? '#d35400' : (this.type === 'glitch_titan' ? '#8854d0' : '#ff4757');
            }

            if (this.type === 'byte_golem') {
                // Diseño de Byte Golem (Golem de Bloques y Chips de Silicio)
                ctx.fillRect(-40, -40, 80, 80);
                ctx.strokeStyle = '#ffd438';
                ctx.lineWidth = 3.5;
                ctx.strokeRect(-40, -40, 80, 80);

                // Ojos de circuitos
                ctx.fillStyle = '#2ed573';
                ctx.fillRect(-26, -20, 16, 12);
                ctx.fillRect(10, -20, 16, 12);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-22, -17, 8, 6);
                ctx.fillRect(14, -17, 8, 6);

                // Chip central / Núcleo
                ctx.fillStyle = '#161b22';
                ctx.fillRect(-18, 5, 36, 22);
                ctx.fillStyle = '#ffd438';
                ctx.font = 'bold 9px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('0101', 0, 20);

                // Puños flotantes de bits
                ctx.fillStyle = '#e67e22';
                ctx.fillRect(-62, -10, 18, 28);
                ctx.fillRect(44, -10, 18, 28);
            } else if (this.type === 'glitch_titan') {
                // Diseño de Glitch Titan (Hexagonal robótico cyber)
                ctx.fillRect(-45, -45, 90, 90);
                ctx.strokeStyle = '#00d2d3';
                ctx.lineWidth = 4;
                ctx.strokeRect(-45, -45, 90, 90);

                // Ojo visor cibernético
                ctx.fillStyle = '#00d2d3';
                ctx.fillRect(-30, -15, 60, 16);
                ctx.fillStyle = '#ffffff';
                const eyePupil = Math.sin(this.animTimer * 0.08) * 18;
                ctx.fillRect(-6 + eyePupil, -13, 12, 12);

                // Hombreras
                ctx.fillStyle = '#3867d6';
                ctx.fillRect(-65, -35, 20, 40);
                ctx.fillRect(45, -35, 20, 40);
            } else {
                // Diseño de UltimateBug of Destruction
                ctx.fillRect(-50, -50, 100, 100);
                ctx.strokeStyle = '#2ed573';
                ctx.lineWidth = 4;
                ctx.strokeRect(-50, -50, 100, 100);

                // Ojos malvados
                ctx.fillStyle = '#ffd438';
                ctx.fillRect(-35, -25, 25, 15);
                ctx.fillRect(10, -25, 25, 15);
                ctx.fillStyle = '#000000';
                ctx.fillRect(-22, -22, 10, 10);
                ctx.fillRect(22, -22, 10, 10);

                // Boca / Matriz
                ctx.fillStyle = '#0d1117';
                ctx.fillRect(-30, 10, 60, 20);
                ctx.fillStyle = '#ff4757';
                for (let i = -24; i < 28; i += 12) {
                    ctx.fillRect(i, 14, 6, 12);
                }

                // Patas
                ctx.strokeStyle = '#ff6b81';
                ctx.lineWidth = 5;
                const legWiggle = Math.sin(this.animTimer * 0.1) * 12;
                ctx.beginPath();
                ctx.moveTo(-50, -20); ctx.lineTo(-80, -35 + legWiggle); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-50, 20); ctx.lineTo(-85, 35 - legWiggle); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(50, -20); ctx.lineTo(80, -35 - legWiggle); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(50, 20); ctx.lineTo(85, 35 + legWiggle); ctx.stroke();

                // Corona
                ctx.fillStyle = '#ffd438';
                ctx.fillRect(-40, -65, 12, 16);
                ctx.fillRect(28, -65, 12, 16);
            }

            // Aura de Furia en llamas
            if (this.isEnraged) {
                ctx.strokeStyle = '#ff3838';
                ctx.lineWidth = 3 + Math.sin(this.animTimer * 0.3) * 2;
                ctx.beginPath();
                ctx.arc(0, 0, 65 + Math.sin(this.animTimer * 0.2) * 6, 0, Math.PI * 2);
                ctx.stroke();
            }

            ctx.restore();
        }
    };

    function updateBossHpUI() {
        if (!bossHud) return;
        const pct = Math.max(0, Math.round((boss.hp / boss.maxHp) * 100));
        bossHpFill.style.width = pct + '%';
        bossHpText.textContent = `${boss.hp}/${boss.maxHp} HP`;
    }

    // Keyboard Input
    const keys = { left: false, right: false, jump: false };

    window.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = true;
        if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = true;
        if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') {
            if (!keys.jump && gameState === 'PLAYING') player.jump();
            keys.jump = true;
        }
        if (e.code === 'KeyE') {
            if (gameState === 'PLAYING' && activeInteractable) {
                if (!activeInteractable.resolved) {
                    openChallenge(activeInteractable.challengeId);
                } else if (activeInteractable.type === 'door') {
                    advanceLevel();
                }
            }
        }
        if (e.code === 'KeyR' && gameState === 'PLAYING') {
            loadLevel(currentLevelIndex);
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
        if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
        if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') keys.jump = false;
    });

    // Virtual Touch Controls Listeners
    function setupTouchButton(btn, onDown, onUp) {
        if (!btn) return;
        const start = (e) => {
            e.preventDefault();
            onDown();
        };
        const end = (e) => {
            e.preventDefault();
            if (onUp) onUp();
        };
        btn.addEventListener('touchstart', start, { passive: false });
        btn.addEventListener('touchend', end, { passive: false });
        btn.addEventListener('mousedown', start);
        btn.addEventListener('mouseup', end);
        btn.addEventListener('mouseleave', end);
    }

    setupTouchButton(btnTouchLeft, () => { keys.left = true; }, () => { keys.left = false; });
    setupTouchButton(btnTouchRight, () => { keys.right = true; }, () => { keys.right = false; });
    setupTouchButton(btnTouchJump, () => {
        if (!keys.jump && gameState === 'PLAYING') player.jump();
        keys.jump = true;
    }, () => { keys.jump = false; });
    setupTouchButton(btnTouchInteract, () => {
        if (gameState === 'PLAYING' && activeInteractable) {
            if (!activeInteractable.resolved) {
                openChallenge(activeInteractable.challengeId);
            } else if (activeInteractable.type === 'door') {
                advanceLevel();
            }
        }
    });

    // PyDex Tabs & Modal Handling
    function showPyDexTab(tabKey) {
        pydexTabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === tabKey) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        const data = PYDEX_DATA[tabKey] || PYDEX_DATA.algoritmos;
        pydexTabContent.innerHTML = `
            <h4>${data.title}</h4>
            ${data.content}
        `;
    }

    pydexTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const key = tab.getAttribute('data-tab');
            showPyDexTab(key);
        });
    });

    function openPyDex() {
        showPyDexTab('algoritmos');
        pydexModal.classList.remove('hidden');
    }

    if (pydexBtn) pydexBtn.addEventListener('click', openPyDex);
    if (menuPydexBtn) menuPydexBtn.addEventListener('click', openPyDex);
    if (closePydexBtn) closePydexBtn.addEventListener('click', () => {
        pydexModal.classList.add('hidden');
    });

    soundBtn.addEventListener('click', () => {
        const active = window.soundSystem.toggleSound();
        soundBtn.textContent = active ? '🔊' : '🔇';
    });

    // ==========================================
    // DEFINICIÓN DE NIVELES (INCLUYE JEFE FINAL)
    // ==========================================
    const LEVELS = [
        {
            name: "Nivel 1: Algoritmos & Google Colab",
            isBossLevel: false,
            bgGradient: ['#0d1322', '#1a233a'],
            playerStart: { x: 50, y: 400 },
            platforms: [
                { x: 0, y: 480, w: 960, h: 60, type: 'ground' },
                { x: 180, y: 390, w: 140, h: 20 },
                { x: 380, y: 320, w: 160, h: 20 },
                { x: 600, y: 380, w: 140, h: 20 },
                { x: 780, y: 300, w: 120, h: 20 }
            ],
            coins: [
                { x: 200, y: 340, collected: false },
                { x: 280, y: 340, collected: false },
                { x: 400, y: 270, collected: false },
                { x: 500, y: 270, collected: false },
                { x: 670, y: 330, collected: false },
                { x: 840, y: 250, collected: false }
            ],
            interactables: [
                { x: 240, y: 350, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_1_1', resolved: false, label: 'Algoritmo' },
                { x: 450, y: 280, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_1_2', resolved: false, label: 'Colab' },
                { x: 740, y: 400, w: 24, h: 80, type: 'door', challengeId: 'door_1', resolved: false, label: 'Puerta 1' }
            ],
            enemies: [], // Sin enemigos en el nivel 1 de introducción
            goal: { x: 900, y: 420, w: 36, h: 60 }
        },
        {
            name: "Nivel 2: Variables & Print / Input",
            isBossLevel: false,
            bgGradient: ['#121b2b', '#203a43'],
            playerStart: { x: 50, y: 400 },
            platforms: [
                { x: 0, y: 480, w: 320, h: 60, type: 'ground' },
                { x: 400, y: 480, w: 560, h: 60, type: 'ground' },
                { x: 120, y: 380, w: 120, h: 20 },
                { x: 280, y: 300, w: 140, h: 20 },
                { x: 480, y: 360, w: 140, h: 20 },
                { x: 680, y: 280, w: 150, h: 20 }
            ],
            coins: [
                { x: 140, y: 330, collected: false },
                { x: 350, y: 250, collected: false },
                { x: 500, y: 310, collected: false },
                { x: 750, y: 230, collected: false },
                { x: 880, y: 430, collected: false }
            ],
            interactables: [
                { x: 170, y: 340, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_2_1', resolved: false, label: 'Bug Print' },
                { x: 550, y: 320, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_2_2', resolved: false, label: 'Variables' },
                { x: 780, y: 400, w: 24, h: 80, type: 'door', challengeId: 'door_2', resolved: false, label: 'Puerta Input' }
            ],
            enemies: [
                { x: 460, y: 454, minX: 420, maxX: 640, vx: 1.6, w: 26, h: 26, alive: true },
                { x: 690, y: 254, minX: 680, maxX: 810, vx: 1.4, w: 26, h: 26, alive: true }
            ],
            goal: { x: 910, y: 420, w: 36, h: 60 }
        },
        {
            name: "Nivel 3: Condicionales If / Else",
            isBossLevel: false,
            bgGradient: ['#1a1423', '#2d1b36'],
            playerStart: { x: 50, y: 400 },
            platforms: [
                { x: 0, y: 480, w: 960, h: 60, type: 'ground' },
                { x: 140, y: 390, w: 130, h: 20 },
                { x: 340, y: 310, w: 140, h: 20 },
                { x: 540, y: 250, w: 140, h: 20 },
                { x: 730, y: 330, w: 120, h: 20 }
            ],
            coins: [
                { x: 150, y: 340, collected: false },
                { x: 350, y: 260, collected: false },
                { x: 550, y: 200, collected: false },
                { x: 620, y: 200, collected: false },
                { x: 780, y: 280, collected: false }
            ],
            interactables: [
                { x: 230, y: 350, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_3_1', resolved: false, label: 'Dos Puntos' },
                { x: 430, y: 270, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_3_2', resolved: false, label: 'Bug Else' },
                { x: 760, y: 400, w: 24, h: 80, type: 'door', challengeId: 'door_3', resolved: false, label: 'Puerta ==' }
            ],
            enemies: [
                { x: 360, y: 284, minX: 340, maxX: 460, vx: 1.5, w: 26, h: 26, alive: true },
                { x: 560, y: 224, minX: 540, maxX: 660, vx: 1.8, w: 26, h: 26, alive: true },
                { x: 520, y: 454, minX: 420, maxX: 700, vx: 2.0, w: 26, h: 26, alive: true }
            ],
            goal: { x: 910, y: 420, w: 36, h: 60 }
        },
        {
            name: "Nivel 4: Listas & Estructuras",
            isBossLevel: false,
            bgGradient: ['#0f2027', '#203a43'],
            playerStart: { x: 50, y: 400 },
            platforms: [
                { x: 0, y: 480, w: 960, h: 60, type: 'ground' },
                { x: 100, y: 390, w: 130, h: 20 },
                { x: 250, y: 320, w: 140, h: 20 },
                { x: 440, y: 350, w: 140, h: 20 },
                { x: 620, y: 380, w: 140, h: 20 }
            ],
            coins: [
                { x: 120, y: 340, collected: false },
                { x: 320, y: 270, collected: false },
                { x: 490, y: 300, collected: false },
                { x: 670, y: 330, collected: false },
                { x: 880, y: 430, collected: false }
            ],
            interactables: [
                { x: 260, y: 280, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_4_1', resolved: false, label: 'Corchetes' },
                { x: 500, y: 310, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_4_2', resolved: false, label: 'Append' },
                { x: 770, y: 400, w: 24, h: 80, type: 'door', challengeId: 'door_4', resolved: false, label: 'Puerta [0]' }
            ],
            enemies: [
                { x: 460, y: 324, minX: 440, maxX: 560, vx: 1.6, w: 26, h: 26, alive: true },
                { x: 640, y: 354, minX: 620, maxX: 740, vx: 1.6, w: 26, h: 26, alive: true },
                { x: 380, y: 454, minX: 200, maxX: 680, vx: 2.0, w: 26, h: 26, alive: true }
            ],
            goal: { x: 910, y: 420, w: 36, h: 60 }
        },
        {
            name: "Nivel 5: 🤖 BATALLA vs BYTE GOLEM (MINIJEFE)",
            isBossLevel: true,
            bossType: 'byte_golem',
            bossName: '👾 BYTE GOLEM (MINIJEFE)',
            bossMaxHp: 3,
            bgGradient: ['#1f1406', '#3d250c'],
            playerStart: { x: 60, y: 400 },
            platforms: [
                { x: 0, y: 480, w: 960, h: 60, type: 'ground' },
                { x: 90, y: 370, w: 140, h: 20 },
                { x: 730, y: 370, w: 140, h: 20 },
                { x: 410, y: 410, w: 140, h: 20 }
            ],
            coins: [
                { x: 150, y: 320, collected: false },
                { x: 480, y: 360, collected: false },
                { x: 780, y: 320, collected: false }
            ],
            interactables: [
                { x: 140, y: 330, w: 36, h: 40, type: 'terminal', challengeId: 'byte_golem_1', resolved: false, label: '⚡ ATAQUE .POP' },
                { x: 770, y: 330, w: 36, h: 40, type: 'terminal', challengeId: 'byte_golem_2', resolved: false, label: '⚡ ATAQUE IN' },
                { x: 460, y: 370, w: 36, h: 40, type: 'terminal', challengeId: 'byte_golem_3', resolved: false, label: '⚡ GOLPE LEN' }
            ],
            enemies: [],
            goal: { x: 920, y: 420, w: 36, h: 60 }
        },
        {
            name: "Nivel 6: Bucles & Funciones",
            isBossLevel: false,
            bgGradient: ['#161226', '#2b1b42'],
            playerStart: { x: 50, y: 400 },
            platforms: [
                { x: 0, y: 480, w: 960, h: 60, type: 'ground' },
                { x: 130, y: 390, w: 120, h: 20 },
                { x: 300, y: 310, w: 130, h: 20 },
                { x: 500, y: 250, w: 150, h: 20 },
                { x: 720, y: 330, w: 130, h: 20 }
            ],
            coins: [
                { x: 150, y: 340, collected: false },
                { x: 380, y: 260, collected: false },
                { x: 530, y: 200, collected: false },
                { x: 610, y: 200, collected: false },
                { x: 760, y: 280, collected: false }
            ],
            interactables: [
                { x: 310, y: 270, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_5_1', resolved: false, label: 'Dos Puntos For' },
                { x: 570, y: 210, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_5_2', resolved: false, label: 'While' },
                { x: 780, y: 400, w: 24, h: 80, type: 'door', challengeId: 'door_5', resolved: false, label: 'Puerta Return' }
            ],
            enemies: [
                { x: 140, y: 364, minX: 130, maxX: 230, vx: 1.6, w: 26, h: 26, alive: true },
                { x: 520, y: 224, minX: 500, maxX: 630, vx: 2.2, w: 26, h: 26, alive: true },
                { x: 450, y: 454, minX: 300, maxX: 700, vx: 2.4, w: 26, h: 26, alive: true }
            ],
            goal: { x: 910, y: 420, w: 36, h: 60 }
        },
        {
            name: "Nivel 7: Funciones & Retorno de Valores",
            isBossLevel: false,
            bgGradient: ['#0f172a', '#1e1b4b'],
            playerStart: { x: 50, y: 400 },
            platforms: [
                { x: 0, y: 480, w: 320, h: 60, type: 'ground' },
                { x: 400, y: 480, w: 560, h: 60, type: 'ground' },
                { x: 140, y: 380, w: 130, h: 20 },
                { x: 320, y: 300, w: 140, h: 20 },
                { x: 520, y: 360, w: 130, h: 20 },
                { x: 700, y: 280, w: 150, h: 20 }
            ],
            coins: [
                { x: 160, y: 330, collected: false },
                { x: 360, y: 250, collected: false },
                { x: 560, y: 310, collected: false },
                { x: 760, y: 230, collected: false }
            ],
            interactables: [
                { x: 190, y: 340, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_6_1', resolved: false, label: 'Return' },
                { x: 570, y: 320, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_6_2', resolved: false, label: 'Invocación' },
                { x: 780, y: 400, w: 24, h: 80, type: 'door', challengeId: 'door_6', resolved: false, label: 'Puerta Parámetros' }
            ],
            enemies: [
                { x: 470, y: 454, minX: 420, maxX: 660, vx: 2.0, w: 26, h: 26, alive: true },
                { x: 710, y: 254, minX: 700, maxX: 830, vx: 2.2, w: 26, h: 26, alive: true }
            ],
            goal: { x: 910, y: 420, w: 36, h: 60 }
        },
        {
            name: "Nivel 8: Métodos de Texto (Strings) & Lógica",
            isBossLevel: false,
            bgGradient: ['#1e1b4b', '#31103f'],
            playerStart: { x: 50, y: 400 },
            platforms: [
                { x: 0, y: 480, w: 960, h: 60, type: 'ground' },
                { x: 120, y: 390, w: 130, h: 20 },
                { x: 320, y: 310, w: 140, h: 20 },
                { x: 520, y: 240, w: 150, h: 20 },
                { x: 720, y: 330, w: 130, h: 20 }
            ],
            coins: [
                { x: 140, y: 340, collected: false },
                { x: 370, y: 260, collected: false },
                { x: 570, y: 190, collected: false },
                { x: 770, y: 280, collected: false }
            ],
            interactables: [
                { x: 160, y: 350, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_7_1', resolved: false, label: '.upper()' },
                { x: 380, y: 270, w: 32, h: 40, type: 'terminal', challengeId: 'terminal_7_2', resolved: false, label: 'len()' },
                { x: 780, y: 400, w: 24, h: 80, type: 'door', challengeId: 'door_7', resolved: false, label: 'Portal Titan' }
            ],
            enemies: [
                { x: 340, y: 284, minX: 320, maxX: 440, vx: 2.2, w: 26, h: 26, alive: true },
                { x: 540, y: 214, minX: 520, maxX: 650, vx: 2.4, w: 26, h: 26, alive: true },
                { x: 460, y: 454, minX: 320, maxX: 700, vx: 2.5, w: 26, h: 26, alive: true }
            ],
            goal: { x: 910, y: 420, w: 36, h: 60 }
        },
        {
            name: "Nivel 9: 🛡️ BATALLA vs GLITCH TITAN (SUBJEFE)",
            isBossLevel: true,
            bossType: 'glitch_titan',
            bossName: '👾 GLITCH TITAN (SUBJEFE)',
            bossMaxHp: 3,
            bgGradient: ['#180b29', '#3b1236'],
            playerStart: { x: 60, y: 400 },
            platforms: [
                { x: 0, y: 480, w: 960, h: 60, type: 'ground' },
                { x: 90, y: 370, w: 140, h: 20 },
                { x: 730, y: 370, w: 140, h: 20 },
                { x: 410, y: 410, w: 140, h: 20 }
            ],
            coins: [
                { x: 140, y: 320, collected: false },
                { x: 480, y: 360, collected: false },
                { x: 810, y: 320, collected: false }
            ],
            interactables: [
                { x: 140, y: 330, w: 36, h: 40, type: 'terminal', challengeId: 'miniboss_1', resolved: false, label: '⚡ ATAQUE INT' },
                { x: 770, y: 330, w: 36, h: 40, type: 'terminal', challengeId: 'miniboss_2', resolved: false, label: '⚡ ATAQUE !=' },
                { x: 460, y: 370, w: 36, h: 40, type: 'terminal', challengeId: 'miniboss_3', resolved: false, label: '⚡ GOLPE NOT' }
            ],
            enemies: [],
            goal: { x: 920, y: 420, w: 36, h: 60 }
        },
        {
            name: "Nivel 10: 🔥 BATALLA FINAL vs ULTIMATEBUG OF DESTRUCTION",
            isBossLevel: true,
            bossType: 'ultimate_bug',
            bossName: '👾 ULTIMATEBUG OF DESTRUCTION (JEFE DEFINITIVO)',
            bossMaxHp: 3,
            bgGradient: ['#200106', '#3b0d11'],
            playerStart: { x: 60, y: 400 },
            platforms: [
                { x: 0, y: 480, w: 960, h: 60, type: 'ground' },
                { x: 80, y: 370, w: 140, h: 20 },
                { x: 740, y: 370, w: 140, h: 20 },
                { x: 410, y: 410, w: 140, h: 20 }
            ],
            coins: [
                { x: 120, y: 320, collected: false },
                { x: 820, y: 320, collected: false },
                { x: 480, y: 360, collected: false }
            ],
            interactables: [
                { x: 130, y: 330, w: 36, h: 40, type: 'terminal', challengeId: 'boss_1', resolved: false, label: '⚡ ATAQUE 1' },
                { x: 790, y: 330, w: 36, h: 40, type: 'terminal', challengeId: 'boss_2', resolved: false, label: '⚡ ATAQUE 2' },
                { x: 460, y: 370, w: 36, h: 40, type: 'terminal', challengeId: 'boss_3', resolved: false, label: '⚡ GOLPE FINAL' }
            ],
            enemies: [],
            goal: { x: 920, y: 420, w: 36, h: 60 }
        }
    ];

    // ==========================================
    // CLASE JUGADOR (PYBOT PERSONALIZABLE)
    // ==========================================
    class Player {
        constructor() {
            this.w = 30;
            this.h = 42;
            this.color = '#3776ab';
            this.name = 'Nombre';
            this.invulnerableTimer = 0;
            this.reset();
        }

        reset(x = 50, y = 400) {
            this.x = x;
            this.y = y;
            this.vx = 0;
            this.vy = 0;
            this.speed = 4.6;
            this.jumpForce = -10.5;
            this.gravity = 0.48;
            this.isGrounded = false;
            this.facing = 'right';
            this.animFrame = 0;
            this.animTimer = 0;
            this.invulnerableTimer = 0;
        }

        jump() {
            if (this.isGrounded) {
                this.vy = jumpBuff ? -13.5 : this.jumpForce;
                this.isGrounded = false;
                window.soundSystem.playJump();
            }
        }

        update(level) {
            const currentSpeed = speedBuff ? 8.2 : this.speed;
            if (keys.left) {
                this.vx = -currentSpeed;
                this.facing = 'left';
            } else if (keys.right) {
                this.vx = currentSpeed;
                this.facing = 'right';
            } else {
                this.vx *= 0.7;
                if (Math.abs(this.vx) < 0.1) this.vx = 0;
            }

            this.vy += this.gravity;
            if (this.vy > 12) this.vy = 12;

            this.x += this.vx;
            this.checkHorizontalCollisions(level);

            this.y += this.vy;
            this.isGrounded = false;
            this.checkVerticalCollisions(level);

            if (this.x < 0) this.x = 0;
            if (this.x + this.w > canvas.width) this.x = canvas.width - this.w;

            if (this.y > canvas.height + 60) {
                if (godMode) {
                    const lvl = LEVELS[currentLevelIndex];
                    this.reset(lvl.playerStart.x, lvl.playerStart.y);
                } else {
                    this.takeDamage();
                }
            }

            if (this.invulnerableTimer > 0) {
                this.invulnerableTimer--;
            }

            this.animTimer++;
            if (this.animTimer > 8) {
                this.animFrame = (this.animFrame + 1) % 4;
                this.animTimer = 0;
            }
        }

        checkHorizontalCollisions(level) {
            for (let plat of level.platforms) {
                if (this.intersects(plat)) {
                    if (this.vx > 0) this.x = plat.x - this.w;
                    else if (this.vx < 0) this.x = plat.x + plat.w;
                }
            }

            for (let item of level.interactables) {
                if (item.type === 'door' && !item.resolved) {
                    if (this.intersects(item)) {
                        if (this.vx > 0) this.x = item.x - this.w;
                        else if (this.vx < 0) this.x = item.x + item.w;
                    }
                }
            }
        }

        checkVerticalCollisions(level) {
            for (let plat of level.platforms) {
                if (this.intersects(plat)) {
                    if (this.vy > 0) {
                        this.y = plat.y - this.h;
                        this.vy = 0;
                        this.isGrounded = true;
                    } else if (this.vy < 0) {
                        this.y = plat.y + plat.h;
                        this.vy = 0;
                    }
                }
            }
        }

        intersects(rect) {
            return (
                this.x < rect.x + rect.w &&
                this.x + this.w > rect.x &&
                this.y < rect.y + rect.h &&
                this.y + this.h > rect.y
            );
        }

        takeDamage() {
            if (godMode || gameState !== 'PLAYING') return;
            if (this.invulnerableTimer > 0) return;
            lives = Math.max(0, lives - 1);
            this.invulnerableTimer = 60; // 1 segundo de invulnerabilidad
            hudLives.textContent = lives;
            window.soundSystem.playError();
            if (lives <= 0) {
                triggerGameOver();
            }
        }

        draw(ctx) {
            // Parpadeo de invulnerabilidad
            if (this.invulnerableTimer > 0 && Math.floor(this.invulnerableTimer / 4) % 2 === 0) {
                return;
            }

            ctx.save();

            // Aura de buffs si tiene buffs activos
            if (speedBuff || jumpBuff || godMode || giantBuff) {
                ctx.save();
                ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
                ctx.strokeStyle = godMode ? '#ffd438' : (speedBuff ? '#00d2d3' : '#a29bfe');
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.arc(0, 0, (giantBuff ? 32 : 22) + Math.sin(this.animTimer * 0.2) * 3, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            ctx.fillStyle = '#ffd438';
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(this.name, this.x + this.w / 2, this.y - (giantBuff ? 18 : 8));

            ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
            if (this.facing === 'left') ctx.scale(-1, 1);
            if (giantBuff) ctx.scale(1.5, 1.5);

            // Renderizado según la Skin equipada
            let baseColor = this.color;
            let eyeColor = '#ffffff';
            let pupilColor = '#000000';
            let visorColor = null;

            if (equippedSkin === 'cyber_ninja') {
                baseColor = '#1e272e';
                eyeColor = '#ff3f34';
                pupilColor = '#ffffff';
                visorColor = '#ff3f34';
            } else if (equippedSkin === 'py_snake') {
                baseColor = '#10ac84';
                eyeColor = '#ffd32a';
                pupilColor = '#000000';
            } else if (equippedSkin === 'gold_master') {
                baseColor = '#ffd700';
                eyeColor = '#00d2d3';
                pupilColor = '#ffffff';
            } else if (equippedSkin === 'matrix_neo') {
                baseColor = '#006266';
                eyeColor = '#1dd1a1';
                pupilColor = '#ffffff';
            }

            // Cabeza
            ctx.fillStyle = baseColor;
            ctx.fillRect(-12, -20, 24, 18);

            // Visor Ninja / Corona Hacker
            if (visorColor) {
                ctx.fillStyle = visorColor;
                ctx.fillRect(-12, -16, 24, 6);
            }
            if (equippedSkin === 'gold_master') {
                ctx.fillStyle = '#ff9f43';
                ctx.fillRect(-10, -25, 20, 5);
            }

            // Ojos
            ctx.fillStyle = eyeColor;
            ctx.fillRect(0, -16, 9, 6);
            ctx.fillStyle = pupilColor;
            ctx.fillRect(3, -14, 4, 4);

            // Antena / Cresta
            ctx.fillStyle = equippedSkin === 'gold_master' ? '#ffffff' : '#ffd438';
            ctx.fillRect(-2, -24, 4, 4);

            // Torso
            ctx.fillStyle = equippedSkin === 'cyber_ninja' ? '#0d1117' : '#1e293b';
            ctx.fillRect(-10, -2, 20, 16);

            // Pecho / Núcleo
            ctx.fillStyle = baseColor;
            ctx.fillRect(-4, 2, 8, 6);

            // Piernas
            ctx.fillStyle = baseColor;
            const legOffset = (Math.abs(this.vx) > 0.1 && this.isGrounded) ? Math.sin(this.animTimer * 0.8) * 5 : 0;
            ctx.fillRect(-8, 14, 6, 8 + legOffset);
            ctx.fillRect(2, 14, 6, 8 - legOffset);

            ctx.restore();
        }
    }

    const player = new Player();

    // ==========================================
    // GESTIÓN DE NIVELES Y CICLO DE JUEGO
    // ==========================================
    function loadLevel(index) {
        currentLevelIndex = index;
        const level = LEVELS[index];
        hudLevelTitle.textContent = level.name;
        player.reset(level.playerStart.x, level.playerStart.y);
        activeInteractable = null;
        promptInteraction.classList.add('hidden');
        playerLaser = null;

        // Reiniciar terminales, puertas y desafíos del nivel
        if (level.interactables) {
            level.interactables.forEach(item => {
                item.resolved = false;
            });
        }

        // Reiniciar enemigos del nivel
        if (level.enemies) {
            level.enemies.forEach(e => {
                e.alive = true;
            });
        }

        if (level.isBossLevel) {
            boss.reset(level.bossType || 'ultimate_bug', level.bossMaxHp || 3, level.bossName || '👾 JEFE');
            bossHud.classList.remove('hidden');
            window.soundSystem.startBossBgm(); // MÚSICA EXCLUSIVA DE JEFES
        } else {
            bossHud.classList.add('hidden');
            window.soundSystem.stopBgm(); // SIN MÚSICA EN NIVELES NORMALES
        }
    }

    function updateSpeedrunTimer() {
        if (!isSpeedrunActive || gameState !== 'PLAYING') return;
        speedrunElapsedTime = Date.now() - speedrunStartTime;
        const totalSeconds = speedrunElapsedTime / 1000;
        const mins = Math.floor(totalSeconds / 60);
        const secs = Math.floor(totalSeconds % 60);
        const tenths = Math.floor((speedrunElapsedTime % 1000) / 100);
        const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${tenths}`;
        if (timerDisplay) timerDisplay.textContent = formatted;
    }

    function formatTime(ms) {
        const totalSeconds = ms / 1000;
        const mins = Math.floor(totalSeconds / 60);
        const secs = Math.floor(totalSeconds % 60);
        const tenths = Math.floor((ms % 1000) / 100);
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${tenths}`;
    }

    function startGame() {
        const nameEl = document.getElementById('player-name-input');
        chosenName = (nameEl ? nameEl.value.trim() : playerNameInput.value.trim()) || 'Nombre';
        player.name = chosenName;
        player.color = chosenColor;
        hudPlayerName.textContent = chosenName;

        // Leer directamente los checkboxes del DOM actual
        const currentSpeedrunToggle = document.getElementById('speedrun-toggle');
        const currentTouchToggle = document.getElementById('touch-controls-toggle');

        isSpeedrunActive = currentSpeedrunToggle ? currentSpeedrunToggle.checked : false;
        const isTouchActive = currentTouchToggle ? currentTouchToggle.checked : false;

        if (speedrunBox) {
            if (isSpeedrunActive) {
                speedrunBox.classList.remove('hidden');
                speedrunStartTime = Date.now();
                speedrunElapsedTime = 0;
                if (speedrunInterval) clearInterval(speedrunInterval);
                speedrunInterval = setInterval(updateSpeedrunTimer, 50);
            } else {
                speedrunBox.classList.add('hidden');
                if (speedrunInterval) clearInterval(speedrunInterval);
            }
        }

        if (virtualControls) {
            if (isTouchActive) {
                virtualControls.classList.remove('hidden');
            } else {
                virtualControls.classList.add('hidden');
            }
        }

        score = 0;
        // Las monedas NO se resetean a 0, se acumulan para la tienda de skins y mascotas
        lives = 3;
        hudScore.textContent = score;
        hudCoins.textContent = coins;
        hudLives.textContent = lives;

        LEVELS.forEach(lvl => {
            lvl.interactables.forEach(item => item.resolved = false);
            lvl.coins.forEach(c => c.collected = false);
            if (lvl.enemies) {
                lvl.enemies.forEach(e => e.alive = true);
            }
        });

        loadLevel(0);
        overlayScreen.classList.add('hidden');
        gameState = 'PLAYING';
    }

    function triggerGameOver() {
        gameState = 'GAMEOVER';
        bossHud.classList.add('hidden');
        if (speedrunInterval) clearInterval(speedrunInterval);
        screenTitle.textContent = "¡GAME OVER!";
        screenTitle.style.color = "var(--danger)";
        screenSubtitle.textContent = "¡El UltimateBug of Destruction te ha vencido! Inténtalo otra vez.";
        screenContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 10px;">
                <p>👤 <b>Programador/a:</b> ${player.name}</p>
                <p>⭐ <b>Puntos:</b> ${score} pts | 🪙 <b>Monedas:</b> ${coins}</p>
                ${isSpeedrunActive ? `<p style="color:#ffd438;">⏱️ <b>Tiempo Speedrun:</b> ${formatTime(speedrunElapsedTime)}</p>` : ''}
            </div>
            <p style="color: #ffd438; text-align: center;">¡No te rindas! Esquiva los disparos y programa el ataque.</p>
        `;
        startBtn.textContent = "🔄 REINTENTAR";
        overlayScreen.classList.remove('hidden');
    }

    function triggerWin() {
        gameState = 'WIN';
        bossHud.classList.add('hidden');
        if (speedrunInterval) clearInterval(speedrunInterval);
        window.soundSystem.playSuccess();

        // Elegir un código secreto de truco aleatorio como recompensa
        const randomReward = SECRET_CHEAT_REWARDS[Math.floor(Math.random() * SECRET_CHEAT_REWARDS.length)];

        screenTitle.textContent = "¡ULTIMATEBUG DESTRUIDO!";
        screenTitle.style.color = "var(--terminal-green)";
        screenSubtitle.textContent = "¡Has salvado todo el sistema derrotando al UltimateBug of Destruction!";
        
        screenContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 10px;">
                <span style="font-size: 38px;">👑</span>
                <h3 style="color: #ffd438; font-family: var(--font-arcade); font-size: 13px; margin-top: 4px;">¡Maestro/a de Python & Destructor/a de Bugs!</h3>
            </div>
            <p>👤 <b>Programador/a:</b> ${player.name} | ⭐ <b>Puntos:</b> ${score} pts</p>
            <p>🪙 <b>Monedas:</b> ${coins} | ❤️ <b>Vidas restantes:</b> ${lives}</p>
            ${isSpeedrunActive ? `<p style="color:#ffd438; font-size:13px; font-weight:bold; margin-top:6px;">⏱️ TIEMPO SPEEDRUN RÉCORD: ${formatTime(speedrunElapsedTime)}</p>` : ''}
            
            <!-- Recompensa: Código Secreto de Truco -->
            <div class="reward-cheat-card" style="margin-top: 12px; background: rgba(108, 92, 231, 0.2); border: 2px dashed #a29bfe; padding: 10px; border-radius: 8px; text-align: center;">
                <p style="color: #a29bfe; font-size: 11px; font-weight: bold; margin-bottom: 4px;">🎁 ¡CÓDIGO SECRETO DESBLOQUEADO!</p>
                <div style="font-family: var(--font-arcade); font-size: 14px; color: #ffd438; background: #0d1117; padding: 6px 12px; border-radius: 4px; display: inline-block; margin: 4px 0; border: 1px solid #ffd438;">
                    ${randomReward.code}
                </div>
                <p style="font-size: 11.5px; color: #f0f6fc; margin-top: 4px;"><b>${randomReward.title}:</b> ${randomReward.desc}</p>
                <p style="font-size: 10px; color: #8b949e; margin-top: 2px;">(Pruébalo en la consola de [TRUCOS] en tu próxima partida)</p>
            </div>
        `;
        startBtn.textContent = "🎮 JUGAR CON TRUCOS";
        overlayScreen.classList.remove('hidden');
    }

    startBtn.addEventListener('click', () => {
        window.soundSystem.init();
        if (gameState === 'START' || gameState === 'GAMEOVER' || gameState === 'WIN') {
            startGame();
        }
    });

    // Función para volver al Menú Principal
    function returnToMainMenu() {
        gameState = 'START';
        window.soundSystem.stopBgm();
        bossHud.classList.add('hidden');
        challengeModal.classList.add('hidden');
        cheatsModal.classList.add('hidden');
        promptInteraction.classList.add('hidden');

        screenTitle.textContent = "PYQUEST";
        screenTitle.style.color = "var(--accent-python-yellow)";
        screenSubtitle.textContent = "Aventura de Algoritmos & Python";

        // Reestablecer contenido del menú principal
        screenContent.innerHTML = `
            <div class="customizer-section">
                <label class="custom-label">👤 Tu Nombre de Programador/a:</label>
                <input type="text" id="player-name-input" class="arcade-input" placeholder="Escribe tu nombre..." maxlength="12" value="${player ? player.name : 'Nombre'}">

                <label class="custom-label" style="margin-top: 14px;">🎨 Elige tu Color:</label>
                <div class="color-picker-grid">
                    <button type="button" class="color-btn" data-color="#3776ab" style="background:#3776ab;" title="Azul Python"></button>
                    <button type="button" class="color-btn" data-color="#2ed573" style="background:#2ed573;" title="Verde Terminal"></button>
                    <button type="button" class="color-btn" data-color="#ff4757" style="background:#ff4757;" title="Rojo Rubí"></button>
                    <button type="button" class="color-btn" data-color="#e056fd" style="background:#e056fd;" title="Púrpura Cyber"></button>
                    <button type="button" class="color-btn" data-color="#ff9f43" style="background:#ff9f43;" title="Naranja Fuego"></button>
                    <button type="button" class="color-btn" data-color="#00d2d3" style="background:#00d2d3;" title="Cian Neón"></button>
                </div>

                <!-- Modos Especiales (Speedrun y Botones Táctiles / Modo Móvil) -->
                <div class="game-modes-toggles">
                    <label class="toggle-option">
                        <input type="checkbox" id="speedrun-toggle" ${isSpeedrunActive ? 'checked' : ''}>
                        <span>⏱️ Modo Speedrun (Cronómetro)</span>
                    </label>
                    <label class="toggle-option">
                        <input type="checkbox" id="touch-controls-toggle" ${virtualControls && !virtualControls.classList.contains('hidden') ? 'checked' : ''}>
                        <span>📱 Botones Virtuales (Modo Móvil / Vertical)</span>
                    </label>
                </div>

                <div class="character-preview-box" style="margin-top: 10px;">
                    <div id="preview-avatar">🤖</div>
                    <span id="preview-tag">Listo para jugar</span>
                </div>
            </div>

            <div class="controls-hint">
                <span>🎮 <b>Moverse:</b> [A][D] o Flechas | <b>Saltar:</b> [Espacio] | <b>Interactuar:</b> [E]</span>
            </div>
        `;

        // Re-vincular eventos de los botones de color generados
        document.querySelectorAll('.color-btn').forEach(btn => {
            if (btn.getAttribute('data-color') === chosenColor) {
                btn.classList.add('selected');
            }
            btn.addEventListener('click', () => {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                chosenColor = btn.getAttribute('data-color');
                if (player) player.color = chosenColor;
            });
        });

        const newNameInput = document.getElementById('player-name-input');
        if (newNameInput) {
            newNameInput.addEventListener('input', (e) => {
                chosenName = e.target.value.trim() || 'Nombre';
                if (player) player.name = chosenName;
                hudPlayerName.textContent = chosenName;
            });
        }

        startBtn.textContent = "▶ COMENZAR";
        overlayScreen.classList.remove('hidden');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            returnToMainMenu();
        });
    }

    // ==========================================
    // TIENDA DE SKINS (COMPRAS CON MONEDAS)
    // ==========================================
    const shopBtn = document.getElementById('shop-btn');
    const shopModal = document.getElementById('shop-modal');
    const closeShopBtn = document.getElementById('close-shop-btn');
    const shopBalance = document.getElementById('shop-coin-balance');
    const shopGrid = document.getElementById('shop-items-grid');

    const tabSkinsBtn = document.getElementById('tab-skins-btn');
    const tabPetsBtn = document.getElementById('tab-pets-btn');

    function openShop() {
        if (shopBalance) shopBalance.textContent = `${coins} 🪙`;
        renderShop();
        if (shopModal) shopModal.classList.remove('hidden');
    }

    if (tabSkinsBtn && tabPetsBtn) {
        tabSkinsBtn.addEventListener('click', () => {
            currentShopTab = 'skins';
            tabSkinsBtn.classList.add('active');
            tabPetsBtn.classList.remove('active');
            renderShop();
        });
        tabPetsBtn.addEventListener('click', () => {
            currentShopTab = 'pets';
            tabPetsBtn.classList.add('active');
            tabSkinsBtn.classList.remove('active');
            renderShop();
        });
    }

    function renderShop() {
        if (!shopGrid) return;
        shopGrid.innerHTML = '';

        const catalog = currentShopTab === 'skins' ? SKINS_CATALOG : PETS_CATALOG;
        const unlockedList = currentShopTab === 'skins' ? unlockedSkins : unlockedPets;
        const equippedId = currentShopTab === 'skins' ? equippedSkin : equippedPet;

        catalog.forEach(item => {
            const isUnlocked = unlockedList.includes(item.id);
            const isEquipped = equippedId === item.id;

            const card = document.createElement('div');
            card.className = `shop-card ${isEquipped ? 'equipped' : ''}`;

            let buttonHtml = '';
            if (isEquipped) {
                buttonHtml = `<button class="shop-action-btn equipped">✅ EQUIPADO</button>`;
            } else if (isUnlocked) {
                buttonHtml = `<button class="shop-action-btn equip" data-id="${item.id}">EQUIPAR</button>`;
            } else {
                const canAfford = coins >= item.price;
                buttonHtml = `<button class="shop-action-btn buy" data-id="${item.id}" data-price="${item.price}">${canAfford ? `COMPRAR (${item.price} 🪙)` : `🔒 ${item.price} 🪙`}</button>`;
            }

            card.innerHTML = `
                <div class="shop-avatar-preview">${item.icon}</div>
                <div class="shop-item-title">${item.name}</div>
                <div class="shop-item-desc">${item.desc}</div>
                ${buttonHtml}
            `;

            // Eventos de botones de compra y equipar
            const buyBtn = card.querySelector('.shop-action-btn.buy');
            if (buyBtn) {
                buyBtn.addEventListener('click', () => {
                    if (coins >= item.price) {
                        coins -= item.price;
                        hudCoins.textContent = coins;
                        unlockedList.push(item.id);
                        if (currentShopTab === 'skins') equippedSkin = item.id;
                        else equippedPet = item.id;
                        saveUserData();
                        window.soundSystem.playSuccess();
                        if (shopBalance) shopBalance.textContent = `${coins} 🪙`;
                        renderShop();
                    } else {
                        window.soundSystem.playError();
                        alert(`¡Te faltan ${item.price - coins} monedas para comprar esto! Recoge más en los niveles.`);
                    }
                });
            }

            const equipBtn = card.querySelector('.shop-action-btn.equip');
            if (equipBtn) {
                equipBtn.addEventListener('click', () => {
                    if (currentShopTab === 'skins') equippedSkin = item.id;
                    else equippedPet = item.id;
                    saveUserData();
                    window.soundSystem.playCoin();
                    renderShop();
                });
            }

            shopGrid.appendChild(card);
        });
    }

    if (shopBtn) {
        shopBtn.addEventListener('click', () => {
            openShop();
        });
    }

    if (closeShopBtn) {
        closeShopBtn.addEventListener('click', () => {
            if (shopModal) shopModal.classList.add('hidden');
        });
    }

    // ==========================================
    // SISTEMA DE COMANDOS Y TRUCOS (CHEATS)
    // ==========================================
    cheatsBtn.addEventListener('click', () => {
        cheatsModal.classList.remove('hidden');
        cheatInput.focus();
    });

    closeCheatsBtn.addEventListener('click', () => {
        cheatsModal.classList.add('hidden');
    });

    quickCheatButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            cheatInput.value = cmd;
            executeCheatCommand(cmd);
        });
    });

    runCheatBtn.addEventListener('click', () => {
        const cmd = cheatInput.value.trim();
        if (cmd) executeCheatCommand(cmd);
    });

    cheatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = cheatInput.value.trim();
            if (cmd) executeCheatCommand(cmd);
        }
    });

    function executeCheatCommand(commandStr) {
        const raw = commandStr.trim().toLowerCase();
        const parts = raw.split(/\s+/);
        const action = parts[0];
        const arg = parts[1];

        // Asegurar inicialización de nombre y color si venimos del menú
        chosenName = playerNameInput.value.trim() || 'Nombre';
        player.name = chosenName;
        player.color = chosenColor;
        hudPlayerName.textContent = chosenName;

        if (action === 'level' || action === 'nivel' || action === 'ir') {
            const targetLvl = parseInt(arg);
            if (!isNaN(targetLvl) && targetLvl >= 1 && targetLvl <= LEVELS.length) {
                const lvlIdx = targetLvl - 1;
                if (lives <= 0) {
                    lives = 3; // Restaurar vidas si venía de Game Over
                    hudLives.textContent = lives;
                }
                overlayScreen.classList.add('hidden');
                cheatsModal.classList.add('hidden');
                gameState = 'PLAYING';
                loadLevel(lvlIdx);
                window.soundSystem.playUnlock();
                cheatOutput.innerHTML = `✅ <b style="color:#2ed573;">Teletransportado al Nivel ${targetLvl}:</b> ${LEVELS[lvlIdx].name}`;
            } else {
                cheatOutput.innerHTML = `❌ <b style="color:#ff4757;">Nivel inválido.</b> Usa: <code>level 1</code> hasta <code>level ${LEVELS.length}</code>`;
            }
        } else if (action === 'speed' || action === 'rapido' || action === 'velocidad') {
            speedBuff = !speedBuff;
            window.soundSystem.playSuccess();
            cheatOutput.innerHTML = `⚡ <b style="color:#00d2d3;">Súper Velocidad:</b> ${speedBuff ? '<span style="color:#2ed573;">ACTIVADA (2x velocidad)</span>' : '<span style="color:#ff4757;">DESACTIVADA</span>'}`;
        } else if (action === 'jump' || action === 'salto' || action === 'supersalto') {
            jumpBuff = !jumpBuff;
            window.soundSystem.playSuccess();
            cheatOutput.innerHTML = `🦘 <b style="color:#a29bfe;">Mega Salto:</b> ${jumpBuff ? '<span style="color:#2ed573;">ACTIVADO (+50% altura)</span>' : '<span style="color:#ff4757;">DESACTIVADO</span>'}`;
        } else if (action === 'magnet' || action === 'iman') {
            magnetBuff = !magnetBuff;
            window.soundSystem.playSuccess();
            cheatOutput.innerHTML = `🧲 <b style="color:#ffd438;">Imán de Monedas:</b> ${magnetBuff ? '<span style="color:#2ed573;">ACTIVADO (Atracción magnética)</span>' : '<span style="color:#ff4757;">DESACTIVADO</span>'}`;
        } else if (action === 'giant' || action === 'gigante') {
            giantBuff = !giantBuff;
            window.soundSystem.playSuccess();
            cheatOutput.innerHTML = `🤖 <b style="color:#ff9f43;">Robot Gigante:</b> ${giantBuff ? '<span style="color:#2ed573;">ACTIVADO (1.5x tamaño)</span>' : '<span style="color:#ff4757;">DESACTIVADO</span>'}`;
        } else if (action === 'godmode' || action === 'god' || action === 'invencible') {
            godMode = !godMode;
            cheatOutput.innerHTML = `🛡️ <b style="color:#ffd438;">Modo Dios:</b> ${godMode ? '<span style="color:#2ed573;">ACTIVADO (Inmune a daño y caídas)</span>' : '<span style="color:#ff4757;">DESACTIVADO</span>'}`;
            window.soundSystem.playSuccess();
        } else if (action === 'coins' || action === 'monedas') {
            const amount = parseInt(arg) || 50;
            coins += amount;
            score += amount * 10;
            hudCoins.textContent = coins;
            hudScore.textContent = score;
            saveUserData();
            window.soundSystem.playCoin();
            cheatOutput.innerHTML = `🪙 <b style="color:#ffd438;">+${amount} Monedas otorgadas!</b> Puntos actualizados.`;
        } else if (action === 'lives' || action === 'vidas') {
            const amount = parseInt(arg) || 5;
            lives = amount;
            hudLives.textContent = lives;
            window.soundSystem.playSuccess();
            cheatOutput.innerHTML = `❤️ <b style="color:#2ed573;">Vidas establecidas en: ${lives}</b>`;
        } else if (action === 'unlock' || action === 'abrir') {
            const lvl = LEVELS[currentLevelIndex];
            lvl.interactables.forEach(item => item.resolved = true);
            window.soundSystem.playUnlock();
            cheatOutput.innerHTML = `🔓 <b style="color:#2ed573;">Todas las puertas y terminales del nivel actual han sido desbloqueadas!</b>`;
        } else if (action === 'boss' || action === 'jefe') {
            overlayScreen.classList.add('hidden');
            cheatsModal.classList.add('hidden');
            gameState = 'PLAYING';
            loadLevel(LEVELS.length - 1);
            window.soundSystem.playBossShoot();
            cheatOutput.innerHTML = `👾 <b style="color:#ff4757;">Arena del UltimateBug of Destruction activada!</b>`;
        } else if (action === 'help' || action === 'ayuda') {
            cheatOutput.innerHTML = `🔒 <i>Los códigos son secretos. ¡Supera los desafíos y derrota al UltimateBug para descubrirlos!</i>`;
        } else {
            cheatOutput.innerHTML = `❌ <b style="color:#ff4757;">Código no reconocido ('${raw}').</b> Revisa si lo escribiste bien o gana la partida para conseguir códigos válidos.`;
        }
    }

    function advanceLevel() {
        window.soundSystem.playUnlock();
        if (currentLevelIndex + 1 < LEVELS.length) {
            loadLevel(currentLevelIndex + 1);
        } else {
            triggerWin();
        }
    }

    // ==========================================
    // SISTEMA DE INTERACCIONES Y MODAL DE RETOS
    // ==========================================
    function checkInteractions(level) {
        let nearby = null;
        for (let item of level.interactables) {
            const dist = Math.hypot(
                (player.x + player.w / 2) - (item.x + item.w / 2),
                (player.y + player.h / 2) - (item.y + item.h / 2)
            );
            if (dist < 65) {
                nearby = item;
                break;
            }
        }

        activeInteractable = nearby;
        if (activeInteractable) {
            if (!activeInteractable.resolved) {
                promptInteraction.innerHTML = `<span>Presiona <b>[E]</b> para interactuar</span>`;
                promptInteraction.classList.remove('hidden');
            } else if (activeInteractable.type === 'door') {
                promptInteraction.innerHTML = `<span>Presiona <b>[E]</b> para entrar al siguiente nivel 🚪</span>`;
                promptInteraction.classList.remove('hidden');
            } else {
                promptInteraction.classList.add('hidden');
            }
        } else {
            promptInteraction.classList.add('hidden');
        }

        if (activeInteractable && activeInteractable.type === 'door' && activeInteractable.resolved) {
            if (player.intersects(activeInteractable)) {
                advanceLevel();
                return;
            }
        }

        // Monedas & Imán de Monedas
        for (let coin of level.coins) {
            if (!coin.collected) {
                // Si el Imán está activo, atraer la moneda suavemente al jugador
                if (magnetBuff) {
                    const cDist = Math.hypot(player.x - coin.x, player.y - coin.y);
                    if (cDist < 260) {
                        coin.x += (player.x - coin.x) * 0.12;
                        coin.y += (player.y - coin.y) * 0.12;
                    }
                }

                const coinRect = { x: coin.x - 8, y: coin.y - 8, w: 16, h: 16 };
                if (player.intersects(coinRect)) {
                    coin.collected = true;
                    coins++;
                    score += 15;
                    hudCoins.textContent = coins;
                    hudScore.textContent = score;
                    saveUserData();
                    window.soundSystem.playCoin();
                }
            }
        }

        // Actualizar y Comprobar Colisiones con Enemigos Comunes (Bugs)
        if (level.enemies) {
            for (let enemy of level.enemies) {
                if (!enemy.alive) continue;

                // Movimiento de patrulla
                enemy.x += enemy.vx;
                if (enemy.x <= enemy.minX || enemy.x + enemy.w >= enemy.maxX) {
                    enemy.vx = -enemy.vx; // Cambiar dirección al llegar al borde de la plataforma
                }

                // Chequear colisión con el jugador
                const enemyRect = { x: enemy.x, y: enemy.y, w: enemy.w, h: enemy.h };
                if (player.intersects(enemyRect)) {
                    // ¿El jugador viene cayendo y está por encima del centro del enemigo? (Pisotón / Stomp)
                    const playerBottom = player.y + player.h;
                    const enemyTop = enemy.y;

                    if (player.vy > 0 && playerBottom <= enemyTop + 14) {
                        // ¡Enemigo aplastado!
                        enemy.alive = false;
                        player.vy = -8.5; // Rebote de salto
                        score += 50;
                        hudScore.textContent = score;
                        window.soundSystem.playEnemySquash();
                    } else {
                        // El enemigo golpea al jugador por los lados o abajo
                        player.takeDamage();
                    }
                }
            }
        }

        // Actualizar lógica del Boss si estamos en el nivel del Jefe
        if (level.isBossLevel) {
            boss.update(player);

            // Actualizar proyectiles del Boss
            for (let i = bossProjectiles.length - 1; i >= 0; i--) {
                const proj = bossProjectiles[i];
                proj.x += proj.vx;
                proj.y += proj.vy;

                // Colisión proyectil con jugador
                const pDist = Math.hypot(
                    (player.x + player.w / 2) - proj.x,
                    (player.y + player.h / 2) - proj.y
                );
                if (pDist < proj.radius + player.w / 2) {
                    player.takeDamage();
                    bossProjectiles.splice(i, 1);
                    continue;
                }

                // Fuera de pantalla
                if (proj.x < 0 || proj.x > canvas.width || proj.y < 0 || proj.y > canvas.height) {
                    bossProjectiles.splice(i, 1);
                }
            }
        }
    }

    function openChallenge(challengeId) {
        const challenge = CHALLENGES[challengeId];
        if (!challenge) return;

        gameState = 'MODAL';
        activeChallengeId = challengeId;
        selectedOptionId = null;

        challengeBadge.textContent = challenge.category;
        challengeTitle.textContent = challenge.title;
        challengeDesc.innerHTML = challenge.description;

        feedbackBox.className = 'feedback-msg hidden';
        feedbackBox.textContent = '';
        hintText.classList.add('hidden');
        hintText.textContent = '';

        challengeArea.innerHTML = '';

        if (challenge.type === 'multiple_choice') {
            const grid = document.createElement('div');
            grid.className = 'options-grid';
            challenge.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerHTML = opt.text;
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    selectedOptionId = opt.id;
                });
                grid.appendChild(btn);
            });
            challengeArea.appendChild(grid);
        } else if (challenge.type === 'code_fix') {
            const editorBox = document.createElement('div');
            editorBox.className = 'code-editor-box';
            editorBox.innerHTML = `
                <div class="code-prefix"># Corrige el código aquí abajo:</div>
                <textarea id="code-input" spellcheck="false">${challenge.initialCode}</textarea>
            `;
            challengeArea.appendChild(editorBox);
        } else if (challenge.type === 'order_steps') {
            currentStepsOrder = [...challenge.steps].sort(() => Math.random() - 0.5);
            const list = document.createElement('div');
            list.className = 'order-list';
            renderOrderSteps(list);
            challengeArea.appendChild(list);
        }

        challengeModal.classList.remove('hidden');
    }

    function renderOrderSteps(container) {
        container.innerHTML = '';
        currentStepsOrder.forEach((step, idx) => {
            const item = document.createElement('div');
            item.className = 'order-item';
            item.innerHTML = `
                <span>${step.text}</span>
                <div class="order-controls">
                    <button type="button" class="btn-up" ${idx === 0 ? 'disabled' : ''}>▲</button>
                    <button type="button" class="btn-down" ${idx === currentStepsOrder.length - 1 ? 'disabled' : ''}>▼</button>
                </div>
            `;
            item.querySelector('.btn-up').addEventListener('click', () => {
                if (idx > 0) {
                    const temp = currentStepsOrder[idx];
                    currentStepsOrder[idx] = currentStepsOrder[idx - 1];
                    currentStepsOrder[idx - 1] = temp;
                    renderOrderSteps(container);
                }
            });
            item.querySelector('.btn-down').addEventListener('click', () => {
                if (idx < currentStepsOrder.length - 1) {
                    const temp = currentStepsOrder[idx];
                    currentStepsOrder[idx] = currentStepsOrder[idx + 1];
                    currentStepsOrder[idx + 1] = temp;
                    renderOrderSteps(container);
                }
            });
            container.appendChild(item);
        });
    }

    hintBtn.addEventListener('click', () => {
        const challenge = CHALLENGES[activeChallengeId];
        if (challenge && challenge.hint) {
            hintText.innerHTML = `<b>Pista:</b> ${challenge.hint}`;
            hintText.classList.remove('hidden');
            score = Math.max(0, score - 10);
            hudScore.textContent = score;
        }
    });

    submitBtn.addEventListener('click', () => {
        const challenge = CHALLENGES[activeChallengeId];
        if (!challenge) return;

        let isCorrect = false;

        if (challenge.type === 'multiple_choice') {
            if (!selectedOptionId) {
                showFeedback("⚠️ Elige una opción primero.", false);
                return;
            }
            const chosen = challenge.options.find(o => o.id === selectedOptionId);
            isCorrect = !!(chosen && chosen.correct);
        } else if (challenge.type === 'code_fix') {
            const userCode = document.getElementById('code-input').value.trim();
            isCorrect = challenge.validationRegex.test(userCode);
        } else if (challenge.type === 'order_steps') {
            isCorrect = currentStepsOrder.every((step, idx) => step.correctIndex === idx);
        }

        if (isCorrect) {
            window.soundSystem.playSuccess();
            showFeedback(`✅ ¡Correcto! ${challenge.explanation}`, true);
            score += 150;
            hudScore.textContent = score;

            if (activeInteractable) {
                activeInteractable.resolved = true;
            }

            // Si es el nivel del Boss, disparar Láser Especial del Jugador y bajarle vida
            const currentLevel = LEVELS[currentLevelIndex];
            if (currentLevel.isBossLevel) {
                playerLaser = {
                    startX: player.x + player.w / 2,
                    startY: player.y + player.h / 2,
                    targetX: boss.x + boss.w / 2,
                    targetY: boss.y + boss.h / 2,
                    timer: 35,
                    maxTimer: 35
                };
                window.soundSystem.playLaserAttack();
                boss.takeDamage();
            }

            setTimeout(() => {
                challengeModal.classList.add('hidden');
                gameState = 'PLAYING';

                // Si el Boss llega a 0 de vida
                if (currentLevel.isBossLevel && boss.hp <= 0) {
                    setTimeout(() => {
                        if (currentLevelIndex + 1 < LEVELS.length) {
                            advanceLevel();
                        } else {
                            triggerWin();
                        }
                    }, 500);
                }
            }, 1400);
        } else {
            window.soundSystem.playError();
            showFeedback("❌ Aún no es correcto. ¡Revisa o pide una pista!", false);
        }
    });

    function showFeedback(msg, isSuccess) {
        feedbackBox.textContent = msg;
        feedbackBox.className = `feedback-msg ${isSuccess ? 'success' : 'error'}`;
        feedbackBox.classList.remove('hidden');
    }

    closeModalBtn.addEventListener('click', () => {
        challengeModal.classList.add('hidden');
        gameState = 'PLAYING';
    });

    // ==========================================
    // RENDERIZADO (CANVAS)
    // ==========================================
    function drawLevel(level) {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGrad.addColorStop(0, level.bgGradient[0]);
        bgGrad.addColorStop(1, level.bgGradient[1]);
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Cuadrícula sutil
        ctx.strokeStyle = level.isBossLevel ? "rgba(255, 71, 87, 0.08)" : "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Plataformas
        for (let plat of level.platforms) {
            if (plat.type === 'ground') {
                ctx.fillStyle = '#161b22';
                ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
                ctx.fillStyle = level.isBossLevel ? '#ff4757' : '#3776ab';
                ctx.fillRect(plat.x, plat.y, plat.w, 4);
            } else {
                ctx.fillStyle = '#21262d';
                ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
                ctx.fillStyle = '#ffd438';
                ctx.fillRect(plat.x, plat.y, plat.w, 3);
            }
        }

        // Dibujar Boss si corresponde
        if (level.isBossLevel) {
            boss.draw(ctx);

            // Dibujar proyectiles de bugs / jefes
            for (let proj of bossProjectiles) {
                ctx.save();
                ctx.fillStyle = proj.color || '#ff4757';
                ctx.beginPath();
                ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#ffd438';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            }

            // Dibujar Rayo Láser Especial del Jugador
            if (playerLaser && playerLaser.timer > 0) {
                ctx.save();
                const progress = playerLaser.timer / playerLaser.maxTimer;
                ctx.strokeStyle = `rgba(0, 210, 211, ${progress})`;
                ctx.lineWidth = 10 * progress + 2;
                ctx.beginPath();
                ctx.moveTo(playerLaser.startX, playerLaser.startY);
                ctx.lineTo(playerLaser.targetX, playerLaser.targetY);
                ctx.stroke();

                // Núcleo blanco del láser
                ctx.strokeStyle = `rgba(255, 255, 255, ${progress})`;
                ctx.lineWidth = 4 * progress + 1;
                ctx.beginPath();
                ctx.moveTo(playerLaser.startX, playerLaser.startY);
                ctx.lineTo(playerLaser.targetX, playerLaser.targetY);
                ctx.stroke();

                // Destello en el impacto
                ctx.fillStyle = `rgba(255, 212, 56, ${progress})`;
                ctx.beginPath();
                ctx.arc(playerLaser.targetX, playerLaser.targetY, 20 * progress + 5, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
                playerLaser.timer--;
                if (playerLaser.timer <= 0) playerLaser = null;
            }
        }

        // Dibujar Enemigos Comunes (Bugs patrulleros)
        if (level.enemies) {
            for (let enemy of level.enemies) {
                if (!enemy.alive) continue;

                ctx.save();
                ctx.translate(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2);
                if (enemy.vx < 0) ctx.scale(-1, 1);

                // Cuerpo del Bug (Rojo/Oscuro)
                ctx.fillStyle = '#ff4757';
                ctx.fillRect(-10, -8, 20, 16);

                // Caparazón / Borde
                ctx.strokeStyle = '#2f3542';
                ctx.lineWidth = 2;
                ctx.strokeRect(-10, -8, 20, 16);

                // Ojos pixelados
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(2, -6, 5, 5);
                ctx.fillStyle = '#000000';
                ctx.fillRect(4, -5, 3, 3);

                // Antenas
                ctx.strokeStyle = '#ffd438';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(6, -8);
                ctx.lineTo(11, -13);
                ctx.stroke();

                // Patitas animadas al caminar
                ctx.strokeStyle = '#ff6b81';
                ctx.lineWidth = 2;
                const legWiggle = Math.sin(Date.now() * 0.015) * 3;
                ctx.beginPath();
                ctx.moveTo(-6, 8); ctx.lineTo(-9, 12 + legWiggle); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, 8); ctx.lineTo(0, 12 - legWiggle); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(6, 8); ctx.lineTo(9, 12 + legWiggle); ctx.stroke();

                ctx.restore();
            }
        }

        // Monedas
        for (let coin of level.coins) {
            if (!coin.collected) {
                ctx.save();
                ctx.translate(coin.x, coin.y + Math.sin(Date.now() * 0.005) * 3);
                ctx.fillStyle = '#ffd438';
                ctx.beginPath();
                ctx.arc(0, 0, 7, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.font = 'bold 8px monospace';
                ctx.fillText('1', -2, 3);
                ctx.restore();
            }
        }

        // Interactables
        for (let item of level.interactables) {
            if (item.type === 'terminal') {
                ctx.fillStyle = item.resolved ? '#238636' : (level.isBossLevel ? '#d63031' : '#1f6feb');
                ctx.fillRect(item.x, item.y, item.w, item.h);
                ctx.fillStyle = '#0d1117';
                ctx.fillRect(item.x + 4, item.y + 4, item.w - 8, item.h - 16);
                ctx.fillStyle = item.resolved ? '#39ff14' : '#ffd438';
                ctx.font = '8px monospace';
                ctx.fillText(item.resolved ? 'OK' : '>_', item.x + 8, item.y + 18);

                ctx.fillStyle = '#c9d1d9';
                ctx.font = '9px monospace';
                ctx.fillText(item.label, item.x - 6, item.y - 6);
            } else if (item.type === 'door') {
                if (!item.resolved) {
                    ctx.fillStyle = 'rgba(255, 71, 87, 0.35)';
                    ctx.fillRect(item.x, item.y, item.w, item.h);
                    ctx.strokeStyle = '#ff4757';
                    ctx.lineWidth = 2.5;
                    ctx.strokeRect(item.x, item.y, item.w, item.h);
                    ctx.fillStyle = '#ff4757';
                    ctx.font = '9px monospace';
                    ctx.fillText('🔒 CERRADO', item.x - 12, item.y - 8);
                } else {
                    ctx.fillStyle = 'rgba(46, 213, 115, 0.25)';
                    ctx.fillRect(item.x, item.y, item.w, item.h);
                    ctx.strokeStyle = '#2ed573';
                    ctx.strokeRect(item.x, item.y, item.w, item.h);
                    ctx.fillStyle = '#39ff14';
                    ctx.font = 'bold 9px monospace';
                    ctx.fillText('🚪 [E] ENTRAR', item.x - 18, item.y - 8);
                }
            }
        }
    }

    function gameLoop() {
        if (gameState === 'PLAYING') {
            const currentLevel = LEVELS[currentLevelIndex];
            player.update(currentLevel);
            petState.update(player);
            checkInteractions(currentLevel);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawLevel(currentLevel);
            player.draw(ctx);
            petState.draw(ctx);
        }

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
});
