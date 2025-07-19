import TransferSlip from '@/components/mentee/transfer'

export default function TransferPage() {
  return (
    <TransferSlip
      mentorName="Jhon Doe"
      sessionDate="2025-07-10"
      sessionTime="10:00"
      amount="LKR 2,000"
      onPaymentConfirmed={() => {
        console.log('Payment confirmed, redirecting to dashboard...')
        window.location.href = '/mentee-dashboard'
      }}
      onCancel={() => {
        console.log('Payment cancelled')
        window.history.back()
      }}
    />
  )
} 