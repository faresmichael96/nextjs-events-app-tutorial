import React from "react";
import Image from "next/image";
import Link from "next/link";

const AllEvents = ({ data }) => {
  return (
    <div className="events_page">
      {data.map((eventCategory) => (
        <Link
          className="card"
          key={eventCategory.id}
          href={`/events/${eventCategory.id}`}
          passHref
        >
          <Image
            src={eventCategory.image}
            alt={eventCategory.title}
            width={380}
            height={350}
          />
          <h2>{eventCategory.title}</h2>
        </Link>
      ))}
    </div>
  );
};

export default AllEvents;
