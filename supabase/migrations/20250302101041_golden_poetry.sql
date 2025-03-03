/*
  # Disable email confirmation requirement

  1. Changes
    - Disable email confirmation requirement for new users
    - Allow users to sign in immediately after registration
  
  2. Security
    - This is a development-only configuration
    - For production, email confirmation should be re-enabled
*/

-- Update auth settings to disable email confirmation
UPDATE auth.config
SET email_confirm_required = false
WHERE id = 1;