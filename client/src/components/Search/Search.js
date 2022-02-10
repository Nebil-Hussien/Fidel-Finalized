import { SearchRounded } from "@material-ui/icons";
import axios from "../../axios";
import React, { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { requests } from "../../constants/requests";
import { useHistory } from "react-router-dom";
import { isTutor, _id } from "../../utils/token";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState(null);
  const debounce = useDebounce();

  const history = useHistory();

  const searchCourse = async (term) => {
    if (!term) {
      setCourses(null);
      return;
    }
    let url;
    let params;
    if (isTutor) {
      url = requests.searchAssignedCourses;
      params = { search_query: term, tutor_id: _id };
    } else {
      url = requests.searchCourses;
      params = { search_query: term };
    }
    try {
      const { data } = await axios.get(url, {
        params,
      });
      if (data.success) {
        setCourses(
          data.results.length > 0
            ? data.results.filter(
                (course) => course.course !== null && course.tutor !== null,
              )
            : [],
        );
      } else {
        setCourses(null);
      }
    } catch (error) {
      return;
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debounce(() => searchCourse(term), 1000);
  };
  return (
    <div className={`search ${!courses && "rounded"}`}>
      <SearchRounded className="search__icon" />
      <input
        onChange={handleSearch}
        placeholder="Search courses..."
        type="search"
        value={searchTerm}
        className="search__input"
      />
      {courses && (
        <div className="search__result-box">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course._id}
                onClick={() =>
                  history.push(
                    isTutor ? `/course/${course.course._id}` : "/enroll-course",
                    !isTutor
                      ? { course: { course: course, tutor: course.tutor } }
                      : {
                          title: course.course.courseName,
                          instructor: `${course.tutor.firstName} ${course.tutor.lastName}`,
                        },
                  )
                }
                className="search__result-box__result"
              >
                <p className="paragraph">
                  {course.course ? course.course.courseName : course.courseName}
                </p>
              </div>
            ))
          ) : (
            <p>No Course Found!!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
