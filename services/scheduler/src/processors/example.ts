const exampleProcessor = async () => {
  console.log("exampleProcessor running...")
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log("exampleProcessor done")
}

exampleProcessor().catch(console.error)
