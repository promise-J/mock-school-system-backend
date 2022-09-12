import React, { useState } from "react";
import Layout from "src/components/Layout/Layout";
import "./createExam.css";
import DetailsExamQuestion from "./DetailsExamQuestion";
import SettingExamQuestion from "./SettingExamQuestion";

const CreateQuestion = () => {
  const inputArrays = [
    {
      type: "radio",
      name: "",
      value: "",
    },
    {
      type: "radio",
      name: "",
      value: "",
    },
  ];
  const [inputArr, setInputArr] = useState(inputArrays);

  return (
    <>
      <Layout>
        <div className="create-question">
          <div className="create-question-wrapper">
            <div className="top-section">
              <div className="top-item item1">
                <h6>Question Details</h6>
                <p>Multiple Choice Question and Answer</p>
              </div>
              <div className="top-item item2">
                <div className="iteminner active">
                  <span>1</span>
                  <span>Details</span>
                </div>
              </div>
              <div className="top-item item2">
                <div className="iteminner">
                  <span>2</span>
                  <span>Settings</span>
                </div>
              </div>
              <div className="top-item item2">
                <div className="iteminner">
                  <span>3</span>
                  <span>Solution</span>
                </div>
              </div>
            </div>
            {/* <DetailsExamQuestion
              removeOption={removeOption}
              handleChange={handleChange}
              inputArr={inputArr}
              setInputArr={setInputArr}
            /> */}
            <SettingExamQuestion />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateQuestion;
