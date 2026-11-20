import { motion } from "framer-motion";
/* Hand-drawn fruit and toppings. Each is centred on 0,0 and about 26px wide. */

export const Blueberry = () => (
  <g filter="url(#ss-soft)">
    <circle r="11.5" fill="url(#ss-bb)" />
    <circle r="11.5" fill="#C9D3F2" opacity=".1" />
    <path d="M0,-11 l1.6,2.6 2.8,-.6 -1.4,2.4 1.8,2 -2.8,.2 -.6,2.6 -1.4,-2.2 -1.4,2.2 -.6,-2.6 -2.8,-.2 1.8,-2 -1.4,-2.4 2.8,.6z" transform="translate(0,1) scale(.55)" fill="#121636" />
    <ellipse cx="-4.2" cy="-4.6" rx="3.2" ry="1.9" fill="#fff" opacity=".45" transform="rotate(-30 -4.2 -4.6)" />
  </g>
);

const dome = [[0, -7], [-6, -4], [6, -4], [-8, 2], [0, 0], [8, 2], [-5, 7], [5, 7], [0, 9], [-3, -9.5], [3, -9.5], [-9.5, -3], [9.5, -3]];
const Drupes = ({ fill, shine }: { fill: string; shine: number }) => (
  <g filter="url(#ss-soft)">
    {dome.map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="4.4" fill={fill} />
        <circle cx={x - 1.3} cy={y - 1.4} r="1.2" fill="#fff" opacity={shine} />
      </g>
    ))}
  </g>
);
export const Raspberry = () => <Drupes fill="url(#ss-rasp)" shine={0.45} />;
export const Blackberry = () => <Drupes fill="url(#ss-bk)" shine={0.6} />;

const heart = "M0,-17 C14,-18 20,-5 16,6 C12,16 4,21 0,23 C-4,21 -12,16 -16,6 C-20,-5 -14,-18 0,-17Z";
export const StrawberryHalf = () => (
  <g filter="url(#ss-soft)">
    <path d={heart} fill="url(#ss-skin)" />
    <path d={heart} transform="scale(.82) translate(0,1)" fill="url(#ss-flesh)" />
    <path d="M0,-11 C3,-4 3,6 0,14 C-3,6 -3,-4 0,-11Z" fill="#FFF8F4" opacity=".75" />
    {[[-9, -2], [9, -2], [-7, 8], [7, 8], [0, -12]].map(([x, y], i) => (
      <path key={i} d={`M0,0 L${x * 0.55},${y * 0.55}`} stroke="#FFE3E0" strokeWidth="1" opacity=".7" />
    ))}
    {[[-13, -6], [13, -6], [-12, 5], [12, 5], [-6, 15], [6, 15]].map(([x, y], i) => (
      <ellipse key={i} cx={x} cy={y} rx=".9" ry="1.4" fill="#FFE07A" />
    ))}
    <path d="M-7,-16 C-3,-19 3,-19 7,-16 L4,-14 L0,-17 L-4,-14Z" fill="url(#ss-leaf)" />
  </g>
);

export const Strawberry = () => (
  <g filter="url(#ss-soft)">
    <path d={heart} fill="url(#ss-skin)" />
    {[[-8, -8], [0, -9], [8, -8], [-11, -1], [-4, -2], [4, -2], [11, -1], [-8, 6], [0, 5], [8, 6], [-4, 12], [4, 12], [0, 18]].map(([x, y], i) => (
      <g key={i}><ellipse cx={x} cy={y} rx="1.5" ry="1.9" fill="#A5122A" opacity=".55" /><ellipse cx={x} cy={y - 0.3} rx=".75" ry="1.1" fill="#FFD966" /></g>
    ))}
    <ellipse cx="-7" cy="-6" rx="3" ry="6" fill="#fff" opacity=".22" transform="rotate(25 -7 -6)" />
    <path d="M0,-15 L-12,-19 L-5,-14 L-10,-10 L-2,-13 L0,-8 L2,-13 L10,-10 L5,-14 L12,-19Z" fill="url(#ss-leaf)" />
    <path d="M0,-15 C0,-19 1,-22 3,-24" stroke="#2B7443" strokeWidth="2" strokeLinecap="round" fill="none" />
  </g>
);

export const MangoCube = () => (
  <g filter="url(#ss-soft)">
    <path d="M-11,-9 C-5,-12 6,-12 11,-8 C13,-2 13,5 10,10 C4,13 -5,13 -10,10 C-13,4 -13,-3 -11,-9Z" fill="url(#ss-mango-l)" />
    <path d="M-9,-8 C-4,-10 5,-10 9,-7 C10,-2 10,3 8,7 C3,9 -4,9 -8,7 C-10,2 -10,-3 -9,-8Z" fill="url(#ss-mango-top)" filter="url(#ss-tex)" />
    <path d="M-6,-5 C-6,0 -5,4 -6,7 M-1,-7 C0,-2 -1,3 0,8 M5,-6 C4,-1 5,3 4,7" stroke="#FFE3A0" strokeWidth=".8" fill="none" opacity=".7" />
    <path d="M-7,-6 C-3,-8.5 3,-8.5 7,-6.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity=".7" />
    <ellipse cx="5" cy="4" rx="2.2" ry="1" fill="#fff" opacity=".35" />
  </g>
);

export const PineappleChunk = () => (
  <g filter="url(#ss-soft)">
    <path d="M-12,-5 C-9,-11 9,-12 12,-6 C14,0 11,7 7,10 C2,12 -3,12 -8,10 C-12,7 -14,1 -12,-5Z" fill="url(#ss-pine)" />
    {[-8, -4, 0, 4, 8].map((x, i) => <path key={x} d={`M${x},-8 C${x + (i % 2 ? 1 : -1)},-2 ${x},4 ${x * 0.8},10`} stroke="#E3AE00" strokeWidth=".9" fill="none" opacity=".45" />)}
    <path d="M-9,-6 C-4,-9 4,-9 9,-7" stroke="#FFFBE0" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".85" />
    <circle cx="-4" cy="2" r="1" fill="#C98F00" opacity=".5" /><circle cx="5" cy="4" r="1" fill="#C98F00" opacity=".5" />
  </g>
);

export const BananaSlice = () => (
  <g filter="url(#ss-soft)">
    <ellipse rx="13" ry="10.5" fill="#E2C474" />
    <ellipse rx="12" ry="9.5" fill="url(#ss-banana)" />
    <ellipse rx="5.5" ry="4.5" fill="#F3E2A8" opacity=".7" />
    {[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 2.6} cy={Math.sin((a * Math.PI) / 180) * 2.2} r=".75" fill="#7A5A2A" />)}
    <ellipse cx="-5" cy="-5" rx="3.5" ry="1.4" fill="#fff" opacity=".7" transform="rotate(-25 -5 -5)" />
  </g>
);

const flakes = [
  [[-7, -3, 20], [0, -5, -25], [6, -1, 50], [-3, 3, 80], [4, 5, -10], [-9, 4, 35], [9, -6, 5]],
  [[-6, -4, -30], [2, -6, 15], [8, 0, 70], [-1, 1, 40], [-8, 4, -5], [3, 6, 20]],
  [[-8, -1, 60], [-2, -6, 0], [5, -4, -40], [1, 2, 25], [8, 4, 10], [-5, 6, -20], [10, -2, 85]],
];
export const Granola = ({ v = 0 }: { v?: number }) => (
  <g filter="url(#ss-soft)">
    <ellipse rx="11" ry="8" fill="#9A5E22" opacity=".9" />
    {flakes[v % 3].map(([x, y, r], i) => (
      <g key={i} transform={`translate(${x},${y}) rotate(${r})`}>
        <ellipse rx="5.2" ry="3.4" fill={["#E8B96E", "#D49A48", "#F2CF8E", "#C9893A"][(i + v) % 4]} stroke="#A0682A" strokeWidth=".5" />
        <path d="M-3.4,0 L3.4,0" stroke="#FFF0CC" strokeWidth=".7" opacity=".55" />
      </g>
    ))}
    <circle cx="-2" cy="-1" r="1.3" fill="#7A4818" />
    <circle cx="5" cy="2" r="1" fill="#F8E2B0" />
  </g>
);

export const MintLeaf = () => (
  <g filter="url(#ss-soft)">
    <path d="M0,0 C6,-14 22,-20 32,-16 C26,-4 12,4 0,0Z" fill="url(#ss-leaf)" />
    <path d="M1,-1 C10,-8 20,-13 30,-15" stroke="#BDE6C6" strokeWidth=".9" fill="none" opacity=".8" />
    <path d="M0,0 C-4,-14 -18,-24 -28,-22 C-24,-10 -12,-1 0,0Z" fill="url(#ss-leaf)" />
    <path d="M-1,-1 C-8,-9 -16,-16 -26,-21" stroke="#BDE6C6" strokeWidth=".9" fill="none" opacity=".8" />
  </g>
);

/** Glossy honey stroke with a thin highlight on top. Draws itself in when `draw` is set. */
export const HoneyPath = ({ d, w = 6, draw = false, delay = 0, dur = 1.1 }: { d: string; w?: number; draw?: boolean; delay?: number; dur?: number }) => {
  const anim = draw ? { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: dur, delay, ease: "easeInOut" as const } } : {};
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <motion.path d={d} stroke="#B86E00" strokeWidth={w + 1.5} opacity=".25" transform="translate(0,1.5)" {...anim} />
      <motion.path d={d} stroke="url(#ss-honey)" strokeWidth={w} opacity=".95" {...anim} />
      <motion.path d={d} stroke="#FFF1B8" strokeWidth={w * 0.22} opacity=".85" transform={`translate(${-w * 0.18},${-w * 0.2})`} {...anim} />
    </g>
  );
};
