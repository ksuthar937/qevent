import Tag from "@/components/Tag";

export default async function EventDetails({ params }) {
  const id = params.eventId;

  const response = await fetch(
    `https://qevent-backend.labs.crio.do/events/${id}`
  );
  const eventData = await response.json();

  return (
    <div className="p-10">
      <img
        className=" mb-3 shadow-lg m-auto "
        src={eventData.image}
        alt="Bonnie image"
      />

      <h2 className="text-2xl font-bold bg-gradient-to-b from-orange-400 to-teal-600  bg-clip-text text-transparent">
        {eventData.name}
      </h2>
      <p className="font-bold bg-gradient-to-b from-orange-400 to-teal-600  bg-clip-text text-transparent">
        {eventData.location}
      </p>
      <p className="font-bold bg-gradient-to-b from-orange-400 to-teal-600  bg-clip-text text-transparent">
        {eventData.artist}
      </p>

      <div className="flex gap-2 items-center mt-10 mb-4">
        {eventData?.tags?.map((tag) => (
          <Tag text={tag} key={tag} />
        ))}
      </div>

      <p>{eventData.description}</p>

      <div className="flex justify-between items-center mt-10">
        <h3 className="text-2xl bg-gradient-to-b from-orange-400 to-teal-600  bg-clip-text text-transparent">
          {eventData.price > 0
            ? `$${eventData.price.toLocaleString()}`
            : "FREE"}
        </h3>
        <button className="bg-red-500 text-white py-2 px-4 rounded-lg">
          Buy Tickets
        </button>
      </div>
    </div>
  );
}
