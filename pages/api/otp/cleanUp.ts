import prisma from '../../../libs/prisma';

async function cleanupExpiredOTPRecords() {
  try {
    const expiredOTPRecords = await prisma.oTP.findMany({
      where: {
        expiresAt: {
          lte: new Date(), // Find records where expiresAt is less than or equal to the current time
        },
      },
    });

    for (const otpRecord of expiredOTPRecords) {
      await prisma.oTP.delete({
        where: {
          id: otpRecord.id,
        },
      });
    }

    console.log('Expired OTP records deleted:', expiredOTPRecords.length);
  } catch (error) {
    console.error('Error cleaning up expired OTP records:', error);
  }
}

export default cleanupExpiredOTPRecords;
