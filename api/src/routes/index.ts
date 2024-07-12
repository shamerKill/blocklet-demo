import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import { client } from '../libs/auth';
import userDataController from '../controller/users';
import prismaClient from '../libs/prisma';

const router = Router();

router.use('/user', middleware.user(), async (req, res) => {
  if (!req.user) {
    res.json({ user: null });
    return;
  }
  try {
    const memUser = await prismaClient.user.findFirst({ where: { id: req.user.did } });
    const { user } = await client.getUser(req.user.did);
    user.role = user.role || req.user.role;
    if (memUser) {
      res.json({
        user: {
          ...user,
          email: memUser.email,
          fullName: memUser.fullName,
          phone: memUser.phone,
        },
      });
    } else {
      res.json({ user });
    }
  } catch (err) {
    console.error(err);
    res.json({ user: null });
  }
});

router.all('/data', userDataController);

export default router;
