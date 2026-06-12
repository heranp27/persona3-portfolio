let audioContext;
let lastPlayedAt = 0;

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  return audioContext;
}

function createNoiseBuffer(ctx, duration) {
  const frameCount = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, frameCount, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / frameCount);
  }

  return buffer;
}

export function playSelectSound() {
  if (typeof window === "undefined") return;

  const now = window.performance.now();
  if (now - lastPlayedAt < 45) return;
  lastPlayedAt = now;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const start = ctx.currentTime;
  const end = start + 0.13;
  const master = ctx.createGain();
  const highPass = ctx.createBiquadFilter();

  highPass.type = "highpass";
  highPass.frequency.setValueAtTime(650, start);
  master.gain.setValueAtTime(0.0001, start);
  master.gain.exponentialRampToValueAtTime(0.12, start + 0.008);
  master.gain.exponentialRampToValueAtTime(0.0001, end);
  highPass.connect(master);
  master.connect(ctx.destination);

  const body = ctx.createOscillator();
  body.type = "square";
  body.frequency.setValueAtTime(920, start);
  body.frequency.exponentialRampToValueAtTime(620, end);
  body.connect(highPass);

  const shine = ctx.createOscillator();
  const shineGain = ctx.createGain();
  shine.type = "triangle";
  shine.frequency.setValueAtTime(1840, start);
  shine.frequency.exponentialRampToValueAtTime(1220, start + 0.08);
  shineGain.gain.setValueAtTime(0.28, start);
  shineGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.085);
  shine.connect(shineGain);
  shineGain.connect(highPass);

  const snap = ctx.createBufferSource();
  const snapGain = ctx.createGain();
  snap.buffer = createNoiseBuffer(ctx, 0.025);
  snapGain.gain.setValueAtTime(0.17, start);
  snapGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.03);
  snap.connect(snapGain);
  snapGain.connect(highPass);

  body.start(start);
  shine.start(start);
  snap.start(start);
  body.stop(end);
  shine.stop(start + 0.09);
  snap.stop(start + 0.03);
}
