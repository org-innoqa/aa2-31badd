export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-fuchsia-600/30 rounded-full mix-blend-screen filter blur-3xl animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[-15%] left-[20%] w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
      <div className="absolute inset-0 bg-[#0f0a1f]" style={{ opacity: 0.4 }} />
    </div>
  )
}
