import bcrypt from 'bcryptjs'

export async function hashPassword(plainPassword: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(plainPassword, salt)
}

export function comparePassword(plainPassword: string, hashPassword: string) {
  return bcrypt.compare(plainPassword, hashPassword)
}
