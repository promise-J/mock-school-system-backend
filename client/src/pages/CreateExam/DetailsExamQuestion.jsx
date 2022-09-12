import React from 'react'

const DetailsExamQuestion = ({inputArr, setInputArr}) => {

  const addOption = () => {
    if (inputArr.length >= 4) {
      const sureToCreate = window.confirm(
        `Are you sure you want to create an extra? ${inputArr.length} and above could be excess`
      );
      if (!sureToCreate) {
        return;
      }
    }
    setInputArr(() => {
      return [
        ...inputArr,
        {
          type: "radio",
          value: "",
          name: "",
        },
      ];
    });
  };

  
  const removeOption = (index) => {
    setInputArr(() => {
      return inputArr
        ?.map((val, idx) => ({ idx, val }))
        ?.filter((qid) => qid.idx !== index);
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <div className="bottom-section">
      <label htmlFor="subject">Subject</label>
      <select name="subject" id="subject">
        <option value="English">English</option>
        <option value="maths">Maths</option>
      </select>
      <label htmlFor="question">Question</label>
      <textarea className="question-val" name="question" id="question" />
      <div className="options-panel">
        {inputArr?.map((val, idx) => (
          <div key={idx}>
            <label>Option {idx + 1}</label>
            <div className="option-panel">
              {/* <div className="option-panel1"></div> */}
              <div className="option-panel2">
                <textarea name="" id=""></textarea>
              </div>
              <div className="option-panel3">
                <input
                  value={`answer${idx}`}
                  onChange={handleChange}
                  type="radio"
                  name="answer"
                />
                <label>Correct Answer</label>
                <button
                  onClick={() => removeOption(idx)}
                  className="removeOption"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <button className="addOption" onClick={addOption}>
          Add Option
        </button>
      </div>
      <button className="createQuestionBtn">Save Details</button>
    </div>
  );
}

export default DetailsExamQuestion;