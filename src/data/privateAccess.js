import { reactive } from 'vue'

// Soft gate only: the password ships in the bundle, it just keeps
// confidential work away from casual visitors.
const PRIVATE_WORK_PASSWORD = 'WorksOnMyMachine'

// In-memory on purpose: leaving or reloading the page locks everything again
export const privateAccess = reactive({ unlocked: false })

export function isPrivateProject(project) {
  return Boolean(project.access?.locked)
}

export function isProjectLocked(project) {
  return isPrivateProject(project) && !privateAccess.unlocked
}

// Returns whether the password was right
export function unlockPrivateWork(password) {
  if (password !== PRIVATE_WORK_PASSWORD) return false
  privateAccess.unlocked = true
  return true
}
