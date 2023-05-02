import Link from "next/link";
import Image from "next/image";

const HomePage = ({ data }) => {
  return (
    <div className="home_body">
      {data.map((eventCategory) => (
        <Link
          className="card"
          key={eventCategory.id}
          href={`/events/${eventCategory.id}`}
          passHref
        >
          <div className="image">
            <Image
              src={eventCategory.image}
              alt={eventCategory.title}
              width={600}
              height={400}
            />
          </div>
          <div className="content">
            <h2>{eventCategory.title}</h2>
            <p>{eventCategory.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
