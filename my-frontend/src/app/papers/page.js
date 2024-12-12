"use client";

import { useEffect, useState } from "react";
import axios from "../utils/axios";
import useAuth from "../hooks/useAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from 'next/link';
import LogoutButton from "../component/LogoutButton";


export default function PapersList() {
  const user = useAuth(); // Authentication check (will redirect if not authenticated)
  const [papers, setPapers] = useState([]);
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      const token = localStorage.getItem("auth_token"); // Get the token from local storage
      try {
        const response = await axios.get("/papers", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Bearer token
          },
        });
        setPapers(response.data);
        setLoding(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPapers();
  }, []);

  // Delete a paper by ID
  const deletePaper = async (id) => {
    const token = localStorage.getItem("auth_token"); // Get the token from local storage
    try {
      await axios.delete(`/papers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      });
      setPapers((prev) => prev.filter((paper) => paper.id !== id)); // Remove deleted paper from state
    } catch (error) {
      console.error("Error deleting paper:", error);
    }
  };

  return (
    <div className="container pt-4">
      <h1>Papers List</h1>
      <Link href="/papers/submit">Submit Paper</Link>

      <LogoutButton></LogoutButton>

      <hr />

      {loading?(<p>loading..</p>):''}
      {papers.length === 0 ? (
        <p>No papers found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Gender</th>
              <th scope="col">Description</th>
              <th scope="col">Images</th>
              <th scope="col">PDF</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper) => (
              <tr key={paper.id}>
                <td>{paper.title}</td>
                <td>{paper.gender}</td>
                <td>{paper.description}</td>

                {/* Display Images */}
                <td>
                  {console.log(typeof(paper.images))}
                  {paper.images && paper.images.length > 0 ? (
                    paper.images.map((image, index) => (
                      <img
                        key={index}
                        src={`http://localhost:8000/storage/${image}`} // Assuming public disk
                        alt={`Paper Image ${index + 1}`}
                        style={{ width: "100px", marginRight: "10px" }}
                      />
                    ))
                  ) : (
                    <p>No images</p>
                  )}
                </td>

                {/* Link to Download PDF */}
                <td>
                  {paper.pdf ? (
                    <a
                      href={`http://localhost:8000/storage/${paper.pdf}`}
                      download
                    >
                      Download PDF
                    </a>
                  ) : (
                    <p>No PDF</p>
                  )}
                </td>

                <td>
                  {/* Delete button */}
                  <button
                    className="btn btn-danger"
                    onClick={() => deletePaper(paper.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
