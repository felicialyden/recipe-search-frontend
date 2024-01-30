import { SyntheticEvent, useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import toast from "react-hot-toast"
import { Response } from "../types"

const ResetPasswordModal = () => {
    const [loading, setLoading] = useState(false)
    const { sendPasswordLink } = useContext(AuthContext)

    const handleSendPasswordEmail = async(e: SyntheticEvent) => {
      e.preventDefault()
      const form = (e.target as HTMLButtonElement).closest('form')
      const modalElement = document.getElementById('resetPasswordModal') as HTMLDialogElement
        const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value
        if(!email) return toast('Please enter the email address associated with your account')
        try {
          setLoading(true)
          const response = await sendPasswordLink(email) as Response
          if(!response.success) {
            throw response.error
          }
          setLoading(false)
          toast.success("A password recovery link has been sent to your email")
          form?.reset()
          modalElement?.close()
        } catch (error) {
          toast.error(`${error}`)
        }
    }

    const closeModal = () => {
      const modalElement = document.getElementById('resetPasswordModal') as HTMLDialogElement
      modalElement?.close()
      document.getElementById('resetPasswordModal')
    }

  return (
    <dialog id="resetPasswordModal" className="modal">
  <div className="modal-box max-w-sm">
    <div className="modal-action w-full flex place-content-center mt-0">
      <form method="dialog" id="resetPasswordForm">
      <h3 className="font-bold text-lg mb-4">Reset your password</h3>
      <input name="email" className="input input-bordered w-full max-w-xs input-sm mb-4" placeholder="email address"></input>
        <div className="flex items-center">
        <button onClick={closeModal} className="btn btn-sm mr-2">Cancel</button>
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