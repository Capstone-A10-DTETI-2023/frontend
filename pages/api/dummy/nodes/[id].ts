import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseDatum } from '@/types/Api'
import { Node } from '@/types/Node'
import { getNodes } from '@/utils/constants/dummyData';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseDatum<Node>>
) {
    const nodes = getNodes();

    const { id } = req.query

    res.status(200).json(
        {
            message: 'success',
            data: nodes.find((node) => node.id === req.query.id)
        }
    )
}