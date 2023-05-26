// pages/api/reset-password.ts

import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prisma'
import axios from 'axios'

export default async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { newPassword, confirmPassword, email } = req.body

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' })
  }

  try {
    // Update the password for the user with the provided email
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: newPassword },
    })

    // Perform any additional actions after updating the password
    // For example, you can send a confirmation email or log the user in

    // Return a success response
    return res.status(200).json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
