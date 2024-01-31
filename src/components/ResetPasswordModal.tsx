import { SyntheticEvent, useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import toast from "react-hot-toast"
import { Response } from "../types"

const ResetPasswordModal = () => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { sendPasswordLink } = useContext(AuthContext)
  const handleSendPasswordEmail = async(e: SyntheticEvent) => {
    e.preventDefault()
    const form = (e.target as HTMLButtonElement).closest('form')
    const modalElement = document.getElementById('resetPasswordModal') as HTMLDialogElement
    const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if(!email) {
      document.querySelector('input[name="email"]')?.classList.add('input-error')
      setErrorMessage('Please enter the email address associated with your account')
      return
    } else if (!email.match(emailRegex)){
      document.querySelector('input[name="email"]')?.classList.add('input-error')
      setErrorMessage('Please enter a valid email address')
      return
    }
    try {
      setLoading(true)
      const response = await sendPasswordLink(email) as Response
      if(!response.success) {
        throw response.error
      }
      form?.reset()
      toast.success("A password recovery link has been sent to your email")
      modalElement?.close()
    } catch (error) {
      modalElement?.close()
      toast.error(`${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = () => {
    document.querySelector('input[name="email"]')?.classList.remove('input-error')
    setErrorMessage('')
  }

  const closeModal = (e: SyntheticEvent) => {
    const form = (e.target as HTMLButtonElement).closest('form')
    const modalElement = document.getElementById('resetPasswordModal') as HTMLDialogElement
    modalElement?.close()
    setErrorMessage('')
    document.querySelector('input[name="email"]')?.classList.remove('input-error')
    form?.reset()
  }

  return (
    <dialog id="resetPasswordModal" className="modal">
  <div className="modal-box max-w-sm">
    <div className="modal-action w-full flex place-content-center mt-0">
      <form method="dialog" id="resetPasswordForm" className="w-full">
      <h3 className="font-bold text-lg mb-4">Reset your password</h3>
      <input onChange={handleInputChange} name="email" className="input input-bordered w-full max-w-xs input-sm mb-2" placeholder="email address"></input>
       <p className="text-xs h-4">{errorMessage}</p>
        <div className="flex place-content-end pr-4 mt-6">
        <button onClick={closeModal} className="btn btn-sm btn-ghost mr-2">Cancel</button>
        <button onClick={(e) => handleSendPasswordEmail(e)} className="btn btn-sm">
          {loading && <span className="loading loading-spinner h-4 w-4"></span>}
          {loading? 'Sending email': 'Reset password'}
          </button>
          </div>
      </form>
    </div>
  </div>
</dialog>
  )
}

export default ResetPasswordModal