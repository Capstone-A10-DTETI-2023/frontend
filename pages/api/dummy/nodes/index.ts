import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseData } from '@/types/Api'
import { Node } from '@/types/Node'
import { getNodes } from '@/utils/constants/dummyData';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData<Node>>
) {

    const nodes = getNodes();

    res.status(200).json(
        {
            message: 'success',
            data: nodes
        }
    )
}