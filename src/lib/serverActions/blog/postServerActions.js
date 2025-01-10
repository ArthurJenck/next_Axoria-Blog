"use server"
import { Post } from "@/lib/models/post"
import { connectToDb } from "@/lib/utils/db/connectToDb"

export const addPost = async (formData) => {
  const { title, markdownArticle } = Object.fromEntries(formData)

  try {
    await connectToDb()

    const newPost = new Post({
      title,
      markdownArticle
    })

    const savedPost = await newPost.save()
    console.log("Successfully saved post")

    return { success: true, slug: savedPost.slug }
  } catch (error) {
    console.error("Error while creating post", error)

    throw new Error(error.message || "An error occured while creating the post")
  }
}
