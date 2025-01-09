import React, { useState, useEffect } from "react";
import './App.css';
import { Tuner } from './tuner/tuner';
import { useMicrophoneFrequency } from './hooks/useMicrophoneFrequency';
import ErrorBoundary from './modal/ErrorBoundary';

function App() {
    const [isListening, setIsListening] = useState(false);
    const [lastValidFrequency, setLastValidFrequency] = useState<number | null>(null); // Armazena o último valor válido
    const microphoneFrequency = useMicrophoneFrequency(isListening);

    const startListening = () => {
        setIsListening(true);
    };

    useEffect(() => {
        if (microphoneFrequency !== null) {
            setLastValidFrequency(microphoneFrequency); // Atualiza o valor válido quando uma nova frequência é detectada
        }
    }, [microphoneFrequency]);

    return (
        <div className="container">
            <ErrorBoundary>
            
                <h1>Detector de Notas Musicais</h1>
                {!isListening ? (
                    <button onClick={startListening} className="start-button">
                        Iniciar Captura de Áudio
                    </button>
                ) : (
                    <div className="microphone-tuner">
                        <Tuner
                            frequencia={microphoneFrequency || lastValidFrequency || 0} // Usa a última frequência válida, se disponível
                            title="Microfone"
                        />
                    </div>
                )}
                <div className="frequency-display">
                    <p>Frequência detectada: <strong>{microphoneFrequency ? microphoneFrequency.toFixed(2) : lastValidFrequency ? lastValidFrequency.toFixed(2) : "Aguardando..."}</strong> Hz</p>
                </div>
            </ErrorBoundary>
        </div>
    );
}

export default App;
