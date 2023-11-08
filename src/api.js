const cid = "CyUwMxEIA6Sme6Sj-JIyr6iOOQoWoJib1N5cuMYZPaA";

export async function getImages(search, page = 1) {
  const data = await fetch(
    `https://api.unsplash.com/search/photos/?client_id=${cid}&query=${search}&page=${page}&orientation=landscape&per_page=30&lang=ko`,
  );
  const result = await data.json();
  console.log("api - result, search", result, search);

  return result;
}

export async function getImage(thumbId) {
  const data = await fetch(
    `https://api.unsplash.com/photos/${thumbId}?client_id=${cid}`,
  );
  const result = await data.json();
  console.log("썸브 완료");
  return result;
}
