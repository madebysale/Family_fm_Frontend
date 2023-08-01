import Button from 'react-bootstrap/Button';
import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './Form.css';

function SignaturePad({ setsign }) {
  const signRef = useRef();
  const handleClear = () => console.log(signRef.current.clear());

  const options = {
    penColor: 'red',
    onEnd: () => signRef.current.toDataURL(),
  };

  const handle = () => {
    setsign(signRef.current.toDataURL());
  };

  return (
    <div className="signature-pad">
      <SignatureCanvas ref={signRef} options={options} />
      <div className="sign-res-btn">
        <Button className="sign-button" onClick={handleClear}>
          Clear
        </Button>
        <Button className="sign-button-1" onClick={handle}>
          confirm Signature
        </Button>
      </div>
    </div>
  );
}

export default SignaturePad;
