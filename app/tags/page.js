import Tag from "@/components/Tag";

export default async function Tags() {
  const response = await fetch("https://qevent-backend.labs.crio.do/tags");

  const tags = await response.json();

  return (
    <div className="flex flex-wrap gap-4 justify-center p-20 m-20">
      {tags.map((tag) => (
        <Tag key={tag.id} text={tag.name} />
      ))}
    </div>
  );
}
