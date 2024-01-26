
const ResetPasswordModal = () => {
  return (
    <dialog id="resetPasswordModal" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg mb-4">Reset your password</h3>
    <input className="input input-bordered w-full max-w-xs input-sm" placeholder="email address"></input>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn btn-sm mr-2">Cancel</button>
        <button className="btn btn-sm">Reset password</button>
      </form>
    </div>
  </div>
</dialog>
  )
}

export default ResetPasswordModal