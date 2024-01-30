import { SyntheticEvent } from "react";
import toast from "react-hot-toast";
// import { AuthContext } from "../contexts/AuthContext";
// import { Response } from "../types"
import { createClient } from '@supabase/supabase-js';


const ResetPasswordForm = () => {

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // const { resetPassword } = useContext(AuthContext)

    const handleResetPassword = async(e: SyntheticEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const newPassword = (form.elements.namedItem('change-password-new') as HTMLInputElement).value
        const confirmedPassword = (form.elements.namedItem('change-password-confirm') as HTMLInputElement).value

        if(newPassword !== confirmedPassword) {
            toast.error('New password not matching')
            return 
        }
        try {
          const { data, error } = await supabase.auth.updateUser({
            password: newPassword
          })
            if(error) {
              throw error
            }
            console.log(data)
            form.reset()
            toast.success("Successfully changed password")
          } catch (error) {
            toast.error(`${error}`)
          }
    }

  return (
    <form onSubmit={(e) => handleResetPassword(e)} className="space-y-2">
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
    </form>
  )
}

export default ResetPasswordForm