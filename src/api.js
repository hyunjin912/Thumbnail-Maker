let totalPages = null;

export default async function getImages(search, page = 1) {
  if (totalPages && page > totalPages) return;
  // console.log("totalPages ", totalPages);
  // console.log("page ", page);
  // console.log("page > totalPages ", page > totalPages);

  const cid = "CyUwMxEIA6Sme6Sj-JIyr6iOOQoWoJib1N5cuMYZPaA";
  const data = await fetch(
    `https://api.unsplash.com/search/photos/?client_id=${cid}&query=${search}&page=${page}&per_page=30&lang=ko`,
  );
  const result = await data.json();
  totalPages = result.total_pages;

  return result;
}
