import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Aqui podemos logar o erro, mas não é necessário interromper a interface
    this.setState({ error, errorInfo });
    console.error('Erro capturado:', error, errorInfo);
  }

  render() {
    // Ao ocorrer erro, não renderiza nada, mas a UI não quebra
    if (this.state.hasError) {
      // Não renderiza nada, o que mantém o HTML inalterado
      return this.props.children;
    }

    return this.props.children; // Caso contrário, renderiza normalmente
  }
}

export default ErrorBoundary;
