import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Typography, Button } from '@material-tailwind/react';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/themeColors';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

interface WithThemeProps {
  theme: 'light' | 'dark';
  colors: Record<string, any>;
}

const WithTheme: React.FC<{ children: (props: WithThemeProps) => ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const currentColors = colors[theme];
  return <>{children({ theme, colors: currentColors })}</>;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Обновляем состояние, чтобы следующий рендер показал запасной UI.
    return { hasError: true, error: error, errorInfo: null }; // errorInfo будет заполнен в componentDidCatch
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo: errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <WithTheme>
          {({ theme, colors: currentColors }) => (
            <div className={`flex flex-col items-center justify-center min-h-screen text-center p-4
              ${currentColors.primaryBackground} ${currentColors.primaryText}`}>
              <Typography variant="h2" className="mb-4" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Упс! Что-то пошло не так.
              </Typography>
              <Typography variant="paragraph" className={`mb-6 ${currentColors.secondaryText}`} placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Мы уже работаем над решением этой проблемы. Пожалуйста, попробуйте позже.
              </Typography>
              {this.state.error && (
                <details className={`text-left p-4 rounded-lg border ${currentColors.bordersDividers} ${currentColors.containerBackground} mb-6`} style={{ whiteSpace: 'pre-wrap' }}>
                  <summary className={`${currentColors.primaryText} cursor-pointer`}>Детали ошибки</summary>
                  <code className={`${currentColors.secondaryText}`}>
                    {this.state.error.toString()}
                    <br />
                    {this.state.errorInfo?.componentStack}
                  </code>
                </details>
              )}
              <Button
                onClick={this.handleReset}
                className={`${currentColors.primaryAccent} hover:shadow-lg ${theme === 'light' ? 'hover:shadow-blue-gray-500/50' : 'hover:shadow-gray-900/50'} transition-shadow duration-300`}
                placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
              >
                Вернуться к безопасному состоянию
              </Button>
            </div>
          )}
        </WithTheme>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;