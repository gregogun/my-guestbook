import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      content: content,
      author: {
        create: {
          name: session?.user?.name,
        },
      },
    },
  });
  res.json(result);
}
