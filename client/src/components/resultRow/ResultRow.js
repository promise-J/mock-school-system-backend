import { Edit, Save } from "@material-ui/icons";
// import axios from "axios";
import React, { useState } from "react";
import { axiosRequest } from "src/utils/axiosRequest";
import './resultRow.css'

function ResultRow({ item, studentName }) {
  const initialState = {
    firstTest: item.firstTest,
    secondTest: item.secondTest,
    exam: item.exam,
    grade: item.grade,
    total: Number(item.exam) + Number(item.secondTest) + Number(item.firstTest),
    error: "",
    success: "",
  };

  const [data, setData] = useState(initialState);
  const { firstTest, secondTest, exam, grade, total } = data;
  const [onEdit, setOnEdit] = useState(false);

  const handleSave = async (e) => {
    setOnEdit(!onEdit);
    if (onEdit) {
      // if ((firstTest) > 20 || secondTest > 20 || exam > 60) return setData(...initialState);
      // if (secondTest > 20) setData({ ...data, secondTest: 0 });
      // if (exam > 60) setData({ ...data, exam: 0 });
      try {
        // const rawTotal = Number(exam) + Number(firstTest) + Number(secondTest)

        const res = await axiosRequest.put(`/resItem/${item._id}`, {
          firstTest,
          secondTest,
          exam,
          // grade: rawTotal >= 70 ? 'A' : (rawTotal >= 60 && rawTotal <=69) ? 'B' : (rawTotal >= 50 && rawTotal <=59) ? 'C' : (rawTotal >= 39 && rawTotal <=49) ? 'D' : 'F'
        });
        setData({
          firstTest: res.data.firstTest,
          secondTest: res.data.secondTest,
          exam: res.data.exam,
          grade: res.data.grade,
          total: Number(exam) + Number(secondTest) + Number(firstTest),
          // grade: total >= 70 ? 'A' : (total >= 60 && total <=69) ? 'B' : (total >= 50 && total <=59) ? 'C' : (total >= 39 && total <=49) ? 'D' : 'F'
        });
        // console.log(res.data)
      } catch (error) {
        console.log(error);
      }
    }
  };


  const onChangeInput = (e) => {
    const { name, value } = e.target;
    if((name === 'firstTest' && value > 20)) return setData({...data, [name]: item.firstTest })
    if((name === 'secondTest' && value > 20)) return setData({...data, [name]: item.secondTest })
    if((name === 'exam' && value > 60)) return setData({...data, [name]: item.exam })
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <tr key={item?._id} title={`${studentName}'s Result`}>
        <td>{item?.subject?.name}</td>
        <td>
          <input
            value={firstTest}
            onChange={onChangeInput}
            disabled={!onEdit}
            name="firstTest"
          />
          {/* {item.firstTest} */}
        </td>
        <td>
          {/* {item.secondTest} */}
          <input
            value={secondTest}
            onChange={onChangeInput}
            disabled={!onEdit}
            name="secondTest"
          />
        </td>
        <td>
          {/* {item.exam} */}
          <input
            value={exam}
            onChange={onChangeInput}
            disabled={!onEdit}
            name="exam"
          />
        </td>
        {/* <td>{total}</td> */}
        <td>
          <input
            value={total}
            onChange={onChangeInput}
            disabled={true}
            name="total"
          />
        </td>
        <td>
          <input
            value={grade}
            onChange={onChangeInput}
            disabled={true}
            name="grade"
          />
        </td>
        <td>
          <button onClick={handleSave}
            title={onEdit ? 'Save the record' : 'Edit the record'}
          >
            {onEdit ? (
              <Save
                className="resultRowSave"
              />
            ) : (
              <Edit
              className="resultRowEdit"
              />
            )}
          </button>
        </td>
      </tr>
    </>
  );
}

export default ResultRow;
