import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Problem2 = () => {
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const [showC, setShowC] = useState(false);
  const handleCloseA = () => setShowA(false);
  const handleModalA = () => setShowA(true);

  const handleCloseB = () => setShowB(false);
  const handleModalB = () => setShowB(true);

  const handleCloseC = () => setShowC(false);
  const handleModalC = () => setShowC(true);

  const [allContacts, setAllContacts] = useState();
  const [usContacts, setUsContacts] = useState();
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  const getAllContacts = async () => {
    try {
      const response = await fetch(
        `https://contact.mediusware.com/api/contacts/`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAllContacts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getUSContacts = async () => {
    try {
      const response = await fetch(
        `https://contact.mediusware.com/api/country-contacts/us/`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUsContacts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const searchContact = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://contact.mediusware.com/api/contacts/?search=${search}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFilterData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllContacts();
    getUSContacts();
  }, []);

  useEffect(() => {
    if (filterData?.length > 0) {
      setFilterData(filterData);
    } else {
      setFilterData(allContacts);
    }
  }, [allContacts, search]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            variant="primary"
            onClick={handleModalA}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <button
            variant="primary"
            onClick={handleModalB}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>
      </div>

      <Modal show={showA} onHide={handleCloseA}>
        <Modal.Header closeButton>
          <Modal.Title> All Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={searchContact}>
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              type="text"
              className="mb-2"
            />
          </Form>

          {filterData?.results?.length > 0 &&
            filterData?.results.map((cn) => (
              <div key={cn?.id}>
                <p
                  style={{ cursor: "pointer", width: "240px" }}
                  onClick={() => {
                    setShowC(true);
                    setShowA(false);
                  }}
                >
                  Phone: {cn?.phone}
                </p>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{
              background: "#46139f",
              color: "#fff",
              border: "1px solid #fff",
            }}
            onClick={handleModalA}
          >
            All Contacts
          </button>
          <button
            style={{
              background: "#ff7f50",
              color: "#fff",
              border: "1px solid #fff",
            }}
            onClick={() => {
              setShowB(true);
              setShowA(false);
            }}
          >
            US Contacts
          </button>
          <button
            style={{
              background: "#fff",
              color: "#000",
              border: "1px solid #46139f",
            }}
            onClick={handleCloseA}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showB} onHide={handleCloseB}>
        <Modal.Header closeButton>
          <Modal.Title>US Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control placeholder="Search..." type="text" className="mb-2" />
          {usContacts?.results?.length > 0 ? (
            usContacts?.results.map((cn) => (
              <p key={cn?.id}>Phone: {cn?.phone}</p>
            ))
          ) : (
            <p>No data found</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{
              background: "#46139f",
              color: "#fff",
              border: "1px solid #fff",
            }}
            onClick={() => {
              setShowA(true);
              setShowB(false);
            }}
          >
            All Contacts
          </button>
          <button
            style={{
              background: "#ff7f50",
              color: "#fff",
              border: "1px solid #fff",
            }}
            onClick={handleModalB}
          >
            US Contacts
          </button>
          <button
            style={{
              background: "#fff",
              color: "#000",
              border: "1px solid #46139f",
            }}
            onClick={handleCloseB}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showC} onHide={handleCloseC}>
        <Modal.Header closeButton>
          <Modal.Title>Modal C</Modal.Title>
        </Modal.Header>
        <Modal.Body>Contact Details</Modal.Body>
        <Modal.Footer>
          <button
            style={{
              background: "#fff",
              color: "#000",
              border: "1px solid #46139f",
            }}
            onClick={handleCloseC}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Problem2;
