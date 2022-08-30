export function isAdmin(role) {
  return ["teacher", "superuser"].includes(role);
}

export function isStudent(role) {
  return ["student"].includes(role);
}

export function isPrincipal(role) {
  return ["superuser"].includes(role);
}
