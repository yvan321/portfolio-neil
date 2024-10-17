import { useEffect, useRef, useState } from 'react';
import styles from './HeroStyles.module.css';
import heroImg from '../../assets/profile.png';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';
import arrowUpLight from '../../assets/arrowup-light.png';
import arrowUpDark from '../../assets/arrowup-dark.png';
import facebookLight from '../../assets/facebook-light.png';
import facebookDark from '../../assets/facebook-dark.png';
import githubLight from '../../assets/github-light.svg';
import githubDark from '../../assets/github-dark.svg';
import linkedinLight from '../../assets/linkedin-light.svg';
import linkedinDark from '../../assets/linkedin-dark.svg';
import CV from '../../assets/cv.pdf';
import { useTheme } from '../../common/ThemeContext';
import { FaBars } from 'react-icons/fa';

function Hero() {
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === 'light' ? sun : moon;
  const facebookIcon = theme === 'light' ? facebookLight : facebookDark;
  const githubIcon = theme === 'light' ? githubLight : githubDark;
  const linkedinIcon = theme === 'light' ? linkedinLight : linkedinDark;
  const arrowUpIcon = theme === 'light' ? arrowUpLight : arrowUpDark;

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false); // state for back-to-top visibility
  const words = ['Web Developer', 'Designer', 'Graphic Artist', 'Kupal']; // Words to display
  const headerRef = useRef(null);
  const navRef = useRef(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sections = ['#home', '#about', '#skills', '#projects', '#education', '#contact'];

  // Show or hide navbar
  const showNavbar = () => {
    navRef.current.classList.toggle('active');
  };

  // Close navbar when a link is clicked
  useEffect(() => {
    const navLinks = navRef.current.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navRef.current.classList.remove('active');
      });
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener('click', () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          navRef.current.classList.remove('active');
        });
      });
    };
  }, []);

  // Hide/show navbar on scroll
  useEffect(() => {
    let lastScrollTop = 0;
    const header = headerRef.current;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        if (header) header.style.top = '-100px';
      } else {
        if (header) header.style.top = '0';
      }

      // Show or hide back to top button
      if (scrollTop > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update active nav link based on scroll position
  useEffect(() => {
    const navLinks = navRef.current.querySelectorAll('a');
    const observerOptions = {
      threshold: 0.7, // When 70% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        const navLink = navRef.current.querySelector(`a[href="#${sectionId}"]`);
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          if (navLink) navLink.classList.add('active');
        }
      });
    }, observerOptions);

    sections.forEach((sectionId) => {
      const section = document.querySelector(sectionId);
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((sectionId) => {
        const section = document.querySelector(sectionId);
        if (section) observer.unobserve(section);
      });
    };
  }, [sections]);

  // Change words in the span element
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(intervalId);
  }, [words.length]);

  // Scroll back to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section>
      <header ref={headerRef} className={styles.header}>
        <a href="#home" className={`${styles.logo} logo`}>NYC</a>

        <nav ref={navRef}>
          <a href="#home" className="active">Home</a>
          <a href="#about">About Me</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Works</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="nav-btn" onClick={showNavbar} aria-label="Open navigation">
          <FaBars />
        </button>
      </header>

      <div className={styles.container}>
        <div className={styles.colorModeContainer}>
          <img src={heroImg} className={styles.hero} alt="Profile picture" />
          <img
            className={styles.colorMode}
            src={themeIcon}
            alt="Color mode icon"
            onClick={toggleTheme}
          />
        </div>
        <div className={styles.info}>
          <h1>
            MR
            <br />
            KUPS
          </h1>
          <h2 className={styles.typingtext}>
            <span>{words[currentWordIndex]}</span>
          </h2>
          <span>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Twitter icon" />
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="Github icon" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn icon" />
            </a>
          </span>
          <p className={styles.description}>
            Trust yourself, and you have already paved the way.
          </p>
          <a href={CV} download>
            <button className="hover">Resume</button>
          </a>
        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <button className={styles.backToTop} onClick={scrollToTop}>
          <img src={arrowUpIcon} alt="Back to top icon" />
        </button>
      )}
    </section>
  );
}

export default Hero;

