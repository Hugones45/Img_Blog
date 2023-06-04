import { Link } from "react-router-dom"
import styles from "./About.module.css"

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o IMG Blog</h2>
      <p>Este projeto consiste em um blog feito com React no front-end e Firebase no back-end.</p>
      <Link to="/posts/creatPost" className="btn">Criar Post</Link>
    </div>
  )
}

export default About
