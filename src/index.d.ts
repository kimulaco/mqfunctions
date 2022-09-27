export type HandlerEvent = {
  readonly matches: boolean
  readonly media: string
}

export type HandlerFunction = (event: HandlerEvent) => void

export type MqFunctions = {
  functions: Map<string, HandlerFunction>
  readonly mql: MediaQueryList
  readonly _handleChange: (event: HandlerEvent) => void
}
