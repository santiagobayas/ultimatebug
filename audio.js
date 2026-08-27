// Sistema de Audio Sintetizado Retro usando Web Audio API
// Sin necesidad de archivos mp3 externos.

class AudioManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleSound() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    playJump() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.12);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.12);
    }

    playCoin() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
    }

    playSuccess() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const notes = [440, 554.37, 659.25, 880]; // A major arpeggio
        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0, now + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.18, now + i * 0.08 + 0.02);
            gain.gain.linearRampToValueAtTime(0.01, now + i * 0.08 + 0.2);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.08);
            osc.stop(now + i * 0.08 + 0.2);
        });
    }

    playError() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.25);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
    }

    playUnlock() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const freqs = [300, 400, 500, 600, 750];
        freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0.1, now + idx * 0.05);
            gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.05 + 0.1);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.05);
            osc.stop(now + idx * 0.05 + 0.1);
        });
    }

    playBossHit() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
    }

    playBossShoot() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(200, now + 0.15);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
    }

    playEnemySquash() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.1);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
    }

    playLaserAttack() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.35);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
    }

    // ==========================================
    // MÚSICA DE FONDO RETO CHIPTUNE SINTETIZADA
    // ==========================================
    startBossBgm() {
        if (!this.enabled) return;
        this.stopBgm();
        this.init();
        this.bgmMode = 'BOSS';
        let step = 0;
        // Melodía rápida y tensa en escala menor para jefes
        const bassLine = [110, 110, 130.81, 110, 98, 110, 146.83, 130.81]; // A2, C3, G2, D3
        const leadNotes = [220, 261.63, 329.63, 293.66, 261.63, 246.94, 220, 329.63];

        this.bgmInterval = setInterval(() => {
            if (!this.enabled || !this.ctx || this.bgmMode !== 'BOSS') return;
            const now = this.ctx.currentTime;
            
            // Bajo pesado
            const oscBass = this.ctx.createOscillator();
            const gainBass = this.ctx.createGain();
            oscBass.type = 'sawtooth';
            oscBass.frequency.value = bassLine[step % bassLine.length];
            gainBass.gain.setValueAtTime(0.08, now);
            gainBass.gain.linearRampToValueAtTime(0.01, now + 0.14);
            oscBass.connect(gainBass);
            gainBass.connect(this.ctx.destination);
            oscBass.start(now);
            oscBass.stop(now + 0.14);

            // Lead Synth
            if (step % 2 === 0) {
                const oscLead = this.ctx.createOscillator();
                const gainLead = this.ctx.createGain();
                oscLead.type = 'square';
                oscLead.frequency.value = leadNotes[(step / 2) % leadNotes.length] * 1.5;
                gainLead.gain.setValueAtTime(0.05, now);
                gainLead.gain.linearRampToValueAtTime(0.005, now + 0.22);
                oscLead.connect(gainLead);
                gainLead.connect(this.ctx.destination);
                oscLead.start(now);
                oscLead.stop(now + 0.22);
            }

            step++;
        }, 150); // 200 BPM rápido
    }

    startStageBgm() {
        if (!this.enabled) return;
        this.stopBgm();
        this.init();
        this.bgmMode = 'STAGE';
        let step = 0;
        const melody = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 392.00, 329.63]; // C, E, G, C5, A, F, G, E
        this.bgmInterval = setInterval(() => {
            if (!this.enabled || !this.ctx || this.bgmMode !== 'STAGE') return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = melody[step % melody.length];
            gain.gain.setValueAtTime(0.035, now);
            gain.gain.linearRampToValueAtTime(0.005, now + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.25);
            step++;
        }, 260);
    }

    stopBgm() {
        if (this.bgmInterval) {
            clearInterval(this.bgmInterval);
            this.bgmInterval = null;
        }
        this.bgmMode = null;
    }
}

window.soundSystem = new AudioManager();
