import numpy as np, wave
from pathlib import Path
rng=np.random.default_rng(316);sr=22050
for name in ['tone','music','engine','ev','horn','npc','rain','ambient']:
    dur=2 if name=='tone' or name=='horn' else 4
    t=np.arange(sr*dur)/sr
    fade=np.minimum(1,np.minimum(t*18,(dur-t)*18)); noise=rng.uniform(-1,1,len(t))
    if name=='tone': x=.42*np.sin(2*np.pi*(440*t+35*t*t))*fade
    elif name=='engine':
        phase=2*np.pi*(65*t+1.4*np.sin(2*np.pi*t/4));x=.28*np.sin(phase)+.11*np.sin(2*phase)+.06*np.sin(3*phase)+.025*noise
    elif name=='ev': x=.24*np.sin(2*np.pi*(240*t+.8*np.sin(2*np.pi*t/4)))+.06*np.sin(2*np.pi*480*t)
    elif name=='horn': x=(.31*np.sin(2*np.pi*420*t)+.15*np.sin(2*np.pi*510*t))*((t<.65)|((t>.95)&(t<1.5))) *fade
    elif name=='npc':
        env=(.5+.5*np.sin(2*np.pi*3.7*t))*(.5+.5*np.sin(2*np.pi*.7*t));phase=2*np.pi*(155*t+1.2*np.sin(2*np.pi*2*t));x=env*(.21*np.sin(phase)+.08*np.sin(3*phase)+.06*np.sin(5*phase)+.06*noise)
    elif name=='rain': x=.23*noise+.1*np.roll(noise,1)
    elif name=='ambient': x=.12*np.convolve(noise,np.ones(18)/18,mode='same')+.065*np.sin(2*np.pi*97*t)+.035*np.sin(2*np.pi*173*t)
    else: x=sum(.085*np.sin(2*np.pi*f*t) for f in [220,261.5,329.5,392])*(.7+.3*np.cos(2*np.pi*t/4))
    x=x*np.minimum(1,np.minimum(t*80,(dur-t)*80));data=np.int16(np.clip(x,-1,1)*32767)
    with wave.open(str(Path('src/audio')/(name+'.wav')),'wb') as w:w.setparams((1,2,sr,len(data),'NONE','not compressed'));w.writeframes(data.tobytes())
