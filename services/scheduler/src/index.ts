export const main = async () => {
  await new Promise<void>((resolve) => {
    // let t = new Date().getTime() + 1000
    const i = setInterval(() => {
      try {
        // console.log("Hello, world!", t)
        // t = new Date().getTime() + 1000
      } catch (e) {
        clearInterval(i)
        resolve()
      }
    }, 1000)
  })
}

main().catch(() => {
  process.exit(1)
})
