import "./PostCard.css";

export default function PostCard({ item }) {
  const imageUrl =
    Array.isArray(item.medium_image) && item.medium_image[0]?.url
      ? item.medium_image[0].url
      : Array.isArray(item.small_image) && item.small_image[0]?.url
        ? item.small_image[0].url
        : "https://via.placeholder.com/300x169?text=No+Image";
  return (
    <article className="post-card">
      <img
        src={imageUrl}
        alt={item.title}
        loading="lazy"
      />

      <div className="post-card-body">
        <time
          className="post-card-date"
          dateTime={item.published_at}
        >
          {new Date(item.published_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })}
        </time>

        <h3 className="post-card-title">{item.title}</h3>
      </div>
    </article>
  );
}
