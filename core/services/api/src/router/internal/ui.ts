import fs from "fs/promises"
import path from "path"
import type { Dirent } from "fs"

import { createTRPCRouter, internalProcedure } from "../../trpc"

export const internalUIRouter = createTRPCRouter({
  emailTemplates: internalProcedure.query<Dirent[]>(async () => {
    // get all email templates in the /packages/messaging/email/templates folder recursively
    // const files = await fs.readdir("packages/messaging/email/templates", {
    //   withFileTypes: true,
    // })
    // console.log(files)
    try {
      const templatesPath = path.resolve(
        __dirname,
        "../../../../../../../../../packages/messaging/src/email/templates",
      )
      console.log(templatesPath)
      const templatesArr: Dirent[] = []
      const getTemplates = async (dir: string, files: Dirent[] = []) => {
        for (const file of files) {
          const filePath = path.join(dir, file.name)
          if (file.isDirectory()) {
            console.log("is dir")
            const subFiles = await fs.readdir(filePath, { withFileTypes: true })
            await getTemplates(filePath, subFiles)
          } else {
            templatesArr.push(file)
          }
        }
      }
      await getTemplates(
        templatesPath,
        await fs.readdir(templatesPath, { withFileTypes: true }),
      )
      return templatesArr
    } catch {
      return []
    }
  }),
})
