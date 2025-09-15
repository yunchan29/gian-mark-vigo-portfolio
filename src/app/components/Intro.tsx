"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Intro: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl rounded-lg border border-white/20 bg-white/10 backdrop-blur-md shadow-xl shadow-black/30"
    >
      <div className="flex items-center space-x-2 border-b border-white/20 px-4 py-2 bg-white/10 text-xs sm:text-sm">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
        <span className="ml-3 text-[#9cdcfe]">~/gian-portfolio</span>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        <div className="text-sm sm:text-base">
          <span className="text-[#4ec9b0]">gian@portfolio:~$ </span>
          <TypeAnimation
            sequence={["whoami", 1200, "cat about.txt", 2000]}
            speed={50}
            wrapper="span"
            repeat={Infinity}
          />
        </div>

        <div className="ml-4 space-y-2 text-xs sm:text-sm">
          <p>
            Hi, I’m <span className="text-[#dcdcaa]">Gian Mark Vigo</span> 👨‍💻
          </p>
          <p>
            Web Developer | Programmer  
            Focused on building clean, interactive, and user-friendly apps.
          </p>
          <p>
            Skills: HTML, CSS, JavaScript, Java, Next.js, React, Laravel,
            Tailwind, SQL, Git
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Intro;
