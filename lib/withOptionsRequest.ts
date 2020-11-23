import { NowApiHandler } from '@vercel/node'

/**
 * Allow requests with options method.
 *
 * @param fn - Express-like handler
 */
export function withOptionsRequest(fn: NowApiHandler): NowApiHandler {
  return (req, res) => {
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return fn(req, res)
  }
}
