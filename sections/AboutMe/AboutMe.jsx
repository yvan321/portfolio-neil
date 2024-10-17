import styles from './AboutMeStyles.module.css';
import moonbg from '../../assets/moon.png'; // Replace with your image path

function AboutMe() {
  return (
    <section id="about" className={styles.container}>
      <h1 className="sectionTitle">About Me</h1>
      
      <p className={styles.description}>
        Hi, I’m Kups, I’m a beginner in web development, excited to dive into building websites and learning how to bring ideas to life online. My goal is to combine my love for design with my growing web development skills.
        When I’m not working, I enjoy experimenting with new design styles and learning more about coding. Thanks for checking out my work!
      </p>
      <img src={moonbg} alt="About Me" className={styles.aboutImage} />
    </section>
  );
}

export default AboutMe;
