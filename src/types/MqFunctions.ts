export type HandlerEvent = {
  readonly matches: boolean
  readonly media: string
}

export type HandlerFunction = (event: HandlerEvent) => void

export type MqFunctions = {
  functions: Map<string, HandlerFunction>
  readonly mql: MediaQueryList
  readonly add: (id: string, fn: HandlerFunction) => void
  readonly remove: (id: string) => void
  readonly run: (id: string) => void
  readonly _handleChange: (event: HandlerEvent) => void
}
