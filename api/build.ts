import { NowRequest, NowResponse } from '@vercel/node'

async function build(req: NowRequest, res: NowResponse): Promise<void> {
  res.json({ data: 'data' })
}

export default build
