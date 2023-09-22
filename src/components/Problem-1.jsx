import React, { useEffect, useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    name: "",
    status: "",
  });
  const [storedData, setStoredData] = useState([]);
  const [toggle, setToggle] = useState(false);

  // Sorted
  const sortedData = [...storedData].sort((a, b) =>
    a.status.localeCompare(b.status, undefined, { sensitivity: "base" })
  );

  useEffect(() => {
    const res = getFromDb();
    setStoredData(res);
  }, [toggle]);

  const handleClick = (val) => {
    setShow(val);
  };

  // Get data
  const getFromDb = () => {
    let data = localStorage.getItem("stored");
    if (data) {
      data = JSON.parse(data);
    } else {
      return [];
    }
    return data;
  };

  // Add data
  const addToDb = (data) => {
    const oldData = getFromDb();
    let message = "";

    if (oldData.length > 0) {
      const id = Math.random();
      localStorage.setItem("stored", JSON.stringify([...oldData, data]));
      message = "Successfully data added";
    } else {
      localStorage.setItem("stored", JSON.stringify([data]));
      message = "Successfully data added";
    }
    setToggle(!toggle);
    return message;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 90 + 10);
    const res = addToDb({ id, ...data });
    if (res) {
      setMessage(res);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                onChange={(e) => setData({ ...data, name: e.target.value })}
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                onChange={(e) => setData({ ...data, status: e.target.value })}
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {show === "all" && (
                <>
                  {sortedData.length > 0 &&
                    sortedData.map((data) => (
                      <tr key={data.id}>
                        <td scope="col">{data.name}</td>
                        <td scope="col">{data.status}</td>
                      </tr>
                    ))}
                </>
              )}

              {show === "active" && (
                <>
                  {storedData.length > 0 &&
                    storedData.map((data) => (
                      <tr key={data.id}>
                        {data.status.toLowerCase() === "active" && (
                          <>
                            <td scope="col">{data.name}</td>
                            <td scope="col">{data.status}</td>
                          </>
                        )}
                      </tr>
                    ))}
                </>
              )}

              {show === "completed" && (
                <>
                  {storedData.length > 0 &&
                    storedData.map((data) => (
                      <tr key={data.id}>
                        {data.status.toLowerCase() === "completed" && (
                          <>
                            <td scope="col">{data.name}</td>
                            <td scope="col">{data.status}</td>
                          </>
                        )}
                      </tr>
                    ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
