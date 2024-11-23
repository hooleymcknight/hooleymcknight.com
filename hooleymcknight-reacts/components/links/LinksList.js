import Link from 'next/link'

const links = {
  "Hooley's Website": "https://hooleymcknight.com",
  "Jackbox Wheel": "https://hooleymcknight.com/jackbox-wheel",
  "Twitch": "https://twitch.tv/hooleymcknight",
  // "Thrive Youth Center (Charity Stream Donations Recipient)": "https://thriveyouthcenter.org",
  // "May 5th Charity Stream Blog Post": "https://hooleymcknight.com/blog/may-5-charity-stream",
  // "Fiddlesitters Website": "https://fiddlesitters.com",
  // "Tierator": "https://tierator.com",
  "LinkedIn": "https://www.linkedin.com/in/hooleymcknight/",
  "GitHub": "https://www.github.com/hooleymcknight/"
};

const LinksList = () => {

  return (
    <div className="links-list">
      {Object.keys(links).map(x =>
        <Link href={links[x]} alt={x} className="links-btn">{x}</Link>
      )}
    </div>
  )
}

export default LinksList