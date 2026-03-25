import QRCode from 'react-qr-code'

interface QrCodeProps {
  value: string
  size?: number
  className?: string
}

export default function QrCode({ value, size = 128, className = '' }: QrCodeProps) {
  return (
    <div className={`bg-white p-2 inline-block rounded-lg shadow-sm ${className}`}>
      <QRCode
        size={size}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={value}
        viewBox={`0 0 ${size} ${size}`}
      />
    </div>
  )
}
