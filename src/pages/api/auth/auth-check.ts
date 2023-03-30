import type { NextApiRequest, NextApiResponse } from 'next';

const authCheck = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { role } = req.body;
    if (role !== 1)
      return res
        .status(400)
        .json({ err: 'Protected resources access denied.' });
    return res.json({ message: 'Protected access granted.' });
  } catch (err: any) {
    return res.status(500).json({ err: err.message });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await authCheck(req, res);
      break;
    default:
      res.status(405).json({ err: 'Method not allowed' });
  }
};
