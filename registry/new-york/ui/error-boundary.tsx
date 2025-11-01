import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  resetUrl?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReload = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.reload();
  };

  handleGoBack = (): void => {
    const { resetUrl = "/" } = this.props;
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.href = resetUrl;
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
          <Card className="max-w-4xl w-full">
            <CardHeader>
              <CardTitle className="text-destructive text-xl">
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.error && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Error Message:</h3>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4">
                    <code className="text-sm text-destructive">
                      {this.state.error.toString()}
                    </code>
                  </div>
                </div>
              )}

              {this.state.errorInfo && this.state.errorInfo.componentStack && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Component Stack:</h3>
                  <div className="bg-muted border rounded-md p-4 overflow-auto max-h-64">
                    <pre className="text-xs font-mono whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              )}

              {this.state.error && this.state.error.stack && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Stack Trace:</h3>
                  <div className="bg-muted border rounded-md p-4 overflow-auto max-h-96">
                    <pre className="text-xs font-mono whitespace-pre-wrap">
                      {this.state.error.stack}
                    </pre>
                  </div>
                </div>
              )}

              <div className="pt-4 flex gap-2">
                <Button onClick={this.handleGoBack} variant="default">
                  Go to Home
                </Button>
                <Button onClick={this.handleReload} variant="outline">
                  Reload Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
