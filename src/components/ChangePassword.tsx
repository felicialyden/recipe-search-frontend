
const ChangePassword = () => {
  return (
    <div className="space-y-2">
          <input
        type="password"
        name="change-password-current"
        placeholder="Current password"
        className="input input-sm input-bordered w-full w-xs"
      />
            <input
        type="password"
        name="change-password-new"
        placeholder="New password"
        className="input input-sm input-bordered w-full w-xs"
      />
            <input
        type="password"
        name="change-password-confirm"
        placeholder="Confirm new password"
        className="input input-sm input-bordered w-full w-xs"
      />
    <button className="btn btn-sm btn-primary max-w-xs">Change password</button>
    </div>
  )
}

export default ChangePassword