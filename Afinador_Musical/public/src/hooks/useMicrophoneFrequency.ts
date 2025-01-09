import { useState, useEffect } from "react";

export function useMicrophoneFrequency(isListening: boolean) {
    const [frequency, setFrequency] = useState<number | null>(null);

    useEffect(() => {
        if (!isListening) return; // Não inicializa se não estiver ouvindo

        let audioContext: AudioContext | null = null;
        let analyser: AnalyserNode | null = null;
        let microphone: MediaStreamAudioSourceNode | null = null;
        let animationFrameId: number;
        const bufferLength = 4096; // Tamanho do buffer

        const detectFrequency = async () => {
            try {
                audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                await audioContext.resume(); // Garante que o contexto esteja ativo

                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

                analyser = audioContext.createAnalyser();
                microphone = audioContext.createMediaStreamSource(stream);

                microphone.connect(analyser);
                analyser.fftSize = bufferLength;

                const buffer = new Float32Array(analyser.fftSize);

                const findFrequency = () => {
                    analyser!.getFloatTimeDomainData(buffer);

                    const autoCorrelation = (buffer: Float32Array, sampleRate: number): number => {
                        let bestOffset = -1;
                        let bestCorrelation = 0;
                        let rms = 0;

                        for (let i = 0; i < buffer.length; i++) {
                            const val = buffer[i];
                            rms += val * val;
                        }
                        rms = Math.sqrt(rms / buffer.length);

                        if (rms < 0.01) return -1; // Ruído insignificante

                        let lastCorrelation = 1;
                        for (let offset = 0; offset < buffer.length; offset++) {
                            let correlation = 0;
                            for (let i = 0; i < buffer.length - offset; i++) {
                                correlation += buffer[i] * buffer[i + offset];
                            }

                            if (correlation > lastCorrelation && correlation > bestCorrelation) {
                                bestCorrelation = correlation;
                                bestOffset = offset;
                            }
                            lastCorrelation = correlation;
                        }

                        if (bestCorrelation > 0.01) {
                            const frequency = sampleRate / bestOffset;
                            return frequency;
                        }
                        return -1;
                    };

                    const dominantFrequency = autoCorrelation(buffer, audioContext!.sampleRate);

                    // Atualize o estado com a frequência dominante (em tempo real)
                    setFrequency(dominantFrequency > 0 ? dominantFrequency : null);

                    // Continue o loop para detecção contínua
                    animationFrameId = requestAnimationFrame(findFrequency);
                };

                findFrequency();
            } catch (err) {
                console.error("Erro ao acessar o microfone:", err);
            }
        };

        detectFrequency();

        return () => {
            if (audioContext) audioContext.close();
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [isListening]); // Reage ao estado de "ouvindo"

    return frequency;
}
