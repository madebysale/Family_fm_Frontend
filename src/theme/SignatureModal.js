import { Modal } from 'react-bootstrap';

const SignatureModal = ({ showModal, closeModal, item }) => {
  return (
    <Modal
      style={{ margin: "auto" }}
      show={showModal}
      onHide={closeModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>View Signature</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {console.log(item,'axhss')}
        <img
          src={`https://api.familyfm.ltd/Vibz_FM/uploads/${item}`}
          style={{ width: "100%", height: "auto", maxWidth: "300px" }}
          alt="Image"
        />
      </Modal.Body>
    </Modal>
  );
};

export default SignatureModal;
