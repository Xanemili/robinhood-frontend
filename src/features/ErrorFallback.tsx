interface ErrorFallbackProps {
  error: Error
  info: string
}

interface Error {
  message: string
}

const ErrorFallback = ({ error, info }: ErrorFallbackProps) => {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default ErrorFallback
