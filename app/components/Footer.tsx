import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaHackerrank } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";



const Footer = () => {
  return (
    <footer className="mt-20 py-6 px-4 md:px-6 border-t">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
        
      <p className="text-sm text-muted-foreground">&copy; 2024 Aman Kumar Singh. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <Link href="https://github.com/AmanSingh-tech" className="hover:underline underline-offset-4 text-sm" prefetch={false}>
          <FaGithub size="25"/>
        </Link>
        <Link href="https://www.linkedin.com/in/aman-singh-9b2a5a237/" className="hover:underline underline-offset-4 text-sm" prefetch={false}>
        <FaLinkedin size="25"/>
        </Link>
        <Link href="https://www.hackerrank.com/profile/pendulum4441" className="hover:underline underline-offset-4 text-sm" prefetch={false}>
        <FaHackerrank size="25"/>
        </Link>
        <Link href="https://leetcode.com/u/_its_aman_singh_/" className="hover:underline underline-offset-4 text-sm" prefetch={false}>
        <SiLeetcode size="25"/>
        </Link>
      </div>
    </div>
  </footer>
  )
}

export default Footer;