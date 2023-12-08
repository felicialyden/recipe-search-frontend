import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button className="btn btn-sm btn-primary" onClick={() => navigate(-1)}>
      Back
    </button>
  );
};

export default BackButton;
