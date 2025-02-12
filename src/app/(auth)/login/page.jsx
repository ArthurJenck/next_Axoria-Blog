"use client"
import { login } from "@/lib/serverActions/session/sessionServerActions"
import { useRouter } from "next/navigation"
import React, { useRef } from "react"

const page = () => {
  const submitBtnRef = useRef(null)
  const serverInfoRef = useRef(null)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    serverInfoRef.current.textContent = ""
    submitBtnRef.current.disabled = true

    try {
      const result = await login(new FormData(e.target))

      if (result.success) {
        router.push("/")
      }
    } catch (error) {
      submitBtnRef.current.textContent = "Submit"
      submitBtnRef.current.disabled = false
      serverInfoRef.current.textContent = `${error.message}`
      console.error("Error while logging in:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-36">
      <label htmlFor="userName" className="f-label">
        Your pseudo
      </label>
      <input
        type="text"
        name="userName"
        id="userName"
        placeholder="Your pseudo"
        required
        className="f-auth-input"
      />
      <label htmlFor="password" className="f-label">
        Your password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Your password"
        required
        className="f-auth-input"
      />
      <button ref={submitBtnRef} className="f-auth-submit">
        Submit
      </button>
      <p ref={serverInfoRef} className="text-center mb-10"></p>
    </form>
  )
}

export default page
