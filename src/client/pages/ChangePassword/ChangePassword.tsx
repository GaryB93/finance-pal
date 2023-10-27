import NewPasswordForm from "../../components/NewPasswordForm";
import './ChangePassword.css';

const ChangePassword = (): JSX.Element => {
  return (
    <div className="change-password-page">
      {/* <Logo /> */}
      <NewPasswordForm />
    </div>
  );
};

export default ChangePassword;