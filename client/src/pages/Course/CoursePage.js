import { AddBoxOutlined, Videocam } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import Assignment from "../../components/Assignment/Assignment";
import Button from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";
import Header from "../../components/Header/Header";
import Material from "../../components/Material/Material";
import Popup from "../../components/Popup/Popup";
import Test from "../../components/Test/Test";
import Upload from "../../components/Upload/Upload";
import { isTutor, userData, _id } from "../../utils/token";
import axios from "../../axios";
import { requests } from "../../constants/requests";
import Form from "../../components/Form/Form";
import { isEmpty } from "../../helpers/isEmpty";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import download from "js-file-download";
import Rating from "../../components/Rating/Rating";

const CoursePage = () => {
  const { courseId } = useParams();
  const history = useHistory();
  const { state } = useLocation();
  if (!state) {
    history.goBack();
  }

  const [openPopup, setOpenPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState(false);
  const [popupRating, setPopupRating] = useState(false);

  const [rateValue, setRateValue] = useState(0);
  const [isRating, setIsRating] = useState(false);

  const [totalStudents, setTotalStudents] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);
  const [documentTitle, setDocumentTitle] = useState("");

  const [materials, setMaterials] = useState([]);
  const [tests, setTests] = useState([]);
  const [message, setMessage] = useState({
    materials: null,
    tests: null,
  });
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isCreatingClassRoom, setIsCreatingClassRoom] = useState(false);
  const [classRoomName, setClassRoomName] = useState("");
  const [classRoomDuration, setClassRoomDuration] = useState("");
  const [openClassRoomPopup, setOpenClassRoomPopup] = useState("");

  const handleAdd = (type) => {
    setOpenPopup(true);
    setPopupTitle(type);
  };

  const getTotalEnrolledStudents = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(requests.getTotalEnrolledStudents, {
        params: { course_id: courseId },
      });
      if (data.success && data.results) {
        setTotalStudents(data.results);
      }
    } catch (error) {
      return alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addAssignment = async (file) => {
    if (isEmpty(documentTitle)) {
      return alert("Please enter title");
    }
    const assignmentData = new FormData();
    assignmentData.append("title", documentTitle);
    assignmentData.append("type", "Assignment");
    assignmentData.append("course", courseId);
    assignmentData.append("tutor", _id);
    assignmentData.append("document", file);
    setIsAddingAssignment(true);
    try {
      const { data } = await axios.post(
        requests.createAssignment,
        assignmentData,
      );
      if (data.success) {
        alert("Assignment Created");
        setOpenPopup(false);
        getCourseMaterials();
      }
    } catch (error) {
      return alert(error);
    } finally {
      setIsAddingAssignment(false);
    }
  };

  const addMaterial = async (file) => {
    if (isEmpty(documentTitle)) {
      return alert("Please enter title");
    }
    const materialData = new FormData();
    materialData.append("title", documentTitle);
    materialData.append("type", "Lecture Note");
    materialData.append("course", courseId);
    materialData.append("tutor", _id);
    materialData.append("document", file);
    setIsAddingMaterial(true);
    try {
      const { data } = await axios.post(requests.createMaterial, materialData);
      if (data.success) {
        alert("Material Created");
        setOpenPopup(false);
        getCourseMaterials();
      }
    } catch (error) {
      return alert(error);
    } finally {
      setIsAddingMaterial(false);
    }
  };

  const getCourseMaterials = async () => {
    try {
      const { data } = await axios.get(requests.getCourseMaterials, {
        params: { course_id: courseId },
      });
      if (data.success && data.results) {
        setMaterials(data.results);
      } else {
        setMessage({ materials: data.message, tests: message.tests });
      }
    } catch (error) {
      return alert(error);
    }
  };

  const getAllTests = async () => {
    try {
      const { data } = await axios.get(requests.getAllCourseTests, {
        params: { tutor_id: _id, course_id: courseId },
      });

      if (data.success && data.results) {
        setTests(data.results);
      } else {
        setMessage({ tests: "No Test Found", materials: message.materials });
      }
    } catch (error) {
      return alert(error);
    }
  };

  const getUntakenCourseTests = async () => {
    try {
      const { data } = await axios.get(requests.getUntakenCourseTests, {
        params: { student_id: _id, course_id: courseId },
      });

      if (data.success && data.results) {
        setTests(data.results);
      } else {
        setMessage({ tests: "No Test Found", materials: message.materials });
      }
    } catch (error) {
      return alert(error);
    }
  };

  const getTakenCourseTests = async () => {
    try {
      const { data } = await axios.get(requests.getTakenCourseTests, {
        params: { student_id: _id, course_id: courseId },
      });

      if (data.success && data.results) {
        setTests((prevTests) => [...prevTests, ...data.results]);
      } else {
        setMessage({ tests: "No Test Found", materials: message.materials });
      }
    } catch (error) {
      return alert(error);
    }
  };

  const fetchData = async () => {
    setIsFetchingData(true);
    if (isTutor) {
      await getTotalEnrolledStudents();
      await getAllTests();
    }
    await getCourseMaterials();
    if (!isTutor) {
      await getUntakenCourseTests();
      await getTakenCourseTests();
    }
    setIsFetchingData(false);
  };

  const downloadFile = async (file) => {
    try {
      const { data } = await axios.get(requests.downloadCourseMaterial, {
        params: { file_name: file },
        responseType: "blob",
      });
      download(data, file);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchData();
    } else {
      return;
    }
    return (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createClassRoom = async (e) => {
    e.preventDefault();

    const classRoomData = {
      classRoom: {
        tutor: _id,
        course: courseId,
        className: classRoomName,
        duration: classRoomDuration,
        link: "",
      },
    };
    setIsCreatingClassRoom(true);
    try {
      const { data } = await axios.post(
        requests.createClassRoom,
        classRoomData,
      );
      if (data.success && data.results) {
        setOpenClassRoomPopup(false);
        window.open(
          `http://localhost:4000?roomId=${data.results._id}&roomName=${
            data.results.className
          }&tutorName=${userData.firstName + " " + userData.lastName}`,
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      return alert(error);
    } finally {
      setIsCreatingClassRoom(false);
    }
  };

  const rateTutor = async () => {
    const ratingData = {
      tutor_id: state.tutor,
      student_id: _id,
      rate_value: rateValue,
    };
    setIsRating(true);
    try {
      const { data } = await axios.post(requests.rateTutor, ratingData);
      if (data.success) {
        alert("Tutor Rated!!");
        setPopupRating(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      return alert(error);
    } finally {
      setIsRating(false);
    }
  };

  return (
    <>
      <Header />
      <Popup open={openPopup} close={() => setOpenPopup(false)}>
        <h1 className="heading-secondary">Add {popupTitle}</h1>
        <Form.Group>
          <Form.Label controlId="title">Title</Form.Label>
          <Form.Control
            controlId="title"
            type="text"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
          />
        </Form.Group>
        <Upload
          fileType="document"
          isUploading={
            popupTitle === "Material" ? isAddingMaterial : isAddingAssignment
          }
          onSubmit={popupTitle === "Material" ? addMaterial : addAssignment}
        />
      </Popup>

      <Popup
        open={openClassRoomPopup}
        close={() => setOpenClassRoomPopup(false)}
      >
        <h2 className="heading-secondary">Create ClassRoom{popupTitle}</h2>
        <Form onSubmit={createClassRoom}>
          <Form.Group>
            <Form.Label controlId="roomName">Class Name</Form.Label>
            <Form.Control
              controlId="roomName"
              placeHolder="Enter class name"
              type="text"
              value={classRoomName}
              onChange={(e) => setClassRoomName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label controlId="duration">Duration</Form.Label>
            <Form.Control
              type="datetime-local"
              controlId="duration"
              value={classRoomDuration}
              onChange={(e) => setClassRoomDuration(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            disabled={isCreatingClassRoom}
            isLoading={isCreatingClassRoom}
            type="submit"
          >
            Create
          </Button>
        </Form>
      </Popup>
      {isFetchingData ? (
        <Loader />
      ) : (
        <div className="course-page">
          <div className="course-page__title">
            <div style={{ display: "flex", alignItems: "center" }}>
              <h2 className="heading-secondary">{state.title}</h2>
              {!isTutor && (
                <>
                  <p
                    className="paragraph link"
                    style={{ marginLeft: "3rem" }}
                    onClick={() => setPopupRating(true)}
                  >
                    Rate Tutor
                  </p>
                  <Popup open={popupRating} close={() => setPopupRating(false)}>
                    <p className="paragraph">
                      How satisfed are you with {state.instructor} ?
                    </p>
                    <Rating
                      value={rateValue}
                      onChange={(_, value) => setRateValue(value)}
                    />
                    <Button
                      disabled={isRating}
                      loading={isRating}
                      onClick={rateTutor}
                    >
                      Submit
                    </Button>
                  </Popup>
                </>
              )}
            </div>
            <p className="paragraph">
              {isTutor
                ? isLoading
                  ? "..."
                  : `# ${
                      totalStudents === 0
                        ? "No of Students enrolled in this course"
                        : `${totalStudents} Students enrolled in this course`
                    }`
                : `By: ${state.instructor}`}
            </p>
            {isTutor && (
              <Link
                to={`/students-list/${courseId}`}
                className="paragraph link"
              >
                View Student List
              </Link>
            )}
            <Button
              onClick={
                !isTutor
                  ? () => alert("No classroom created!!")
                  : () => setOpenClassRoomPopup(true)
              }
            >
              <Videocam className="btn__icon" /> Attend Lecture
            </Button>
          </div>
          <Divider />
          <div className="course__materials">
            <div className="course__materials__title">
              <h1 className="heading-secondary">Course Materials</h1>
              {isTutor && (
                <AddBoxOutlined
                  onClick={() => handleAdd("Material")}
                  className="course__materials__title-icon"
                />
              )}
            </div>
            <div className="grid">
              {materials.filter((material) => material.type === "Lecture Note")
                .length > 0 ? (
                materials
                  .filter((material) => material.type === "Lecture Note")
                  .map((material, index) => (
                    <Material
                      onDownload={() => downloadFile(material.document)}
                      key={index}
                      title={material.title}
                    />
                  ))
              ) : (
                <Message variant="info">No Material Found!</Message>
              )}
            </div>
          </div>
          <Divider />
          <div className="course__assignments">
            <div className="course__assignments__title">
              <h1 className="heading-secondary">Assignments</h1>
              {isTutor && (
                <AddBoxOutlined
                  onClick={() => handleAdd("Assignment")}
                  className="course__materials__title-icon"
                />
              )}
            </div>
            <div className="grid">
              {materials.filter(
                (assignment) => assignment.type === "Assignment",
              ).length > 0 ? (
                materials
                  .filter((assignment) => assignment.type === "Assignment")
                  .map((assignment, index) => (
                    <Assignment
                      onDownload={() => downloadFile(assignment.document)}
                      key={index}
                      title={assignment.title}
                    />
                  ))
              ) : (
                <Message variant="info">No Assignement Found!</Message>
              )}
            </div>
          </div>
          <Divider />
          <div className="course__tests">
            <div className="course__tests__title">
              <h1 className="heading-secondary">Tests</h1>
              {isTutor && (
                <AddBoxOutlined
                  onClick={() => history.push(`/add-test/${courseId}`)}
                  className="course__materials__title-icon"
                />
              )}
            </div>
            <div className="grid">
              {tests.length > 0 ? (
                tests
                  .filter((test) => test.assessment !== null)
                  .map((test, index) => (
                    <Test
                      key={index}
                      title={`${test.type || test.assessment.type} ${
                        test.number || test.assessment.number
                      }`}
                      questionData={test}
                      courseTitle={state.title}
                      score={test.score}
                      totalMark={test.totalMark || test.assessment.totalMark}
                    />
                  ))
              ) : (
                <Message variant="info">No Test Found!</Message>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoursePage;
