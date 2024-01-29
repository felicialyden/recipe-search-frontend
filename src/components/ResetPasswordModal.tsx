import { SyntheticEvent, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import toast from "react-hot-toast"

const ResetPasswordModal = () => {
    const { sendPasswordLink } = useContext(AuthContext)


    const handleSendPasswordEmail = async(e: SyntheticEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value
        if(!email) return toast('Please enter the email address associated with your account')
        const response = await sendPasswordLink(email)
        console.log(response)
    }

  return (
    <dialog id="resetPasswordModal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg mb-4">Reset your password</h3>
    <div className="modal-action">
      <form onSubmit={handleSendPasswordEmail} method="dialog">
      <input name="email" className="input input-bordered w-full max-w-xs input-sm" placeholder="email address"></input>
        <button className="btn btn-sm mr-2">Cancel</button>
        <button className="btn btn-sm">Reset password</button>
      </form>
    </div>
  </div>
</dialog>
  )
}

export default ResetPasswordModal