import { RequestHandler } from 'express';
import prismaClient from '../libs/prisma';

const userDataController: RequestHandler = async (req, res) => {
  try {
    const { fullName, email, phone, did } = req.body;
    let user = await prismaClient.user.findFirst({ where: { id: did } });
    if (user) {
      user = await prismaClient.user.update({
        where: { id: did },
        data: { fullName, email, phone },
      });
    } else {
      user = await prismaClient.user.create({
        data: {
          id: did,
          fullName,
          email,
          phone,
        },
      });
    }
    res.json({
      code: 200,
      message: user,
    });
  } catch (e) {
    res.json({
      code: 400,
      message: '错误',
    });
  }
};

export default userDataController;
