import React from 'react'

class ErrorBoundary extends React.Component<{fallback: React.Component}> {
  state = { hasError: false, error: null }
  static getDerivedStateFromError(error: string) {
    return { hasError: true, error }
  }

  render() {
    if(this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default ErrorBoundary
