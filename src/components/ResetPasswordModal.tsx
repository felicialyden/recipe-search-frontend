import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import toast from "react-hot-toast"
import { Response } from "../types"

const ResetPasswordModal = () => {
    const { sendPasswordLink } = useContext(AuthContext)

    const handleSendPasswordEmail = async() => {
        const email = (document.querySelector('input[name="email"]') as HTMLInputElement).value
        if(!email) return toast('Please enter the email address associated with your account')
        try {
          const response = await sendPasswordLink(email) as Response
          if(!response.success) {
            throw response.error
          }
          toast.success("A password recovery link has been sent to your email")
        } catch (error) {
          toast.error(`${error}`)
        }
    }

    const closeModal = () => {
      const modalElement = document.getElementById('resetPasswordModal')
      modalElement?.classList.remove('modal-open')
      document.getElementById('resetPasswordModal')
    }

  return (
    <dialog id="resetPasswordModal" className="modal">
  <div className="modal-box">
    <div className="modal-action">
      <form method="dialog" id="resetPasswordForm">
      <h3 className="font-bold text-lg mb-4">Reset your password</h3>
      <input name="email" className="input input-bordered w-full max-w-xs input-sm mb-4" placeholder="email address"></input>
        <button onClick={closeModal} className="btn btn-sm mr-2">Cancel</button>
        <button onClick={handleSendPasswordEmail} className="btn btn-sm">Reset password</button>
      </form>
    </div>
  </div>
</dialog>
  )
}

export default ResetPasswordModal