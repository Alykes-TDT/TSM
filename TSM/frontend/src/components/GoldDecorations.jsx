export default function GoldDecorations({ variant = 'page', flip = false }) {
  const isHero = variant === 'hero'
  const size1  = isHero ? 700 : 520
  const size2  = isHero ? 500 : 380
  const op     = isHero ? 0.32 : 0.22

  return (
    <>
      <div style={{ position:'absolute', width:size1, height:size1, top:-size1/2.5, [flip?'right':'left']:-size1/2.5, borderRadius:'50%', background:`radial-gradient(circle, rgba(180,145,55,${op}) 0%, rgba(180,145,55,${op*0.3}) 45%, transparent 70%)`, pointerEvents:'none', zIndex:1 }} />
      <div style={{ position:'absolute', width:size2, height:size2, bottom:-size2/3, [flip?'left':'right']:-size2/3, borderRadius:'50%', background:`radial-gradient(circle, rgba(180,145,55,${op*0.85}) 0%, rgba(180,145,55,${op*0.2}) 45%, transparent 70%)`, pointerEvents:'none', zIndex:1 }} />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, backgroundImage:'linear-gradient(rgba(139,105,20,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,105,20,0.1) 1px, transparent 1px)', backgroundSize:'64px 64px' }} />
      <div style={{ position:'absolute', width:1, height:240, top:80, left:'8%', background:'linear-gradient(to bottom, transparent, rgba(139,105,20,0.55), transparent)', pointerEvents:'none', zIndex:2 }} />
      <div style={{ position:'absolute', width:1, height:180, bottom:80, right:'10%', background:'linear-gradient(to bottom, transparent, rgba(139,105,20,0.45), transparent)', pointerEvents:'none', zIndex:2 }} />
      <svg style={{ position:'absolute', [flip?'left':'right']:'4%', top:'12%', width:240, height:240, opacity:0.24, zIndex:2, pointerEvents:'none' }} viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="90" stroke="#6B5010" strokeWidth="1.5"/>
        <circle cx="100" cy="100" r="60" stroke="#6B5010" strokeWidth="1"/>
        <circle cx="100" cy="100" r="30" stroke="#6B5010" strokeWidth="1"/>
        <line x1="100" y1="8" x2="100" y2="192" stroke="#6B5010" strokeWidth="0.7"/>
        <line x1="8" y1="100" x2="192" y2="100" stroke="#6B5010" strokeWidth="0.7"/>
      </svg>
      <svg style={{ position:'absolute', [flip?'right':'left']:28, top:100, width:48, height:48, opacity:0.38, zIndex:2, pointerEvents:'none' }} viewBox="0 0 40 40" fill="none">
        {flip ? <path d="M0 0H40V40" stroke="#6B5010" strokeWidth="2"/> : <path d="M40 0H0V40" stroke="#6B5010" strokeWidth="2"/>}
      </svg>
    </>
  )
}
