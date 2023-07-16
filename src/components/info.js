import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Info() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        className="bg-dark border-none py-2 px-3 transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-150"
        onClick={handleShow}
      >
        <i class="bi bi-exclamation-circle-fill"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bg-green-blue">
          <Modal.Title className="text-white font-bold ">
            INFO (How to use){" "}
            <Button
              variant="secondary"
              className="bg-err-red hover:bg-err-red ml-20 md:ml-32 lg:ml-48  transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-150"
              onClick={handleClose}
            >
              <i class="bi bi-x-circle-fill"></i>
            </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="">
            <li className="font-bold">Upload to Database:</li>
            <p className="ml-10 bg-dark text-white p-2 rounded-lg m-2">
              Enter an ID number and image that doesn't exist in your database
              to upload
            </p>

            <li className="font-bold">Update Database:</li>
            <p className="ml-10 bg-dark text-white p-2 rounded-lg m-2">
              Enter an ID number you want to update with the selected image
            </p>

            <li className="font-bold">Delete Database:</li>
            <p className="ml-10 bg-dark text-white p-2 rounded-lg m-2">
              Select an ID number you want to delete
            </p>

            <hr />

            <li className="font-bold">Note:</li>
            <p className="ml-10 bg-dark text-white p-2 rounded-lg m-2">
              After deleting an image from the database, you'll have to add the
              missing ID number by uploading
            </p>
          </ul>
        </Modal.Body>
        <Modal.Footer className="bg-err-red">
          <p className="font-bold ">Check on Github for more Info</p>
          <a
            href="https://github.com/Jatin010700/Admin/tree/main"
            className=" transition ease-in-out hover:-translate-y-0.5 hover:scale-105 duration-150"
          >
            <i class="text-xl bi bi-github"></i>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Info;
