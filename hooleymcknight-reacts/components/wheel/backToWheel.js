// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";

const BackToWheel = (props) => {

    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

    const scrollToTop = () => {
      if (!isBrowser()) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
      <button
        className={props.className}
        style={{
            backgroundImage: `url(https://hooleymcknight.com/jackbox-wheel/wheel-dark.png)`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
        onClick={scrollToTop}
      >
        {/* <FontAwesomeIcon icon={faCircleChevronUp} /> */}
        <span>Back to Wheel</span>
      </button>
    )
  }
  
  export default BackToWheel