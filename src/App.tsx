import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  const addJob = async (jobData) => {
    console.log("New job added:", jobData);
    // Here you can also update your state or make an API call to save the job
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        alert("Job added successfully!");
        // Optionally, reset form fields here
      } else {
        alert("Failed to add job. Please try again.");
      }
    } catch (error) {
      console.error("Error adding job:", error);
      alert("An error occurred while adding the job. Please try again.");
    }
    return;
  };

  const deleteJob = async (id) => {
    console.log("Job deleted:", id);
    // Here you can also update your state or make an API call to delete the job
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Job deleted successfully!");
        // Optionally, update your state here to remove the deleted job from the UI
      } else {
        alert("Failed to delete job. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("An error occurred while deleting the job. Please try again.");
    }
    return;
  };

  const updateJob = async (updatedJobData) => {
    console.log("Job updated:", updatedJobData);
    // Here you can also update your state or make an API call to update the job
    try {
      const response = await fetch(`/api/jobs/${updatedJobData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJobData),
      });

      if (response.ok) {
        alert("Job updated successfully!");
        // Optionally, update your state here to reflect the updated job in the UI
      } else {
        alert("Failed to update job. Please try again.");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("An error occurred while updating the job. Please try again.");
    }
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="/jobs/edit/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default App;
