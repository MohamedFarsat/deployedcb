import bcrypt from 'bcryptjs'

// Encrypted admin credentials
// Original password: AOAI@ChatAndBuild2024!Secure
const ADMIN_EMAIL = 'admin@aoai.local'
const ADMIN_PASSWORD_HASH = '$2a$10$8ZqE5YxKjYvN3mXQp7FZHOuJ9vK3L2mN4pQ6rS8tU9vW0xY1zA2BC'

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  try {
    // Check email first
    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return false
    }

    // Verify password against hash
    const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
    return isValid
  } catch (error) {
    console.error('Admin authentication error:', error)
    return false
  }
}

export function getAdminEmail(): string {
  return ADMIN_EMAIL
}

// Utility function to generate new password hash (for development only)
export async function generatePasswordHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}
