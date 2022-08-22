const Role = {
  SUPERUSER: "superuser",
  TEACHER: "teacher",
  STUDENT: "student",
};
const ROLES = Object.values(Role);

const TermValues = ["first", "second", "third"];

const constants = {
  Role,
  ROLES,
  TermValues,
};

module.exports = constants;
